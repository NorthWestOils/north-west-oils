"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { company } from "@/data/company";
import { ease, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/quality" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Routes that open on a dark hero. Over one of these the header starts in its
 * light treatment and switches to the paper bar as soon as you scroll.
 */
const DARK_HERO_ROUTES = new Set(["/"]);

export function Header() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  /* One state flip at the threshold, rather than a render on every frame. */
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    if (!open) return;
    const { style } = document.body;
    const prev = style.overflow;
    style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Light treatment only while sitting on an unscrolled dark hero. */
  const onDark = DARK_HERO_ROUTES.has(pathname) && !scrolled;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-100 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:rounded-full focus:bg-forest-800 focus:px-5 focus:py-2.5 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo",
          scrolled
            ? "border-b border-line bg-paper/88 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-page flex h-18 items-center justify-between gap-6 lg:h-20">
          <Link
            href="/"
            className="-ml-1 flex items-center gap-3"
            aria-label={`${company.legalName}, home`}
          >
            <Image
              src="/images/logo.webp"
              alt=""
              width={513}
              height={760}
              priority
              sizes="56px"
              className="h-9 w-auto shrink-0 lg:h-10"
            />
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-display text-[1.0625rem] font-medium tracking-[-0.015em] transition-colors duration-300 lg:text-lg",
                  onDark ? "text-paper" : "text-ink"
                )}
              >
                North West Oils
              </span>
              <span
                className={cn(
                  "mt-1 text-[0.6875rem] tracking-[0.13em] uppercase transition-colors duration-300",
                  onDark ? "text-forest-300" : "text-ink-3"
                )}
              >
                Est. {company.established}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-200",
                        onDark
                          ? active
                            ? "text-paper"
                            : "text-forest-200 hover:text-paper"
                          : active
                            ? "text-ink"
                            : "text-ink-2 hover:text-ink"
                      )}
                    >
                      {item.label}
                      {active ? (
                        <motion.span
                          layoutId={reduced ? undefined : "nav-underline"}
                          className={cn(
                            "absolute inset-x-3.5 -bottom-px h-px",
                            onDark ? "bg-gold-500" : "bg-forest-700"
                          )}
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <ButtonLink
              href={whatsappLink(waMessage.general)}
              size="sm"
              variant="whatsapp"
            >
              WhatsApp us
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              "-mr-2 flex size-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden",
              onDark ? "text-paper" : "text-ink"
            )}
          >
            <span className="flex w-5 flex-col gap-1.25">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-3/5 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-60 lg:hidden"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: reduced ? 0 : duration.sm, ease: ease.out }}
            />

            <motion.div
              className="absolute inset-x-0 top-0 flex max-h-dvh flex-col rounded-b-xl bg-paper"
              variants={{
                hidden: { y: "-100%" },
                show: { y: "0%" },
              }}
              transition={{ duration: reduced ? 0 : 0.5, ease: ease.soft }}
            >
              <div className="container-page flex h-18 shrink-0 items-center justify-between">
                <span className="font-display text-[1.0625rem] font-medium text-ink">
                  North West Oils
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="-mr-2 flex size-11 items-center justify-center rounded-full text-ink"
                >
                  <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M4 4l12 12M16 4L4 16" />
                  </svg>
                </button>
              </div>

              <motion.nav
                aria-label="Mobile"
                className="container-page overflow-y-auto pt-2 pb-8"
                variants={{
                  hidden: {},
                  show: reduced
                    ? {}
                    : { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
                }}
              >
                <ul className="flex flex-col">
                  {NAV.map((item) => (
                    <motion.li
                      key={item.href}
                      variants={
                        reduced
                          ? { hidden: {}, show: {} }
                          : {
                              hidden: { opacity: 0, y: 12 },
                              show: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.4, ease: ease.out },
                              },
                            }
                      }
                      className="border-b border-line"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-4 font-display text-[1.75rem] tracking-[-0.02em] text-ink"
                      >
                        {item.label}
                        {isActive(item.href) ? (
                          <span className="text-[0.6875rem] tracking-[0.15em] text-forest-600 uppercase">
                            Viewing
                          </span>
                        ) : null}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  variants={
                    reduced
                      ? { hidden: {}, show: {} }
                      : {
                          hidden: { opacity: 0, y: 12 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.4, ease: ease.out },
                          },
                        }
                  }
                  className="mt-7 flex flex-col gap-3"
                >
                  <ButtonLink
                    href={whatsappLink(waMessage.general)}
                    variant="whatsapp"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    WhatsApp us
                  </ButtonLink>
                  <a
                    href={`tel:${company.contact.phone}`}
                    className="flex h-12 items-center justify-center rounded-full border border-line-strong text-[0.9375rem] text-ink"
                  >
                    {company.contact.phoneDisplay}
                  </a>
                </motion.div>
              </motion.nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
