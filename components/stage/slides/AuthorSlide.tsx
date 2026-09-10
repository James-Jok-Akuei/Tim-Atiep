"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { StageImage } from "@/components/ui/StageImage";
import type { Author } from "@/data/presentationData";
import { fadeUp, staggerIn } from "../motion";
import { Slide } from "../Slide";

/** Portrait, honours and publications — taken from the book's back cover. */
export function AuthorSlide({ author }: { author: Author }) {
  return (
    <Slide>
      <motion.div
        variants={staggerIn(0.3, 0.12)}
        initial="hidden"
        animate="show"
        className="relative z-10 grid w-full max-w-[115rem] items-center gap-[4vh] md:grid-cols-[auto_1fr] md:gap-[5vw]"
      >
        <motion.div variants={fadeUp} className="relative mx-auto aspect-[4/5] h-[min(66vh,75vw)]">
          <div className="relative size-full overflow-hidden rounded-[2rem] border border-tree-red/40 bg-indigo-raised shadow-[0_30px_80px_-20px_var(--color-indigo-deep)]">
            <StageImage
              src={author.portrait}
              alt={author.portraitAlt}
              fill
              sizes="(min-width: 768px) 40vw, 80vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: author.portraitPosition }}
              fallback={<Monogram name={author.name} />}
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-[2.6vh] text-center md:items-start md:text-left">
          <motion.div variants={fadeUp}>
            <Eyebrow>About the Author</Eyebrow>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-stage-title font-bold text-cover-title">
            {author.name}
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-5xl text-balance text-stage-lead text-clean-white-muted">
            {author.summary}
          </motion.p>

          <motion.ul variants={fadeUp} className="flex flex-col gap-[1.4vh] text-left">
            {author.honours.map((h) => (
              <li key={h.title} className="flex items-start gap-[0.8vw] text-stage-body">
                <Trophy className="mt-[0.2em] size-[1em] shrink-0 text-tree-red-soft" strokeWidth={1.75} />
                <span className="text-clean-white">
                  <span className="font-mono tabular-nums text-tree-red-soft">{h.year}</span> · {h.title}
                  {h.by && <span className="text-clean-white-muted"> — {h.by}</span>}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.p variants={fadeUp} className="max-w-5xl text-stage-small text-clean-white-faint">
            <span className="mr-3 text-stage-label uppercase tracking-[0.25em] text-tree-red-soft">Featured in</span>
            {author.featuredIn.join(" · ")}
          </motion.p>
        </div>
      </motion.div>
    </Slide>
  );
}
