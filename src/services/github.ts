interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  tooltip: string;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{ message: string }>;
  };
}

import { getCache, setCache, CACHE_TTL } from '~/utils/cache';

const GITHUB_USERNAME = 'ShreyasUrade1123';
const CACHE_KEY = 'github_contributions_cache';

/**
 * Get formatted date string in YYYY-MM-DD format
 */
function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get contribution level based on commit count
 */
function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 10) return 3;
  return 4;
}

/**
 * Get tooltip text for a contribution day
 */
function getTooltip(date: Date, count: number): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  const dateStr = date.toLocaleDateString('en-US', options);
  const commitText = count === 1 ? 'commit' : 'commits';
  return count === 0
    ? `No contributions on ${dateStr}`
    : `${count} ${commitText} on ${dateStr}`;
}

/**
 * Fetch GitHub events for the user
 */
async function fetchGitHubEvents(): Promise<GitHubEvent[]> {
  const allEvents: GitHubEvent[] = [];
  const perPage = 100;
  const maxPages = 10; // Fetch up to 1000 events (10 pages * 100)

  try {
    for (let page = 1; page <= maxPages; page++) {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=${perPage}&page=${page}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 403) {
          const rateLimitReset = response.headers.get('X-RateLimit-Reset');
          const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : null;
          console.warn(
            `GitHub API rate limit exceeded. Resets at: ${resetTime?.toLocaleString() || 'unknown'}`
          );
          break;
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const events: GitHubEvent[] = await response.json();

      if (events.length === 0) break;

      allEvents.push(...events);

      // If we got less than perPage results, we've reached the end
      if (events.length < perPage) break;
    }

    return allEvents;
  } catch (error) {
    // Handle timeout errors specifically
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('GitHub API request timed out');
    } else {
      console.error('Error fetching GitHub events:', error);
    }
    throw error;
  }
}

/**
 * Process GitHub events into contribution data
 */
function processGitHubEvents(events: GitHubEvent[]): Map<string, number> {
  const contributionMap = new Map<string, number>();

  events.forEach(event => {
    // Count PushEvents (commits) and CreateEvents (repo creation)
    if (event.type === 'PushEvent' || event.type === 'CreateEvent') {
      const eventDate = new Date(event.created_at);
      const dateKey = getFormattedDate(eventDate);

      // For PushEvents, count the number of commits
      let commitCount = 1;
      if (event.type === 'PushEvent' && event.payload.commits) {
        commitCount = event.payload.commits.length;
      }

      contributionMap.set(
        dateKey,
        (contributionMap.get(dateKey) || 0) + commitCount
      );
    }
  });

  return contributionMap;
}

/**
 * Generate contribution data for the past 365 days
 */
function generateContributionDays(contributionMap: Map<string, number>): ContributionDay[] {
  const contributions: ContributionDay[] = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const currentDate = new Date(oneYearAgo);

  while (currentDate <= today) {
    const dateKey = getFormattedDate(currentDate);
    const count = contributionMap.get(dateKey) || 0;

    contributions.push({
      date: dateKey,
      count,
      level: getLevel(count),
      tooltip: getTooltip(new Date(currentDate), count),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return contributions;
}

/**
 * Calculate contribution statistics
 */
function calculateStats(contributions: ContributionDay[]) {
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  // Calculate current streak (from today backwards)
  let currentStreak = 0;
  for (let i = contributions.length - 1; i >= 0; i--) {
    const contribution = contributions[i];
    if (contribution && contribution.count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  contributions.forEach(day => {
    if (day.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });

  return {
    totalContributions,
    currentStreak,
    longestStreak,
  };
}

/**
 * Fetch and process GitHub contributions with 24-hour caching
 * Returns contribution data and statistics
 */
export async function fetchGitHubContributions(): Promise<{
  contributions: ContributionDay[];
  stats: {
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
  };
}> {
  // Try to get cached data first (24 hour TTL)
  const cached = getCache<{
    contributions: ContributionDay[];
    stats: {
      totalContributions: number;
      currentStreak: number;
      longestStreak: number;
    };
  }>(CACHE_KEY);

  if (cached) {
    console.log('Using cached GitHub contribution data');
    return cached;
  }

  try {
    // Fetch fresh data from GitHub
    const events = await fetchGitHubEvents();
    const contributionMap = processGitHubEvents(events);
    const contributions = generateContributionDays(contributionMap);
    const stats = calculateStats(contributions);

    const result = { contributions, stats };

    // Cache the result for 24 hours
    setCache(CACHE_KEY, result, CACHE_TTL.TWENTY_FOUR_HOURS);

    return result;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);

    // Return empty data as fallback
    const emptyContributions = generateContributionDays(new Map());
    return {
      contributions: emptyContributions,
      stats: {
        totalContributions: 0,
        currentStreak: 0,
        longestStreak: 0,
      },
    };
  }
}
