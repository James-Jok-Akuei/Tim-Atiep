import { BookCover } from "./BookCover";

/**
 * The book cover on a slow loop: it floats, turns gently in 3D and catches a
 * passing sheen, with a ground shadow that breathes in time. Motion is CSS-only
 * (transforms), and stops for viewers who prefer reduced motion.
 */
export function AnimatedBook({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <div className={`[perspective:1400px] ${className}`}>
      <div className="animate-book-float">
        <div className="relative animate-book-sway [transform-style:preserve-3d]">
          <BookCover className="w-full" eager={eager} />
          <span aria-hidden className="book-sheen pointer-events-none absolute inset-0 overflow-hidden rounded-md" />
        </div>
      </div>
      <div
        aria-hidden
        className="mx-auto mt-[7%] aspect-[8/1] w-[78%] animate-book-shadow rounded-[50%] bg-indigo-deep/80 blur-md"
      />
    </div>
  );
}
