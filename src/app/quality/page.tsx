import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ContactCta } from "@/components/ui/contact-cta";
import { waMessage } from "@/lib/whatsapp";
import { TextLink } from "@/components/ui/button";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Process } from "@/components/home/process";
import { company } from "@/data/company";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Quality, testing & certifications",
  description:
    "How North West Oils looks after quality: selected raw material, cold-press extraction, lab testing for purity and freshness in line with FSSAI standards, and safe packing.",
  alternates: { canonical: "/quality" },
  ...socialMetadata({
    title: "Quality, testing & certifications | North West Oils",
    description:
      "Selected raw material, cold-press extraction, lab testing for purity and freshness in line with FSSAI standards. ISO 9001 and ISO 22000 certified.",
    path: "/quality",
  }),
};

const trail = [
  { name: "Home", href: "/" },
  { name: "Quality", href: "/quality" },
];

/** Facts that are printed on the packs themselves. */
const ON_THE_PACK = [
  {
    title: "FSSAI licence number",
    body: "Printed on every pack, alongside the FSSAI mark. It is the fastest way to check who made the oil in your hand.",
  },
  {
    title: "The green veg mark",
    body: "All three oils are 100% vegetarian and carry the green mark.",
  },
  {
    title: "Fortification",
    body: "All three oils carry the +F mark for fortification with vitamins A and D."
  },
  {
    title: "Nine months",
    body: "Best before nine months from packaging, stored in a dry place away from heat and light. The packing date is on the pack.",
  },
  {
    title: "ISO certification",
    body: "The packs are marked as an ISO certified company, to ISO 9001:2015 and ISO 22000:2018.",
  },
  {
    title: "A customer-care number",
    body: "Not a generic helpline, but the number of the office that packed it.",
  },
];

export default function QualityPage() {
  return (
    <>
      <FAQJsonLd items={company.qualityFaqs} />
      <BreadcrumbJsonLd trail={trail} />

      <PageHeader
        eyebrow="Quality"
        title="Quality you can check on the pack."
        lede="Lab testing for purity and freshness, ISO 9001 and ISO 22000 certification, and everything that ends up printed on the tin as a result."
        trail={trail}
      />

      <Process
        id="stages"
        eyebrow="The sequence"
        title="Seed in, sealed tin out."
        lede="Five stages from selected raw material to a sealed pack, with lab testing for purity and freshness in line with FSSAI standards."
        exploreHref="#certs-heading"
        exploreLabel="Explore on-pack certifications"
      />

      <section className="relative bg-forest-950" aria-labelledby="testing-heading">
        <ParallaxImage
          src="/images/oil-texture.webp"
          alt=""
          width={1024}
          height={1024}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
          travel={4}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,32,20,0.95)_0%,rgba(3,32,20,0.86)_46%,rgba(3,32,20,0.55)_100%)]"
        />
        <Container className="relative">
          <div className="max-w-2xl py-20 lg:py-28">
            <Reveal kind="fade">
              <Eyebrow tone="light">Lab testing</Eyebrow>
            </Reveal>
            <MaskReveal as="h2" className="display-2 mt-5 text-paper" delay={0.05}>
              <span id="testing-heading">Tested for purity and freshness.</span>
            </MaskReveal>
            <Reveal kind="rise" delay={0.1}>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-forest-100">
                The oils are lab tested for purity and freshness, in line with
                the standards set by the Food Safety and Standards Authority of
                India. The packs state it plainly: the oil has been
                scientifically tested in a reputed national laboratory, with a
                100% guarantee that it is pure.
              </p>
            </Reveal>
            <Reveal kind="rise" delay={0.16}>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-forest-200">
                Ask for the licence and test documents when you enquire.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="paper-2" aria-labelledby="certs-heading">
        <Container>
          <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
            <div className="lg:col-span-7">
              <Reveal kind="fade">
                <Eyebrow>Registrations &amp; certifications</Eyebrow>
              </Reveal>
              <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
                <span id="certs-heading">What we are licensed to do.</span>
              </MaskReveal>
            </div>
            <Reveal kind="rise" delay={0.1} className="lg:col-span-5">
              <p className="body-text max-w-md lg:pb-2">
                Certificate and licence numbers are supplied on request, and the
                FSSAI number is printed on every pack.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            step={0.06}
            className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          >
            {company.credentials.map((c) => (
              <RevealItem key={c.id} className="border-t border-line py-6 lg:py-8">
                <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">
                  {c.name}
                </h3>
                <p className="mt-1 text-[0.8125rem] text-ink-3">{c.detail}</p>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-2">
                  {c.note}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="paper" aria-labelledby="pack-heading">
        <Container>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-4">
              <Reveal kind="fade">
                <Eyebrow>On every pack</Eyebrow>
              </Reveal>
              <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
                <span id="pack-heading">Read the tin.</span>
              </MaskReveal>
              <Reveal kind="rise" delay={0.1}>
                <p className="body-text mt-6 max-w-sm">
                  Most of what a buyer needs to know is already printed on the
                  side of the pack. This is what to look for.
                </p>
              </Reveal>
              <Reveal kind="rise" delay={0.14} className="mt-8">
                <TextLink href="/products">See the pack range</TextLink>
              </Reveal>
            </div>

            <RevealGroup
              step={0.06}
              className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6"
            >
              {ON_THE_PACK.map((item) => (
                <RevealItem key={item.title} className="border-t border-line py-5">
                  <h3 className="text-[0.9375rem] font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">
                    {item.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <Section tone="paper-2" aria-labelledby="quality-faq-heading">
        <Container>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-4">
              <Reveal kind="fade">
                <Eyebrow>Common questions</Eyebrow>
              </Reveal>
              <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
                <span id="quality-faq-heading">Quality &amp; safety answered.</span>
              </MaskReveal>
              <Reveal kind="rise" delay={0.1}>
                <p className="body-text mt-6 max-w-sm">
                  Everything you need to know about our FSSAI clearance, shelf life,
                  fortification, and batch compliance.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal kind="rise" delay={0.1}>
                <FaqAccordion items={company.qualityFaqs} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <ContactCta
        heading="Need the paperwork with the quote?"
        body="Ask for the licence and test documents along with pricing."
        message={waMessage.documents}
      />
    </>
  );
}
