"use client";

import { motion } from "framer-motion";
import { AnimatedBook } from "@/components/ui/AnimatedBook";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { book, event } from "@/data/presentationData";
import { AmbientParticles } from "../AmbientParticles";
import { GuideQrCode } from "../GuideQrCode";
import { fadeIn, fadeUp, staggerIn } from "../motion";
import { Slide } from "../Slide";

type WelcomeSlideProps = {
  /** Pre-formatted on the server so the text matches at hydration. */
  dateLabel: string;
  timeLabel: string;
};

/** Opening slide: the title and event details beside the animated book. */
export function WelcomeSlide({ dateLabel, timeLabel }: WelcomeSlideProps) {
  return (
    // Extra bottom room keeps the text clear of the reader sitting under the tree.
    <Slide className="pb-[21vh]!">
      <AmbientParticles />

      <motion.div
        variants={staggerIn(0.2, 0.16)}
        initial="hidden"
        animate="show"
        className="relative z-10 grid w-full max-w-[118rem] items-center gap-[4vh] md:grid-cols-[minmax(0,1fr)_auto] md:gap-[5vw]"
      >
        <div className="flex flex-col items-center gap-[1.8vh] text-center md:items-start md:text-left">
          <motion.div variants={fadeUp}>
            <Eyebrow>
              {event.name}
              {event.host && ` · Hosted by ${event.host}`}
            </Eyebrow>
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-display text-stage-hero font-bold tracking-tight text-cover-title">
            {book.title}
          </motion.h1>

          <motion.p variants={fadeUp} className="-mt-[1vh] font-display text-stage-heading italic text-clean-white">
            {book.subtitle}
          </motion.p>

          <motion.p variants={fadeUp} className="text-stage-lead text-clean-white-muted">
            A poetry collection by <span className="text-clean-white">{book.author}</span>
          </motion.p>

          <motion.p variants={fadeUp} className="max-w-[52rem] text-balance font-display text-stage-small italic text-clean-white-muted">
            &ldquo;{book.tagline}&rdquo;
          </motion.p>

          <motion.span
            variants={fadeUp}
            aria-hidden
            className="my-[0.5vh] h-px w-40 bg-linear-to-r from-transparent via-tree-red to-transparent md:from-tree-red md:via-tree-red/50"
          />

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-[1vh] md:items-start">
            <p className="text-stage-body font-medium text-clean-white">{event.venue}</p>
            <p className="text-stage-body text-clean-white-muted">
              {dateLabel} · {timeLabel}
            </p>
          </motion.div>
        </div>

        <motion.div variants={fadeIn} className="hidden md:block">
          <AnimatedBook eager className="w-[min(34vh,22vw)]" />
        </motion.div>
      </motion.div>

      <GuideQrCode className="absolute bottom-[4vh] right-[3vw] z-10 hidden xl:flex" />
    </Slide>
  );
}
