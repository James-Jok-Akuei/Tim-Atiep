"use client";

import { useEffect, useState } from "react";

const memory = new Map<string, unknown>();

/**
 * useState that outlives the slide unmounting, so stepping away to another
 * slide and back resumes on the same speaker or photo.
 */
export function useSlideMemory<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() =>
    memory.has(key) ? (memory.get(key) as T) : initial,
  );

  useEffect(() => {
    memory.set(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
