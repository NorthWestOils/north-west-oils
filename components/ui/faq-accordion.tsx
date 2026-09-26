"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FaqItemData {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: readonly FaqItemData[] | FaqItemData[];
  defaultOpenIndex?: number;
  className?: string;
}

export function FaqItem({
  faq,
  index,
  defaultOpen = false,
  className,
}: {
  faq: FaqItemData;
  index: number;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduced = useReducedMotion();
  const id = useId();
  const buttonId = `${id}-q`;
  const panelId = `${id}-a`;

  return (
    <div
      className={cn(
        "border-t border-line py-5 sm:py-6 first:border-t-0 lg:first:border-t last:border-b",
        className
      )}
    >
      <button
        id={buttonId}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full cursor-pointer select-none items-start justify-between gap-5 text-left transition-colors focus-visible:outline-none"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="flex items-start gap-4 sm:gap-5">
          <span className="tnum mt-0.5 select-none font-display text-[1rem] sm:text-[1.125rem] text-forest-700/60 transition-colors duration-200 group-hover:text-forest-800">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "font-display text-[1.0625rem] sm:text-[1.1875rem] font-medium leading-snug transition-colors duration-200",
              open ? "text-forest-900" : "text-ink group-hover:text-forest-800"
            )}
          >
            {faq.question}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out-expo",
            open
              ? "border-forest-800 bg-forest-800 text-paper"
              : "border-line text-ink-3 group-hover:border-forest-700/50 group-hover:text-forest-800"
          )}
        >
          <motion.svg
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="6" y1="2" x2="6" y2="10" />
            <line x1="2" y1="6" x2="10" y2="6" />
          </motion.svg>
        </span>
      </button>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{
          duration: reduced ? 0 : 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-hidden"
      >
        <p className="mt-3.5 pl-9 sm:pl-10 pb-1 text-[0.9375rem] sm:text-[1rem] leading-relaxed text-ink-2 max-w-2xl">
          {faq.answer}
        </p>
      </motion.div>
    </div>
  );
}

export function FaqAccordion({
  items,
  defaultOpenIndex = 0,
  className,
}: FaqAccordionProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <FaqItem
          key={item.question}
          faq={item}
          index={i}
          defaultOpen={i === defaultOpenIndex}
        />
      ))}
    </div>
  );
}


