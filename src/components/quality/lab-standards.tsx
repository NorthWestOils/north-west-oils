"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TEST_PARAMETERS = [
  {
    id: "ffa",
    tab: "Free fatty acids",
    name: "Free Fatty Acids (FFA)",
    fssaiLimit: "Max 0.50% (Refined), Max 1.50% (Mustard)",
    northWestStandard: "Consistently < 0.25% at filling",
    kitchenImpact:
      "Low acidity prevents smoke breakdown, off-flavours, and foaming during prolonged high-heat frying in commercial cookware and continuous namkeen fryers.",
    testingMethod: "Titrimetric analysis in certified national laboratory",
    frequency: "Every dispatch batch",
  },
  {
    id: "pv",
    tab: "Peroxide value",
    name: "Peroxide Value (PV)",
    fssaiLimit: "Max 10.0 meq O₂/kg",
    northWestStandard: "Consistently < 2.0 meq O₂/kg at release",
    kitchenImpact:
      "Measures primary oil freshness. Minimal peroxide value guarantees zero rancidity, fresh aroma, and full 9-month stable culinary shelf life.",
    testingMethod: "Iodometric titration under ISO 22000 hygiene protocol",
    frequency: "Every dispatch batch",
  },
  {
    id: "moisture",
    tab: "Moisture",
    name: "Moisture & Volatiles",
    fssaiLimit: "Max 0.10% by mass",
    northWestStandard: "Zero detectable moisture (< 0.05%)",
    kitchenImpact:
      "Zero water content eliminates dangerous oil splattering when moist food hits the fryer, ensuring safer kitchen operation and higher smoke points.",
    testingMethod: "Gravimetric hot air oven desiccation",
    frequency: "Pre-packaging tank clearance",
  },
  {
    id: "fortification",
    tab: "Fortification",
    name: "Vitamin A & D Fortification",
    fssaiLimit: "Vit A 6–9.9 μg RE/g, Vit D 0.11–0.165 μg/g",
    northWestStandard: "100% statutory target, +F verified",
    kitchenImpact:
      "Enriches daily cooking with essential fat-soluble vitamins, meeting national nutritional guidelines to support vision, immunity, and bone health.",
    testingMethod: "High-Performance Liquid Chromatography (HPLC)",
    frequency: "Fortification premix batch validation",
  },
  {
    id: "pungency",
    tab: "Pungency",
    name: "Mustard Pungency (Allyl Isothiocyanate)",
    fssaiLimit: "Min 0.20% by mass (Mustard)",
    northWestStandard: "Natural full-potency pungent extraction",
    kitchenImpact:
      "Preserves the signature sharp bite and robust aroma required for traditional Indian delicacies, pickles, tadka, and regional gravies.",
    testingMethod: "Gas chromatography and steam distillation",
    frequency: "Every mustard batch",
  },
  {
    id: "purity",
    tab: "Adulteration",
    name: "Adulteration & Toxins",
    fssaiLimit: "Strictly negative, zero tolerance",
    northWestStandard: "Zero adulterants guaranteed",
    kitchenImpact:
      "Argemone, mineral oil, and heavy metal screening protects consumer and kitchen health. Pure plant-origin vegetable oil with no filler oils or mineral contaminants.",
    testingMethod: "TLC and spectrophotometric chemical clearance",
    frequency: "Every bulk raw consignment",
  },
];

export function LabStandards() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = TEST_PARAMETERS[active];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const n = TEST_PARAMETERS.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <Section tone="paper-2" className="border-b border-line" aria-labelledby="lab-standards-heading">
      <Container>
        <SectionHeader
          id="lab-standards-heading"
          layout="split"
          eyebrow="Laboratory Standards"
          title="Tighter than the statutory limit."
          intro="Every batch is cleared against FSSAI limits and our own stricter release standard. Select a parameter to compare the two."
        />

        <div
          role="tablist"
          aria-label="Laboratory testing parameters"
          onKeyDown={onKeyDown}
          className="mt-14 no-scrollbar flex gap-8 overflow-x-auto overflow-y-hidden border-b border-line lg:mt-20"
        >
          {TEST_PARAMETERS.map((param, i) => {
            const selected = i === active;
            return (
              <button
                key={param.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`lab-tab-${param.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="lab-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "-mb-px shrink-0 border-b-2 pb-4 text-sm font-medium whitespace-nowrap transition-colors",
                  selected ? "border-forest-800 text-ink" : "border-transparent text-ink-3 hover:text-ink"
                )}
              >
                {param.tab}
              </button>
            );
          })}
        </div>

        <div id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${p.id}`} className="pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: ease.out }}
            >
              <h3 className="display-3 text-ink">{p.name}</h3>

              <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                <div className="flex flex-col bg-white p-6 sm:p-8">
                  <dt className="label text-ink-3">FSSAI limit</dt>
                  <dd className="stat-value tnum mt-3 text-ink">{p.fssaiLimit}</dd>
                </div>
                <div className="flex flex-col bg-white p-6 sm:p-8">
                  <dt className="label text-gold-600">North West standard</dt>
                  <dd className="stat-value tnum mt-3 text-forest-900">{p.northWestStandard}</dd>
                </div>
              </dl>

              <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-x-12">
                <p className="body-text lg:col-span-7">{p.kitchenImpact}</p>
                <dl className="grid grid-cols-2 gap-6 lg:col-span-5">
                  <div>
                    <dt className="label text-ink-3">Method</dt>
                    <dd className="body-text mt-2">{p.testingMethod}</dd>
                  </div>
                  <div>
                    <dt className="label text-ink-3">Frequency</dt>
                    <dd className="body-text mt-2">{p.frequency}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8">
                <TextLink
                  href={whatsappLink(
                    `Hello North West Oils Team, I would like to request certified laboratory test reports (COA) for: ${p.name}.`
                  )}
                >
                  Request a batch COA report
                </TextLink>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
