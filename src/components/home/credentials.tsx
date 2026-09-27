"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Container, Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Interactive Pack Credentials Showcase.
 *
 * Every credential is physically printed on the authentic packaging artwork.
 * Allows trade buyers, retailers, and consumers to inspect what each certification
 * requires, what parameters are tested, and where to verify it on the tin or bottle.
 */

interface CredentialItem {
  id: string;
  title: string;
  shortTitle: string;
  authority: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  verifiedSpecs: string[];
  packPlacement: string;
  kind: "image" | "type";
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  h?: string;
  line1?: string;
  line2?: string;
}

/**
 * Every line here comes from the company profile or the pack labels. Do not
 * add process detail (temperatures, test parameters, HACCP, traceability)
 * unless the company can show the document behind it.
 */
const CREDENTIALS: CredentialItem[] = [
  {
    id: "fssai",
    title: "Central FSSAI Licence",
    shortTitle: "FSSAI",
    authority: "Food Safety and Standards Authority of India",
    category: "Food safety licence",
    badge: "Central licence",
    tagline: "Licensed at central level for edible oil.",
    description:
      "North West Oils Private Limited holds a central licence from the Food Safety and Standards Authority of India. The oils are lab tested for purity and freshness, in line with FSSAI standards.",
    verifiedSpecs: [
      "Central FSSAI licence",
      "FSSAI logo and licence number on every pack",
      "Lab tested for purity and freshness",
    ],
    packPlacement: "On the front label of every tin, jar and bottle, beside the licence number.",
    kind: "image",
    src: "/marks/fssai.webp",
    width: 400,
    height: 184,
    alt: "FSSAI mark",
    h: "h-9",
  },
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    shortTitle: "ISO 9001",
    authority: "International Organization for Standardization",
    category: "Quality management",
    badge: "Certified",
    tagline: "Certified quality management system.",
    description:
      "The company is certified to ISO 9001:2015, the international standard for quality management systems, and applies strict quality control measures across the range.",
    verifiedSpecs: [
      "Quality management system certified",
      "Strict quality control measures",
      "Declared on every pack",
    ],
    packPlacement: "Printed on every pack: \"An ISO certified Co. ISO 9001:2015\".",
    kind: "type",
    line1: "ISO",
    line2: "9001:2015",
  },
  {
    id: "iso-22000",
    title: "ISO 22000:2018",
    shortTitle: "ISO 22000",
    authority: "International Organization for Standardization",
    category: "Food safety management",
    badge: "Certified",
    tagline: "Certified food safety management system.",
    description:
      "The company is certified to ISO 22000:2018, the international standard for food safety management systems. The oils are processed under strict quality control and hygienic conditions.",
    verifiedSpecs: [
      "Food safety management system certified",
      "Hygienic processing conditions",
      "Declared on every pack",
    ],
    packPlacement: "Printed on every pack, beside ISO 9001:2015.",
    kind: "type",
    line1: "ISO",
    line2: "22000:2018",
  },
  {
    id: "fortified",
    title: "+F Fortified",
    shortTitle: "Fortified (+F)",
    authority: "FSSAI fortification standard",
    category: "Fortification",
    badge: "Vitamins A & D",
    tagline: "Fortified with vitamins A and D.",
    description:
      "All three North West oils (soyabean, mustard and palmolein) are fortified with vitamins A and D and carry FSSAI's +F fortification logo.",
    verifiedSpecs: [
      "Fortified with vitamins A and D",
      "FSSAI +F logo on the pack",
      "Nutrition information printed on every tin",
    ],
    packPlacement: "On the front label, beside the product name.",
    kind: "image",
    src: "/marks/fortified.webp",
    width: 248,
    height: 265,
    alt: "+F fortified mark",
    h: "h-11",
  },
  {
    id: "veg",
    title: "100% Vegetarian",
    shortTitle: "Vegetarian",
    authority: "FSSAI labelling rules",
    category: "Food declaration",
    badge: "Green mark",
    tagline: "All three oils are 100% vegetarian.",
    description:
      "Mustard, soyabean and palmolein oil are plant oils. Every North West pack carries the green vegetarian mark and the words \"100% Veg\".",
    verifiedSpecs: [
      "100% vegetarian",
      "Green mark on every pack",
      "Mustard, soyabean and palmolein",
    ],
    packPlacement: "At the top right of every pack label.",
    kind: "image",
    src: "/marks/veg.webp",
    width: 290,
    height: 276,
    alt: "Green vegetarian mark",
    h: "h-10",
  },
  {
    id: "made-in-india",
    title: "Make in India",
    shortTitle: "Made in India",
    authority: "Government of India initiative",
    category: "Origin",
    badge: "South Delhi",
    tagline: "Packed in India since 1973.",
    description:
      "North West oils are packed in India by North West Oils Private Limited, from its registered office in South Delhi. The Make in India lion is printed on the packs.",
    verifiedSpecs: [
      "Make in India lion on every pack",
      "Registered office in South Delhi",
      "Supplied across India",
    ],
    packPlacement: "Beside the pack size, at the foot of the label.",
    kind: "image",
    src: "/marks/made-in-india.webp",
    width: 400,
    height: 193,
    alt: "Made in India mark",
    h: "h-8",
  },
];

