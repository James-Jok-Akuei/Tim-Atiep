"use client";

import { useLayoutEffect, useRef } from "react";

const DESKTOP = "(min-width: 768px)";
const MIN_SCALE = 0.6;

/**
 * Shrinks slide content when it would overflow the stage — a short 720p
 * projector, or a long poem. Uses CSS zoom (not transform) so the content
 * re-lays out and stays centred. Phones keep natural size and scroll.
 */
export function useStageFit<C extends HTMLElement, T extends HTMLElement>() {
  const containerRef = useRef<C>(null);
  const contentRef = useRef<T>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;
    const desktop = window.matchMedia(DESKTOP);

    const fit = () => {
      content.style.zoom = "";
      if (!desktop.matches) return;
      const cs = getComputedStyle(container);
      const available = container.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      let scale = 1;
      // Text re-wraps as it shrinks, so converge over a few passes.
      for (let pass = 0; pass < 4; pass++) {
        const height = content.getBoundingClientRect().height;
        if (height <= available + 1 || scale <= MIN_SCALE) break;
        scale = Math.max(MIN_SCALE, scale * (available / height) * 0.99);
        content.style.zoom = String(scale);
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    observer.observe(content);
    desktop.addEventListener("change", fit);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", fit);
    };
  }, []);

  return { containerRef, contentRef };
}
