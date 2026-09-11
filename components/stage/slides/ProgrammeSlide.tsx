"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { agendaLead, event, type AgendaItem } from "@/data/presentationData";
import { activeAgendaIndex, clockLabel } from "@/lib/agenda";
import { useEventNow } from "@/lib/useEventNow";
import { fadeUp, staggerIn } from "../motion";
import { Slide } from "../Slide";

type ProgrammeSlideProps = {
  items: AgendaItem[];
  /** Pre-formatted on the server so the text matches at hydration. */
  dateLabel: string;
};

/** The running order in two columns; on the day, the current item is highlighted. */
export function ProgrammeSlide({ items, dateLabel }: ProgrammeSlideProps) {
  const active = activeAgendaIndex(items, useEventNow());
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <Slide>
      <motion.div
        variants={staggerIn(0.3, 0.06)}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-[120rem] flex-col gap-[3.5vh]"
      >
        <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-x-[3vw] gap-y-[1vh]">
          <div className="flex flex-col gap-[1vh]">
            <Eyebrow>Programme</Eyebrow>
            <h2 className="font-display text-stage-heading font-semibold text-clean-white">
              Order of the <span className="italic text-red-gradient">Day</span>
            </h2>
          </div>
          <p className="text-stage-body text-clean-white-muted">
            {dateLabel} · {event.venue}
          </p>
        </motion.div>

        <div className="grid gap-x-[4vw] md:grid-cols-2">
          {columns.map((column, c) => (
            <ol key={c} className="flex flex-col">
              {column.map((item, r) => {
                const isNow = c * half + r === active;
                return (
                  <motion.li
                    key={item.start}
                    variants={fadeUp}
                    aria-current={isNow ? "time" : undefined}
                    className={`grid grid-cols-[auto_1fr] items-baseline gap-x-[1.2vw] rounded-xl px-[0.8vw] py-[0.85vh] ${
                      isNow ? "bg-tree-red/20 ring-2 ring-tree-red" : "border-b border-indigo-line/70"
                    }`}
                  >
                    <span className="w-[4.2ch] font-mono text-stage-label tabular-nums text-tree-red-soft">
                      {clockLabel(item.start)}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-stage-body leading-tight text-clean-white">
                        {item.title}
                        {isNow && (
                          <span className="ml-3 rounded-full bg-tree-red px-2 py-0.5 align-middle font-sans text-stage-label font-semibold uppercase tracking-[0.15em] text-clean-white">
                            Now
                          </span>
                        )}
                      </p>
                      <p className="text-stage-label text-clean-white-muted">{agendaLead(item)}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          ))}
        </div>
      </motion.div>
    </Slide>
  );
}
