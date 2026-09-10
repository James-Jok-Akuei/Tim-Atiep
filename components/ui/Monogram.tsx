import { initials } from "@/lib/format";

/** Initials on a warm glow — stands in for a missing portrait. */
export function Monogram({ name, className = "text-[min(20vh,22vw)]" }: { name: string; className?: string }) {
  return (
    <div
      className="grid size-full place-items-center"
      style={{
        background:
          "radial-gradient(circle at 50% 35%, color-mix(in oklab, var(--color-tree-red) 22%, var(--color-indigo-raised)), var(--color-indigo-raised) 70%)",
      }}
    >
      <span className={`font-display font-semibold leading-none text-red-gradient ${className}`}>
        {initials(name)}
      </span>
    </div>
  );
}
