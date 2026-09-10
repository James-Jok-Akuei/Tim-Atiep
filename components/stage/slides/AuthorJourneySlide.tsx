"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MILESTONE_ICONS } from "@/components/ui/milestoneIcons";
import type { Milestone } from "@/data/presentationData";
import { EASE_STAGE, fadeUp, staggerIn } from "../motion";
import { Slide } from "../Slide";

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.8, ease: EASE_STAGE } },
};

type AuthorJourneySlideProps = {
  milestones: Milestone[];
};

/** "Becoming" timeline: a line draws across, each milestone lighting up in turn. */
export function AuthorJourneySlide({ milestones }: AuthorJourneySlideProps) {
  const lastIndex = milestones.length - 1;
  // More than five stops: tighten type so every column still fits the stage.
  const dense = milestones.length > 5;

  return (
    <Slide>
      <motion.div
        variants={staggerIn(0.3, 0.2)}
        initial="hidden"
        animate="show"
        className={`relative z-10 flex w-full max-w-[120rem] flex-col ${dense ? "gap-[5vh]" : "gap-[7vh]"}`}
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-[1.5vh]">
          <Eyebrow>The Journey of Becoming</Eyebrow>
          <h2 className="text-balance font-display text-stage-title font-semibold text-clean-white">
            From the shade of a tree <span className="italic text-red-gradient">to the page</span>
          </h2>
        </motion.div>

        <ol
          className={`relative grid gap-[4vh] md:grid-cols-(--cols) ${dense ? "md:gap-[1.4vw]" : "md:gap-[2vw]"}`}
          style={
            {
              "--node": dense ? "clamp(3rem, 4vw, 5rem)" : "clamp(3.5rem, 5vw, 6rem)",
              "--cols": `repeat(${milestones.length}, minmax(0, 1fr))`,
            } as CSSProperties
          }
        >
          <motion.span
            aria-hidden
            variants={drawLine}
            style={{ left: `${50 / milestones.length}%`, right: `${50 / milestones.length}%` }}
            className="absolute top-[calc(var(--node)/2)] hidden h-px md:block origin-left bg-linear-to-r from-tree-red/20 via-tree-red/70 to-tree-red"
          />

          {milestones.map((m, i) => {
            const Icon = MILESTONE_ICONS[m.icon];
            const isNow = i === lastIndex;
            return (
              <motion.li key={m.id} variants={fadeUp} className="relative flex items-start gap-[4vw] md:flex-col md:items-center md:gap-[2.5vh] md:text-center">
                <span
                  className={`relative z-10 grid size-(--node) shrink-0 place-items-center rounded-full border ${
                    isNow ? "border-tree-red bg-tree-red text-clean-white" : "border-tree-red/50 bg-indigo-raised text-tree-red-soft"
                  }`}
                  style={isNow ? { boxShadow: "0 0 48px color-mix(in oklab, var(--color-tree-red) 55%, transparent)" } : undefined}
                >
                  <Icon className="size-[45%]" strokeWidth={1.5} />
                </span>
                <div className="flex flex-col gap-[1vh]">
                  <p className={`text-stage-label uppercase text-clean-white-faint ${dense ? "tracking-[0.12em]" : "tracking-[0.2em]"}`}>
                    {m.period ? `${m.period} · ` : ""}
                    {m.place}
                  </p>
                  <h3 className={`font-display font-semibold leading-tight ${dense ? "text-stage-body" : "text-stage-lead"} ${isNow ? "text-tree-red-soft" : "text-clean-white"}`}>
                    {m.title}
                  </h3>
                  <p className={`text-clean-white-muted ${dense ? "text-stage-label leading-snug" : "text-stage-small"}`}>{m.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </motion.div>
    </Slide>
  );
}
