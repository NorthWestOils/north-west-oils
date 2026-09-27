import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FaqItem } from "@/components/ui/faq-accordion";
import { company } from "@/data/company";

export function FaqSection() {
  return (
    <Section id="faq" tone="paper-2" aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <SectionHeader
              id="faq-heading"
              eyebrow={<>Questions &amp; answers</>}
              title={<>Clear facts on our oils and supply.</>}
              intro={<>Direct answers regarding our Kachi Ghani extraction, pack sizes, FSSAI and ISO credentials, and bulk logistics across India.</>}
            />
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
