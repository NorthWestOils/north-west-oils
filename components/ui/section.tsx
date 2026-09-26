import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Comp = "div",
  ...rest
}: { as?: ElementType; className?: string; children: ReactNode } & ComponentPropsWithoutRef<"div">) {
  return (
    <Comp className={cn("container-page", className)} {...rest}>
      {children}
    </Comp>
  );
}

type Tone = "paper" | "paper-2" | "forest" | "white";

const toneStyles: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  white: "bg-white text-ink",
  forest: "bg-forest-900 text-paper",
};

export function Section({
  tone = "paper",
  tight = false,
  className,
  children,
  ...rest
}: {
  tone?: Tone;
  tight?: boolean;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={cn(
        "scroll-mt-20 lg:scroll-mt-24",
        tight ? "section-y-sm" : "section-y",
        toneStyles[tone],
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

/**
 * The small uppercase label that opens a section. Pass `as="h2"` where the
 * kicker is the only thing naming the section, so the heading outline does not
 * skip it.
 */
export function Eyebrow({
  className,
  children,
  tone = "dark",
  as: Comp = "span",
  style,
  ...rest
}: {
  className?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  as?: ElementType;
} & ComponentPropsWithoutRef<"span">) {
  return (
    <Comp
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        tone === "light" ? "text-forest-300" : "text-ink-3",
        className
      )}
      style={style}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-6", tone === "light" ? "bg-forest-400" : "bg-line-strong")}
        style={style?.color ? { backgroundColor: style.color } : undefined}
      />
      {children}
    </Comp>
  );
}
