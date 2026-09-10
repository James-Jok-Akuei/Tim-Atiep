"use client";

import { useIsPresent } from "framer-motion";
import { useEffect, useRef } from "react";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/** Leave browser shortcuts (Cmd+R, Ctrl+F…) and text entry alone. */
export function shouldIgnoreKey(e: KeyboardEvent) {
  return e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target);
}

type KeyMap = Record<string, () => void>;

/**
 * Slide-local shortcuts, keyed by `KeyboardEvent.key`. Inactive while the
 * slide is animating out, so an exiting slide never reacts to input.
 */
export function useSlideKeys(keyMap: KeyMap) {
  const isPresent = useIsPresent();
  const mapRef = useRef(keyMap);

  useEffect(() => {
    mapRef.current = keyMap;
  });

  useEffect(() => {
    if (!isPresent) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (shouldIgnoreKey(e)) return;
      const handler = mapRef.current[e.key];
      if (!handler) return;
      e.preventDefault();
      handler();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPresent]);
}
