"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoFallback } from "@/components/ui/PhotoFallback";
import { FittedImage } from "@/components/ui/FittedImage";
import type { AuthorBook } from "@/data/presentationData";
import { fadeUp, staggerIn } from "../motion";
import { Slide } from "../Slide";

type AuthorBooksSlideProps = {
  authorName: string;
  books: AuthorBook[];
};

/** The author's earlier books alongside TIM ATIEP. */
export function AuthorBooksSlide({ authorName, books }: AuthorBooksSlideProps) {
  return (
    <Slide>
      <motion.div
        variants={staggerIn(0.3, 0.15)}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-[115rem] flex-col gap-[5vh]"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-[1.5vh]">
          <Eyebrow>The Collection</Eyebrow>
          <h2 className="font-display text-stage-title font-semibold text-clean-white">
            Books by <span className="italic text-red-gradient">{authorName}</span>
          </h2>
        </motion.div>

        <div className="grid gap-[4vh] md:gap-[3vw]" style={{ gridTemplateColumns: `repeat(${books.length}, minmax(0, 1fr))` }}>
          {books.map((b) => (
            <motion.figure key={b.id} variants={fadeUp} className="flex min-w-0 flex-col gap-[2vh]">
              <div className="relative h-[44vh] overflow-hidden rounded-3xl border border-indigo-line bg-indigo-raised">
                <FittedImage
                  src={b.image}
                  alt={b.imageAlt}
                  sizes="(min-width: 768px) 33vw, 90vw"
                  quality={90}
                  className="size-full"
                  fallback={<PhotoFallback src={b.image} />}
                />
                {b.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-tree-red px-4 py-1 text-stage-label font-semibold uppercase tracking-[0.2em] text-clean-white">
                    {b.badge}
                  </span>
                )}
              </div>
              <figcaption className="flex flex-col gap-[0.6vh]">
                <p className="font-display text-stage-heading font-semibold leading-tight text-clean-white">{b.title}</p>
                {b.subtitle && <p className="text-stage-body italic text-clean-white-muted">{b.subtitle}</p>}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </Slide>
  );
}
