"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { StageImage } from "@/components/ui/StageImage";
import { book, type Poem } from "@/data/presentationData";
import { pad2 } from "@/lib/format";
import { useSlideKeys } from "../keys";
import { fadeUp, staggerIn } from "../motion";
import { useSlideMemory } from "../slideMemory";
import { useStageFit } from "../useStageFit";

type PoetrySlideProps = {
  poems: Poem[];
};

/**
 * Lines from the collection over a slowly zooming photo, one poem at a time,
 * revealed line by line. ↑ / ↓ step through the poems.
 */
export function PoetrySlide({ poems }: PoetrySlideProps) {
  // Poems vary in length — shrink to fit rather than run under the controls.
  const { containerRef, contentRef } = useStageFit<HTMLElement, HTMLDivElement>();
  const [index, setIndex] = useSlideMemory("poem-index", 0);
  const count = poems.length;
  const active = Math.min(index, count - 1);
  const poem = poems[active];

  const select = (i: number) => setIndex(((i % count) + count) % count);

  useSlideKeys({
    ArrowDown: () => select(active + 1),
    ArrowUp: () => select(active - 1),
  });

  return (
    <section
      ref={containerRef}
      className="relative flex h-full w-full flex-col items-center justify-center-safe overflow-y-auto overflow-x-hidden px-[8vw] pb-[max(10vh,5.5rem)] pt-[6vh] md:overflow-hidden"
    >
      <div
        aria-hidden
        className="fixed inset-0 md:absolute"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 35% 40%, color-mix(in oklab, var(--color-tree-red) 18%, transparent), transparent 70%)",
        }}
      />
      {poem.image && (
        <div aria-hidden className="fixed inset-0 animate-ken-burns md:absolute">
          <StageImage src={poem.image} alt="" fill sizes="100vw" className="object-cover" fallback={null} />
        </div>
      )}
      <div
        aria-hidden
        className="fixed inset-0 md:absolute"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(27 43 71 / 0.72) 25%, rgb(27 43 71 / 0.92) 100%), linear-gradient(180deg, rgb(27 43 71 / 0.35), rgb(27 43 71 / 0.6))",
        }}
      />

      <div ref={contentRef} className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={poem.id}
            variants={staggerIn(0.3, 0.2)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            className="flex flex-col items-center gap-[3.2vh] text-center"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>
                {poem.isPlaceholder ? "Sample verse" : `From ${book.title}`}
                {count > 1 && ` · ${pad2(active + 1)} / ${pad2(count)}`}
              </Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-balance font-display text-stage-title font-semibold text-cover-title"
            >
              {poem.title}
            </motion.h2>

            <motion.span variants={fadeUp} aria-hidden className="h-px w-24 bg-tree-red/50" />

            <div className="flex flex-col gap-[3.5vh]">
              {poem.stanzas.map((stanza, i) => (
                <motion.p
                  key={i}
                  variants={staggerIn(0, 0.14)}
                  className="font-display text-stage-lead italic text-clean-white [text-shadow:0_2px_24px_var(--color-indigo-deep)]"
                >
                  {stanza.map((line, j) => (
                    <motion.span key={j} variants={fadeUp} className="block">
                      {line}
                    </motion.span>
                  ))}
                </motion.p>
              ))}
            </div>

            <motion.p variants={fadeUp} className="text-stage-body text-clean-white-muted">
              — {book.author}
            </motion.p>

            {poem.isPlaceholder && (
              <motion.div variants={fadeUp}>
                <PlaceholderBadge>Sample text — replace with a poem from the book</PlaceholderBadge>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
