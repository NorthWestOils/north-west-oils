import type { Transition, Variants } from "motion/react";

/**
 * One motion vocabulary for the whole site.
 *
 * Two easing curves, three durations, two springs. Everything that moves picks
 * from this list — if a value is not here, it should not be used inline.
 */

export const ease = {
  /** Default. Decisive start, long settle. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Softer, for larger objects travelling further. */
  soft: [0.16, 1, 0.3, 1] as const,
};

export const duration = {
  sm: 0.32,
  md: 0.55,
  lg: 0.8,
};

export const spring = {
  /** Product movement and layout changes: settles without a visible bounce. */
  soft: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 } as const,
  /** Indicators and small UI: quick, close to critically damped. */
  snappy: { type: "spring", stiffness: 420, damping: 36, mass: 0.6 } as const,
};

const base: Transition = { duration: duration.md, ease: ease.out };
const slow: Transition = { duration: duration.lg, ease: ease.soft };

/** Distance a revealing element travels. Deliberately short. */
const REVEAL_Y = 18;

export const variants = {
  /** The default section reveal. */
  rise: {
    hidden: { opacity: 0, y: REVEAL_Y },
    show: { opacity: 1, y: 0, transition: base },
  } satisfies Variants,

  /** For text and kickers that should appear without travelling. */
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: base },
  } satisfies Variants,

  /** Headings: the line is wiped in from under a clip edge. */
  unmask: {
    hidden: { opacity: 0, y: "38%" },
    show: { opacity: 1, y: "0%", transition: slow },
  } satisfies Variants,

  /** Photography: settles in with a touch of scale, never a zoom. */
  image: {
    hidden: { opacity: 0, scale: 1.03, y: 14 },
    show: { opacity: 1, scale: 1, y: 0, transition: slow },
  } satisfies Variants,

  /** Packshots: come to rest rather than slide. */
  pack: {
    hidden: { opacity: 0, y: 26, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: spring.soft },
  } satisfies Variants,
};

/** Parent that walks its children in. */
export const stagger = (step = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: step, delayChildren: delay },
  },
});

/** Shared viewport config so every reveal triggers at the same point. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
