"use client";

import Image from "next/image";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface StagePack {
  id: string;
  productSlug: string;
  productName: string;
  shortName: string;
  oilCategory: string;
  size: string;
  format: string;
  badge: string;
  isHero?: boolean;
  accent: "soy" | "mustard" | "palm";
  image: string;
  alt: string;
  width: number;
  height: number;
  containerSpec: string;
  bestFor: string;
  specs: string[];
  description: string;
}

export const STAGE_PACKS: StagePack[] = [
  {
    id: "soy-15kg",
    productSlug: "soyabean-refined-oil",
    productName: "Soyabean Refined Oil",
    shortName: "Soyabean",
    oilCategory: "Refined Edible Grade",
    size: "15 KG",
    format: "Food-Grade Metal Tin",
    badge: "Flagship · Hero Product",
    isHero: true,
    accent: "soy",
    image: "/products/soyabean-15kg-tin.webp",
    alt: "North West Soyabean Refined Oil in 15 kg food-grade tin",
    width: 771,
    height: 1150,
    containerSpec: "Heavy-gauge square tinplate with inner lacquer & sealed pour spout",
    bestFor: "Commercial kitchens, volume fryers, bakeries & industrial caterers",
    specs: ["+F Fortified (A & D)", "Tamper-Evident Spout", "9M Shelf Life", "Lab Certified Pure"],
    description:
      "Our hero product. A light, neutral refined oil engineered for continuous frying, baking, and large-scale culinary production where consistency matters above all.",
  },
  {
    id: "mustard-15kg",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard Tin",
    oilCategory: "Cold-Pressed Grade",
    size: "15 KG",
    format: "Food-Grade Metal Tin",
    badge: "Commercial Bulk",
    accent: "mustard",
    image: "/products/mustard-15kg-tin.webp",
    alt: "North West Kachi Ghani Mustard Oil in 15 kg tin",
    width: 815,
    height: 1150,
    containerSpec: "Reinforced steel tinplate with top carry wire and hermetic seal",
    bestFor: "Halwais, sweet makers, canteens, dhabas & wholesale distribution",
    specs: ["Cold-Pressed", "+F Fortified", "High Natural Pungency", "Best Before 9 Months"],
    description:
      "Traditional cold-pressed mustard oil with pungent aroma and authentic flavor preserved. Packed in robust 15 KG tins for high-volume commercial cooking.",
  },
  {
    id: "palm-15l",
    productSlug: "refined-palmolein-oil",
    productName: "Refined Palmolein Oil",
    shortName: "Palmolein",
    oilCategory: "Refined Frying Grade",
    size: "15 LTR",
    format: "Food-Grade Metal Tin",
    badge: "Continuous Fryer Grade",
    accent: "palm",
    image: "/products/palmolein-15l-tin.webp",
    alt: "North West Refined Palmolein Oil in 15 litre tin",
    width: 812,
    height: 1150,
    containerSpec: "Corrosion-resistant metal tinplate built for high thermal stability",
    bestFor: "Continuous deep-fryers, snack manufacturers & banquet caterers",
    specs: ["High Smoke Point", "+F Fortified", "Zero Trans-Fat", "Neutral Aroma"],
    description:
      "Engineered to withstand prolonged commercial frying temperatures without breaking down. Favored by snack producers and heavy commercial kitchens.",
  },
  {
    id: "mustard-5l",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 5L",
    oilCategory: "Cold-Pressed Grade",
    size: "5 L",
    format: "Handled Jar",
    badge: "Family & Food Service",
    accent: "mustard",
    image: "/products/mustard-5l-jar.webp",
    alt: "North West Kachi Ghani Mustard Oil 5 litre handled jar",
    width: 760,
    height: 1150,
    containerSpec: "Heavy-duty HDPE jar with integrated carry handle & anti-glug pour",
    bestFor: "Joint households, cloud kitchens, dhabas & small restaurants",
    specs: ["Molded Ergonomic Handle", "Tamper-Proof Ring", "+F Fortified", "Wide Stable Base"],
    description:
      "Generous household and small-kitchen format. The molded side handle and wide mouth ensure smooth, controlled dispensing with zero splashback.",
  },
  {
    id: "mustard-2l",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 2L",
    oilCategory: "Cold-Pressed Grade",
    size: "2 L",
    format: "Handled Jar",
    badge: "Household Pantry",
    accent: "mustard",
    image: "/products/mustard-2l-jar.webp",
    alt: "North West Kachi Ghani Mustard Oil 2 litre handled jar",
    width: 768,
    height: 1150,
    containerSpec: "Square-profile handled jar optimized for kitchen countertop storage",
    bestFor: "Monthly household consumption and retail kirana counters",
    specs: ["Space-Saving Footprint", "Aroma-Lock Cap", "+F Fortified", "Easy Grip"],
    description:
      "A convenient handled format designed to sit neatly on kitchen counters or inside pantries without rolling or taking excess shelf space.",
  },
  {
    id: "mustard-1l",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 1L",
    oilCategory: "Cold-Pressed Grade",
    size: "1 L",
    format: "PET Bottle",
    badge: "Retail Bestseller",
    accent: "mustard",
    image: "/products/mustard-1l-bottle.webp",
    alt: "North West Kachi Ghani Mustard Oil 1 litre PET bottle",
    width: 335,
    height: 1150,
    containerSpec: "Fluted virgin food-grade PET bottle with tamper-evident seal",
    bestFor: "Supermarket shelves, grocery stores & daily home cooking",
    specs: ["Retail Standard", "Spill-Free Pour Cap", "100% Recyclable", "UV-Shielded PET"],
    description:
      "The benchmark retail format. Ribbed for slip-free grip and sealed with a tamper-evident ring that guarantees untouched purity straight from the mill.",
  },
  {
    id: "mustard-750ml",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 750ML",
    oilCategory: "Cold-Pressed Grade",
    size: "750 ML",
    format: "PET Bottle",
    badge: "Compact Retail",
    accent: "mustard",
    image: "/products/mustard-750ml-bottle.webp",
    alt: "North West Kachi Ghani Mustard Oil 750 ml PET bottle",
    width: 367,
    height: 1150,
    containerSpec: "Slim contoured PET bottle with ribbed ergonomic grip zones",
    bestFor: "Value-conscious retail shelves and compact kitchen pantries",
    specs: ["Slim Ergonomic Profile", "Drop-Safe Cap", "+F Fortified", "Precision Dispenser"],
    description:
      "A tailored intermediate size that balances consumer price-point with generous volume, popular in urban grocery and compact apartment pantries.",
  },
  {
    id: "mustard-500ml",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 500ML",
    oilCategory: "Cold-Pressed Grade",
    size: "500 ML",
    format: "PET Bottle",
    badge: "Trial & Everyday",
    accent: "mustard",
    image: "/products/mustard-500ml-bottle.webp",
    alt: "North West Kachi Ghani Mustard Oil 500 ml PET bottle",
    width: 367,
    height: 1150,
    containerSpec: "Lightweight virgin PET with precision-flow insert and tamper cap",
    bestFor: "Single households, trial buyers, seasonal pickling & convenience counters",
    specs: ["Entry Pack", "Precision Pour Nozzle", "Portable", "+F Fortified"],
    description:
      "Our most agile retail format. Perfect for small households, trial testing, or seasonal pickle preparation where a fresh unopened bottle is preferred.",
  },
];

