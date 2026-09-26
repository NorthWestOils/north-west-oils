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
        <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="lg:col-span-7">
            <Reveal kind="fade">
              <Eyebrow>Enquiries</Eyebrow>
            </Reveal>
            <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
              <span id="cta-heading">{heading}</span>
            </MaskReveal>
            <Reveal kind="rise" delay={0.1}>
              <p className="body-text mt-6 max-w-xl">{body}</p>
            </Reveal>
          </div>

          <Reveal kind="rise" delay={0.14} className="lg:col-span-5">
            <div className="flex flex-col gap-6 border-t border-line-strong pt-7">
              <ButtonLink
                href={whatsappLink(message)}
                variant="whatsapp"
                className="sm:self-start"
              >
                Message us on WhatsApp
              </ButtonLink>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
                <div>
                  <span className="eyebrow text-ink-4">Call</span>
                  <a
                    href={`tel:${company.contact.phone}`}
                    className="tnum mt-2 block font-display text-xl text-ink transition-colors duration-200 hover:text-forest-700"
                  >
                    {company.contact.phoneDisplay}
                  </a>
                </div>
                <div className="min-w-0">
                  <span className="eyebrow text-ink-4">Email</span>
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="mt-2 block truncate text-[0.9375rem] text-ink transition-colors duration-200 hover:text-forest-700"
                  >
                    {company.contact.email}
                  </a>
                </div>
              </div>

              <TextLink href="/contact" className="text-[0.875rem]">
                All contact details and locations
              </TextLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
