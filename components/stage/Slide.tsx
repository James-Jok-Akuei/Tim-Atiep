"use client";

import type { ReactNode } from "react";
import { useStageFit } from "./useStageFit";

type SlideProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Full-stage slide layout. Entrance/exit motion is owned by
 * PresentationContainer; content auto-shrinks if it would overflow.
 */
export function Slide({ children, className = "" }: SlideProps) {
  const { containerRef, contentRef } = useStageFit<HTMLElement, HTMLDivElement>();

  return (
    <section
      ref={containerRef}
      className={`stage-glow relative flex h-full w-full flex-col items-center justify-center-safe overflow-y-auto overflow-x-hidden px-[6vw] pb-[max(10vh,5.5rem)] pt-[6vh] md:overflow-hidden ${className}`}
    >
      <div ref={contentRef} className="flex w-full flex-col items-center">
        {children}
      </div>
    </section>
  );
}
