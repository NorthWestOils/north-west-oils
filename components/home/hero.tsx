"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { company } from "@/data/company";
import { ease } from "@/lib/motion";

/**
 * Hero entrance choreography.
 *
 * Everything runs off one clock so the sequence reads as a single move: the
 * eyebrow settles, the headline rises out from under its own clip edge line by
 * line, the Hindi line and supporting copy follow, and the pack composition
 * comes to rest last. Nothing travels more than about 26px.
 */
const step = {
  eyebrow: 0.06,
  line1: 0.14,
  line2: 0.22,
  deva: 0.34,
  lede: 0.42,
  cta: 0.5,
  packs: 0.24,
};

const rise = (delay: number, reduced: boolean | null) => ({
  "data-reveal": "",
  initial: reduced ? false : ({ opacity: 0, y: 14 } as const),
  animate: { opacity: 1, y: 0 },
  transition: reduced
    ? { duration: 0 }
    : { duration: 0.65, ease: ease.out, delay },
});

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden bg-forest-950 pt-18 text-paper lg:pt-20"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_80%_at_74%_54%,#0E5A33_0%,rgba(14,90,51,0.35)_42%,rgba(3,32,20,0)_70%)]"
      />

      <div className="container-page relative flex flex-1 flex-col justify-center">
        <div className="grid flex-1 items-center gap-y-8 py-10 lg:grid-cols-12 lg:gap-x-8 lg:py-0">
          <div className="lg:col-span-5">
            {/* The kicker is the h1: it names what the company sells, which
                the brand line below does not. The legal name is already in
                the header and the footer. */}
            <motion.h1
              id="hero-heading"
              {...rise(step.eyebrow, reduced)}
              className="eyebrow flex items-center gap-x-3 text-forest-300"
            >
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-forest-400/60" />
              <span>
                Soyabean, mustard &amp; palmolein oil{" "}
                <span aria-hidden="true" className="text-forest-400/60">
                  ·
                </span>{" "}
                <span className="whitespace-nowrap text-gold-500">
                  Since {company.established}
                </span>
              </span>
            </motion.h1>

            <p className="display-1 mt-6 text-paper">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  data-reveal=""
                  initial={{ y: reduced ? 0 : "42%", opacity: reduced ? 1 : 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.85, ease: ease.soft, delay: step.line1 }}
                >
                  We sell the oil
                </motion.span>
              </span>{" "}
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  data-reveal=""
                  initial={{ y: reduced ? 0 : "42%", opacity: reduced ? 1 : 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.85, ease: ease.soft, delay: step.line2 }}
                >
                  we cook with.
                </motion.span>
              </span>
            </p>

            <motion.p
              {...rise(step.deva, reduced)}
              lang="hi"
              className="deva mt-7 text-[1.375rem] leading-snug text-gold-500 sm:text-[1.625rem]"
            >
              {company.tagline.hi}
            </motion.p>

            <motion.div {...rise(step.lede, reduced)} className="mt-7 max-w-lg">
              <p className="eyebrow flex items-center gap-x-3 text-gold-500">
                <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gold-500/60" />
                Our flagship
              </p>
              <p className="mt-3 font-display text-[1.625rem] leading-tight font-medium tracking-[-0.02em] text-paper sm:text-[1.875rem]">
                Soyabean Refined Oil
              </p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-forest-100">
                Light, neutral and fortified with vitamins A and D, in 15 KG
                tins. Alongside it, Kachi Ghani mustard and refined palmolein,
                all tested and packed for homes, shelves and kitchens that cook
                by the tin.
              </p>
            </motion.div>

            <motion.div
              {...rise(step.cta, reduced)}
              className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center"
            >
              <ButtonLink
                href={whatsappLink(waMessage.trade)}
                variant="whatsapp"
              >
                Message us on WhatsApp
              </ButtonLink>
              <ButtonLink
                href="/products/soyabean-refined-oil"
                variant="outline-light"
                withArrow
              >
                Soyabean oil
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-7 lg:-mr-[2%] lg:self-center"
            data-reveal=""
            initial={reduced ? false : { opacity: 0, y: 26, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    default: {
                      type: "spring",
                      stiffness: 150,
                      damping: 26,
                      mass: 1,
                      delay: step.packs,
                    },
                    opacity: { duration: 0.45, ease: ease.out, delay: 0.08 },
                  }
            }
          >
            <div className="relative mx-auto w-full max-w-[32rem] lg:max-w-none">
              <Image
                src="/images/soyabean-scene.webp"
                alt="North West Soyabean Refined Oil in a 15 kg food-grade tin, with soybeans and soy leaves"
                width={1400}
                height={1013}
                priority
                fetchPriority="high"
                sizes="(max-width: 1023px) 88vw, 52vw"
                className="h-auto w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
