import { NextResponse } from 'next/server';

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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (response.status === 204 || response.status === 202) {
      return NextResponse.json(null); // No track playing or no active device
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
