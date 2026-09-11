"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ArrowUpRight,
  Maximize,
  Minimize,
  QrCode,
  Smartphone,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { pad2 as pad } from "@/lib/format";
import { ShadeTree } from "@/components/ui/ShadeTree";
import { BuilderCredit } from "./BuilderCredit";
import { shouldIgnoreKey } from "./keys";
import { EASE_STAGE } from "./motion";
import { PurchaseQrModal } from "./PurchaseQrModal";

export interface StageSlide {
  id: string;
  /** Shown in the slide picker. */
  title: string;
  content: ReactNode;
  /** Slide has open space at the bottom, so the reader under the tree shows at full strength. */
  showcaseReader?: boolean;
}

type PresentationContainerProps = {
  slides: StageSlide[];
  /** Looping background track, toggled with M. Muted until first toggle. */
  ambientSrc?: string;
};

const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? "6%" : "-6%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? "-6%" : "6%", opacity: 0 }),
};

const fadeVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export function PresentationContainer({
  slides,
  ambientSrc = "/audio/ambient.mp3",
}: PresentationContainerProps) {
  // Index and direction move together so exit/enter animate the same way.
  const [[index, direction], setPosition] = useState<[number, number]>([0, 0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();

  const lastIndex = slides.length - 1;

  const goTo = useCallback(
    (target: number) => {
      const next = Math.min(Math.max(target, 0), lastIndex);
      setPosition(([current, dir]) =>
        next === current ? [current, dir] : [next, next > current ? 1 : -1],
      );
    },
    [lastIndex],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.35;
      audio
        .play()
        .then(() => setIsMuted(false))
        .catch(() => setIsMuted(true));
    } else {
      audio.pause();
      setIsMuted(true);
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (shouldIgnoreKey(e)) return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          prev();
          break;
        case "Home":
          goTo(0);
          break;
        case "End":
          goTo(lastIndex);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "m":
        case "M":
          toggleSound();
          break;
        case "Escape":
          setIsPickerOpen(false);
          setIsQrOpen(false);
          return;
        default:
          return;
      }
      // Stops Space from also "clicking" a focused control or scrolling.
      e.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev, goTo, lastIndex, toggleFullscreen, toggleSound]);

  const current = slides[index];
  const barIsPinned = isPickerOpen || isQrOpen;

  return (
    <div data-stage-root className="bg-cover-texture fixed inset-0 overflow-hidden">
      <audio ref={audioRef} src={ambientSrc} loop preload="none" />

      {/* Stays put while slides change, like the tree on the cover. */}
      <ShadeTree className="absolute inset-x-[4vw] bottom-0 top-[6vh]" showcaseReader={current.showcaseReader ?? false} />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          variants={reduceMotion ? fadeVariants : slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: EASE_STAGE }}
          className="absolute inset-0 will-change-transform"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}: ${current.title}`}
        >
          {current.content}
        </motion.div>
      </AnimatePresence>

      <BuilderCredit />

      {/* Slide picker */}
      <AnimatePresence>
        {isPickerOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsPickerOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: EASE_STAGE }}
              className="fixed inset-x-4 bottom-24 z-40 mx-auto max-w-5xl rounded-2xl border border-indigo-line bg-indigo-raised/95 p-4 shadow-2xl"
            >
              <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {slides.map((slide, i) => (
                  <li key={slide.id}>
                    <button
                      type="button"
                      onClick={() => {
                        goTo(i);
                        setIsPickerOpen(false);
                      }}
                      aria-current={i === index ? "true" : undefined}
                      className={`flex aspect-video w-full flex-col justify-between rounded-xl border p-3 text-left transition-colors ${
                        i === index
                          ? "border-tree-red bg-tree-red/10"
                          : "border-indigo-line bg-indigo-base hover:border-tree-red/50"
                      }`}
                    >
                      <span className="font-mono text-sm tabular-nums text-tree-red-soft">{pad(i + 1)}</span>
                      <span className="font-display text-lg leading-tight text-clean-white">
                        {slide.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex justify-end border-t border-indigo-line pt-3">
                <Link
                  href="/mobile"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-clean-white-muted transition-colors hover:bg-indigo-line hover:text-clean-white"
                >
                  <Smartphone className="size-4" />
                  Attendee view
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Control bar */}
      <nav
        aria-label="Presentation controls"
        className={`fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-indigo-line bg-indigo-raised/95 px-2 py-1.5 shadow-xl transition-opacity duration-500 hover:opacity-100 has-[:focus-visible]:opacity-100 ${
          barIsPinned ? "opacity-100" : "opacity-15"
        }`}
      >
        <ControlButton label="Previous slide (←)" onClick={prev} disabled={index === 0}>
          <ChevronLeft />
        </ControlButton>

        <span
          aria-live="polite"
          className="min-w-[5.5rem] px-2 text-center font-mono text-sm tabular-nums text-clean-white-muted"
        >
          <span className="text-clean-white">{pad(index + 1)}</span> / {pad(slides.length)}
        </span>

        <ControlButton label="Next slide (→)" onClick={next} disabled={index === lastIndex}>
          <ChevronRight />
        </ControlButton>

        <Divider />

        <ControlButton
          label="Slide picker"
          onClick={() => setIsPickerOpen((open) => !open)}
          active={isPickerOpen}
        >
          <LayoutGrid />
        </ControlButton>
        <ControlButton label="Order QR code" onClick={() => setIsQrOpen(true)} active={isQrOpen}>
          <QrCode />
        </ControlButton>
        <ControlButton label={isMuted ? "Play ambient sound (M)" : "Mute (M)"} onClick={toggleSound}>
          {isMuted ? <VolumeX /> : <Volume2 />}
        </ControlButton>
        <ControlButton
          label={isFullscreen ? "Exit full screen (F)" : "Full screen (F)"}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize /> : <Maximize />}
        </ControlButton>
      </nav>

      <PurchaseQrModal open={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
}

type ControlButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  active?: boolean;
};

function ControlButton({ label, onClick, children, disabled, active }: ControlButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        // Drop focus after mouse clicks so the bar fades back; keyboard
        // activation (detail === 0) keeps focus for tabbing.
        if (e.detail > 0) e.currentTarget.blur();
        onClick();
      }}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`grid size-10 place-items-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-30 [&_svg]:size-5 ${
        active ? "bg-tree-red/15 text-tree-red-soft" : "text-clean-white-muted hover:bg-indigo-line hover:text-clean-white"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span aria-hidden className="mx-1 h-6 w-px bg-indigo-line" />;
}
