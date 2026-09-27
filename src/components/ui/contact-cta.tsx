import { Container, Eyebrow, Section } from "@/components/ui/section";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { company } from "@/data/company";
import { waMessage, whatsappLink } from "@/lib/whatsapp";

/**
 * The closing call to action, shared by every page except /contact itself.
 *
 * WhatsApp comes first because that is where this trade actually talks, with
 * the phone number and email behind it for the buyers who would rather not.
 */
export function ContactCta({
  heading = "Tell us what you need and how much of it.",
  body = "Pack sizes, quantities, delivery location. We will come back with what we can supply and when.",
  message = waMessage.general,
}: {
  heading?: string;
  body?: string;
  /** The line WhatsApp opens with, so the chat starts in context. */
  message?: string;
}) {
  return (
    <Section id="enquiries" tone="paper-2" aria-labelledby="cta-heading">
      <Container>
        <div className="rounded-[2.5rem] border border-line bg-paper p-2 sm:p-3">
          <div className="rounded-[calc(2.5rem-0.75rem)] border border-line-subtle bg-paper-2/60 p-8 sm:p-12 lg:p-16">
            <div className="grid gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-14">
              <div className="lg:col-span-7">
                <Reveal kind="fade">
                  <Eyebrow>Direct Trade Enquiries</Eyebrow>
                </Reveal>
                <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
                  <span id="cta-heading">{heading}</span>
                </MaskReveal>
                <Reveal kind="rise" delay={0.1}>
                  <p className="body-text mt-6 max-w-xl">{body}</p>
                </Reveal>
              </div>

              <Reveal kind="rise" delay={0.14} className="lg:col-span-5">
                <div className="flex flex-col gap-6 rounded-2xl border border-line bg-paper p-6 sm:p-8">
                  <ButtonLink
                    href={whatsappLink(message)}
                    variant="whatsapp"
                    className="w-full"
                  >
                    Message us on WhatsApp
                  </ButtonLink>

                  <div className="flex flex-col gap-3.5 border-t border-line pt-5 text-[0.875rem]">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="eyebrow text-ink-4">Direct Phone</span>
                      <a
                        href={`tel:${company.contact.phone}`}
                        className="tnum font-display text-lg sm:text-xl font-medium text-ink transition-colors duration-200 hover:text-forest-700 whitespace-nowrap"
                      >
                        {company.contact.phoneDisplay}
                      </a>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line-subtle pt-3">
                      <span className="eyebrow text-ink-4">Email</span>
                      <a
                        href={`mailto:${company.contact.email}`}
                        className="text-[0.875rem] font-medium text-ink-2 transition-colors duration-200 hover:text-forest-700 break-all"
                      >
                        {company.contact.email}
                      </a>
                    </div>
                  </div>

                  <TextLink href="/contact" className="text-[0.875rem]">
                    All company locations &amp; direct contacts
                  </TextLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
