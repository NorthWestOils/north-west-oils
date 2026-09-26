import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import {
  BreadcrumbJsonLd,
  ContactPageJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/json-ld";
import { company } from "@/data/company";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact & trade enquiries",
  description:
    "Trade and bulk enquiries for North West soyabean, mustard and palmolein oil. WhatsApp or call +91 98105 48867. Offices in South Delhi and Bareilly.",
  alternates: { canonical: "/contact" },
  ...socialMetadata({
    title: "Contact & trade enquiries | North West Oils",
    description:
      "Trade and bulk enquiries for North West soyabean, mustard and palmolein oil. WhatsApp or call +91 98105 48867.",
    path: "/contact",
  }),
};

const trail = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

/**
 * What a useful first message contains. This replaces the fields the old
 * enquiry form used to collect — the information still matters, it is just
 * asked for in the buyer's own words now.
 */
const WHAT_TO_INCLUDE = [
  {
    title: "Which oil, and which pack",
    body: "Soyabean in 15 KG, mustard in 500 ML to 15 KG, palmolein in 15 LTR.",
  },
  {
    title: "How much, and how often",
    body: "Forty cases of 1 L a month reads very differently from two tins a week, and the answer we give you depends on it.",
  },
  {
    title: "Where it has to reach",
    body: "City and pin code is enough to work out dispatch and freight.",
  },
  {
    title: "Whether you need paperwork",
    body: "Say so and the licence and test documentation comes with the quotation.",
  },
];

const CONTACT_ROWS = [
  {
    label: "Phone",
    value: company.contact.phoneDisplay,
    href: `tel:${company.contact.phone}`,
    big: true,
  },
  {
    label: "General enquiries",
    value: company.contact.email,
    href: `mailto:${company.contact.email}`,
  },
  {
    label: "Customer care",
    value: company.contact.careEmail,
    href: `mailto:${company.contact.careEmail}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <ContactPageJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd trail={trail} />

      <PageHeader
        eyebrow="Contact"
        title="Tell us what you need."
        lede="Pack sizes, quantity, and where it has to reach. That is usually enough for us to come back with a straight answer."
        trail={trail}
      />

      <Section tone="paper">
        <Container>
          <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <Reveal kind="fade">
                <Eyebrow as="h2">Straight to a person</Eyebrow>
              </Reveal>

              <Reveal kind="rise" delay={0.04}>
                <p className="body-text mt-6 max-w-md">
                  WhatsApp is the fastest route. It opens a chat with the
                  supply desk and you can send photos, pack lists or a purchase
                  order straight into it.
                </p>
              </Reveal>

              <Reveal kind="rise" delay={0.08} className="mt-7">
                <ButtonLink
                  href={whatsappLink(waMessage.general)}
                  variant="whatsapp"
                  className="w-full sm:w-auto"
                >
                  Message us on WhatsApp
                </ButtonLink>
              </Reveal>

              <RevealGroup step={0.07} delay={0.12} className="mt-10 flex flex-col">
                {CONTACT_ROWS.map((row, i) => (
                  <RevealItem
                    key={row.label}
                    className={
                      i === CONTACT_ROWS.length - 1
                        ? "border-t border-b border-line py-5"
                        : "border-t border-line py-5"
                    }
                  >
                    <span className="text-[0.8125rem] text-ink-3">{row.label}</span>
                    <a
                      href={row.href}
                      className={
                        row.big
                          ? "tnum mt-1.5 block font-display text-2xl text-ink transition-colors duration-200 hover:text-forest-700"
                          : "mt-1.5 block break-all text-[0.9375rem] text-ink transition-colors duration-200 hover:text-forest-700"
                      }
                    >
                      {row.value}
                    </a>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal kind="fade">
                <Eyebrow as="h2">What to include</Eyebrow>
              </Reveal>

              <Reveal kind="rise" delay={0.04}>
                <p className="body-text mt-6 max-w-lg">
                  Four things turn an enquiry into a quotation without a round
                  of questions first.
                </p>
              </Reveal>

              <RevealGroup step={0.07} delay={0.08} as="ol" className="mt-8 flex flex-col">
                {WHAT_TO_INCLUDE.map((item, i) => (
                  <RevealItem
                    as="li"
                    key={item.title}
                    className="grid grid-cols-[2rem_1fr] gap-x-4 border-t border-line py-5 last:border-b"
                  >
                    <span className="tnum font-display text-[0.9375rem] text-ink-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-ink">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-ink-2">
                        {item.body}
                      </span>
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal kind="fade" delay={0.12}>
                <p className="mt-6 max-w-lg text-[0.8125rem] leading-relaxed text-ink-3">
                  For anything to do with a pack you already have (a batch
                  code, a best-before date, a complaint), the customer care
                  address above is the right one.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper-2" aria-labelledby="locations-heading">
        <Container>
          <Reveal kind="fade">
            <Eyebrow>Locations</Eyebrow>
          </Reveal>
          <Reveal kind="rise" delay={0.05}>
            <h2 id="locations-heading" className="display-3 mt-5 text-ink">
              Both addresses are printed on the pack.
            </h2>
          </Reveal>

          <RevealGroup
            step={0.08}
            delay={0.08}
            className="mt-10 grid gap-x-14 gap-y-10 sm:grid-cols-2"
          >
            {company.locations.map((loc) => (
              <RevealItem key={loc.id} className="border-t border-line-strong pt-7">
                <span className="eyebrow text-ink-4">{loc.role}</span>
                <h3 className="display-3 mt-3 text-ink">{loc.label}</h3>
                <address className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2 not-italic">
                  {loc.full}
                </address>

                <dl className="mt-5 flex flex-col gap-2.5 text-[0.875rem]">
                  <div className="flex gap-3">
                    <dt className="w-14 shrink-0 text-ink-3">Phone</dt>
                    <dd>
                      <a
                        href={`tel:${loc.phone}`}
                        className="tnum text-ink transition-colors duration-200 hover:text-forest-700"
                      >
                        {loc.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-14 shrink-0 text-ink-3">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${loc.email}`}
                        className="break-all text-ink transition-colors duration-200 hover:text-forest-700"
                      >
                        {loc.email}
                      </a>
                    </dd>
                  </div>
                </dl>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    loc.mapsQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-[0.875rem] font-medium text-forest-800 underline-offset-4 transition-colors duration-200 hover:underline"
                >
                  Open in Maps
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
