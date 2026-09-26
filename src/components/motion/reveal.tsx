"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { stagger, variants, viewportOnce } from "@/lib/motion";

type Kind = keyof typeof variants;

/**
 * React's drag and animation handlers collide with Motion's, so they are
 * dropped from the pass-through props rather than cast away.
 */
type PassThrough = Omit<
  ComponentPropsWithoutRef<"div">,
  | "children"
  | "style"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

/** Merge a delay into a variant without losing its own transition. */
function withDelay(v: Variants, delay: number): Variants {
  if (!delay) return v;
  const show = v.show as Record<string, unknown>;
  return {
    ...v,
    show: {
      ...show,
      transition: { ...(show.transition as object), delay },
    },
  };
}

/**
 * The one reveal wrapper used across the site. It picks a named variant from
 * the shared vocabulary, so the page gets a family of related transitions
 * rather than the same fade repeated forty times.
 *
 * When the visitor prefers reduced motion nothing animates — the content is
 * simply there, which is the point.
 */
export function Reveal({
  as = "div",
  kind = "rise",
  delay = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  kind?: Kind;
  delay?: number;
  className?: string;
  children: ReactNode;
} & PassThrough) {
  const reduced = useReducedMotion();
  const Comp = motion[as as "div"];

  if (reduced) {
    const Plain = as as ElementType;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={className}
      data-reveal=""
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={withDelay(variants[kind], delay)}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/**
 * A parent that walks its children in one after another. Children should be
 * `RevealItem`s, or any element carrying the matching variant names.
 */
export function RevealGroup({
  as = "div",
  step = 0.07,
  delay = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  step?: number;
  delay?: number;
  className?: string;
  children: ReactNode;
} & PassThrough) {
  const reduced = useReducedMotion();
  const Comp = motion[as as "div"];

  if (reduced) {
    const Plain = as as ElementType;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={className}
      data-reveal=""
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(step, delay)}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  as = "div",
  kind = "rise",
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  kind?: Kind;
  className?: string;
  children: ReactNode;
} & PassThrough) {
  const reduced = useReducedMotion();
  const Comp = motion[as as "div"];

  if (reduced) {
    const Plain = as as ElementType;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp className={className} data-reveal="" variants={variants[kind]} {...rest}>
      {children}
    </Comp>
  );
}

/**
 * Headline reveal: the line rises out from behind a clip edge instead of
 * fading in place. Used on the first heading of a section, not on every line.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
  as = "span",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const Comp = as as ElementType;

  if (reduced) return <Comp className={className}>{children}</Comp>;

  /* The clip box is grown by a fraction of an em and pulled back with a
     matching negative margin, so tight display line-heights do not lose the
     dot on a "j" or the tail of a "g" to overflow: hidden. */
  return (
    <Comp
      className={className}
      style={{
        display: "block",
        overflow: "hidden",
        paddingBlock: "0.16em",
        marginBlock: "-0.16em",
      }}
    >
      <motion.span
        data-reveal=""
        style={{ display: "block", willChange: "transform" }}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={withDelay(variants.unmask, delay)}
      >
        {children}
      </motion.span>
    </Comp>
  );
}
