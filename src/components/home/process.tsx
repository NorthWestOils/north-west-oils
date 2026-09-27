"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Stage {
  step: string;
  phase: string;
  title: string;
  summary: string;
  spec: string;
  highlight: string;
  src: string;
  alt: string;
}

/**
 * The five stages, worded only from the company profile and the pack labels.
 * `phase` is one short word: it sits in a narrow collapsed card and must not
 * truncate.
 */
const PROCESS_STAGES: Stage[] = [
  {
    step: "01",
    phase: "Sourcing",
    title: "Raw material selection",
    summary:
      "High-quality raw material for all three oils, including carefully selected mustard seed for the Kachi Ghani line.",
    spec: "Selected raw material",
    highlight: "Quality sourcing",
    src: "/process/01-soyabean.webp",
    alt: "Soybeans spilling from a steel scoop, the crop behind refined soyabean oil",
  },
  {
    step: "02",
    phase: "Extraction",
    title: "Cold-press & processing",
    summary:
      "Kachi Ghani mustard oil is cold-pressed to keep its strong aroma and pungency. Every grade is processed under strict quality control and hygienic conditions.",
    spec: "Cold-press extraction",
    highlight: "Pungency intact",
    src: "/process/02-pressing.webp",
    alt: "Golden oil running from a press spout",
  },
  {
    step: "03",
    phase: "Testing",
    title: "Lab testing",
    summary:
      "Tested in a national laboratory for purity and freshness, in line with FSSAI standards.",
    spec: "In line with FSSAI standards",
    highlight: "Purity checked",
    src: "/process/03-testing.webp",
    alt: "An oil sample being handled in laboratory glassware",
  },
  {
    step: "04",
    phase: "Packing",
    title: "Packing & storage",
    summary:
      "Filled into tins, jars and PET bottles with safe packaging and storage. Every pack carries the Pure & Safe seal.",
    spec: "Pure & Safe seal on every pack",
    highlight: "Safe packaging",
    src: "/process/04-packing.webp",
    alt: "A sealed North West Kachi Ghani mustard oil 15 kg tin",
  },
  {
    step: "05",
    phase: "Dispatch",
    title: "Supply across India",
    summary:
      "Retail packs, bulk tins and loose oil for distributors, wholesalers, retailers and institutional buyers across India.",
    spec: "Retail & bulk supply",
    highlight: "PAN India",
    src: "/images/mustard-retail-lineup.webp",
    alt: "The North West Kachi Ghani mustard oil range, packed and ready for dispatch",
  },
];

export interface ProcessProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  exploreHref?: string;
  exploreLabel?: string;
  showExploreLink?: boolean;
}

