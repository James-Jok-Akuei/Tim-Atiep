"use client";

import { TreeDeciduous } from "lucide-react";
import { book } from "@/data/presentationData";
import { StageImage } from "./StageImage";

/** The book cover, or a typographic stand-in until the cover file is added. */
export function BookCover({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[2/3] overflow-hidden rounded-md border border-tree-red/20 shadow-[0_30px_80px_-20px_var(--color-indigo-deep)] ${className}`}
    >
      <StageImage
        src={book.cover}
        alt={`Cover of ${book.fullTitle}`}
        fill
        sizes="(min-width: 768px) 30vw, 70vw"
        quality={90}
        className="object-cover"
        fallback={<CoverFallback />}
      />
    </div>
  );
}

function CoverFallback() {
  return (
    <div
      className="flex size-full flex-col items-center justify-between p-[10%] text-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 38%, color-mix(in oklab, var(--color-tree-red) 22%, var(--color-indigo-raised)), var(--color-indigo-base) 80%)",
      }}
    >
      <p className="text-[clamp(0.6rem,0.8vw,0.95rem)] uppercase tracking-[0.3em] text-clean-white-muted">
        {book.genre}
      </p>
      <div className="flex flex-col items-center gap-[1.5vh]">
        <TreeDeciduous className="size-[clamp(2.5rem,4vw,5rem)] text-tree-red-soft" strokeWidth={1.25} />
        <p className="font-display text-[clamp(1.75rem,3.2vw,4rem)] font-bold leading-none text-cover-title">
          {book.title}
        </p>
        <p className="font-display text-[clamp(1rem,1.5vw,1.9rem)] italic text-clean-white">
          {book.subtitle}
        </p>
      </div>
      <p className="text-[clamp(0.75rem,1vw,1.2rem)] uppercase tracking-[0.25em] text-clean-white">
        {book.author}
      </p>
    </div>
  );
}
