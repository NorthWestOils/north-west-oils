import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/section";

/**
 * The one way a content section opens: eyebrow → display-2 heading → intro.
 * `layout="split"` puts the intro in a right-hand column on large screens.
 * Sizes and spacing live here so every page stays on the same scale.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  tone = "dark",
  layout = "stacked",
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  /** id placed on the heading text, for aria-labelledby on the section. */
  id?: string;
  tone?: "dark" | "light";
  layout?: "stacked" | "split";
  className?: string;
}) {
  const light = tone === "light";

  const heading = (
    <>
      <Reveal kind="fade">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <MaskReveal
        as="h2"
        className={cn("display-2 mt-4", light ? "text-paper" : "text-ink")}
        delay={0.05}
      >
        <span id={id}>{title}</span>
      </MaskReveal>
    </>
  );

  const introText = intro ? (
    <div className={cn("section-intro max-w-xl", light && "text-forest-200")}>{intro}</div>
  ) : null;

  if (layout === "split") {
    return (
      <div className={cn("grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-12", className)}>
        <div className="lg:col-span-7">{heading}</div>
        {introText ? (
          <Reveal kind="rise" delay={0.1} className="lg:col-span-5 lg:pb-1.5">
            {introText}
          </Reveal>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("max-w-2xl", className)}>
      {heading}
      {introText ? (
        <Reveal kind="rise" delay={0.1} className="mt-5">
          {introText}
        </Reveal>
      ) : null}
    </div>
  );
}
