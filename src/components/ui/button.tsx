import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Variant =
  | "solid"
  | "outline"
  | "outline-light"
  | "ghost"
  | "light"
  | "whatsapp";
type Size = "md" | "sm";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium cursor-pointer " +
  "transition-all duration-150 ease-out-expo select-none " +
  "active:translate-y-0.5 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800/40 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-55";

const sizes: Record<Size, string> = {
  md: "h-12 px-7 text-[0.9375rem]",
  sm: "h-10 px-5 text-[0.875rem]",
};

const variantStyles: Record<Variant, string> = {
  solid:
    "bg-forest-800 text-paper hover:bg-forest-950 active:bg-forest-950",
  outline:
    "border border-line-strong text-ink hover:border-forest-800 hover:bg-forest-50 active:bg-forest-100/70",
  /* For dark sections: a hairline that warms up rather than a block that flashes. */
  "outline-light":
    "border border-paper/30 text-paper hover:border-paper/70 hover:bg-paper/8 active:bg-paper/15",
  ghost: "text-ink hover:text-forest-700 active:text-forest-900",
  light:
    "bg-paper text-forest-950 hover:bg-white border border-transparent active:bg-paper-2",
  /* WhatsApp's own green, so the button is recognised before it is read. */
  whatsapp:
    "bg-[#1FA855] text-white hover:bg-[#178A44] active:bg-[#126E35]",
};

/** A small arrow that nudges on hover — the site's one button microinteraction. */
export function ButtonArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn(
        "size-[0.9em] shrink-0 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.75",
        className
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  withArrow = false,
  icon,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  /** Leading mark, e.g. the WhatsApp glyph. Defaults to WhatsAppIcon when variant="whatsapp". */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">) {
  const resolvedIcon = icon ?? (variant === "whatsapp" ? <WhatsAppIcon /> : null);
  const cls = cn(base, sizes[size], variantStyles[variant], className);
  const inner = (
    <>
      {resolvedIcon}
      <span>{children}</span>
      {withArrow ? <ButtonArrow /> : null}
    </>
  );

  /* Anything that leaves the app — or is not a page at all — goes out as a
     plain anchor, so the router never tries to prefetch a tel: link. */
  const external =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (external) {
    const offsite = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(offsite ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  withArrow = false,
  icon,
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  icon?: ReactNode;
} & ComponentPropsWithoutRef<"button">) {
  const resolvedIcon = icon ?? (variant === "whatsapp" ? <WhatsAppIcon /> : null);
  return (
    <button
      className={cn(base, sizes[size], variantStyles[variant], className)}
      {...rest}
    >
      {resolvedIcon}
      <span>{children}</span>
      {withArrow ? <ButtonArrow /> : null}
    </button>
  );
}

/**
 * A text link that draws its own underline on hover. Used for tertiary
 * actions, where a button would be too loud.
 */
export function TextLink({
  href,
  className,
  children,
  withArrow = true,
  icon,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
  icon?: ReactNode;
}) {
  const cls = cn(
    "group/btn inline-flex items-center gap-2 text-[0.9375rem] font-medium text-forest-800",
    className
  );
  const inner = (
    <>
      {icon}
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out-expo group-hover/btn:scale-x-100"
        />
      </span>
      {withArrow ? <ButtonArrow /> : null}
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
