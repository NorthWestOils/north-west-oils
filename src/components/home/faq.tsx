import { Container, Eyebrow, Section } from "@/components/ui/section";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FaqItem } from "@/components/ui/faq-accordion";
import { company } from "@/data/company";

export function FaqSection() {
  return (
    <Section id="faq" tone="paper-2" aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow>Questions &amp; answers</Eyebrow>
            </Reveal>

            <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
              <span id="faq-heading">Clear facts on our oils and supply.</span>
            </MaskReveal>

            <Reveal kind="rise" delay={0.1}>
              <p className="body-text mt-6 max-w-lg">
                Direct answers regarding our Kachi Ghani extraction, pack sizes,
                FSSAI and ISO credentials, and bulk logistics across India.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <RevealGroup step={0.05} delay={0.1} className="flex flex-col">
              {company.faqs.map((faq, i) => (
                <RevealItem key={faq.question}>
                  <FaqItem
                    faq={faq}
                    index={i}
                    defaultOpen={i === 0}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
