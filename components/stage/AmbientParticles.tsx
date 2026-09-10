import type { CSSProperties } from "react";

// Seeded PRNG so server and client render identical particles (no hydration mismatch).
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 100) / 100;

function makeParticles(count: number, seed: number): CSSProperties[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const size = round(3 + rand() * 7);
    return {
      left: `${round(rand() * 100)}%`,
      width: size,
      height: size,
      "--particle-duration": `${round(16 + rand() * 18)}s`,
      "--particle-delay": `${round(-rand() * 34)}s`,
      "--particle-drift": `${round((rand() - 0.5) * 120)}px`,
      "--particle-opacity": round(0.2 + rand() * 0.5),
    } as CSSProperties;
  });
}

// Kept small and unfiltered: animated blur is expensive on modest laptops.
const PARTICLES = makeParticles(18, 7);

/** Breathing gold glow with slow-rising motes of light, like sun through leaves. */
export function AmbientParticles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[40%] size-[70vmax] -translate-x-1/2 -translate-y-1/2 animate-glow-breathe rounded-full will-change-[transform,opacity]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-tree-red) 18%, transparent), transparent 60%)",
        }}
      />
      {PARTICLES.map((style, i) => (
        <span key={i} className="stage-particle" style={style} />
      ))}
    </div>
  );
}
