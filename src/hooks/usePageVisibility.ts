"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the page tab is currently visible
 * Returns true if the tab is visible, false if hidden (user switched tabs)
 *
 * Usage:
 * const isPageVisible = usePageVisibility();
 *
 * useEffect(() => {
 *   if (!isPageVisible) {
 *     // Pause expensive animations
 *   } else {
 *     // Resume animations
 *   }
 * }, [isPageVisible]);
 */
export function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if we're on the client
    if (typeof document === 'undefined') return;

    // Get the correct property name for visibility API
    const getHiddenProp = (): string | null => {
      const prefixes = ['', 'webkit', 'moz', 'ms'];

      for (const prefix of prefixes) {
        const prop = prefix ? `${prefix}Hidden` : 'hidden';
        if (prop in document) {
          return prop;
        }
      }

      return null;
    };

    const hiddenProp = getHiddenProp();

    if (!hiddenProp) {
      // Fallback if Page Visibility API is not supported
      return;
    }

    // Get the correct event name
    const visibilityChangeEvent = hiddenProp.replace(/[H|h]idden/, '') + 'visibilitychange';

    // Handler for visibility change
    const handleVisibilityChange = () => {
      setIsVisible(!(document as any)[hiddenProp]);
    };

    // Set initial state
    setIsVisible(!(document as any)[hiddenProp]);

    // Add event listener
    document.addEventListener(visibilityChangeEvent, handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener(visibilityChangeEvent, handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
