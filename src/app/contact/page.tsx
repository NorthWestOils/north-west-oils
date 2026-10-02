import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import {
  BreadcrumbJsonLd,
  ContactPageJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/json-ld";
import { company } from "@/data/company";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bulk orders & trade enquiries",
  description:
    "Trade and bulk supply enquiries for North West soyabean, mustard and palmolein oil. Direct manufacturer pricing and nationwide logistics. WhatsApp or call +91 98105 48867.",
  alternates: { canonical: "/contact" },
  ...socialMetadata({
    title: "Bulk orders & trade enquiries | North West Oils",
    description:
      "Trade and bulk enquiries for North West soyabean, mustard and palmolein oil. WhatsApp or call +91 98105 48867.",
    path: "/contact",
  }),
};

const trail = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

const WHAT_TO_INCLUDE = [
  {
    step: "01",
    title: "Oil variant & pack format",
    body: "Soyabean Refined Oil, Kachi Ghani Mustard Oil, or Refined Palmolein. Available across all formats: 500 ML, 750 ML and 1 L bottles, 2 L and 5 L handled jars, and 15 KG / 15 L commercial tins.",
  },
  {
    step: "02",
    title: "Order volume & dispatch cadence",
    body: "Whether you need 40 cases of 1 L bottles a month for retail or 100 tins a week for continuous commercial kitchen fryers. Tiered wholesale rates apply.",
  },
  {
    step: "03",
    title: "Delivery destination pincode",
    body: "City and postal code for precise transit scheduling and direct freight calculation. Dispatched from our central facilities for scheduled PAN India delivery.",
  },
  {
    step: "04",
    title: "Regulatory compliance paperwork",
    body: "Specify if your procurement committee requires batch Certificates of Analysis (COA), central FSSAI licence dossiers, or GST invoices.",
  },
];

const QUICK_QUOTES = [
  { label: "Soyabean Refined Oil", product: "Soyabean Refined Oil (15 KG & Retail)" },
  { label: "Kachi Ghani Mustard Oil", product: "Kachi Ghani Mustard Oil (500 ML to 15 KG)" },
  { label: "Refined Palmolein", product: "Refined Palmolein Oil (15 LTR & Retail)" },
];

export default function ContactPage() {
  const loc = company.locations[0];

  const channels: {
    label: string;
    value: string;
    href: string;
    note: string;
    whatsapp?: boolean;
  }[] = [
    {
      label: "WhatsApp",
      value: "Message the dispatch desk",
      href: whatsappLink(waMessage.general),
      note: "The fastest way to get a quotation. Send purchase orders, pack requirements or delivery queries.",
      whatsapp: true,
    },
    {
      label: "Direct telephone",
      value: company.contact.phoneDisplay,
      href: `tel:${company.contact.phone}`,
      note: "Monday to Saturday, 9:00 AM to 7:00 PM IST.",
    },
    {
      label: "Trade and commercial enquiries",
      value: company.contact.email,
      href: `mailto:${company.contact.email}`,
      note: "Wholesale quotations, volume schedules and distribution supply.",
    },
    {
      label: "Customer care and grievances",
      value: company.contact.careEmail,
      href: `mailto:${company.contact.careEmail}`,
      note: "Batch verification, retention samples and packs in use. Quote the lot code printed on the container.",
    },
  ];

  return (
    <>
      <ContactPageJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd trail={trail} />

      <PageHeader
        eyebrow="Commercial Procurement Desk"
        title="Direct access to our factory supply desk."
        lede="Share your product requirements, volume, and destination pincode. Our commercial team will calculate tiered wholesale quotations and delivery schedules promptly."
        trail={trail}
      />

      {/* Channels */}
      <Section tone="paper" aria-labelledby="channels-heading">
        <Container>
          <SectionHeader
            id="channels-heading"
            layout="split"
            eyebrow="Live supply desk, PAN India"
            title="Reach the trade desk directly."
            intro="Every channel goes straight to our commercial coordinators. Pick whichever suits your team."
          />

          <RevealGroup
            as="ul"
            step={0.07}
            delay={0.1}
            className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-16"
          >
            {channels.map((c) => (
              <RevealItem as="li" key={c.label} className="bg-white">
                <a
                  href={c.href}
                  {...(c.whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full items-start justify-between gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest-700 sm:gap-6 sm:p-8"
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="label text-forest-800">{c.label}</span>
                    <span className="tnum mt-2 flex items-center gap-2 text-ink transition-colors duration-200 group-hover:text-forest-700 text-sm font-medium sm:text-base lg:text-lg">
                      {c.whatsapp ? <span className="shrink-0"><WhatsAppIcon /></span> : null}
                      <span className="min-w-0 wrap-anywhere">
                        {c.label === "Email" && c.value.includes("@") ? (
                          <>
                            {c.value.split("@")[0]}@<wbr />{c.value.split("@")[1]}
                          </>
                        ) : (
                          c.value
                        )}
                      </span>
                    </span>
                    <span className="body-text mt-2 text-ink-2 text-xs sm:text-sm">{c.note}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-ink text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:border-forest-800 group-hover:bg-forest-800 group-hover:text-paper sm:size-10 sm:text-base"
                  >
                    →
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Procurement checklist */}
      <Section tone="white" aria-labelledby="checklist-heading">
        <Container>
          <SectionHeader
            id="checklist-heading"
            layout="split"
            eyebrow="Procurement checklist"
            title="What to include for an instant quote."
            intro="Including these four parameters enables our trade desk to calculate volume discounts and freight charges immediately."
          />

          <RevealGroup
            as="ol"
            step={0.06}
            delay={0.08}
            className="mt-12 border-t border-line lg:mt-16"
          >
            {WHAT_TO_INCLUDE.map((item) => (
              <RevealItem
                as="li"
                key={item.step}
                className="grid gap-3 border-b border-line py-8 sm:grid-cols-12 sm:gap-8"
              >
                <span className="stat-value tnum text-gold-600 sm:col-span-2">{item.step}</span>
                <h3 className="card-title text-ink sm:col-span-4">{item.title}</h3>
                <p className="body-text text-ink-2 sm:col-span-6">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="label text-ink-3">Quick quote on WhatsApp</p>
            <div className="flex flex-wrap gap-3">
              {QUICK_QUOTES.map((q) => (
                <ButtonLink
                  key={q.label}
                  href={whatsappLink(waMessage.product(q.product))}
                  variant="outline"
                  size="sm"
                  withArrow
                >
                  {q.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Registered office */}
      <Section tone="paper" aria-labelledby="office-heading">
        <Container>
          <SectionHeader
            id="office-heading"
            layout="split"
            eyebrow={loc.role}
            title={company.legalName}
            intro={<address className="not-italic">{loc.full}</address>}
          />

          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:mt-16">
            <div className="bg-white p-6 sm:p-8">
              <dt className="label text-ink-3">Corporate identity number</dt>
              <dd className="card-title tnum mt-3 break-all text-ink">{company.cin}</dd>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <dt className="label text-ink-3">Certifications</dt>
              <dd className="card-title mt-3 text-ink">
                FSSAI Central Licensed, ISO 9001 &amp; 22000
              </dd>
            </div>
            <div className="flex flex-col justify-between gap-6 bg-white p-6 sm:p-8">
              <dt className="label text-ink-3">Directions</dt>
              <dd>
                <ButtonLink
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapsQuery)}`}
                  variant="outline"
                  size="sm"
                  withArrow
                >
                  Open in Google Maps
                </ButtonLink>
              </dd>
            </div>
          </dl>
        </Container>
      </Section>
    </>
  );
}
