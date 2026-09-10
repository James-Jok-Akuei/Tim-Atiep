import { TreeDeciduous } from "lucide-react";

type PhotoFallbackProps = {
  src: string;
  /** Show which file to add — useful on stage while preparing, not for attendees. */
  showPath?: boolean;
};

/** Warm glow with a tree mark where a photo hasn't been added yet. */
export function PhotoFallback({ src, showPath = true }: PhotoFallbackProps) {
  return (
    <div
      className="flex size-full items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 60% 55% at 50% 40%, color-mix(in oklab, var(--color-tree-red) 14%, var(--color-indigo-raised)), var(--color-indigo-base) 75%)",
      }}
    >
      <div className="flex flex-col items-center gap-3 text-clean-white-faint">
        <TreeDeciduous className="size-16 opacity-40" strokeWidth={1.25} />
        {showPath && <p className="font-mono text-sm opacity-70">Add photo: public{src}</p>}
      </div>
    </div>
  );
}
