"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface CarouselPack {
  id: string;
  productSlug: string;
  productName: string;
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
  specs: string[];
  bestFor: string;
  detail: string;
}

export const ALL_PACKS: CarouselPack[] = [
  {
    id: "soy-15kg",
    productSlug: "soyabean-refined-oil",
    productName: "Soyabean Refined Oil",
    oilCategory: "Refined Edible Grade",
    size: "15 KG",
    format: "Food-Grade Metal Tin",
    badge: "Flagship · Hero Product",
    isHero: true,
    accent: "soy",
    image: "/products/soyabean-15kg-tin.webp",
    alt: "North West Soyabean Refined Oil 15 kg tin",
    width: 771,
    height: 1150,
    specs: ["+F Fortified (A & D)", "Tamper-Evident Spout", "9M Shelf Life"],
    bestFor: "Commercial kitchens, bakeries, caterers & industrial frying",
    detail: "Heavy-gauge square metal tin with inner food-grade protective lacquer and hermetic pour cap.",
  },
  {
    id: "mustard-15kg",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    oilCategory: "Cold-Pressed Grade",
    size: "15 KG",
    format: "Food-Grade Metal Tin",
    badge: "Commercial Bulk",
    accent: "mustard",
    image: "/products/mustard-15kg-tin.webp",
    alt: "North West Kachi Ghani Mustard Oil 15 kg tin",
    width: 815,
    height: 1150,
    specs: ["Cold-Pressed", "+F Fortified", "High Pungency"],
    bestFor: "Halwais, institutional canteens, restaurants & distributors",
    detail: "Reinforced steel tinplate with top wire carry handle and factory seal for zero leakage.",
  },
  {
    id: "palm-15l",
    productSlug: "refined-palmolein-oil",
    productName: "Refined Palmolein Oil",
    oilCategory: "Frying Grade",
    size: "15 LTR",
    format: "Food-Grade Metal Tin",
    badge: "Continuous Fryer Grade",
    accent: "palm",
    image: "/products/palmolein-15l-tin.webp",
    alt: "North West Refined Palmolein Oil 15 litre tin",
    width: 812,
    height: 1150,
    specs: ["High Heat Stability", "+F Fortified", "Neutral Aroma"],
    bestFor: "Snack manufacturing, continuous deep-fryers & banquet catering",
    detail: "Engineered for high smoke point stability and maximum frying cycle longevity.",
  },
  {
    id: "mustard-5l",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    oilCategory: "Cold-Pressed Grade",
    size: "5 L",
    format: "Handled Jar",
    badge: "Family & Food Service",
    accent: "mustard",
    image: "/products/mustard-5l-jar.webp",
    alt: "North West Kachi Ghani Mustard Oil 5 litre handled jar",
    width: 760,
    height: 1150,
    specs: ["Ergonomic Handle", "Anti-Glug Spout", "Tamper-Proof Cap"],
    bestFor: "Large households, cloud kitchens, dhabas & small eateries",
    detail: "Heavy-duty jar with integrated carry handle and wide stable base for quick pour control.",
  },
  {
    id: "mustard-2l",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    oilCategory: "Cold-Pressed Grade",
    size: "2 L",
    format: "Handled Jar",
    badge: "Household Pantry",
    accent: "mustard",
    image: "/products/mustard-2l-jar.webp",
    alt: "North West Kachi Ghani Mustard Oil 2 litre handled jar",
    width: 768,
    height: 1150,
    specs: ["Side Handle", "Aroma-Lock Cap", "+F Fortified"],
    bestFor: "Monthly household consumption and retail kirana counters",
    detail: "Space-conscious footprint built to fit neatly inside kitchen cabinetry and pantry racks.",
  },
  {
    id: "mustard-1l",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    oilCategory: "Cold-Pressed Grade",
    size: "1 L",
    format: "PET Bottle",
    badge: "Retail Bestseller",
    accent: "mustard",
    image: "/products/mustard-1l-bottle.webp",
    alt: "North West Kachi Ghani Mustard Oil 1 litre PET bottle",
    width: 335,
    height: 1150,
    specs: ["Retail Standard", "Spill-Free Cap", "Virgin PET"],
    bestFor: "Supermarket shelves, grocery stores & everyday family cooking",
    detail: "Fluted bottle molded from food-grade virgin PET with tamper-evident security ring.",
  },
  {
    id: "mustard-750ml",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    oilCategory: "Cold-Pressed Grade",
    size: "750 ML",
    format: "PET Bottle",
    badge: "Compact Retail",
    accent: "mustard",
    image: "/products/mustard-750ml-bottle.webp",
    alt: "North West Kachi Ghani Mustard Oil 750 ml PET bottle",
    width: 367,
    height: 1150,
    specs: ["Space-Saving", "Drop-Safe Cap", "+F Fortified"],
    bestFor: "Value-conscious retail shelves and compact kitchen pantries",
    detail: "Contoured bottle with ergonomic grip bands for slip-free handling during daily prep.",
  },
  {
    id: "mustard-500ml",
    productSlug: "mustard-oil",
    productName: "Kachi Ghani Mustard Oil",
    oilCategory: "Cold-Pressed Grade",
    size: "500 ML",
    format: "PET Bottle",
    badge: "Trial & Everyday",
    accent: "mustard",
    image: "/products/mustard-500ml-bottle.webp",
    alt: "North West Kachi Ghani Mustard Oil 500 ml PET bottle",
    width: 367,
    height: 1150,
    specs: ["Trial Size", "Precision Pourer", "Portable"],
    bestFor: "Single households, trial buyers, pickle prep & grocery counters",
    detail: "Convenient half-litre bottle fitted with a precision-flow insert for exact dispensing.",
  },
];

