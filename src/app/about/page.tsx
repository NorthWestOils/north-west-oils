import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { cn } from "@/lib/utils";

import { AboutPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { company } from "@/data/company";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `About North West Oils | Edible Oil Expertise Since ${company.guidance.tradeSince}` },
  description:
    `Incorporated in ${company.established} under the guidance of ${company.guidance.name}, in the edible oil business since ${company.guidance.tradeSince}. Central FSSAI licensed, ISO 9001 and ISO 22000 certified.`,
  alternates: { canonical: "/about" },
  ...socialMetadata({
    title: "About North West Oils Private Limited",
    description:
      `Incorporated in ${company.established} under the guidance of ${company.guidance.name}, in the edible oil business since ${company.guidance.tradeSince}. Central FSSAI licensed, ISO certified, supplying PAN India.`,
    path: "/about",
  }),
};

const trail = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const STATUTORY_REGISTRATIONS = [
  {
    authority: "Ministry of Corporate Affairs (MCA)",
    designation: "Corporate Identification Number (CIN)",
    identifier: company.cin,
    verification: "Active Private Limited Corporation",
  },
  {
    authority: "Food Safety & Standards Authority of India",
    designation: "Central FSSAI Manufacturing Licence",
    identifier: `Licence No. ${company.fssaiLicence}`,
    verification: "Licensed under Central Jurisdiction",
  },
  {
    authority: "International Organization for Standardization",
    designation: "Quality Management System",
    identifier: "ISO 9001:2015 Certified",
    verification: "Standardized Batch Processing",
  },
  {
    authority: "International Organization for Standardization",
    designation: "Food Safety Management System",
    identifier: "ISO 22000:2018 Certified",
    verification: "Hygienic Packaging & Traceability",
  },
  {
    authority: "Goods & Services Tax Network (GSTN)",
    designation: "GST Registration Status",
    identifier: "Active Taxpayer Entity",
    verification: "Interstate & Intrastate Compliant",
  },
  {
    authority: "Ministry of MSME, Government of India",
    designation: "Udyam Registration",
    identifier: "Registered Manufacturing Enterprise",
    verification: "National Manufacturing Directory",
  },
];

const CORE_VALUES = [
  {
    number: "01",
    title: "The Dining Table Rule",
    body: "We only process and pack oils that our own families cook with every single day. If a batch fails to meet that personal baseline, it never enters our packaging stream.",
  },
  {
    number: "02",
    title: `Experience Since ${company.guidance.tradeSince}`,
    body: `The company was formally incorporated in ${company.established} under the guidance of ${company.guidance.name}, in the edible oil business since ${company.guidance.tradeSince}. That experience shows in how we work: honouring contracts, maintaining spec parity, and never cutting corners.`,
  },
  {
    number: "03",
    title: "Mustard Seed Integrity",
    body: "Our Kachi Ghani Mustard Oil is made from selected whole mustard seeds under strict quality control, keeping its natural pungency and authentic mustard aroma.",
  },
  {
    number: "04",
    title: "Enclosed Continuous Refining",
    body: "Our Soyabean and Palmolein oils are refined in enclosed, food-grade stainless steel circuits with continuous filtration, yielding exceptional heat stability and neutral flavor.",
  },
  {
    number: "05",
    title: "Total Statutory Transparency",
    body: "Our Central FSSAI licence, corporate CIN, customer care direct landline, and factory address are stamped visibly on every label. No aliases, no obfuscation.",
  },
  {
    number: "06",
    title: "National Fulfillment Reliability",
    body: "From 500 ML retail bottles to palletized 15 KG tins and bulk road tankers, we maintain strict dispatch schedules and clear dispatch confirmations for every trade partner.",
  },
];

const INFRASTRUCTURE_SPECS = [
  {
    metric: "50+ Yrs",
    label: "Trade Experience",
    detail: `In edible oils since ${company.guidance.tradeSince}`,
  },
  {
    metric: "3 Lines",
    label: "Dedicated Processing Streams",
    detail: "Seed screening, continuous refining, automated canning",
  },
  {
    metric: "100%",
    label: "Virgin Food-Grade Packaging",
    detail: "Induction sealed tinplates, HDPE jars, and PET bottles",
  },
  {
    metric: "PAN India",
    label: "Logistics Network",
    detail: "Direct supply across wholesale mandis & modern retail",
  },
];

