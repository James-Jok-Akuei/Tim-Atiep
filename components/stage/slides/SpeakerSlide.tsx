"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { StageImage } from "@/components/ui/StageImage";
import { SPEAKER_ROLE_LABEL, type Speaker } from "@/data/presentationData";
import { useSlideKeys } from "../keys";
import { fadeUp, staggerIn } from "../motion";
import { Slide } from "../Slide";
import { useSlideMemory } from "../slideMemory";

/** Number key for tab i: 1–9, then 0 for the tenth. */
const keyFor = (i: number) => (i === 9 ? "0" : String(i + 1));

type SpeakerSlideProps = {
  speakers: Speaker[];
};

/**
 * Spotlight for whoever is at the podium.
 * ↑ / ↓ step through speakers, 1–9 and 0 jump straight to one, or click a tab.
 */
export function SpeakerSlide({ speakers }: SpeakerSlideProps) {
  const [index, setIndex] = useSlideMemory("speaker-index", 0);
  const count = speakers.length;
  const active = Math.min(index, count - 1);
  const speaker = speakers[active];

  const select = (i: number) => setIndex(((i % count) + count) % count);

  useSlideKeys({
    ArrowDown: () => select(active + 1),
    ArrowUp: () => select(active - 1),
    ...Object.fromEntries(speakers.slice(0, 10).map((_, i) => [keyFor(i), () => select(i)])),
  });

  return (
    <Slide>
      {count > 1 && (
        <nav
          aria-label="Speakers"
          className="relative z-20 mb-[3vh] flex w-full justify-center opacity-30 md:absolute md:inset-x-0 md:top-[3vh] md:mb-0 md:px-[4vw] transition-opacity duration-500 hover:opacity-100 has-[:focus-visible]:opacity-100"
        >
          <ol className="flex flex-wrap justify-center gap-2">
            {speakers.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={(e) => {
                    if (e.detail > 0) e.currentTarget.blur();
                    select(i);
                  }}
                  aria-current={i === active ? "true" : undefined}
                  title={i < 10 ? `${s.name} — press ${keyFor(i)}` : s.name}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    i === active
                      ? "border-tree-red bg-tree-red/15 text-tree-red-soft"
                      : "border-indigo-line text-clean-white-muted hover:border-tree-red/50 hover:text-clean-white"
                  }`}
                >
                  <span className="mr-2 font-mono tabular-nums opacity-60">{i + 1}</span>
                  {s.name}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={speaker.id}
          variants={staggerIn(0.3, 0.1)}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className="relative z-10 grid w-full max-w-[110rem] items-center gap-[4vh] md:grid-cols-[auto_1fr] md:gap-[5vw]"
        >
          <motion.div variants={fadeUp} className="relative mx-auto aspect-[4/5] h-[min(62vh,75vw)]">
            <div aria-hidden className="absolute -inset-[4%] rounded-[2.5rem] bg-tree-red/15 blur-3xl" />
            <div className="relative size-full overflow-hidden rounded-[2rem] border border-tree-red/30 bg-indigo-raised">
              <StageImage
                src={speaker.avatar}
                alt={`Portrait of ${speaker.name}`}
                fill
                sizes="(min-width: 768px) 40vw, 80vw"
                quality={90}
                className="object-cover"
                style={{ objectPosition: speaker.avatarPosition }}
                fallback={<Monogram name={speaker.name} />}
              />
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-[2.5vh] text-center md:items-start md:text-left">
            <motion.div variants={fadeUp}>
              <Eyebrow>{SPEAKER_ROLE_LABEL[speaker.role]}</Eyebrow>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-display text-stage-title font-bold text-clean-white">
              {speaker.name}
            </motion.h2>

            {(speaker.title || speaker.affiliation) && (
              <motion.div variants={fadeUp}>
                {speaker.title && <p className="text-stage-lead text-clean-white-muted">{speaker.title}</p>}
                {speaker.affiliation && <p className="text-stage-body text-clean-white-faint">{speaker.affiliation}</p>}
              </motion.div>
            )}

            {speaker.bio && (
              <motion.p variants={fadeUp} className="max-w-5xl text-stage-body text-clean-white">
                {speaker.bio}
              </motion.p>
            )}

            {speaker.speechTopic && (
              <motion.div variants={fadeUp} className="flex flex-col gap-1">
                <p className="text-stage-label uppercase tracking-[0.25em] text-clean-white-faint">Speaking on</p>
                <p className="font-display text-stage-heading italic text-tree-red-soft">{speaker.speechTopic}</p>
              </motion.div>
            )}

            {speaker.tribute && (
              <motion.blockquote
                variants={fadeUp}
                className="max-w-4xl border-l-2 border-tree-red/60 pl-[1.5vw] text-left text-stage-body text-clean-white"
              >
                <span className="mb-1 block text-stage-label uppercase tracking-[0.25em] text-tree-red-soft">
                  A Tree of Shade
                </span>
                {speaker.tribute}
              </motion.blockquote>
            )}

            {speaker.isPlaceholder && (
              <motion.div variants={fadeUp}>
                <PlaceholderBadge />
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </Slide>
  );
}