type FilterKey = "all" | "soy" | "mustard" | "palm";

export function PackStage({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const uid = useId();
  const reduced = useReducedMotion();

  const totalPacks = STAGE_PACKS.length;
  const activePack = STAGE_PACKS[activeIndex];

  // Filter packs for quick switching
  const handleFilterSelect = (filterKey: FilterKey) => {
    setActiveFilter(filterKey);
    if (filterKey === "soy") {
      setActiveIndex(0); // Soyabean hero tin
    } else if (filterKey === "mustard") {
      // Find first mustard pack
      const firstMustard = STAGE_PACKS.findIndex((p) => p.accent === "mustard");
      if (firstMustard !== -1) setActiveIndex(firstMustard);
    } else if (filterKey === "palm") {
      const palmIdx = STAGE_PACKS.findIndex((p) => p.accent === "palm");
      if (palmIdx !== -1) setActiveIndex(palmIdx);
    }
  };

  const nextPack = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalPacks);
  }, [totalPacks]);

  const prevPack = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalPacks) % totalPacks);
  }, [totalPacks]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (diff > 45) {
      prevPack();
    } else if (diff < -45) {
      nextPack();
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextPack();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      prevPack();
    }
  };

  // WhatsApp link generator
  const quoteMessage = useMemo(() => {
    return `${waMessage.quote(activePack.productName)} (Pack format: ${activePack.size} ${activePack.format})`;
  }, [activePack]);

  // Turntable dial angle
  const turntableAngle = (activeIndex * (360 / totalPacks)) % 360;

  return (
    <div
      className={cn("relative flex flex-col", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Packaging and Supply Interactive Showcase"
    >
      {/* Top Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div
          role="tablist"
          aria-label="Filter pack lineup"
          className="flex flex-wrap items-center gap-1.5 rounded-full border border-line bg-paper-2/60 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "all"}
            onClick={() => handleFilterSelect("all")}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-150",
              activeFilter === "all" ? "text-ink" : "text-ink-3 hover:text-ink"
            )}
          >
            {activeFilter === "all" ? (
              <motion.span
                layoutId={reduced ? undefined : `${uid}-pill`}
                className="absolute inset-0 rounded-full border border-line bg-paper"
                transition={spring.snappy}
              />
            ) : null}
            <span className="relative">All 8 Formats</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "soy"}
            onClick={() => handleFilterSelect("soy")}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-150",
              activeFilter === "soy" ? "text-ink" : "text-ink-3 hover:text-ink"
            )}
          >
            {activeFilter === "soy" ? (
              <motion.span
                layoutId={reduced ? undefined : `${uid}-pill`}
                className="absolute inset-0 rounded-full border border-forest-600/30 bg-forest-50 text-forest-800"
                transition={spring.snappy}
              />
            ) : null}
            <span className="relative flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-forest-600" />
              Soyabean (Hero Tin)
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "mustard"}
            onClick={() => handleFilterSelect("mustard")}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-150",
              activeFilter === "mustard" ? "text-ink" : "text-ink-3 hover:text-ink"
            )}
          >
            {activeFilter === "mustard" ? (
              <motion.span
                layoutId={reduced ? undefined : `${uid}-pill`}
                className="absolute inset-0 rounded-full border border-amber-600/30 bg-amber-50 text-amber-900"
                transition={spring.snappy}
              />
            ) : null}
            <span className="relative flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-600" />
              Mustard Line (6 Sizes)
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "palm"}
            onClick={() => handleFilterSelect("palm")}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-150",
              activeFilter === "palm" ? "text-ink" : "text-ink-3 hover:text-ink"
            )}
          >
            {activeFilter === "palm" ? (
              <motion.span
                layoutId={reduced ? undefined : `${uid}-pill`}
                className="absolute inset-0 rounded-full border border-sky-600/30 bg-sky-50 text-sky-900"
                transition={spring.snappy}
              />
            ) : null}
            <span className="relative flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-sky-600" />
              Palmolein (15L)
            </span>
          </button>
        </div>

        {/* Counter and Carousel Nav Arrows */}
        <div className="flex items-center gap-3">
          <span className="tnum text-[0.8125rem] text-ink-3">
            Format <span className="font-semibold text-ink">{activeIndex + 1}</span> of{" "}
            <span className="font-semibold text-ink">{totalPacks}</span>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevPack}
              aria-label="Previous pack format"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all duration-150 hover:border-forest-700 hover:text-forest-700 active:scale-95 cursor-pointer"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 12L6 8l4-4" />
              </svg>
            </button>

            <button
              type="button"
              onClick={nextPack}
              aria-label="Next pack format"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all duration-150 hover:border-forest-700 hover:text-forest-700 active:scale-95 cursor-pointer"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Showcase: Left Info + Right Circular Turntable Stage */}
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
        {/* LEFT COLUMN: Editorial HUD & Spec Card */}
        <div className="flex flex-col lg:col-span-6 lg:pr-4">
          {/* Double-Bezel Architecture Card */}
          <div className="rounded-[2rem] border border-line bg-paper-2/60 p-1.5 sm:p-2">
            <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] border border-line-subtle bg-paper p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePack.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Top Status & Line Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink-2">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-2.5 rounded-full",
                          activePack.accent === "soy" && "bg-forest-600",
                          activePack.accent === "mustard" && "bg-amber-600",
                          activePack.accent === "palm" && "bg-sky-600"
                        )}
                      />
                      {activePack.productName}
                    </span>

                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[0.6875rem] font-medium tracking-wide uppercase",
                        activePack.isHero
                          ? "border border-forest-600/30 bg-forest-600/10 text-forest-800"
                          : "border border-line bg-paper-2 text-ink-3"
                      )}
                    >
                      {activePack.badge}
                    </span>
                  </div>

                  {/* Large Pack Typography */}
                  <div className="mt-6 flex items-baseline justify-between gap-3 border-b border-line pb-5">
                    <div>
                      <span className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink tnum">
                        {activePack.size}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium text-ink mt-1">
                        {activePack.format}
                      </h3>
                    </div>

                    <span className="tnum text-[0.8125rem] text-ink-4">
                      {activePack.oilCategory}
                    </span>
                  </div>

                  {/* Engineering & Description */}
                  <div className="mt-5 space-y-3">
                    <p className="text-[0.875rem] leading-relaxed text-ink-2">
                      {activePack.description}
                    </p>

                    <div className="rounded-xl border border-line-subtle bg-paper-2/60 p-3.5">
                      <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-ink-4">
                        Container Engineering
                      </p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink font-medium">
                        {activePack.containerSpec}
                      </p>
                    </div>

                    <div className="rounded-xl border border-line-subtle bg-paper-2/40 p-3.5">
                      <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-ink-4">
                        Recommended For
                      </p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink">
                        {activePack.bestFor}
                      </p>
                    </div>
                  </div>

                  {/* Quality Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {activePack.specs.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full border border-line bg-paper-2 px-2.5 py-0.5 text-[0.6875rem] font-medium text-ink-3"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Action: Nested CTA Button with Island Trailing Icon */}
                  <div className="mt-7 pt-4 border-t border-line">
                    <a
                      href={whatsappLink(quoteMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group/btn relative inline-flex w-full items-center justify-between rounded-full pl-6 pr-2 py-2 text-[0.875rem] font-medium transition-all duration-200 cursor-pointer",
                        activePack.isHero
                          ? "bg-forest-800 text-paper hover:bg-forest-950 active:scale-[0.99]"
                          : "border border-line-strong bg-paper text-ink hover:border-forest-800 hover:bg-forest-50 active:scale-[0.99]"
                      )}
                    >
                      <span>
                        Enquire Trade Quote for {activePack.size} {activePack.shortName}
                      </span>
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 transition-transform duration-200 group-hover/btn:translate-x-0.5">
                        <WhatsAppIcon className="size-4 text-[#25D366]" />
                      </span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Click Thumbnail Pill Row */}
          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            {STAGE_PACKS.map((pack, i) => {
              const isSelected = i === activeIndex;
              return (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "tnum relative rounded-full px-3 py-1.5 text-[0.75rem] font-medium transition-all duration-150 cursor-pointer",
                    isSelected
                      ? "border border-forest-700 bg-forest-800 text-paper"
                      : "border border-line bg-paper text-ink-3 hover:text-ink hover:border-line-strong"
                  )}
                >
                  <span>{pack.size}</span>
                  <span className="ml-1 opacity-70">
                    {pack.accent === "soy" ? "Soy" : pack.accent === "palm" ? "Palm" : "Mustard"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Circular Turntable Photo Stage */}
        <div
          ref={stageRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Revolving turntable photo stage. Swipe or use arrow keys."
          className="relative flex h-[380px] sm:h-[480px] lg:h-[540px] items-center justify-center overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-b from-paper-2/70 via-paper to-paper-2/40 lg:col-span-6 focus-visible:outline-none"
        >
          {/* Concentric Circular Turntable Floor Rings */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Outer ring */}
            <div className="size-[320px] sm:size-[430px] lg:size-[490px] rounded-full border border-line/60" />
            {/* Mid ring */}
            <div className="absolute size-[240px] sm:size-[320px] lg:size-[370px] rounded-full border border-line/40" />
            {/* Inner ring */}
            <div className="absolute size-[160px] sm:size-[220px] lg:size-[250px] rounded-full border border-line/30" />

            {/* Circular turntable tick marks */}
            <motion.div
              className="absolute size-[320px] sm:size-[430px] lg:size-[490px] rounded-full pointer-events-none"
              animate={{ rotate: turntableAngle }}
              transition={{ ...spring.soft, duration: 0.6 }}
            >
              {Array.from({ length: totalPacks }).map((_, idx) => {
                const deg = idx * (360 / totalPacks);
                const isNeedle = idx === 0;
                return (
                  <div
                    key={idx}
                    className="absolute left-1/2 top-0 -translate-x-1/2 origin-bottom h-1/2 w-0.5 flex flex-col items-center"
                    style={{ transform: `rotate(${deg}deg)` }}
                  >
                    <span
                      className={cn(
                        "rounded-full transition-all duration-300",
                        isNeedle
                          ? "h-3 w-1 bg-forest-600"
                          : "h-1.5 w-0.5 bg-ink-4/40"
                      )}
                    />
                  </div>
                );
              })}
            </motion.div>

            {/* Radial Pedestal Lighting Tint */}
            <div
              className="absolute size-[300px] sm:size-[400px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(23,26,18,0.08) 0%, rgba(23,26,18,0.02) 50%, transparent 72%)",
              }}
            />
          </div>

          {/* Central Ground Shadow for Active Pack */}
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-1/2 h-5 w-56 -translate-x-1/2 rounded-[50%] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(23,26,18,0.24) 0%, rgba(23,26,18,0.08) 45%, rgba(23,26,18,0) 72%)",
            }}
          />

          {/* 3D Circular Revolving Carousel Packs */}
          <div className="relative flex h-full w-full items-center justify-center pointer-events-none">
            {STAGE_PACKS.map((pack, idx) => {
              // Calculate relative circular distance (-total/2 to +total/2)
              let diff = idx - activeIndex;
              if (diff > totalPacks / 2) diff -= totalPacks;
              if (diff < -totalPacks / 2) diff += totalPacks;

              const isCurrent = diff === 0;
              const isAdjacent = Math.abs(diff) === 1;
              const isVisible = Math.abs(diff) <= 2;

              // Orbital positioning mathematics
              const xOffset = diff * 155; // horizontal distance in px
              const yOffset = -Math.abs(diff) * 14; // curve upward slightly along circular arc
              const scale = isCurrent ? 1 : isAdjacent ? 0.64 : 0.42;
              const opacity = isCurrent ? 1 : isAdjacent ? 0.45 : isVisible ? 0.18 : 0;
              const zIndex = isCurrent ? 30 : isAdjacent ? 20 : 10;
              const rotateY = diff * -18; // 3D tilt towards center

              return (
                <motion.div
                  key={pack.id}
                  className="absolute bottom-14 flex h-[240px] sm:h-[320px] lg:h-[360px] w-auto items-end justify-center origin-bottom cursor-pointer pointer-events-auto"
                  animate={{
                    x: xOffset,
                    y: yOffset,
                    scale,
                    opacity,
                    rotateY,
                  }}
                  transition={{
                    ...spring.soft,
                    duration: 0.55,
                  }}
                  style={{
                    zIndex,
                    filter: isCurrent ? "none" : "grayscale(25%)",
                  }}
                  onClick={() => {
                    if (!isCurrent) setActiveIndex(idx);
                  }}
                  title={isCurrent ? undefined : `Click to view ${pack.size} ${pack.productName}`}
                >
                  <Image
                    src={pack.image}
                    alt={pack.alt}
                    width={pack.width}
                    height={pack.height}
                    sizes="(max-width: 640px) 240px, 360px"
                    priority={idx === 0 || idx === 1}
                    className="h-full w-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Revolving Stage Controls Floating Overlay */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
            <span className="text-[0.6875rem] font-medium tracking-wider uppercase text-ink-4 bg-paper/80 px-2.5 py-1 rounded-full border border-line">
              Swipe or click to revolve
            </span>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                type="button"
                onClick={prevPack}
                aria-label="Revolve left"
                className="flex size-8 items-center justify-center rounded-full border border-line bg-paper/90 text-ink shadow-none hover:border-forest-700 active:scale-90 cursor-pointer"
              >
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 12L6 8l4-4" />
                </svg>
              </button>

              <button
                type="button"
                onClick={nextPack}
                aria-label="Revolve right"
                className="flex size-8 items-center justify-center rounded-full border border-line bg-paper/90 text-ink shadow-none hover:border-forest-700 active:scale-90 cursor-pointer"
              >
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
