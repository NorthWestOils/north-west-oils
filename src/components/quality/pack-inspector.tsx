"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";

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
    title: "Pure & Safe quality emblem",
    location: "Top-left label header",
    body: "Our signature Pure & Safe emblem printed prominently on the upper left, affirming 100% pure plant origin and hygienic processing.",
    badgeX: 12,
    badgeY: 26.5,
    targetX: 43.5,
    targetY: 26.5,
  },
  {
    number: "02",
    title: "Green vegetarian mark (100% Veg)",
    location: "Top-right label header",
    body: "The statutory green dot-in-square symbol with registered trademark filing, confirming 100% pure vegetarian plant-origin oil.",
    badgeX: 88,
    badgeY: 24.5,
    targetX: 56.5,
    targetY: 24.5,
  },
  {
    number: "03",
    title: "+F Fortification mark (Vitamins A & D)",
    location: "Middle-left panel above nutrition",
    body: "Carries the official +F fortification logo, confirming enrichment with essential Vitamins A and D3 as mandated by national health standards.",
    badgeX: 12,
    badgeY: 43.5,
    targetX: 43.0,
    targetY: 43.5,
  },
  {
    number: "04",
    title: "ISO 9001 & ISO 22000 declaration",
    location: "Lower-left certification section",
    body: "Explicit statutory declaration confirming production under dual ISO 9001 (Quality Management) and ISO 22000 (Food Safety) audited systems.",
    badgeX: 12,
    badgeY: 56.0,
    targetX: 44.0,
    targetY: 49.5,
  },
  {
    number: "05",
    title: "Central FSSAI licence and logo",
    location: "Middle-right verification panel",
    body: `The 14-digit licence number (${company.fssaiLicence}) with the FSSAI logo is printed on every pack and verifiable on the official FoSCoS portal.`,
    badgeX: 88,
    badgeY: 53.0,
    targetX: 57.0,
    targetY: 53.0,
  },
  {
    number: "06",
    title: "Registered office, helpline & 15 Kg net",
    location: "Bottom manufacturer panel",
    body: "The Village Fatehpur Beri, South Delhi address, customer care helpline (+91 98105 48867), and Make in India lion mark printed across the base.",
    badgeX: 88,
    badgeY: 67.0,
    targetX: 50.0,
    targetY: 67.0,
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
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="flex flex-col items-center rounded-3xl border border-line bg-paper-2 p-4 sm:p-6 lg:p-7">
              <div className="mb-4 flex w-full items-center justify-between">
                <span className="label text-forest-800">Food-Grade 15 KG Tin</span>
                <span className="caption text-ink-3">Statutory Pack Markings</span>
              </div>

              {/* Exact aspect ratio container matching 4:3 2896x2172 image */}
              <div className="relative aspect-4/3 w-full max-w-lg lg:max-w-xl select-none">
                <Image
                  src="/products/soyabean-15kg-tin.webp"
                  alt="North West 15 KG edible oil tin showing its printed markings"
                  fill
                  unoptimized
                  priority
                  loading="eager"
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="pointer-events-none object-contain"
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
          <RevealGroup as="ol" step={0.05} className="divide-y divide-line border-y border-line lg:col-span-6">
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
