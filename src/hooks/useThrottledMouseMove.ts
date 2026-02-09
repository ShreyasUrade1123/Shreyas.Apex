import { useState, useEffect, useRef } from 'react';

interface MousePosition {
    x: number;
    y: number;
}

/**
 * Custom hook for throttled mouse tracking
 * Uses requestAnimationFrame for optimal performance (60fps max)
 * @param containerRef - Optional ref to container element for relative positioning
 */
export function useThrottledMouseMove(containerRef?: React.RefObject<HTMLElement | null>) {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);
    const lastUpdate = useRef<number>(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Cancel any pending animation frame
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
            }

            // Schedule update with requestAnimationFrame for smooth 60fps
            rafId.current = requestAnimationFrame(() => {
                const now = performance.now();

                // Throttle to ~16ms (60fps)
                if (now - lastUpdate.current >= 16) {
                    let x = e.clientX;
                    let y = e.clientY;

                    // Calculate relative position if container ref is provided
                    if (containerRef?.current) {
                        const rect = containerRef.current.getBoundingClientRect();
                        x = e.clientX - rect.left;
                        y = e.clientY - rect.top;
                    }

                    setMousePosition({ x, y });
                    lastUpdate.current = now;
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [containerRef]);

    return mousePosition;
}
