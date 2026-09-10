import type { ReactNode } from "react";

/** Small uppercase gold label that sits above stage headings. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-stage-label font-medium uppercase tracking-[0.3em] text-tree-red-soft">
      {children}
    </p>
  );
}
