/**
 * Cache utility for API responses with TTL (Time To Live)
 * Uses localStorage for client-side and in-memory cache for server-side
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

// In-memory cache for server-side (Node.js environment)
const serverCache = new Map<string, CacheEntry<any>>();

/**
 * Get cached data if it exists and hasn't expired
 * @param key - Cache key
 * @returns Cached data or null if expired/not found
 */
export function getCache<T>(key: string): T | null {
  // Server-side: use in-memory cache
  if (typeof window === 'undefined') {
    const cached = serverCache.get(key);
    if (!cached) return null;

    const now = Date.now();
    // Check if cache has expired
    if (now - cached.timestamp > cached.ttl) {
      serverCache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  // Client-side: use localStorage
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    const now = Date.now();

    // Check if cache has expired
    if (now - entry.timestamp > entry.ttl) {
      localStorage.removeItem(key);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.error(`[Cache] Error reading cache for key "${key}":`, error);
    return null;
  }
}

/**
 * Set cache with data and TTL
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttl - Time to live in milliseconds
 */
export function setCache<T>(key: string, data: T, ttl: number): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  };

  // Server-side: use in-memory cache
  if (typeof window === 'undefined') {
    serverCache.set(key, entry);
    return;
  }

  // Client-side: use localStorage
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    console.error(`[Cache] Error setting cache for key "${key}":`, error);
    // If localStorage is full, try to clear old entries
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      clearExpiredCache();
      // Try again after clearing
      try {
        localStorage.setItem(key, JSON.stringify(entry));
      } catch (retryError) {
        console.error(`[Cache] Retry failed for key "${key}":`, retryError);
      }
    }
  }
}

/**
 * Clear expired cache entries from localStorage
 */
export function clearExpiredCache(): void {
  if (typeof window === 'undefined') return;

  try {
    const now = Date.now();
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      try {
        const cached = localStorage.getItem(key);
        if (!cached) return;

        const entry = JSON.parse(cached);
        // Check if it's a cache entry with timestamp and ttl
        if (entry.timestamp && entry.ttl) {
          if (now - entry.timestamp > entry.ttl) {
            localStorage.removeItem(key);
          }
        }
      } catch {
        // Skip invalid entries
      }
    });
  } catch (error) {
    console.error('[Cache] Error clearing expired cache:', error);
  }
}

/**
 * Clear all cache entries
 */
export function clearAllCache(): void {
  if (typeof window === 'undefined') {
    serverCache.clear();
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error('[Cache] Error clearing all cache:', error);
  }
}

/**
 * Clear specific cache entry
 * @param key - Cache key to clear
 */
export function clearCache(key: string): void {
  if (typeof window === 'undefined') {
    serverCache.delete(key);
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Cache] Error clearing cache for key "${key}":`, error);
  }
}

/**
 * Cached fetch wrapper - fetches data with automatic caching
 * @param key - Cache key
 * @param fetcher - Function that fetches the data
 * @param ttl - Time to live in milliseconds
 * @returns Cached or fresh data
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number
): Promise<T> {
  // Try to get from cache first
  const cached = getCache<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch fresh data
  const data = await fetcher();

  // Store in cache
  setCache(key, data, ttl);

  return data;
}

// Cache TTL constants (in milliseconds)
export const CACHE_TTL = {
  FIVE_MINUTES: 5 * 60 * 1000,      // 5 minutes for frequently changing data (Spotify)
  ONE_HOUR: 60 * 60 * 1000,          // 1 hour
  TWENTY_FOUR_HOURS: 24 * 60 * 60 * 1000, // 24 hours for rarely changing data (GitHub)
} as const;