export default function AboutPage() {
  return (
    <>
      <AboutPageJsonLd />
      <BreadcrumbJsonLd trail={trail} />

      <PageHeader
        eyebrow="Corporate Profile &amp; Governance"
        title={`Five decades of experience, formally incorporated in ${company.established}.`}
        lede={`North West Oils Private Limited was formally incorporated in ${company.established} under the guidance of ${company.guidance.name}, who has been in the edible oil business since ${company.guidance.tradeSince}. The commitment is unchanged: produce pure, lab-tested cooking oils that Indian families and commercial kitchens can rely upon every day without doubt.`}
        trail={trail}
      />

      {/* Company narrative */}
      <Section tone="paper" aria-labelledby="heritage-heading">
        <Container>
          <SectionHeader
            id="heritage-heading"
            layout="split"
            eyebrow="The Founding Philosophy"
            title="Built on an authentic family pledge."
            intro="Operating from New Delhi, we process and pack three essential edible oils: Kachi Ghani Mustard Oil, Refined Soyabean Oil, and high-heat Refined Palmolein Oil."
          />

          <div className="mt-14 grid gap-y-12 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-x-16">
            <div className="lg:col-span-7">
              <Reveal kind="rise">
                <div className="border-l-2 border-gold-500 pl-6 sm:pl-8">
                  <span className="label text-gold-600">The Founder&apos;s Credo</span>
                  <p lang="hi" className="deva display-3 mt-3 text-forest-900">
                    {company.tagline.hi}
                  </p>
                  <p className="body-text mt-2 italic">&ldquo;{company.tagline.en}&rdquo;</p>
                  <p className="body-text mt-4 text-ink-3">
                    Printed on every tin, jar, and bottle from our packaging lines since the company&apos;s inception.
                  </p>
                </div>
              </Reveal>
              <Reveal kind="rise" delay={0.08}>
                <p className="body-text mt-10">
                  Our products serve a balanced cross-section of Indian commerce: from neighbourhood grocery stores and supermarket chains stocking our 500 ML to 5 L retail bottles, to restaurant kitchens, institutional canteens, and snack manufacturing floors running on our 15 KG metal tins.
                </p>
              </Reveal>
            </div>

            <Reveal kind="image" delay={0.08} className="lg:col-span-5">
              <figure>
                <Image
                  src="/images/mustard-family.webp"
                  alt="North West Kachi Ghani mustard oil packs with golden mustard seeds"
                  width={1446}
                  height={925}
                  sizes="(max-width: 1023px) 92vw, 40vw"
                  className="mx-auto h-auto w-full select-none object-contain"
                />
                <figcaption className="mt-6 border-t border-line pt-4">
                  <span className="label text-forest-800">Kachi Ghani Family Range</span>
                  <p className="body-text mt-1">From 500 ML consumer bottles to 15 KG commercial metal tins.</p>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-line pt-10 lg:mt-20 lg:grid-cols-4">
            {INFRASTRUCTURE_SPECS.map((spec, i) => (
              <div
                key={spec.label}
                className={cn(
                  "flex flex-col gap-1",
                  i % 2 === 1 && "border-l border-line pl-6 lg:pl-8",
                  i === 2 && "lg:border-l lg:pl-8"
                )}
              >
                <dt className="order-2 text-sm text-ink-3">{spec.label}</dt>
                <dd className="stat-value order-1 text-forest-900">{spec.metric}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Six commitments */}
      <Section tone="paper-2" aria-labelledby="principles-heading">
        <Container>
          <SectionHeader
            id="principles-heading"
            layout="split"
            eyebrow="Operational Discipline"
            title="Six commitments we never compromise."
            intro="These principles guide every procurement contract, daily batch analysis, and customer dispatch that leaves our gates."
          />

          <RevealGroup
            as="ul"
            step={0.06}
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          >
            {CORE_VALUES.map((val) => (
              <RevealItem as="li" key={val.title} className="flex flex-col bg-white p-6 sm:p-8">
                <span className="tnum text-sm font-medium text-gold-600">{val.number}</span>
                <h3 className="card-title mt-4 text-ink">{val.title}</h3>
                <p className="body-text mt-2">{val.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Statutory registrations */}
      <Section tone="paper" aria-labelledby="statutory-heading">
        <Container>
          <SectionHeader
            id="statutory-heading"
            layout="split"
            eyebrow="Corporate Governance"
            title={<>Verifiable registrations &amp; compliance records.</>}
            intro="Every certification and regulatory registration is current, audited, and accessible through statutory government portals."
          />

          <RevealGroup
            as="ul"
            step={0.06}
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          >
            {STATUTORY_REGISTRATIONS.map((reg) => (
              <RevealItem as="li" key={reg.designation} className="flex flex-col bg-white p-6 sm:p-8">
                <span className="label text-ink-3">{reg.authority}</span>
                <h3 className="card-title mt-4 text-ink">{reg.designation}</h3>
                <p className="mt-2 text-sm font-medium text-forest-800">{reg.identifier}</p>
                <p className="body-text mt-auto pt-6">{reg.verification}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Registered address */}
      <Section tone="paper-2" tight aria-labelledby="office-heading">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="label text-forest-800">Headquarters &amp; Packing Unit</span>
              <h2 id="office-heading" className="display-3 mt-3 text-ink">
                {company.legalName}
              </h2>
              <address className="section-intro mt-3 max-w-xl not-italic">
                {company.locations[0].full}
              </address>
            </div>
            <TextLink
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                company.locations[0].mapsQuery
              )}`}
              className="shrink-0"
            >
              Open in Google Maps
            </TextLink>
          </div>
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
