"use client";

import { getCache, setCache, CACHE_TTL } from './cache';

// Store tokens in localStorage
const TOKEN_STORAGE_KEYS = {
  accessToken: "spotify_access_token",
  expiresAt: "spotify_token_expires_at",
};

// Cache key for currently playing track
const CURRENTLY_PLAYING_CACHE_KEY = 'spotify_currently_playing';

export async function refreshAccessToken() {
  try {
    // Call our server-side API route to refresh the token
    const response = await fetch("/api/spotify/token", {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Token refresh failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.access_token) {
      throw new Error('No access token received from server');
    }

    // Update stored tokens
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_STORAGE_KEYS.accessToken, data.access_token);
      localStorage.setItem(
        TOKEN_STORAGE_KEYS.expiresAt,
        String(Date.now() + data.expires_in * 1000)
      );
    }

    return data;
  } catch (error) {
    console.error('Error refreshing Spotify access token:', error);
    throw error;
  }
}

export function getStoredTokens() {
  if (typeof window === "undefined") return null;
  
  const accessToken = localStorage.getItem(TOKEN_STORAGE_KEYS.accessToken);
  const expiresAt = localStorage.getItem(TOKEN_STORAGE_KEYS.expiresAt);

  if (!accessToken || !expiresAt) return null;

  return {
    accessToken,
    expiresAt: Number(expiresAt),
  };
}

export async function ensureValidToken(): Promise<string> {
  const tokens = getStoredTokens();

  // If no tokens or expired, refresh using the hardcoded refresh token
  if (!tokens || Date.now() + 60000 > tokens.expiresAt) {
    const newTokens = await refreshAccessToken();
    if (!newTokens.access_token) {
      throw new Error('Failed to get access token from refresh');
    }
    return newTokens.access_token;
  }

  return tokens.accessToken;
}

// Function to get currently playing track with caching
export async function getCurrentlyPlaying() {
  try {
    // Check cache first (5 minute TTL)
    const cached = getCache<any>(CURRENTLY_PLAYING_CACHE_KEY);
    if (cached) {
      return cached;
    }

    const accessToken = await ensureValidToken();

    if (!accessToken) {
      console.error('No access token available');
      return null;
    }

    // Call our server-side API route to get currently playing
    const response = await fetch(`/api/spotify/currently-playing?access_token=${encodeURIComponent(accessToken)}`);

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to fetch currently playing:', error.error || response.status);
      return null;
    }

    const data = await response.json();

    // Cache the response for 5 minutes
    setCache(CURRENTLY_PLAYING_CACHE_KEY, data, CACHE_TTL.FIVE_MINUTES);

    return data;
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    return null;
  }
}