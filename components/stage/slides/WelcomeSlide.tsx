"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { book, event } from "@/data/presentationData";
import { AmbientParticles } from "../AmbientParticles";
import { GuideQrCode } from "../GuideQrCode";
import { fadeUp, staggerIn } from "../motion";
import { Slide } from "../Slide";

type WelcomeSlideProps = {
  /** Pre-formatted on the server so the text matches at hydration. */
  dateLabel: string;
  timeLabel: string;
};

export function WelcomeSlide({ dateLabel, timeLabel }: WelcomeSlideProps) {
  return (
    // Extra bottom room keeps the text clear of the reader sitting under the tree.
    <Slide className="pb-[21vh]!">
      <AmbientParticles />

      <motion.div
        variants={staggerIn(0.2, 0.18)}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-[1.8vh] text-center"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>
            {event.name}
            {event.host && ` · Hosted by ${event.host}`}
          </Eyebrow>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-stage-hero font-bold tracking-tight text-cover-title"
        >
          {book.title}
        </motion.h1>

        <motion.p variants={fadeUp} className="-mt-[1vh] font-display text-stage-heading italic text-clean-white">
          {book.subtitle}
        </motion.p>

        <motion.p variants={fadeUp} className="text-stage-lead text-clean-white-muted">
          A poetry collection by <span className="text-clean-white">{book.author}</span>
        </motion.p>

        <motion.p variants={fadeUp} className="max-w-[60rem] text-balance font-display text-stage-small italic text-clean-white-muted">
          &ldquo;{book.tagline}&rdquo;
        </motion.p>

        <motion.span
          variants={fadeUp}
          aria-hidden
          className="my-[0.5vh] h-px w-40 bg-linear-to-r from-transparent via-tree-red to-transparent"
        />

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-[1vh]">
          <p className="text-stage-body font-medium text-clean-white">{event.venue}</p>
          <p className="text-stage-body text-clean-white-muted">
            {dateLabel} · {timeLabel}
          </p>
        </motion.div>
      </motion.div>

      <GuideQrCode className="absolute bottom-[4vh] right-[3vw] z-10 hidden xl:flex" />
    </Slide>
  );
}
