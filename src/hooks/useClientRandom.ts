import { useState, useEffect } from 'react';

/**
 * Hook to generate random values safely on the client-side only.
 * Prevents hydration mismatches by ensuring random values are only
 * generated after the component mounts on the client.
 *
 * @param generator - Function that generates the random values
 * @param defaultValue - Default value to use during SSR
 * @returns The generated random value (defaultValue during SSR, random value on client)
 */
export function useClientRandom<T>(generator: () => T, defaultValue: T): T {
  const [value, setValue] = useState<T>(defaultValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setValue(generator());
  }, []);

  return isMounted ? value : defaultValue;
}

/**
 * Hook to generate an array of random particle data for animations.
 * Prevents hydration mismatches by generating particles only on the client.
 *
 * @param count - Number of particles to generate
 * @param generator - Function to generate individual particle data
 * @returns Array of particle data
 */
export function useClientParticles<T>(
  count: number,
  generator: (index: number) => T
): T[] {
  const [particles, setParticles] = useState<T[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const generated = Array.from({ length: count }, (_, i) => generator(i));
    setParticles(generated);
  }, [count]);

  return isMounted ? particles : [];
}
