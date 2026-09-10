"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoFallback } from "@/components/ui/PhotoFallback";
import { StageImage } from "@/components/ui/StageImage";
import { HONOURED_ROLES, SPEAKER_ROLE_LABEL, event, invitation, type Speaker } from "@/data/presentationData";
import { fadeUp, staggerIn } from "../motion";
import { Slide } from "../Slide";

type InvitationSlideProps = {
  speakers: Speaker[];
  /** Pre-formatted on the server so the text matches at hydration. */
  dateLabel: string;
  timeLabel: string;
};

/** Banner slide: the official invitation beside the date, venue and guests of honour. */
export function InvitationSlide({ speakers, dateLabel, timeLabel }: InvitationSlideProps) {
  const honoured = HONOURED_ROLES.flatMap((role) => speakers.filter((s) => s.role === role));

  return (
    <Slide>
      <motion.div
        variants={staggerIn(0.3, 0.12)}
        initial="hidden"
        animate="show"
        className="relative z-10 grid w-full max-w-[115rem] items-center gap-[4vh] md:grid-cols-[auto_1fr] md:gap-[5vw]"
      >
        <motion.div
          variants={fadeUp}
          className="relative mx-auto aspect-square h-[min(72vh,85vw)] overflow-hidden rounded-2xl border border-tree-red/40 shadow-[0_30px_80px_-20px_var(--color-indigo-deep)]"
        >
          <StageImage
            src={invitation.image}
            alt={invitation.alt}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            quality={90}
            className="object-cover"
            fallback={<PhotoFallback src={invitation.image} />}
          />
        </motion.div>

        <div className="flex flex-col items-center gap-[2.6vh] text-center md:items-start md:text-left">
          <motion.div variants={fadeUp}>
            <Eyebrow>The Invitation</Eyebrow>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-balance font-display text-stage-title font-semibold text-clean-white">
            Join us under the <span className="italic text-red-gradient">Tree of Shade</span>
          </motion.h2>

          <motion.ul variants={fadeUp} className="flex flex-col gap-[1.2vh] text-stage-body text-clean-white">
            <li className="flex items-center gap-[0.8vw]">
              <CalendarDays className="size-[1em] shrink-0 text-tree-red-soft" />
              {dateLabel} · {timeLabel}
            </li>
            <li className="flex items-center gap-[0.8vw]">
              <MapPin className="size-[1em] shrink-0 text-tree-red-soft" />
              {event.venue}
            </li>
          </motion.ul>

          <motion.ul variants={fadeUp} className="flex flex-col gap-[1.6vh] border-l-2 border-tree-red/60 pl-[1.5vw] text-left">
            {honoured.map((s) => (
              <li key={s.id}>
                <p className="text-stage-label uppercase tracking-[0.25em] text-tree-red-soft">{SPEAKER_ROLE_LABEL[s.role]}</p>
                <p className="font-display text-stage-lead text-clean-white">{s.name}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </Slide>
  );
}