export function Process({
  id = "process",
  eyebrow = "Quality assurance",
  title = "Five stages between the seed and the seal.",
  lede = "From selected raw material to a sealed, labelled pack, with lab testing for purity and freshness in the middle, in line with FSSAI standards.",
  exploreHref = "/quality",
  exploreLabel = "Quality, certifications & testing sequence",
  showExploreLink = true,
}: ProcessProps = {}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduced = useReducedMotion();

  const activeStage = PROCESS_STAGES[activeIdx];

  return (
    <Section id={id} tone="forest" aria-labelledby={`${id}-heading`}>
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="lg:col-span-7">
            <Reveal kind="fade">
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </Reveal>
            <MaskReveal as="h2" className="display-2 mt-5 text-paper" delay={0.05}>
              <span id={`${id}-heading`}>
                {title}
              </span>
            </MaskReveal>
          </div>
          <Reveal kind="rise" delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-forest-200 lg:pb-2">
              {lede}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-b border-white/10 py-5 lg:mt-16">
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar sm:gap-4">
            {PROCESS_STAGES.map((s, idx) => {
              const isCurrent = idx === activeIdx;
              const isPast = idx < activeIdx;

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className="group relative flex flex-1 min-w-22 items-center gap-3 text-left transition-colors duration-200 focus:outline-none"
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border text-[0.8125rem] font-medium transition-all duration-300",
                      isCurrent
                        ? "border-gold-500 bg-gold-500 text-forest-950 font-semibold"
                        : isPast
                        ? "border-forest-400 bg-forest-900 text-forest-200"
                        : "border-white/15 bg-forest-950/60 text-forest-300 group-hover:border-white/30"
                    )}
                  >
                    {s.step}
                  </div>
                  <div className="hidden flex-col sm:flex">
                    <span
                      className={cn(
                        "text-[0.6875rem] tracking-wider uppercase transition-colors duration-200",
                        isCurrent
                          ? "text-gold-500 font-medium"
                          : "text-forest-400 group-hover:text-forest-200"
                      )}
                    >
                      {s.phase}
                    </span>
                    <span
                      className={cn(
                        "hidden text-[0.8125rem] truncate transition-colors duration-200 xl:block",
                        isCurrent ? "text-paper font-medium" : "text-forest-300"
                      )}
                    >
                      {s.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Five-card accordion only from xl: below 1280px the collapsed cards are
            too narrow for their labels, so the single-card layout takes over. */}
        <div className="mt-8 hidden xl:flex h-128 gap-3">
          {PROCESS_STAGES.map((stage, idx) => {
            const isExpanded = idx === activeIdx;

            return (
              <div
                key={stage.step}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={cn(
                  "relative flex cursor-pointer overflow-hidden rounded-xl border select-none",
                  reduced ? "transition-none" : "transition-all duration-500 ease-out-expo",
                  isExpanded
                    ? "flex-[3.5] border-gold-500/50 bg-forest-900 shadow-xl"
                    : "flex-1 border-white/10 bg-forest-950/80 hover:border-white/25"
                )}
              >
                <Image
                  src={stage.src}
                  alt={stage.alt}
                  fill
                  sizes="(max-width: 1280px) 50vw, 40vw"
                  className={cn(
                    "object-cover transition-all duration-700 ease-out-expo pointer-events-none",
                    isExpanded ? "scale-100 opacity-75" : "scale-105 opacity-30 hover:opacity-45"
                  )}
                />

                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 bg-linear-to-t transition-opacity duration-500 pointer-events-none",
                    isExpanded
                      ? "from-forest-950 via-forest-950/65 to-transparent"
                      : "from-forest-950/95 via-forest-950/80 to-forest-950/50"
                  )}
                />

                {/* Collapsed top: Step number circle */}
                <div
                  className={cn(
                    "absolute top-5 left-5 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-forest-950/80 text-[0.875rem] font-semibold text-gold-500 backdrop-blur-sm transition-all",
                    isExpanded
                      ? "opacity-0 scale-75 pointer-events-none duration-150 ease-out"
                      : "opacity-100 scale-100 delay-150 duration-200 ease-out"
                  )}
                >
                  {stage.step}
                </div>

                {/* Collapsed bottom: Phase and Title */}
                <div
                  className={cn(
                    "absolute bottom-5 inset-x-5 z-10 flex flex-col transition-all",
                    isExpanded
                      ? "opacity-0 translate-y-2 pointer-events-none duration-150 ease-out"
                      : "opacity-100 translate-y-0 delay-150 duration-200 ease-out"
                  )}
                >
                  <span className="text-[0.6875rem] font-medium tracking-wider uppercase text-forest-300 truncate">
                    {stage.phase}
                  </span>
                  <span className="mt-1 font-display text-[0.9375rem] font-medium leading-snug text-paper line-clamp-2">
                    {stage.title}
                  </span>
                </div>

                {/* Expanded top: Stage badge and Highlight pill */}
                <div
                  className={cn(
                    "absolute top-6 left-6 z-10 flex items-center justify-between gap-3 w-96 xl:w-md transition-all",
                    !isExpanded
                      ? "opacity-0 -translate-y-1 pointer-events-none duration-150 ease-out"
                      : "opacity-100 translate-y-0 delay-150 duration-200 ease-out"
                  )}
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-forest-950/80 px-3 py-1 text-[0.75rem] font-medium text-gold-500 backdrop-blur-md shrink-0">
                    <span className="size-1.5 rounded-full bg-gold-500" />
                    STAGE {stage.step} · {stage.phase}
                  </div>
                  <span className="rounded-full border border-white/10 bg-forest-950/60 px-3 py-1 text-[0.6875rem] font-medium tracking-wider text-forest-200 uppercase backdrop-blur-md shrink-0">
                    {stage.highlight}
                  </span>
                </div>

                {/* Expanded bottom: Title, Summary, and Quality Spec */}
                <div
                  className={cn(
                    "absolute bottom-6 left-6 z-10 flex flex-col w-96 xl:w-md transition-all",
                    !isExpanded
                      ? "opacity-0 translate-y-2 pointer-events-none duration-150 ease-out"
                      : "opacity-100 translate-y-0 delay-150 duration-200 ease-out"
                  )}
                >
                  <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-paper">
                    {stage.title}
                  </h3>

                  <p className="mt-2.5 text-[0.9375rem] xl:text-base leading-relaxed text-forest-100">
                    {stage.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3 pt-4 border-t border-white/15">
                    <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-gold-500">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d="M3 8.5L6.5 12L13 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {stage.spec}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 xl:hidden">
          <div className="relative overflow-hidden rounded-xl border border-gold-500/40 bg-forest-900 lg:grid lg:grid-cols-2">
            <div className="relative h-64 w-full overflow-hidden lg:h-full lg:min-h-96">
              <Image
                src={activeStage.src}
                alt={activeStage.alt}
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-forest-950 via-forest-950/40 to-transparent"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-forest-950/90 px-3 py-1 text-[0.75rem] font-medium text-gold-500">
                STAGE {activeStage.step}
              </div>
            </div>

            <div className="p-6">
              <span className="text-[0.75rem] tracking-wider uppercase text-forest-300">
                {activeStage.phase}
              </span>
              <h3 className="mt-1 font-display text-2xl font-medium text-paper">
                {activeStage.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-forest-100">
                {activeStage.summary}
              </p>

              <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[0.8125rem] text-gold-500">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8.5L6.5 12L13 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {activeStage.spec}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <button
                  type="button"
                  disabled={activeIdx === 0}
                  onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                  className="-my-2 py-2 text-[0.8125rem] font-medium text-forest-200 disabled:opacity-30 disabled:pointer-events-none"
                >
                  ← Previous stage
                </button>
                <span className="text-[0.75rem] text-forest-400">
                  {activeIdx + 1} of {PROCESS_STAGES.length}
                </span>
                <button
                  type="button"
                  disabled={activeIdx === PROCESS_STAGES.length - 1}
                  onClick={() => setActiveIdx((prev) => Math.min(PROCESS_STAGES.length - 1, prev + 1))}
                  className="-my-2 py-2 text-[0.8125rem] font-medium text-gold-500 disabled:opacity-30 disabled:pointer-events-none"
                >
                  Next stage →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[0.75rem] leading-relaxed text-forest-300">
            Stages one to three use reference photography; stages four and five
            show North West packs. The company is certified to ISO 9001:2015 and
            ISO 22000:2018.
          </p>
          {showExploreLink && (
            <TextLink href={exploreHref} className="shrink-0 text-forest-100">
              {exploreLabel}
            </TextLink>
          )}
        </div>
      </Container>
    </Section>
  );
}
