/** Flags stand-in content on screen so it can't slip into the live event unnoticed. */
export function PlaceholderBadge({
  children = "Placeholder — confirm before the event",
  className = "",
}: {
  children?: string;
  className?: string;
}) {
  return (
    <p
      className={`w-fit rounded-full border border-dashed border-tree-red/50 px-3 py-1 text-sm uppercase tracking-[0.2em] text-tree-red-soft/80 ${className}`}
    >
      {children}
    </p>
  );
}
