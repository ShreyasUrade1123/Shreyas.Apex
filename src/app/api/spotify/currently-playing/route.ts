import { NextResponse } from 'next/server';
import { getCache, setCache, CACHE_TTL } from '~/utils/cache';

// Cache key format: spotify_currently_playing_{accessToken}
function getCacheKey(accessToken: string): string {
  // Use a hash of the token to avoid storing the full token in the cache key
  return `spotify_currently_playing_${accessToken.substring(0, 20)}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('access_token');

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Missing access token' },
        { status: 400 }
      );
    }

    // Try to get cached data first (5 minute TTL)
    const cacheKey = getCacheKey(accessToken);
    const cached = getCache<any>(cacheKey);

    if (cached) {
      console.log('Using cached Spotify data');
      return NextResponse.json(cached);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (response.status === 204 || response.status === 202) {
      // Cache null response for shorter time (1 minute)
      const nullResponse = null;
      setCache(cacheKey, nullResponse, 60 * 1000);
      return NextResponse.json(nullResponse); // No track playing or no active device
    }

    if (!response.ok) {
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        console.warn(`Spotify API rate limited. Retry after ${retryAfter} seconds`);
      }

      const errorText = await response.text();
      console.error('Spotify API error:', response.status, errorText);

      return NextResponse.json(
        { error: `Spotify API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Cache the successful response for 5 minutes
    setCache(cacheKey, data, CACHE_TTL.FIVE_MINUTES);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching currently playing:', error);

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Spotify API request timed out' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch currently playing' },
      { status: 500 }
    );
  }
}
