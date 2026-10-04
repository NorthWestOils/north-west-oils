"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { company } from "@/data/company";
import { ease } from "@/lib/motion";


const step = {
  eyebrow: 0.05,
  line1: 0.12,
  line2: 0.20,
  deva: 0.28,
  lede: 0.36,
  cta: 0.44,
  trust: 0.52,
  packs: 0.22,
};

const rise = (delay: number, reduced: boolean | null) => ({
  "data-reveal": "",
  initial: reduced ? false : ({ opacity: 0, y: 16 } as const),
  animate: { opacity: 1, y: 0 },
  transition: reduced
    ? { duration: 0 }
    : { duration: 0.7, ease: ease.out, delay },
});

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-forest-950 pt-20 text-paper lg:pt-24"
      aria-labelledby="hero-heading"
    >
      {/* Rich Atmospheric Lighting & Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_50%,#0E5A33_0%,rgba(14,90,51,0.4)_40%,rgba(3,32,20,0)_72%)]"
      />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center py-10 lg:py-12">
        <div className="grid flex-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          {/* Left Column: Brand Statement & Procurement CTAs */}
          <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:pr-4 lg:text-left">
            {/* National Manufacturer Eyebrow */}
            <motion.div
              {...rise(step.eyebrow, reduced)}
              className="inline-flex items-center gap-2 rounded-full border border-forest-700/50 bg-forest-900/60 px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="label text-forest-200">
                Direct Mill Supply
              </span>
              <span className="text-[0.6875rem] font-semibold text-gold-500">
                Est. {company.established}
              </span>
            </motion.div>

            {/* Display Headline */}
            <h1 id="hero-heading" className="display-1 mt-5 text-paper">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  data-reveal=""
                  initial={{ y: reduced ? 0 : "45%", opacity: reduced ? 1 : 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.85, ease: ease.soft, delay: step.line1 }}
                >
                  We sell the oil
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  data-reveal=""
                  initial={{ y: reduced ? 0 : "45%", opacity: reduced ? 1 : 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.85, ease: ease.soft, delay: step.line2 }}
                >
                  we cook with.
                </motion.span>
              </span>
            </h1>

            {/* Devanagari Brand Promise */}
            <motion.p
              {...rise(step.deva, reduced)}
              lang="hi"
              className="deva mt-3 text-base font-normal text-gold-500/90 sm:text-lg"
            >
              {company.tagline.hi}
            </motion.p>

            {/* Concise Uncluttered Lede */}
            <motion.p
              {...rise(step.lede, reduced)}
              className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-forest-200 sm:text-[1rem] lg:mx-0"
            >
              Single-origin soyabean, mustard, and palmolein oils. Packaged from 500 ML retail bottles to 15 KG commercial tinplates for kitchens across India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...rise(step.cta, reduced)}
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <ButtonLink
                href={whatsappLink(waMessage.trade)}
                variant="whatsapp"
                className="justify-center"
              >
                Get direct bulk quote
              </ButtonLink>
              <ButtonLink
                href="/products"
                variant="outline-light"
                withArrow
                className="justify-center"
              >
                Explore all 3 oils
              </ButtonLink>
            </motion.div>
          </div>

          {/* Right Column: Grounded Editorial Showcase */}
          <motion.div
            className="relative lg:col-span-6 lg:flex lg:flex-col lg:items-center lg:justify-center"
            data-reveal=""
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    duration: 0.8,
                    ease: ease.out,
                    delay: step.packs,
                  }
            }
          >

            {/* Grounded Still Composition Container */}
            <div className="relative mx-auto flex items-center justify-center w-full max-w-md lg:max-w-xl select-none py-2 lg:py-4">
              <Image
                src="/products/soyabean-15kg-tin.webp"
                alt="North West Soyabean Refined Oil 15 kg food-grade tin"
                width={771}
                height={1150}
                priority
                loading="eager"
                unoptimized
                fetchPriority="high"
                sizes="(max-width: 1023px) 90vw, 45vw"
                className="h-auto max-h-130 sm:max-h-145 lg:max-h-160 xl:max-h-170 w-auto select-none object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Foot: Clean Executive Trust Strip */}
      <div className="relative z-10 border-t border-white/10 bg-forest-950/70 backdrop-blur-md py-3.5">
        <div className="container-page flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-xs text-forest-300">
          <div>FSSAI Central Licence: <span className="text-paper font-medium">{company.fssaiLicence}</span></div>
          <div>Certified ISO 9001 &amp; ISO 22000</div>
          <div>100% Pure Plant Oils</div>
          <div>Pan-India Bulk &amp; Tanker Supply</div>
        </div>
      </div>
    </section>
  );
}
