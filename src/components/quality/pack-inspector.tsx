"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface PackPoint {
  number: string;
  title: string;
  location: string;
  body: string;
  /** Badge position on the tin margin (% horizontally) */
  badgeX: number;
  /** Badge position on the tin margin (% vertically) */
  badgeY: number;
  /** Target dot on the actual marking (% horizontally) */
  targetX: number;
  /** Target dot on the actual marking (% vertically) */
  targetY: number;
}

const PACK_POINTS: PackPoint[] = [
  {
    number: "01",
    title: "Central FSSAI licence and logo",
    location: "Front and side panel of every tin and bottle",
    body: "The 14-digit licence number (10014011001948) is printed on every pack and can be verified publicly on the official FSSAI FoSCoS portal.",
    badgeX: 92,
    badgeY: 61,
    targetX: 74,
    targetY: 61,
  },
  {
    number: "02",
    title: "+F fortification logo",
    location: "Upper right of the label",
    body: "Confirms fortification with Vitamin A and Vitamin D. Look for the +F mark with the fortification declaration printed beneath.",
    badgeX: 8,
    badgeY: 48,
    targetX: 21,
    targetY: 48,
  },
  {
    number: "03",
    title: "Green vegetarian mark",
    location: "Next to the brand title",
    body: "A green circle inside a green square confirms 100% plant-origin oil, printed on every retail and commercial container.",
    badgeX: 92,
    badgeY: 17,
    targetX: 78,
    targetY: 17,
  },
  {
    number: "04",
    title: "ISO 9001 and ISO 22000 declaration",
    location: "Lower side panel",
    body: "Declared on the container artwork, with certificate documentation available on trade inquiry.",
    badgeX: 8,
    badgeY: 56.5,
    targetX: 24,
    targetY: 56.5,
  },
  {
    number: "05",
    title: "Batch lot code and shelf life",
    location: "Tin lid or bottle shoulder",
    body: "Each container links back to its lab clearance record and packing date. Best before 9 months from packaging, with retention samples archived for every lot.",
    badgeX: 8,
    badgeY: 82,
    targetX: 24,
    targetY: 82,
  },
  {
    number: "06",
    title: "Registered office and helpline",
    location: "Back specification panel",
    body: "The Village Fatehpur Beri, South Delhi address and phone +91 98105 48867 are printed on every tin and carton.",
    badgeX: 92,
    badgeY: 86,
    targetX: 70,
    targetY: 86,
  },
];

export function PackInspector() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute("data-index");
            if (indexStr !== null) {
              setActiveIndex(Number(indexStr));
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.2,
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Section tone="paper" className="border-b border-line" aria-labelledby="pack-heading">
      <Container>
        <SectionHeader
          id="pack-heading"
          layout="split"
          eyebrow="Read the Pack"
          title="Six things printed on every tin."
          intro="An authentic product needs no blind trust. Each of these markings can be checked on the pack itself."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Truly Sticky Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="flex flex-col items-center rounded-3xl border border-line bg-paper-2 p-6 sm:p-7">
              <div className="mb-4 flex w-full items-center justify-between">
                <span className="label text-forest-800">Food-Grade 15 KG Tin</span>
                <span className="caption text-ink-3">Statutory Pack Markings</span>
              </div>

              {/* Exact aspect ratio container so pins stay pinned precisely */}
              <div className="relative aspect-771/1150 w-full max-w-72 select-none sm:max-w-80">
                <Image
                  src="/products/soyabean-15kg-tin.webp"
                  alt="North West 15 KG edible oil tin showing its printed markings"
                  fill
                  sizes="(min-width: 1024px) 30vw, 80vw"
                  className="pointer-events-none object-contain"
                  priority
                />

                {/* SVG Pointer / Leader Lines */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {PACK_POINTS.map((pt, i) => {
                    const isActive = activeIndex === i;
                    return (
                      <line
                        key={`line-${pt.number}`}
                        x1={pt.badgeX}
                        y1={pt.badgeY}
                        x2={pt.targetX}
                        y2={pt.targetY}
                        stroke={isActive ? "#F4D600" : "rgba(3, 32, 20, 0.25)"}
                        strokeWidth={isActive ? "0.6" : "0.35"}
                        strokeDasharray={isActive ? "none" : "0.8, 0.8"}
                        className="transition-colors duration-300"
                      />
                    );
                  })}
                </svg>

                {/* Target Focal Dots (on the actual marking) */}
                {PACK_POINTS.map((pt, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <div
                      key={`target-${pt.number}`}
                      style={{ left: `${pt.targetX}%`, top: `${pt.targetY}%` }}
                      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      {isActive && (
                        <span className="absolute -inset-1.5 animate-ping rounded-full bg-gold-500/60 opacity-80" />
                      )}
                      <span
                        className={cn(
                          "relative block rounded-full transition-all duration-300",
                          isActive
                            ? "h-2.5 w-2.5 bg-gold-500 ring-2 ring-forest-950"
                            : "h-2 w-2 bg-forest-800/80 ring-1 ring-white"
                        )}
                      />
                    </div>
                  );
                })}

                {/* High-Contrast Number Badges on the Silver Tinplate Margin */}
                {PACK_POINTS.map((pt, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={`badge-${pt.number}`}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      onMouseEnter={() => setActiveIndex(i)}
                      onFocus={() => setActiveIndex(i)}
                      aria-label={`Marking ${pt.number}: ${pt.title}`}
                      aria-pressed={isActive}
                      style={{ left: `${pt.badgeX}%`, top: `${pt.badgeY}%` }}
                      className={cn(
                        "group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200",
                        isActive ? "z-30 scale-110" : "z-10 hover:scale-110"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-all sm:h-7 sm:w-7 sm:text-xs",
                          isActive
                            ? "border border-gold-600 bg-gold-500 text-forest-950 shadow-md ring-3 ring-gold-500/35"
                            : "border border-forest-700 bg-forest-950 text-paper shadow-sm hover:border-gold-500 hover:text-gold-400"
                        )}
                      >
                        {pt.number}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Clean Active Readout */}
              <div className="mt-4 w-full border-t border-line/60 pt-3 text-center">
                <p className="text-xs text-ink-2">
                  <span className="font-semibold text-forest-900">
                    {PACK_POINTS[activeIndex].title}
                  </span>
                  <span className="block text-[11px] text-ink-3 sm:inline sm:before:content-['·_']">
                    {PACK_POINTS[activeIndex].location}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* List of 6 items */}
          <RevealGroup as="ol" step={0.05} className="divide-y divide-line border-y border-line lg:col-span-7">
            {PACK_POINTS.map((pt, i) => {
              const isActive = activeIndex === i;
              return (
                <RevealItem as="li" key={pt.number}>
                  <div
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    data-index={i}
                    tabIndex={0}
                    role="button"
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    className={cn(
                      "flex cursor-pointer gap-6 rounded-2xl px-4 py-6 -mx-4 transition-all duration-200 sm:-mx-6 sm:px-6 sm:py-7",
                      isActive
                        ? "border-l-4 border-gold-500 bg-white shadow-sm"
                        : "hover:bg-white/60"
                    )}
                  >
                    <span
                      className={cn(
                        "tnum flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                        isActive
                          ? "border border-gold-600 bg-gold-500 text-forest-950"
                          : "border border-line bg-paper text-forest-800"
                      )}
                    >
                      {pt.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className={cn("card-title", isActive ? "font-semibold text-forest-900" : "text-ink")}>
                        {pt.title}
                      </h3>
                      <p className="label mt-1.5 text-forest-800">{pt.location}</p>
                      <p className="body-text mt-2.5 text-ink-2">{pt.body}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