type FilterKey = "all" | "soy" | "mustard" | "palm";

const FILTERS: { key: FilterKey; label: string; count: number }[] = [
  { key: "all", label: "All Formats", count: 8 },
  { key: "soy", label: "Soyabean (Hero)", count: 1 },
  { key: "mustard", label: "Mustard Range", count: 6 },
  { key: "palm", label: "Palmolein", count: 1 },
];

export function PackCarousel({ className }: { className?: string }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const uid = useId();
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  const displayedPacks = ALL_PACKS.filter((pack) => {
    if (filter === "all") return true;
    return pack.accent === filter;
  });

  const checkScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = el.scrollLeft;

    setCanScrollLeft(current > 6);
    setCanScrollRight(current < maxScroll - 6);

    const progress = maxScroll > 0 ? (current / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));

    // Approximate active card
    const firstChild = el.firstElementChild as HTMLElement | null;
    if (firstChild) {
      const cardWidth = firstChild.getBoundingClientRect().width + 20; // width + gap
      const index = Math.round(current / cardWidth);
      setActiveIndex(Math.min(displayedPacks.length - 1, Math.max(0, index)));
    }
  }, [displayedPacks.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollState();
    const handleScroll = () => checkScrollState();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [checkScrollState]);

  const handleFilterSelect = (key: FilterKey) => {
    setFilter(key);
    setActiveIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollByDirection = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    const firstChild = el.firstElementChild as HTMLElement | null;
    const scrollAmount = firstChild
      ? firstChild.getBoundingClientRect().width + 20
      : 360;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;

    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild
      ? firstChild.getBoundingClientRect().width + 20
      : 360;

    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByDirection("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByDirection("right");
    }
  };

  // Drag to scroll for desktop mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    el.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className={cn("relative flex flex-col", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Packaging and Supply Formats"
    >
      {/* Top Filter and Controls Bar */}
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Filters */}
        <div
          role="tablist"
          aria-label="Filter pack formats by oil"
          className="flex flex-wrap items-center gap-1.5 rounded-full border border-line bg-paper-2/60 p-1"
        >
          {FILTERS.map((f) => {
            const isSelected = filter === f.key;
            return (
              <button
                key={f.key}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => handleFilterSelect(f.key)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-150",
                  isSelected
                    ? "text-ink"
                    : "text-ink-3 hover:text-ink focus-visible:text-ink"
                )}
              >
                {isSelected ? (
                  <motion.span
                    layoutId={reduced ? undefined : `${uid}-filter-pill`}
                    className="absolute inset-0 rounded-full border border-line bg-paper"
                    transition={spring.snappy}
                  />
                ) : null}
                <span className="relative flex items-center gap-1.5">
                  {f.label}
                  <span
                    className={cn(
                      "tnum text-[0.6875rem] px-1.5 py-0.2 rounded-full",
                      isSelected
                        ? "bg-forest-100 text-forest-800"
                        : "bg-paper-3 text-ink-3"
                    )}
                  >
                    {f.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Counter & Arrows */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="tnum text-[0.8125rem] text-ink-3">
            Showing{" "}
            <span className="font-semibold text-ink">
              {displayedPacks.length}
            </span>{" "}
            format{displayedPacks.length === 1 ? "" : "s"}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollByDirection("left")}
              disabled={!canScrollLeft}
              aria-label="Previous pack format"
              className={cn(
                "flex size-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all duration-150",
                canScrollLeft
                  ? "hover:border-forest-700 hover:text-forest-700 active:scale-95"
                  : "cursor-not-allowed opacity-35"
              )}
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
              onClick={() => scrollByDirection("right")}
              disabled={!canScrollRight}
              aria-label="Next pack format"
              className={cn(
                "flex size-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all duration-150",
                canScrollRight
                  ? "hover:border-forest-700 hover:text-forest-700 active:scale-95"
                  : "cursor-not-allowed opacity-35"
              )}
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

      {/* Horizontal Swiper Carousel Track */}
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        tabIndex={0}
        aria-label="Pack formats scroll track. Use arrow keys to navigate."
        className={cn(
          "no-scrollbar relative mt-8 flex gap-5 overflow-x-auto pb-4 pt-2",
          "snap-x snap-mandatory scroll-smooth focus-visible:outline-none",
          "cursor-grab active:cursor-grabbing select-none"
        )}
      >
        {displayedPacks.map((pack, idx) => {
          const isHero = pack.isHero;
          const quoteText = `${waMessage.quote(pack.productName)} (Pack format: ${pack.size} ${pack.format})`;

          return (
            <article
              key={pack.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${pack.size} ${pack.productName} in ${pack.format}`}
              className={cn(
                "group relative flex w-[300px] sm:w-[335px] shrink-0 snap-start flex-col justify-between rounded-2xl border transition-all duration-200",
                "bg-paper p-5 sm:p-6",
                isHero
                  ? "border-forest-600/40 ring-1 ring-forest-600/20 bg-gradient-to-b from-forest-50/40 via-paper to-paper"
                  : "border-line hover:border-line-strong"
              )}
            >
              {/* Card Header: Oil Category Tag & Badge */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  {/* Oil category tag with dot */}
                  <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-2">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-2 rounded-full",
                        pack.accent === "soy" && "bg-forest-600",
                        pack.accent === "mustard" && "bg-amber-600",
                        pack.accent === "palm" && "bg-sky-600"
                      )}
                    />
                    {pack.productName}
                  </span>

                  {/* Badge */}
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide",
                      isHero
                        ? "border border-forest-600/30 bg-forest-600/10 text-forest-800"
                        : "border border-line bg-paper-2 text-ink-3"
                    )}
                  >
                    {pack.badge}
                  </span>
                </div>

                {/* Staged Product Shot with Ground Shadow */}
                <div className="relative mt-5 flex h-52 sm:h-60 w-full items-end justify-center rounded-xl bg-paper-2/50 border border-line-subtle px-4 pb-3 pt-6">
                  {/* Subtle radial ground shadow */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-1/2 h-[7%] w-[58%] -translate-x-1/2 rounded-[50%]"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(23,26,18,0.22) 0%, rgba(23,26,18,0.08) 45%, rgba(23,26,18,0) 72%)",
                    }}
                  />

                  <div className="relative h-full w-auto transition-transform duration-300 ease-out-expo group-hover:-translate-y-1.5">
                    <Image
                      src={pack.image}
                      alt={pack.alt}
                      width={pack.width}
                      height={pack.height}
                      sizes="(max-width: 640px) 260px, 320px"
                      priority={idx < 2}
                      className="h-full w-auto object-contain drop-shadow-none"
                    />
                  </div>
                </div>

                {/* Pack Capacity & Specification */}
                <div className="mt-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink tnum">
                      {pack.size}
                    </h3>
                    <span className="text-[0.8125rem] font-medium text-ink-3">
                      {pack.format}
                    </span>
                  </div>

                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-2">
                    {pack.detail}
                  </p>
                </div>

                {/* Best For Note */}
                <div className="mt-3.5 rounded-lg border border-line-subtle bg-paper-2/50 p-2.5">
                  <p className="text-[0.75rem] font-medium uppercase tracking-wider text-ink-4">
                    Best for
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink">
                    {pack.bestFor}
                  </p>
                </div>

                {/* Spec Tag Pills */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {pack.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded border border-line bg-paper-2 px-2 py-0.5 text-[0.6875rem] font-medium text-ink-3"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: WhatsApp Quote Action */}
              <div className="mt-5 border-t border-line pt-4">
                <a
                  href={whatsappLink(quoteText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-[0.8125rem] font-medium transition-all duration-150",
                    isHero
                      ? "border-forest-700 bg-forest-800 text-paper hover:bg-forest-900 active:scale-[0.99]"
                      : "border-line-strong bg-paper text-ink hover:border-forest-800 hover:bg-forest-50 active:scale-[0.99]"
                  )}
                >
                  <WhatsAppIcon className="size-4 shrink-0 text-[#25D366]" />
                  <span>Enquire about {pack.size}</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Track Progress and Pagination Bar */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-line pt-5">
        {/* Progress track */}
        <div className="flex items-center gap-3">
          <div className="relative h-1.5 w-36 sm:w-48 overflow-hidden rounded-full bg-paper-3">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-forest-700"
              style={{ width: `${Math.max(12, scrollProgress)}%` }}
              transition={{ ease: "easeOut", duration: 0.15 }}
            />
          </div>
          <span className="tnum text-[0.75rem] text-ink-4">
            Slide {activeIndex + 1} of {displayedPacks.length}
          </span>
        </div>

        {/* Quick jump dot pills */}
        <div className="flex items-center gap-1.5">
          {displayedPacks.map((pack, i) => (
            <button
              key={pack.id}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Jump to ${pack.size} ${pack.productName}`}
              className={cn(
                "size-2 rounded-full transition-all duration-200",
                i === activeIndex
                  ? "w-6 bg-forest-700"
                  : "bg-paper-3 hover:bg-ink-3"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
