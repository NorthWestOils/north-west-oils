"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const SUPPLY_PILLARS = [
  {
    code: "01",
    title: "Industrial & Snack Processors",
    scope: "Continuous high-heat frying for namkeen, extrusion, and commercial bakeries.",
    highlight: "15 KG / 15 L Tins & Road Tankers",
  },
  {
    code: "02",
    title: "Wholesale & Stockist Networks",
    scope: "Regional FMCG distributors, grain mandis, and trade stockists across North India.",
    highlight: "Partitioned Cases & Shrink-Wrapped Pallets",
  },
  {
    code: "03",
    title: "HoReCa & Commercial Pantries",
    scope: "Restaurants, cloud kitchens, hotel chains, and institutional canteens.",
    highlight: "2 L & 5 L Ergonomic Handled Jars",
  },
  {
    code: "04",
    title: "Supermarket & Kirana Retail",
    scope: "Modern retail chains, grocery outlets, and daily neighbourhood stores.",
    highlight: "500 ML & 1 Litre Recyclable PET Bottles",
  },
];

const LOGISTICS_STATS = [
  { value: "48 Hrs", label: "Dispatch Window", note: "Standard order turnaround" },
  { value: "100%", label: "Consignment Transit", note: "Strapped, stretch-wrapped pallets" },
  { value: "SS-316", label: "Tanker Standards", note: "Dedicated food-grade tanker fleet" },
  { value: "Zero", label: "Batch Variance", note: "COA provided with every lot" },
];

export function Supply() {
  return (
    <Section id="supply" tone="paper" className="border-b border-line" aria-labelledby="supply-heading">
      <Container>
        <SectionHeader
          id="supply-heading"
          layout="split"
          eyebrow="Institutional & Commercial Supply"
          title="Engineered for continuous commercial kitchens."
          intro={
            <>
              Supplying industrial snack processors, regional distributors, and foodservice chains
              with lab-tested consistency and disciplined delivery timelines.
              <span className="mt-6 block">
                <ButtonLink href={whatsappLink(waMessage.trade)} variant="whatsapp">
                  Inquire wholesale pricing
                </ButtonLink>
              </span>
            </>
          }
        />

        <RevealGroup
          as="ul"
          step={0.06}
          className="mt-14 grid border-y border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {SUPPLY_PILLARS.map((col, i) => (
            <RevealItem
              as="li"
              key={col.title}
              className={cn(
                "flex flex-col py-8 sm:px-6 lg:px-8",
                i > 0 && "border-t border-line sm:border-t-0",
                i % 2 === 1 && "sm:border-l",
                i >= 2 && "sm:border-t lg:border-t-0",
                i === 2 && "lg:border-l",
                i === 0 && "sm:pl-0 lg:pl-0",
                i === 3 && "lg:pr-0"
              )}
            >
              <span className="tnum text-sm font-medium text-gold-600">{col.code}</span>
              <h3 className="card-title mt-4 text-ink">{col.title}</h3>
              <p className="body-text mt-2">{col.scope}</p>
              <p className="mt-auto pt-6 text-[0.8125rem] font-medium text-forest-800">{col.highlight}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <dl className="mt-12 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {LOGISTICS_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col gap-1",
                i % 2 === 1 && "border-l border-line pl-6",
                i === 2 && "lg:border-l lg:pl-8",
                i % 2 === 1 && "lg:pl-8"
              )}
            >
              <dt className="order-2 text-sm text-ink-3">{stat.label}</dt>
              <dd className="stat-value order-1 text-forest-900">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
