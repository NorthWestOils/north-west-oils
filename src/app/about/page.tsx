import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ContactCta } from "@/components/ui/contact-cta";
import { TextLink } from "@/components/ui/button";
import { AboutPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { company } from "@/data/company";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "About North West Oils | Edible Oils Since 1973" },
  description:
    "North West Oils Private Limited is an FSSAI-licensed, ISO 9001:2015 and ISO 22000:2018 certified edible oil company in South Delhi.",
  alternates: { canonical: "/about" },
  ...socialMetadata({
    title: "About North West Oils Private Limited",
    description:
      "An FSSAI-licensed, ISO 9001:2015 and ISO 22000:2018 certified edible oil company in South Delhi, packing since 1973.",
    path: "/about",
  }),
};

const trail = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <AboutPageJsonLd />
      <BreadcrumbJsonLd trail={trail} />

      <PageHeader
        eyebrow="About"
        title="A company you can look up."
        lede="North West Oils Private Limited makes and packs edible oil. The registrations are public, the address is on the pack, and the phone number is answered."
        trail={trail}
      />

      <Section tone="paper">
        <Container>
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-7">
              <Reveal kind="rise">
                <p className="text-[1.125rem] leading-relaxed text-ink">
                  The business is edible oil: Kachi Ghani mustard oil pressed
                  cold, and refined soyabean and palmolein grades for kitchens
                  that need an oil to stay out of the way. It is filled into
                  bottles, jars and tins, and it goes out to whoever is buying:
                  a kirana shop taking a carton, a distributor taking a
                  consignment, a canteen taking tins.
                </p>
              </Reveal>

              <Reveal kind="rise" delay={0.06}>
                <p className="body-text mt-6">
                  The company is registered with the Ministry of Corporate
                  Affairs, licensed centrally by FSSAI, registered for GST and
                  as an MSME, and certified to ISO 9001:2015 for quality
                  management and ISO 22000:2018 for food safety management.
                  {" "}
                  <span className="text-ink">{company.established}</span> is
                  printed on every pack in the range.
                </p>
              </Reveal>

              <Reveal kind="rise" delay={0.1}>
                <p lang="hi" className="deva mt-10 text-2xl text-forest-700">
                  {company.tagline.hi}
                </p>
                <p className="mt-2 text-[0.9375rem] text-ink-3">
                  {company.tagline.en} That is the line the packs have carried for
                  years, and the shortest description of the business there is.
                </p>
              </Reveal>
            </div>

            <Reveal kind="image" delay={0.08} className="lg:col-span-4 lg:col-start-9">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute bottom-[3%] left-1/2 h-[5%] w-[64%] -translate-x-1/2 rounded-[50%]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(23,26,18,0.2) 0%, rgba(23,26,18,0.08) 48%, rgba(23,26,18,0) 74%)",
                  }}
                />
                <Image
                  src="/images/mustard-family.webp"
                  alt="North West Kachi Ghani mustard oil packs with mustard flowers and seed"
                  width={1446}
                  height={925}
                  sizes="(max-width: 1023px) 92vw, 34vw"
                  className="relative h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper-2" aria-labelledby="principles-heading">
        <Container>
          <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
            <div className="lg:col-span-7">
              <Reveal kind="fade">
                <Eyebrow>How we work</Eyebrow>
              </Reveal>
              <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
                <span id="principles-heading">Six things we hold to.</span>
              </MaskReveal>
            </div>
            <Reveal kind="rise" delay={0.1} className="lg:col-span-5">
              <p className="body-text max-w-md lg:pb-2">
                None of these are unusual. Doing all six, for every buyer, is
                the part that takes work.
              </p>
            </Reveal>
          </div>

          <RevealGroup step={0.06} className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {company.principles.map((p, i) => (
              <RevealItem
                key={p.title}
                className="border-t border-line py-6 lg:py-8"
              >
                <span className="tnum font-display text-[0.8125rem] text-ink-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium tracking-[-0.02em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                  {p.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="paper" aria-labelledby="locations-heading">
        <Container>
          <Reveal kind="fade">
            <Eyebrow>Locations</Eyebrow>
          </Reveal>
          <MaskReveal as="h2" className="display-2 mt-5 max-w-2xl text-ink" delay={0.05}>
            <span id="locations-heading">One address, printed on the pack.</span>
          </MaskReveal>

          <RevealGroup step={0.08} delay={0.08} className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
            {company.locations.map((loc) => (
              <RevealItem key={loc.id} className="border-t border-line-strong pt-7">
                <span className="eyebrow text-ink-4">{loc.role}</span>
                <h3 className="display-3 mt-3 text-ink">{loc.label}</h3>
                <address className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2 not-italic">
                  {loc.full}
                </address>
                <dl className="mt-5 flex flex-col gap-2 text-[0.875rem]">
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-ink-3">Phone</dt>
                    <dd>
                      <a
                        href={`tel:${loc.phone}`}
                        className="tnum -my-2 inline-block py-2 text-ink transition-colors duration-200 hover:text-forest-700"
                      >
                        {loc.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-ink-3">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${loc.email}`}
                        className="-my-2 inline-block py-2 break-all text-ink transition-colors duration-200 hover:text-forest-700"
                      >
                        {loc.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal kind="rise" delay={0.1} className="mt-12">
            <TextLink href="/quality">Certifications and how we check a batch</TextLink>
          </Reveal>
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
