import { Container, Eyebrow, Section } from "@/components/ui/section";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PackSwitcher } from "@/components/products/pack-switcher";
import { TextLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { productBySlug } from "@/data/products";

const FORMATS = [
  {
    title: "Retail packs",
    detail: "500 ML, 750 ML, 1 L, 2 L and 5 L mustard oil for shelves and household kitchens.",
  },
  {
    title: "Bulk tins",
    detail: "15 KG soyabean and mustard, 15 LTR palmolein, for kitchens that cook by the tin.",
  },
  {
    title: "Loose and bulk supply",
    detail: "Bulk quantities and loose oil for loose oil suppliers, dispatched PAN India.",
  },
];

export function PackFormats() {
  /* Only the mustard line runs across six sizes, so it is the one
     worth showing in the switcher. */
  const mustard = productBySlug("mustard-oil")!;

  return (
    <Section id="packs" tone="paper-2" aria-labelledby="packs-heading">
      <Container>
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow>Packaging &amp; supply</Eyebrow>
            </Reveal>

            <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
              <span id="packs-heading">
                From a 500 ML bottle to a pallet of tins.
              </span>
            </MaskReveal>

            <Reveal kind="rise" delay={0.1}>
              <p className="body-text mt-6 max-w-lg">
                The mustard line runs across six sizes, so the same oil reaches
                a household buying a bottle a month and a canteen ordering
                cases of 15 KG tins. Soyabean and palmolein are supplied in
                tins, sized for commercial kitchens.
              </p>
            </Reveal>

            <RevealGroup step={0.07} delay={0.12} className="mt-10 flex flex-col">
              {FORMATS.map((f) => (
                <RevealItem
                  key={f.title}
                  className="border-t border-line py-5 last:border-b"
                >
                  <h3 className="text-[0.9375rem] font-medium text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-[0.875rem] leading-relaxed text-ink-2">
                    {f.detail}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal kind="rise" delay={0.18} className="mt-8">
              <TextLink
                href={whatsappLink(waMessage.packs)}
                icon={<WhatsAppIcon className="size-[1em]" />}
                withArrow={false}
              >
                Ask about pack sizes and quantities
              </TextLink>
            </Reveal>
          </div>

          <Reveal
            kind="image"
            className="lg:col-span-6 lg:col-start-7 lg:self-center"
          >
            <PackSwitcher packs={mustard.packs} accent={mustard.accent} />
            <p className="mt-6 text-center text-[0.8125rem] text-ink-4">
              Kachi Ghani mustard oil, shown in all six retail and bulk formats.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
