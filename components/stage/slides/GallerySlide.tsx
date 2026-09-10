"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoFallback } from "@/components/ui/PhotoFallback";
import { StageImage } from "@/components/ui/StageImage";
import type { GalleryImage } from "@/data/presentationData";
import { pad2 } from "@/lib/format";
import { useSlideKeys } from "../keys";
import { EASE_STAGE } from "../motion";
import { useSlideMemory } from "../slideMemory";

type GallerySlideProps = {
  images: GalleryImage[];
  intervalMs?: number;
};

/**
 * Auto-advancing photo carousel: the photo sits whole on the right (never cropped
 * or zoomed), with its caption in a column on the left.
 * ↑ / ↓ previous / next photo, P pauses or resumes.
 */
export function GallerySlide({ images, intervalMs = 6000 }: GallerySlideProps) {
  const [index, setIndex] = useSlideMemory("gallery-index", 0);
  const [isPlaying, setIsPlaying] = useSlideMemory("gallery-playing", true);
  const count = images.length;
  const active = index % count;
  const image = images[active];
  const upcoming = images[(active + 1) % count];

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count, setIndex]);
  const togglePlay = () => setIsPlaying((playing) => !playing);

  useEffect(() => {
    if (!isPlaying || count < 2) return;
    const timer = setTimeout(() => go(active + 1), intervalMs);
    return () => clearTimeout(timer);
  }, [isPlaying, active, count, intervalMs, go]);

  useSlideKeys({
    ArrowDown: () => go(active + 1),
    ArrowUp: () => go(active - 1),
    p: togglePlay,
    P: togglePlay,
  });

  return (
    <section className="relative h-full w-full overflow-hidden bg-indigo-base">
      <AnimatePresence initial={false}>
        <motion.div
          key={image.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Blurred copy fills the screen; the photo itself is shown whole and never enlarged. */}
          <div aria-hidden className="absolute inset-0 scale-110 blur-2xl brightness-[0.4]">
            <StageImage src={image.src} alt="" fill sizes="40vw" className="object-cover" fallback={null} />
          </div>
          <div className="absolute bottom-[12vh] left-[38vw] right-[4vw] top-[6vh]">
            <StageImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="60vw"
              quality={90}
              className="object-contain object-right drop-shadow-[0_30px_60px_var(--color-indigo-deep)]"
              fallback={<PhotoFallback src={image.src} />}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Warm the cache for the next photo so the crossfade never waits on the network. */}
      {count > 1 && (
        <div aria-hidden className="invisible absolute size-px overflow-hidden">
          <Image src={upcoming.src} alt="" fill sizes="60vw" quality={90} loading="eager" />
        </div>
      )}

      {/* Left-hand scrim keeps the caption column readable over the blurred backdrop. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[45vw] bg-linear-to-r from-indigo-base/85 via-indigo-base/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[14vh] bg-linear-to-t from-indigo-base/80 to-transparent" />

      <div className="absolute left-[5vw] top-[5vh]">
        <Eyebrow>Gallery</Eyebrow>
      </div>

      <div className="absolute bottom-[14vh] left-[5vw] flex w-[30vw] flex-col gap-[2.5vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: EASE_STAGE }}
          >
            <p className="font-mono text-stage-label tabular-nums text-tree-red-soft">
              {pad2(active + 1)} / {pad2(count)}
            </p>
            <p className="line-clamp-5 font-display text-[clamp(1.5rem,min(3vw,5.3vh),3.5rem)] leading-tight text-clean-white [text-shadow:0_2px_24px_var(--color-indigo-deep)]">
              {image.caption}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex w-fit items-center gap-1 rounded-full border border-indigo-line bg-indigo-raised/95 p-1 opacity-30 transition-opacity duration-500 hover:opacity-100 has-[:focus-visible]:opacity-100">
          <GalleryButton label="Previous photo (↑)" onClick={() => go(active - 1)}>
            <ChevronLeft />
          </GalleryButton>
          <GalleryButton label={isPlaying ? "Pause slideshow (P)" : "Play slideshow (P)"} onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </GalleryButton>
          <GalleryButton label="Next photo (↓)" onClick={() => go(active + 1)}>
            <ChevronRight />
          </GalleryButton>
        </div>
      </div>

      <div className="absolute inset-x-[5vw] bottom-[10vh] flex gap-2" aria-hidden>
        {images.map((img, i) => (
          <span key={img.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-clean-white/15">
            {i < active && <span className="block h-full w-full bg-tree-red/70" />}
            {i === active && (
              <motion.span
                key={`${img.id}-${isPlaying}`}
                className="block h-full bg-tree-red"
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "100%" : "0%" }}
                transition={{ duration: isPlaying ? intervalMs / 1000 : 0, ease: "linear" }}
              />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}

function GalleryButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        if (e.detail > 0) e.currentTarget.blur();
        onClick();
      }}
      aria-label={label}
      title={label}
      className="grid size-11 place-items-center rounded-full text-clean-white-muted transition-colors hover:bg-indigo-line hover:text-clean-white [&_svg]:size-5"
    >
      {children}
    </button>
  );
}
