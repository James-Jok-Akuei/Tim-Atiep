import type { Variants } from "framer-motion";

export const EASE_STAGE = [0.22, 1, 0.36, 1] as const;

/** Parent variant: waits out the slide transition, then staggers children in. */
export const staggerIn = (delayChildren = 0.35, staggerChildren = 0.12): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_STAGE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.4, ease: EASE_STAGE } },
};
