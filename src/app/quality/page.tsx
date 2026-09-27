import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ContactCta } from "@/components/ui/contact-cta";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { TextLink } from "@/components/ui/button";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { LabStandards } from "@/components/quality/lab-standards";
import { PackInspector } from "@/components/quality/pack-inspector";
import { company } from "@/data/company";
import { socialMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quality, Testing & Statutory Clearance",
  description:
    "How North West Oils ensures edible oil purity: multi-parameter laboratory testing, cold-press integrity, FSSAI compliance benchmarks, and ISO 9001/22000 certified packing.",
  alternates: { canonical: "/quality" },
  ...socialMetadata({
    title: "Quality, Testing & Statutory Clearance | North West Oils",
    description:
      "Statutory FSSAI benchmarks, ISO 9001:2015 and ISO 22000:2018 certifications, and batch Certificate of Analysis (COA) protocols.",
    path: "/quality",
  }),
};

const trail = [
  { name: "Home", href: "/" },
  { name: "Quality & Compliance", href: "/quality" },
];

/** The four QA checkpoints every batch clears. */
const QA_GATES = [
  {
    step: "01",
    title: "Raw seed screening",
    desc: "Every bulk delivery of mustard seed, soybean, and palm crude undergoes moisture deduction, foreign matter screening, and a chemical purity assay before silo discharge.",
    check: "Moisture < 7.5%, foreign matter < 0.5%, negative argemone screen",
  },
  {
    step: "02",
    title: "Enclosed food-grade processing",
    desc: "Mustard oil is cold-pressed in traditional expellers without excessive friction heat, preserving pungency and natural antioxidants. Refined grades flow through sealed stainless steel circuits.",
    check: "Unheated expeller stream, closed-loop filtration",
  },
  {
    step: "03",
    title: "Laboratory titration and fortification",
    desc: "Analytical chemistry validates free fatty acids, peroxide value, and micronutrient homogeneity. Liquid chromatography confirms Vitamin A and D fortification.",
    check: "FFA < 0.25%, PV < 2.0 meq/kg, +F verified by HPLC",
  },
  {
    step: "04",
    title: "Sealed packing and lot tracing",
    desc: "Tins, jars, and bottles are filled in an ISO 22000 certified environment, sealed with tamper-evident closures, stamped with lot numbers, and backed by an archive sample.",
    check: "Tamper-evident seal, lot code, 9-month retention sample",
  },
];

export default function QualityPage() {
  return (
    <>
      <FAQJsonLd items={company.qualityFaqs} />
      <BreadcrumbJsonLd trail={trail} />

      <PageHeader
        eyebrow="Quality Assurance & Statutory Compliance"
        title="A batch that does not clear does not get filled."
        lede="Every consignment is cleared against statutory FSSAI benchmarks and ISO food safety protocols before packaging."
        trail={trail}
      />

      {/* Four QA checkpoints */}
      <Section tone="paper" className="border-b border-line" aria-labelledby="qa-gates-heading">
        <Container>
          <SectionHeader
            id="qa-gates-heading"
            layout="split"
            eyebrow="Chain of Custody"
            title="Four checkpoints, no exceptions."
            intro="Every batch passes all four checkpoints. Failure at any stage means the consignment is rejected."
          />

          <RevealGroup
            as="ol"
            step={0.06}
            className="mt-14 grid border-y border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          >
            {QA_GATES.map((g, i) => (
              <RevealItem
                as="li"
                key={g.step}
                className={cn(
                  "flex flex-col py-8 sm:px-6 lg:px-8",
                  i > 0 && "border-t border-line sm:border-t-0",
                  i % 2 === 1 && "sm:border-l",
                  i >= 2 && "sm:border-t lg:border-t-0",
                  i === 2 && "sm:pl-0 lg:border-l lg:pl-8",
                  i === 0 && "sm:pl-0 lg:pl-0",
                  i === 3 && "lg:pr-0"
                )}
              >
                <span className="tnum text-sm font-medium text-gold-600">{g.step}</span>
                <h3 className="card-title mt-4 text-ink">{g.title}</h3>
                <p className="body-text mt-2">{g.desc}</p>
                <p className="mt-auto pt-6 text-[0.8125rem] font-medium text-forest-800">{g.check}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <LabStandards />

      <PackInspector />

      {/* Certifications ledger */}
      <Section tone="paper-2" className="border-b border-line" aria-labelledby="certs-heading">
        <Container>
          <SectionHeader
            id="certs-heading"
            layout="split"
            eyebrow="Statutory Ledger"
            title="Registrations and certifications."
            intro="All credentials are valid, auditable, and held on public records. The Central FSSAI registration number is printed on every tin and label."
          />

          <RevealGroup
            as="ul"
            step={0.05}
            className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          >
            {company.credentials.map((c) => (
              <RevealItem as="li" key={c.id} className="flex flex-col bg-white p-6 sm:p-8">
                <span className="label text-forest-800">{c.detail}</span>
                <h3 className="card-title mt-2 text-ink">{c.name}</h3>
                <p className="body-text mt-1.5">{c.note}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal kind="rise" className="mt-8">
            <TextLink href={whatsappLink(waMessage.documents)}>
              Request certified copies of our certificates
            </TextLink>
          </Reveal>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="paper" aria-labelledby="quality-faq-heading">
        <Container>
          <SectionHeader
            id="quality-faq-heading"
            layout="split"
            eyebrow="Quality FAQs"
            title="Quality and safety, answered."
            intro="For chefs, procurement managers, and distributors: batch testing, shelf stability, and compliance documentation."
          />
          <Reveal kind="rise" delay={0.1} className="mt-14 lg:mt-20">
            <FaqAccordion items={company.qualityFaqs} />
          </Reveal>
        </Container>
      </Section>

      <ContactCta
        heading="Need batch COA reports with your quotation?"
        body="We provide Certificates of Analysis, FSSAI licence documentation, and batch chemical clearances alongside your volume quotation."
        message={waMessage.documents}
      />
    </>
  );
}
