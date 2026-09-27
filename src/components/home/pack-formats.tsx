import { Container, Eyebrow, Section } from "@/components/ui/section";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PackCarousel } from "@/components/home/pack-carousel";
import { ButtonLink } from "@/components/ui/button";
import { waMessage, whatsappLink } from "@/lib/whatsapp";

const SUPPLY_PILLARS = [
  {
    title: "Retail Formats",
    detail:
      "500 ML, 750 ML, 1 L, 2 L and 5 L mustard oil for kirana counters, supermarket shelves and household pantries.",
  },
  {
    title: "Commercial Tins",
    detail:
      "15 KG soyabean (our hero product), 15 KG mustard, and 15 LTR palmolein in food-grade metal tins for kitchens that cook by the tin.",
  },
  {
    title: "Loose & Pallet Supply",
    detail:
      "Shrink-wrapped pallet loads for regional distributors, and food-grade road tankers for volume processors, dispatched PAN India.",
  },
];

export function PackFormats() {
  return (
    <Section id="packs" tone="paper-2" aria-labelledby="packs-heading">
      <Container>
        {/* Header Section */}
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal kind="fade">
              <Eyebrow>Packaging &amp; supply</Eyebrow>
            </Reveal>

            <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
              <span id="packs-heading">
                From a 500 ML bottle to a pallet of tins.
              </span>
            </MaskReveal>

            <Reveal kind="rise" delay={0.1}>
              <p className="body-text mt-5 max-w-2xl">
                Every kitchen buys at its own scale. Our flagship Soyabean Refined
                Oil and Refined Palmolein are filled into heavy-gauge 15 KG and 15 L
                food-grade metal tins for commercial fryers, caterers, and bulk
                kitchens. The Kachi Ghani Mustard line spans the full spectrum—from
                500 ML, 750 ML, and 1 L consumer PET bottles for retail shelves, up
                to 2 L &amp; 5 L handled jars and 15 KG tins.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <RevealGroup step={0.07} delay={0.12} className="flex flex-col">
              {SUPPLY_PILLARS.map((p) => (
                <RevealItem
                  key={p.title}
                  className="border-t border-line py-4 first:border-t-0 lg:first:border-t last:border-b"
                >
                  <h3 className="text-[0.9375rem] font-medium text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-2">
                    {p.detail}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Next-Level Pack Carousel */}
        <div className="mt-12 lg:mt-16">
          <PackCarousel />
        </div>

        {/* Commercial Pallet & Tanker Dispatch Banner */}
        <Reveal kind="rise" delay={0.15} className="mt-12 lg:mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-paper p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="eyebrow text-forest-700">
                  Bulk &amp; Institutional Logistics
                </span>
                <h3 className="display-3 mt-2 text-ink">
                  Ordering full truckloads or loose oil tankers?
                </h3>
                <p className="body-text mt-3 max-w-2xl">
                  We supply loose edible oils in dedicated food-grade road
                  tankers, along with shrink-wrapped palletized container shipments
                  for distributors, government tenders, and institutional buyers
                  across India. All consignments are accompanied by batch COA and
                  FSSAI compliance records.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-3 lg:col-span-4">
                <ButtonLink
                  href={whatsappLink(waMessage.documents)}
                  variant="solid"
                  className="w-full sm:w-auto"
                >
                  Request Bulk Quotation
                </ButtonLink>
                <ButtonLink
                  href={whatsappLink(waMessage.packs)}
                  variant="whatsapp"
                  className="w-full sm:w-auto"
                >
                  Chat on WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