const CORPORATE_REGISTRATIONS = [
  { label: "MCA Approved", detail: "Incorporated under Ministry of Corporate Affairs" },
  { label: "GST Registered", detail: "Registered under central GST" },
  { label: "MSME Registered", detail: "Micro enterprise, Ministry of MSME" },
  { label: "9-Month Shelf Life", detail: "Best before nine months from packaging" },
];

export function Credentials() {
  const [activeId, setActiveId] = useState<string>("fssai");
  const reduced = useReducedMotion();

  const activeCredential =
    CREDENTIALS.find((c) => c.id === activeId) ?? CREDENTIALS[0];

  return (
    <section
      id="credentials"
      className="border-b border-line bg-paper"
      aria-labelledby="credentials-heading"
    >
      <Container>
        <div className="pt-14 pb-8 lg:pt-18 lg:pb-10">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
            <div className="lg:col-span-8">
              <Reveal kind="fade">
                <Eyebrow>Statutory &amp; Quality Credentials</Eyebrow>
              </Reveal>
              <h2
                id="credentials-heading"
                className="display-2 mt-5 text-ink"
              >
                Licensed, certified, registered.
              </h2>
              <p className="body-text mt-4 max-w-2xl">
                Every mark below is printed on the packs themselves, so a retailer,
                distributor or buyer can check it on any tin, jar or bottle.
              </p>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Reveal kind="rise" delay={0.1}>
                <div className="flex items-center gap-4 rounded-xl border border-line bg-white/70 p-4 backdrop-blur-xs">
                  <Image
                    src="/marks/pure-safe.webp"
                    alt="Pure & Safe: 100% pure oil seal from the North West pack"
                    width={400}
                    height={400}
                    sizes="64px"
                    className="size-14 shrink-0 object-contain"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[1rem] font-semibold text-ink">
                        Pure &amp; Safe Seal
                      </span>
                      <span className="rounded-full bg-forest-100 px-2 py-0.5 text-[0.6875rem] font-medium text-forest-800">
                        100% Pure
                      </span>
                    </div>
                    <p className="mt-1 text-[0.8125rem] leading-snug text-ink-3">
                      Lab tested, with a 100% purity guarantee printed on the pack.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[0.75rem] font-medium uppercase tracking-wider text-ink-4">
              Select a credential to inspect on-pack details:
            </p>

            <RevealGroup
              step={0.04}
              className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3"
            >
              {CREDENTIALS.map((item) => {
                const isSelected = item.id === activeId;

                return (
                  <RevealItem key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        "group relative flex w-full flex-col items-center rounded-xl border p-3.5 text-center cursor-pointer transition-all duration-200 select-none",
                        "active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800/40",
                        isSelected
                          ? "border-forest-800 bg-white ring-1 ring-forest-800/20 shadow-xs"
                          : "border-line bg-white/50 hover:border-forest-800/40 hover:bg-white"
                      )}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? (
                        <motion.span
                          layoutId={reduced ? undefined : "active-mark-pill"}
                          className="absolute -top-2 rounded-full bg-forest-800 px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-paper"
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                          Inspecting
                        </motion.span>
                      ) : null}

                      <span className="flex h-14 w-full items-center justify-center rounded-lg bg-paper-2/60 px-2 transition-colors duration-200 group-hover:bg-paper-2">
                        {item.kind === "image" && item.src ? (
                          <Image
                            src={item.src}
                            alt={item.alt ?? item.title}
                            width={item.width ?? 300}
                            height={item.height ?? 150}
                            sizes="120px"
                            className={cn(
                              item.h ?? "h-8",
                              "w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                            )}
                          />
                        ) : (
                          <span className="flex flex-col leading-none text-forest-900 transition-transform duration-200 group-hover:scale-105">
                            <span className="font-display text-[1.125rem] font-bold tracking-[0.02em]">
                              {item.line1}
                            </span>
                            <span className="tnum mt-1 text-[0.6875rem] font-semibold tracking-[0.06em] text-forest-700">
                              {item.line2}
                            </span>
                          </span>
                        )}
                      </span>

                      <span className="mt-2.5 block text-[0.8125rem] font-semibold text-ink">
                        {item.shortTitle}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.6875rem] text-ink-3">
                        {item.badge}
                      </span>
                    </button>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCredential.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{
                  duration: reduced ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl border border-line-strong bg-white p-6 sm:p-8"
              >
                <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
                  <div className="flex flex-col items-start border-b border-line pb-6 lg:col-span-4 lg:border-b-0 lg:border-r lg:pr-8 lg:pb-0">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-forest-800">
                      <span className="size-1.5 rounded-full bg-forest-600" />
                      {activeCredential.category}
                    </span>

                    <h3 className="font-display text-[1.5rem] font-medium leading-tight text-ink mt-3">
                      {activeCredential.title}
                    </h3>
                    <p className="mt-1 text-[0.8125rem] font-medium text-forest-800">
                      {activeCredential.authority}
                    </p>

                    <div className="mt-6 flex h-20 w-44 items-center justify-center rounded-xl border border-line bg-paper-2/40 p-3">
                      {activeCredential.kind === "image" && activeCredential.src ? (
                        <Image
                          src={activeCredential.src}
                          alt={activeCredential.alt ?? activeCredential.title}
                          width={activeCredential.width ?? 300}
                          height={activeCredential.height ?? 150}
                          sizes="160px"
                          className={cn(activeCredential.h ?? "h-10", "w-auto object-contain")}
                        />
                      ) : (
                        <div className="flex flex-col items-center leading-none text-forest-900">
                          <span className="font-display text-[1.5rem] font-bold tracking-[0.02em]">
                            {activeCredential.line1}
                          </span>
                          <span className="tnum mt-1 text-[0.8125rem] font-semibold tracking-[0.06em] text-forest-700">
                            {activeCredential.line2}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-[0.75rem] text-forest-700">
                      <svg
                        viewBox="0 0 16 16"
                        className="size-4 shrink-0 text-forest-600"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">The mark on the pack</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <span className="text-[0.75rem] font-medium uppercase tracking-wider text-ink-4">
                      What it means
                    </span>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                      {activeCredential.description}
                    </p>

                    <div className="mt-6">
                      <span className="text-[0.8125rem] font-semibold text-ink">
                        What it covers:
                      </span>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {activeCredential.verifiedSpecs.map((spec) => (
                          <li
                            key={spec}
                            className="flex items-start gap-2.5 text-[0.875rem] text-ink-2"
                          >
                            <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-800 text-[0.625rem]">
                              ✓
                            </span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-t border-line pt-6 lg:col-span-3 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                    <div>
                      <span className="text-[0.75rem] font-medium uppercase tracking-wider text-ink-4">
                        Pack Placement
                      </span>
                      <div className="mt-3 rounded-lg border border-line bg-paper p-3.5">
                        <p className="text-[0.8125rem] leading-relaxed text-ink-2">
                          {activeCredential.packPlacement}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <TextLink
                        href={whatsappLink(waMessage.documents)}
                        icon={<WhatsAppIcon className="size-[1em]" />}
                        withArrow={false}
                        className="text-[0.8125rem]"
                      >
                        Request documentation
                      </TextLink>
                      <TextLink href="/quality" className="text-[0.8125rem]">
                        Read quality sequence
                      </TextLink>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Reveal
          kind="fade"
          className="border-t border-line py-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {CORPORATE_REGISTRATIONS.map((r) => (
                <div key={r.label} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-forest-600"
                  />
                  <span className="text-[0.8125rem] font-semibold text-ink">
                    {r.label}
                  </span>
                  <span className="hidden text-[0.75rem] text-ink-3 sm:inline">
                    ({r.detail})
                  </span>
                </div>
              ))}
            </div>

            <TextLink href="/quality" className="text-[0.8125rem] shrink-0">
              Explore 5-stage laboratory sequence
            </TextLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
