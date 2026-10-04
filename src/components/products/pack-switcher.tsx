"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Accent, Pack } from "@/data/products";
import { accentVar } from "@/data/products";
import { ease, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Pack-size switcher.
 *
 * Every pack stays mounted and stacked in the same spot; only opacity and a
 * few pixels of travel change. That means the packs are already decoded when
 * you tap a size — the switch is instant — and, because each one animates
 * towards a target derived from state rather than through an exit animation,
 * an interrupted transition can never leave the wrong pack on screen.
 *
 * The packs are real photography, so nothing here scales, skews or rotates the
 * artwork beyond a hair of settle.
 */
export function PackSwitcher({
  packs,
  accent,
  priority = false,
  className,
}: {
  packs: Pack[];
  accent: Accent;
  priority?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const uid = useId();
  const reduced = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const active = packs[index];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = packs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${active.id}`}
        className="relative flex h-64 items-end justify-center sm:h-84 lg:h-104"
      >

        {packs.map((pack, i) => {
          const isActive = i === index;
          return (
            <motion.div
              key={pack.id}
              aria-hidden={!isActive}
              className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center"
              initial={false}
              animate={
                reduced
                  ? { opacity: isActive ? 1 : 0 }
                  : {
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 16,
                      scale: isActive ? 1 : 0.975,
                    }
              }
              transition={
                reduced
                  ? { duration: 0.15 }
                  : { ...spring.soft, opacity: { duration: 0.26, ease: ease.out } }
              }
              style={{ pointerEvents: "none" }}
            >
              <Image
                src={pack.image}
                alt={pack.alt}
                width={pack.width}
                height={pack.height}
                sizes="(max-width: 640px) 45vw, (max-width: 1023px) 32vw, 24vw"
                priority={priority && i === 0}
                loading={priority && i === 0 ? "eager" : "lazy"}
                unoptimized
                className="h-full w-auto object-contain"
              />
            </motion.div>
          );
        })}
      </div>

      <div
        role="tablist"
        aria-label="Pack size"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="mt-9 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 border-y border-line py-2"
      >
        {packs.map((pack, i) => {
          const selected = i === index;
          return (
            <button
              key={pack.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              id={`${uid}-tab-${pack.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={cn(
                "tnum relative rounded-full px-4 py-2.5 text-[0.875rem] transition-colors duration-200",
                selected ? "text-ink" : "text-ink-3 hover:text-ink"
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={reduced ? undefined : `${uid}-pack-indicator`}
                  className="absolute inset-0 rounded-full border border-line-strong bg-white"
                  transition={spring.snappy}
                />
              ) : null}
              <span className="relative">{pack.label}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-5 min-h-6 text-center text-sm text-ink-3">
        <span className="font-medium" style={{ color: accentVar[accent] }}>
          {active.label}
        </span>
        {", "}
        {active.format}
      </p>
    </div>
  );
}
