"use client";

import Image from "next/image";
import { useCallback, useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { ease, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface StagePack {
  id: string;
  productSlug: string;
  productName: string;
  shortName: string;
  category: "tins" | "jars" | "bottles";
  categoryName: string;
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
  tareWeight: string;
  material: string;
  closure: string;
  palletLoad: string;
  recommendedFor: string;
  compliance: string;
  description: string;
}

export const STAGE_PACKS: StagePack[] = [
  {
    id: "soy-15kg",
    productSlug: "soyabean-refined-oil",
    productName: "Soyabean Refined Oil",
    shortName: "Soyabean 15 KG",
    category: "tins",
    categoryName: "Commercial Metal Tin",
    oilCategory: "Refined Edible Grade",
    size: "15 KG",
    format: "Food-Grade Metal Tin",
    badge: "Flagship · Hero Product",
    isHero: true,
    accent: "soy",
    image: "/products/soyabean-15kg-tin.webp",
    alt: "North West Soyabean Refined Oil 15 kg food-grade tin",
    width: 771,
    height: 1150,
    tareWeight: "15.00 KG Net Weight",
    material: "Electrolytic tinplate with protective food-grade inner lacquer",
    closure: "Hermetic pull-ring pour spout with tamper-evident seal",
    palletLoad: "33 Tins per Pallet · Shrink-wrapped or full truckload dispatch",
    recommendedFor: "Commercial kitchens, industrial bakeries, cloud kitchens & volume fryers",
    compliance: "+F Fortified with Vitamins A & D · Central FSSAI · 9M Shelf Life",
    description:
      "Our hero product. A light, neutral refined oil engineered for continuous commercial frying, baking, and large-scale culinary production where thermal stability and neutral aroma matter most.",
  },
  {
    id: "mustard-15kg",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 15 KG",
    category: "tins",
    categoryName: "Commercial Metal Tin",
    oilCategory: "Cold-Pressed Grade",
    size: "15 KG",
    format: "Food-Grade Metal Tin",
    badge: "Commercial Bulk",
    accent: "mustard",
    image: "/products/mustard-15kg-tin.webp",
    alt: "North West Kachi Ghani Mustard Oil 15 kg tin",
    width: 815,
    height: 1150,
    tareWeight: "15.00 KG Net Weight",
    material: "Heavy-gauge reinforced steel tinplate with welded hermetic seams",
    closure: "Factory-crimped seal with steel wire top carry handle",
    palletLoad: "33 Tins per Pallet · Palletized consignments or full truckload",
    recommendedFor: "Sweet makers (halwais), institutional canteens, dhabas & wholesale stockists",
    compliance: "+F Fortified with Vitamins A & D · Cold-Pressed · High Pungency",
    description:
      "Authentic cold-pressed Kachi Ghani mustard oil with natural pungency and aroma intact. Packaged in rigid 15 KG tins designed to endure long-distance transit and demanding kitchen floors.",
  },
  {
    id: "palm-15l",
    productSlug: "refined-palmolein-oil",
    productName: "Refined Palmolein Oil",
    shortName: "Palmolein 15 LTR",
    category: "tins",
    categoryName: "Commercial Metal Tin",
    oilCategory: "Refined Frying Grade",
    size: "15 LTR",
    format: "Food-Grade Metal Tin",
    badge: "Continuous Fryer Grade",
    accent: "palm",
    image: "/products/palmolein-15l-tin.webp",
    alt: "North West Refined Palmolein Oil 15 litre tin",
    width: 812,
    height: 1150,
    tareWeight: "15.00 Litres Volume",
    material: "Corrosion-resistant lacquered steel tinplate for high smoke-point storage",
    closure: "Tamper-evident threaded spout with inner security membrane",
    palletLoad: "33 Tins per Pallet · Direct bulk tanker dispatch also available",
    recommendedFor: "Continuous deep-fryers, namkeen & snack manufacturers, industrial kitchens",
    compliance: "+F Fortified with Vitamins A & D · High Heat Stability · Zero Trans-Fat",
    description:
      "Engineered specifically for high-temperature commercial deep-frying. Holds its clarity and structural stability across prolonged frying cycles without foaming or off-flavors.",
  },
  {
    id: "mustard-5l",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 5 L",
    category: "jars",
    categoryName: "Handled Jar",
    oilCategory: "Cold-Pressed Grade",
    size: "5 L",
    format: "Handled Jar",
    badge: "Food Service & Family",
    accent: "mustard",
    image: "/products/mustard-5l-jar.webp",
    alt: "North West Kachi Ghani Mustard Oil 5 litre handled jar",
    width: 760,
    height: 1150,
    tareWeight: "5.00 Litres Volume",
    material: "High-density food-grade virgin polymer with ergonomic side handle",
    closure: "Wide-mouth threaded cap with tamper-evident tear ring and pour lip",
    palletLoad: "4 Jars per Corrugated Master Shipper Box",
    recommendedFor: "Large households, joint families, dhabas, cloud kitchens & small restaurants",
    compliance: "+F Fortified with Vitamins A & D · FSSAI Certified · Recyclable",
    description:
      "A high-volume consumer and food-service pack. The heavy-duty molded handle and anti-glug neck geometry provide confident, splash-free pouring into commercial cookware.",
  },
  {
    id: "mustard-2l",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 2 L",
    category: "jars",
    categoryName: "Handled Jar",
    oilCategory: "Cold-Pressed Grade",
    size: "2 L",
    format: "Handled Jar",
    badge: "Pantry Standard",
    accent: "mustard",
    image: "/products/mustard-2l-jar.webp",
    alt: "North West Kachi Ghani Mustard Oil 2 litre handled jar",
    width: 768,
    height: 1150,
    tareWeight: "2.00 Litres Volume",
    material: "Square-profile food-grade polymer with space-saving footprint",
    closure: "Screw cap with induction seal and integrated pouring spout",
    palletLoad: "6 Jars per Corrugated Master Carton",
    recommendedFor: "Monthly household consumption and retail grocery counters",
    compliance: "+F Fortified with Vitamins A & D · Aroma Lock Seal",
    description:
      "Tailored for monthly household pantries. The square profile prevents shelf roll and maximizes storage efficiency in both domestic kitchens and retail store aisles.",
  },
  {
    id: "mustard-1l",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 1 L",
    category: "bottles",
    categoryName: "Consumer PET Bottle",
    oilCategory: "Cold-Pressed Grade",
    size: "1 L",
    format: "PET Bottle",
    badge: "Retail Bestseller",
    accent: "mustard",
    image: "/products/mustard-1l-bottle.webp",
    alt: "North West Kachi Ghani Mustard Oil 1 litre PET bottle",
    width: 335,
    height: 1150,
    tareWeight: "1.00 Litre Volume",
    material: "Virgin food-grade PET with UV-protective fluted ribs",
    closure: "Precision-flow dispenser cap with tamper-evident drop band",
    palletLoad: "12 or 16 Bottles per Corrugated Master Shipper with partitions",
    recommendedFor: "Supermarket shelves, kirana stores & everyday home culinary use",
    compliance: "+F Fortified with Vitamins A & D · 100% Recyclable Virgin PET",
    description:
      "The definitive retail benchmark. Fluted sidewalls prevent bottle deformation during transit, while the precision dispenser ensures clean, dripless oil delivery.",
  },
  {
    id: "mustard-750ml",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 750 ML",
    category: "bottles",
    categoryName: "Consumer PET Bottle",
    oilCategory: "Cold-Pressed Grade",
    size: "750 ML",
    format: "PET Bottle",
    badge: "Compact Retail",
    accent: "mustard",
    image: "/products/mustard-750ml-bottle.webp",
    alt: "North West Kachi Ghani Mustard Oil 750 ml PET bottle",
    width: 367,
    height: 1150,
    tareWeight: "750 ML Volume",
    material: "Slim-line virgin PET with textured ergonomic grip bands",
    closure: "Threaded dispenser cap with factory-sealed breakaway ring",
    palletLoad: "16 Bottles per Corrugated Master Carton",
    recommendedFor: "Value-conscious retail shelves and compact kitchen cabinets",
    compliance: "+F Fortified with Vitamins A & D · Drop-Safe Cap",
    description:
      "A calibrated consumer intermediate format that delivers exceptional value for urban households with compact pantry shelving.",
  },
  {
    id: "mustard-500ml",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    shortName: "Mustard 500 ML",
    category: "bottles",
    categoryName: "Consumer PET Bottle",
    oilCategory: "Cold-Pressed Grade",
    size: "500 ML",
    format: "PET Bottle",
    badge: "Trial & Tabletop",
    accent: "mustard",
    image: "/products/mustard-500ml-bottle.webp",
    alt: "North West Kachi Ghani Mustard Oil 500 ml PET bottle",
    width: 367,
    height: 1150,
    tareWeight: "500 ML Volume",
    material: "Lightweight virgin food-grade PET with precision-blow molding",
    closure: "Tamper-evident screw cap with micro-pour nozzle insert",
    palletLoad: "24 Bottles per Corrugated Shipping Case",
    recommendedFor: "Single households, trial purchasers, seasonal pickle makers & grocery counters",
    compliance: "+F Fortified with Vitamins A & D · Precision Dispenser",
    description:
      "Our most nimble retail format. Highly popular for seasonal pickle preparation and trial purchases, ensuring consumers get factory-sealed freshness on every opening.",
  },
];

type CategoryFilter = "all" | "tins" | "jars" | "bottles";

export function PackStage({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const uid = useId();
  const reduced = useReducedMotion();

  const totalPacks = STAGE_PACKS.length;
  const activePack = STAGE_PACKS[activeIndex];

  const filteredPacks = useMemo(() => {
    if (activeCategory === "all") return STAGE_PACKS;
    return STAGE_PACKS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleCategorySelect = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    if (cat === "all") {
      setActiveIndex(0);
    } else {
      const matchIndex = STAGE_PACKS.findIndex((p) => p.category === cat);
      if (matchIndex !== -1) setActiveIndex(matchIndex);
    }
  };

  const nextPack = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalPacks);
  }, [totalPacks]);

  const prevPack = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalPacks) % totalPacks);
  }, [totalPacks]);

  const quoteMessage = useMemo(() => {
    return `${waMessage.quote(activePack.productName)} (Packaging spec: ${activePack.size} ${activePack.format})`;
  }, [activePack]);

  return (
    <div
      className={cn("relative flex flex-col", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Packaging and Supply Specification Showcase"
    >
      {/* Category Segment Selector Rail */}
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Filter pack lineup by container type"
          className="flex flex-wrap items-center gap-1.5 rounded-full border border-line bg-paper-2/60 p-1"
        >
          {[
            { key: "all", label: "All 8 Formats" },
            { key: "tins", label: "Commercial Tins (15 KG / 15 L)" },
            { key: "jars", label: "Handled Jars (2 L & 5 L)" },
            { key: "bottles", label: "Consumer Bottles (500 ML – 1 L)" },
          ].map((tab) => {
            const isSelected = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleCategorySelect(tab.key as CategoryFilter)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-150 cursor-pointer select-none active:translate-y-0.5",
                  isSelected ? "text-ink" : "text-ink-3 hover:text-ink"
                )}
              >
                {isSelected ? (
                  <motion.span
                    layoutId={reduced ? undefined : `${uid}-category-pill`}
                    className="absolute inset-0 rounded-full border border-line bg-paper"
                    transition={spring.snappy}
                  />
                ) : null}
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
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
              aria-label="Previous format"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all duration-150 hover:border-forest-700 hover:text-forest-700 active:translate-y-0.5 cursor-pointer"
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
              aria-label="Next format"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all duration-150 hover:border-forest-700 hover:text-forest-700 active:translate-y-0.5 cursor-pointer"
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

      {/* Main Showcase Panel: Left Technical Procurement Sheet + Right Gallery Pedestal */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-stretch">
        {/* LEFT COLUMN: Industrial Technical Specification Sheet */}
        <div className="flex flex-col justify-between rounded-[2rem] border border-line bg-paper p-6 sm:p-8 lg:col-span-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePack.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: ease.out }}
              className="flex flex-col justify-between h-full"
            >
              <div>
                {/* Product Line & Packaging Grade Tag */}
                <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
                  <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink">
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

                {/* Massive Capacity & Format Title */}
                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink tnum">
                    {activePack.size}
                  </h3>
                  <span className="text-[0.9375rem] font-medium text-ink-3">
                    {activePack.format}
                  </span>
                </div>

                {/* Editorial Description */}
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
                  {activePack.description}
                </p>

                {/* Industrial Technical Specification Matrix */}
                <div className="mt-6 divide-y divide-line rounded-xl border border-line-subtle bg-paper-2/50 text-[0.8125rem]">
                  <div className="grid grid-cols-1 gap-1 p-3.5 sm:grid-cols-12 sm:gap-4">
                    <span className="text-ink-4 uppercase tracking-wider sm:col-span-4 text-[0.6875rem] font-medium">
                      Net Capacity
                    </span>
                    <span className="text-ink font-medium sm:col-span-8 leading-snug tnum">
                      {activePack.tareWeight}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3.5 sm:grid-cols-12 sm:gap-4">
                    <span className="text-ink-4 uppercase tracking-wider sm:col-span-4 text-[0.6875rem] font-medium">
                      Material Construction
                    </span>
                    <span className="text-ink font-medium sm:col-span-8 leading-snug">
                      {activePack.material}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3.5 sm:grid-cols-12 sm:gap-4">
                    <span className="text-ink-4 uppercase tracking-wider sm:col-span-4 text-[0.6875rem] font-medium">
                      Closure &amp; Seal
                    </span>
                    <span className="text-ink font-medium sm:col-span-8 leading-snug">
                      {activePack.closure}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3.5 sm:grid-cols-12 sm:gap-4">
                    <span className="text-ink-4 uppercase tracking-wider sm:col-span-4 text-[0.6875rem] font-medium">
                      Secondary Packaging
                    </span>
                    <span className="text-ink font-medium sm:col-span-8 leading-snug">
                      {activePack.palletLoad}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3.5 sm:grid-cols-12 sm:gap-4">
                    <span className="text-ink-4 uppercase tracking-wider sm:col-span-4 text-[0.6875rem] font-medium">
                      Primary Use
                    </span>
                    <span className="text-ink font-medium sm:col-span-8 leading-snug">
                      {activePack.recommendedFor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Clean, Tactile WhatsApp Link */}
              <div className="mt-8 border-t border-line pt-6">
                <a
                  href={whatsappLink(quoteMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group/btn relative inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.875rem] font-medium transition-all duration-150 cursor-pointer select-none active:translate-y-0.5",
                    activePack.isHero
                      ? "bg-forest-800 text-paper hover:bg-forest-950"
                      : "border border-line-strong bg-paper text-ink hover:border-forest-800 hover:bg-forest-50"
                  )}
                >
                  <WhatsAppIcon className="size-4.5 shrink-0" />
                  <span>
                    Request Trade Pricing for {activePack.size} {activePack.shortName}
                  </span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Gallery Pedestal Stage with Thumbnail Strip */}
        <div className="flex flex-col justify-between rounded-[2rem] border border-line bg-gradient-to-b from-paper-2/90 via-paper to-paper-2/60 p-6 sm:p-8 lg:col-span-6 lg:p-10">
          {/* Architectural Studio Stage */}
          <div className="relative flex min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] w-full flex-1 items-end justify-center overflow-hidden rounded-2xl border border-line-subtle bg-paper-2/30 pb-8 pt-10">
            {/* Diffused ambient lighting behind product */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div
                className="size-[260px] sm:size-[360px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(23,26,18,0.05) 0%, rgba(23,26,18,0.015) 55%, transparent 72%)",
                }}
              />
            </div>

            {/* Soft contact ground shadow */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-1/2 h-5 w-60 -translate-x-1/2 rounded-[50%] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(23,26,18,0.24) 0%, rgba(23,26,18,0.08) 45%, rgba(23,26,18,0) 72%)",
              }}
            />

            {/* Active Pack Photo: Clean, Upright, Photorealistic */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePack.id}
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -4 }}
                transition={{ ...spring.soft, duration: 0.28 }}
                className="relative z-10 flex h-[280px] sm:h-[350px] lg:h-[390px] w-full items-end justify-center"
              >
                <Image
                  src={activePack.image}
                  alt={activePack.alt}
                  width={activePack.width}
                  height={activePack.height}
                  priority
                  sizes="(max-width: 640px) 260px, (max-width: 1023px) 360px, 420px"
                  className="h-full w-auto object-contain select-none drop-shadow-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Stage Arrow Nav Affordances */}
            <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none z-20">
              <button
                type="button"
                onClick={prevPack}
                aria-label="Previous format photo"
                className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-line bg-paper/90 text-ink backdrop-blur-sm transition-all duration-150 hover:border-forest-700 active:translate-y-0.5 cursor-pointer"
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
                aria-label="Next format photo"
                className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-line bg-paper/90 text-ink backdrop-blur-sm transition-all duration-150 hover:border-forest-700 active:translate-y-0.5 cursor-pointer"
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

          {/* Interactive Pack Selector Filmstrip */}
          <div className="mt-6">
            <p className="text-[0.75rem] font-medium uppercase tracking-wider text-ink-4">
              Select format to inspect:
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {filteredPacks.map((pack) => {
                const globalIndex = STAGE_PACKS.findIndex((p) => p.id === pack.id);
                const isCurrent = globalIndex === activeIndex;
                return (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => setActiveIndex(globalIndex)}
                    aria-pressed={isCurrent}
                    className={cn(
                      "group relative flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition-all duration-150 cursor-pointer select-none active:translate-y-0.5",
                      isCurrent
                        ? "border-forest-700/50 bg-forest-50/60 ring-1 ring-forest-600/20"
                        : "border-line bg-paper-2/40 hover:border-line-strong hover:bg-paper"
                    )}
                  >
                    <span className="relative flex size-8 shrink-0 items-center justify-center">
                      <Image
                        src={pack.image}
                        alt=""
                        width={40}
                        height={60}
                        className={cn(
                          "h-full w-auto object-contain transition-transform duration-200",
                          isCurrent ? "scale-110" : "group-hover:scale-105 opacity-80"
                        )}
                      />
                    </span>
                    <div className="flex flex-col">
                      <span className="tnum text-[0.8125rem] font-semibold text-ink leading-tight">
                        {pack.size}
                      </span>
                      <span className="text-[0.6875rem] text-ink-3 leading-tight">
                        {pack.shortName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
