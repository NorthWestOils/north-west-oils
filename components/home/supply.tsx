import { Container, Eyebrow, Section } from "@/components/ui/section";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { company } from "@/data/company";

export function Supply() {
  return (
    <Section id="supply" tone="paper" aria-labelledby="supply-heading">
      <Container>
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow>Who we supply</Eyebrow>
            </Reveal>

            <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
              <span id="supply-heading">Retail shelves and working kitchens.</span>
            </MaskReveal>

            <Reveal kind="rise" delay={0.1}>
              <p className="body-text mt-6 max-w-lg">
                The same three oils go out in two directions: cartons of retail
                packs for the trade, and tins by the case for kitchens that
                cook at volume. Dispatch runs PAN India.
              </p>
            </Reveal>

            <Reveal kind="rise" delay={0.16} className="mt-9">
              <TextLink
                href={whatsappLink(waMessage.trade)}
                icon={<WhatsAppIcon className="size-[1em]" />}
                withArrow={false}
              >
                Start a trade enquiry
              </TextLink>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <RevealGroup step={0.07} delay={0.12} className="flex flex-col">
              {company.buyers.map((b) => (
                <RevealItem
                  key={b.title}
                  className="border-t border-line py-5 first:border-t-0 lg:first:border-t last:border-b"
                >
                  <h3 className="text-[0.9375rem] font-medium text-ink">{b.title}</h3>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">
                    {b.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
