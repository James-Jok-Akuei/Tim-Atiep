"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { BookQuote } from "@/data/presentationData";
import { fadeUp, staggerIn } from "../motion";
import { Slide } from "../Slide";

/** A quotation about the book: context in small type, then the key line large. */
export function QuoteSlide({ quote }: { quote: BookQuote }) {
  return (
    <Slide>
      <motion.figure
        variants={staggerIn(0.3, 0.18)}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-[100rem] flex-col gap-[3.5vh]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>{quote.eyebrow}</Eyebrow>
        </motion.div>

        {quote.lead && (
          <motion.p variants={fadeUp} className="max-w-[80rem] text-stage-body text-clean-white-muted">
            {quote.lead}
          </motion.p>
        )}

        <motion.blockquote
          variants={fadeUp}
          className="max-w-[92rem] border-l-4 border-tree-red pl-[2.5vw] font-display text-[clamp(1.75rem,min(3.3vw,5.9vh),4rem)] italic leading-snug text-clean-white"
        >
          <span className="text-tree-red-soft">&ldquo;</span>
          {quote.highlight}
          <span className="text-tree-red-soft">&rdquo;</span>
        </motion.blockquote>

        <motion.figcaption variants={fadeUp} className="flex flex-col gap-1 pl-[calc(2.5vw+4px)]">
          <span className="font-display text-stage-lead font-semibold text-clean-white">— {quote.author}</span>
          <span className="text-stage-body text-clean-white-muted">{quote.role}</span>
        </motion.figcaption>
      </motion.figure>
    </Slide>
  );
}
