"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";

interface Region {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface PackPoint {
  number: string;
  title: string;
  location: string;
  body: string;
  side: "left" | "right";
  regions: Region[];
}

const BADGE_X = { left: 20.5, right: 79.5 } as const;

const PACK_POINTS: PackPoint[] = [
  {
    number: "01",
    title: "Pure & Safe quality emblem",
    location: "Top-left label header",
    body: "Our signature Pure & Safe emblem printed prominently on the upper left, affirming 100% pure plant origin and hygienic processing.",
    side: "left",
    regions: [{ x: 36.0, y: 17.8, w: 5.3, h: 7.2 }],
  },
  {
    number: "02",
    title: "Green vegetarian mark (100% Veg)",
    location: "Top-right label header",
    body: "The statutory green dot-in-square symbol with registered trademark filing, confirming 100% pure vegetarian plant-origin oil.",
    side: "right",
    regions: [{ x: 61.1, y: 15.7, w: 3.9, h: 4.8 }],
  },
  {
    number: "03",
    title: "+F Fortification mark (Vitamins A & D)",
    location: "Middle-left panel above nutrition",
    body: "Carries the official +F fortification logo, confirming enrichment with essential Vitamins A and D3 as mandated by national health standards.",
    side: "left",
    regions: [{ x: 34.9, y: 46.1, w: 3.3, h: 5.0 }],
  },
  {
    number: "04",
    title: "ISO 9001 & ISO 22000 declaration",
    location: "Lower-left certification section",
    body: "Explicit statutory declaration confirming production under dual ISO 9001 (Quality Management) and ISO 22000 (Food Safety) audited systems.",
    side: "left",
    regions: [{ x: 34.9, y: 56.7, w: 13.9, h: 3.0 }],
  },
  {
    number: "05",
    title: "Central FSSAI licence and logo",
    location: "Middle-right verification panel",
    body: `The 14-digit licence number (${company.fssaiLicence}) with the FSSAI logo is printed on every pack and verifiable on the official FoSCoS portal.`,
    side: "right",
    regions: [{ x: 60.0, y: 60.3, w: 5.7, h: 5.3 }],
  },
  {
    number: "06",
    title: "Registered office, helpline & 15 Kg net",
    location: "Bottom manufacturer panel",
    body: "The Village Fatehpur Beri, South Delhi address, customer care helpline (+91 98105 48867), and Make in India lion mark printed across the base.",
    side: "right",
    regions: [
      { x: 48.7, y: 81.7, w: 17.0, h: 5.6 },
      { x: 34.6, y: 83.8, w: 12.2, h: 3.5 },
    ],
  },
];

function anchorOf(pt: PackPoint) {
  const r = pt.regions[0];
  return {
    x: pt.side === "left" ? r.x : r.x + r.w,
    y: r.y + r.h / 2,
  };
}

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
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="flex flex-col items-center rounded-3xl border border-line bg-paper-2 p-4 sm:p-6 lg:p-7">
              <div className="mb-4 flex w-full items-center justify-between">
                <span className="label text-forest-800">Food-Grade 15 KG Tin</span>
                <span className="caption text-ink-3">Statutory Pack Markings</span>
              </div>

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

                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {PACK_POINTS.map((pt, i) => {
                    const isActive = activeIndex === i;
                    const anchor = anchorOf(pt);
                    return (
                      <line
                        key={`line-${pt.number}`}
                        x1={BADGE_X[pt.side]}
                        y1={anchor.y}
                        x2={anchor.x}
                        y2={anchor.y}
                        vectorEffect="non-scaling-stroke"
                        stroke={isActive ? "#F4D600" : "rgba(3, 32, 20, 0.35)"}
                        strokeWidth={isActive ? 2 : 1}
                        strokeDasharray={isActive ? undefined : "3 3"}
                        className="transition-[stroke] duration-300"
                      />
                    );
                  })}
                </svg>

                {PACK_POINTS.map((pt, i) => {
                  const isActive = activeIndex === i;
                  return pt.regions.map((r, j) => (
                    <span
                      key={`region-${pt.number}-${j}`}
                      aria-hidden="true"
                      style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
                      className={cn(
                        "pointer-events-none absolute rounded-[3px] transition-all duration-300",
                        isActive
                          ? "z-20 border-2 border-gold-500 bg-gold-500/10 opacity-100 shadow-[0_0_0_3px_rgba(244,214,0,0.3)]"
                          : "z-0 border border-transparent opacity-0"
                      )}
                    />
                  ));
                })}

                {PACK_POINTS.map((pt, i) => {
                  const isActive = activeIndex === i;
                  const anchor = anchorOf(pt);
                  return (
                    <span
                      key={`anchor-${pt.number}`}
                      aria-hidden="true"
                      style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
                      className={cn(
                        "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
                        isActive
                          ? "z-20 h-2 w-2 bg-gold-500 ring-2 ring-forest-950"
                          : "z-10 h-1.5 w-1.5 bg-forest-800 ring-1 ring-white"
                      )}
                    />
                  );
                })}

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
                      style={{ left: `${BADGE_X[pt.side]}%`, top: `${anchorOf(pt).y}%` }}
                      className={cn(
                        "group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full transition-transform duration-200",
                        isActive ? "z-30 scale-110" : "z-10 hover:scale-110"
                      )}
                    >
                      <span
                        className={cn(
                          "tnum flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-colors sm:h-7 sm:w-7 sm:text-xs",
                          isActive
                            ? "border border-gold-600 bg-gold-500 text-forest-950 shadow-md ring-3 ring-gold-500/35"
                            : "border border-forest-700 bg-forest-950 text-paper shadow-sm group-hover:border-gold-500 group-hover:text-gold-500"
                        )}
                      >
                        {pt.number}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 w-full border-t border-line/60 pt-3 text-center">
                <p className="text-xs text-ink-2" aria-live="polite">
                  <span className="tnum mr-1.5 font-bold text-forest-800">
                    {PACK_POINTS[activeIndex].number}
                  </span>
                  <span className="font-semibold text-forest-900">
                    {PACK_POINTS[activeIndex].title}
                  </span>
                  <span aria-hidden="true" className="mx-1.5 hidden text-ink-3 sm:inline">
                    ·
                  </span>
                  <span className="block text-[11px] text-ink-3 sm:inline">
                    {PACK_POINTS[activeIndex].location}
                  </span>
                </p>
              </div>
            </div>
          </div>

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
                      "relative -mx-4 flex cursor-pointer gap-6 rounded-2xl px-4 py-6 transition-colors duration-200 sm:-mx-6 sm:px-6 sm:py-7",
                      "before:absolute before:inset-y-5 before:left-0 before:w-1 before:rounded-full before:bg-gold-500 before:transition-opacity before:duration-200",
                      isActive
                        ? "bg-white shadow-sm before:opacity-100"
                        : "before:opacity-0 hover:bg-white/60"
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
