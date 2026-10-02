import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";

/**
 * Interactive Pack Credentials Showcase.
 *
 * Every credential is physically printed on the authentic packaging artwork.
 * Allows trade buyers, retailers, and consumers to inspect what each certification
 * requires, what parameters are tested, and where to verify it on the tin or bottle.
 */

interface CredentialItem {
  id: string;
  title: string;
  shortTitle: string;
  authority: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  verifiedSpecs: string[];
  packPlacement: string;
  kind: "image" | "type";
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  h?: string;
  line1?: string;
  line2?: string;
}

const CREDENTIALS: CredentialItem[] = [
  {
    id: "fssai",
    title: "Central FSSAI Licence",
    shortTitle: "FSSAI",
    authority: "Food Safety and Standards Authority of India",
    category: "Statutory Food Authority",
    badge: "Central Jurisdiction",
    tagline: "Mandatory compliance for edible oil packaging & dispatch.",
    description:
      "Licensed centrally by FSSAI under strict edible vegetable oil standards. Every batch is evaluated against mandatory chemical, organoleptic, and purity parameters before it is cleared for container filling.",
    verifiedSpecs: [
      "Acid value & moisture limits strictly enforced",
      "Zero artificial colour or argemone contamination",
      "Tamper-evident food-grade sealing",
    ],
    packPlacement: "Printed clearly on front label and primary regulatory panel on all bottles, jars, and tins.",
    kind: "image",
    src: "/marks/fssai.webp",
    width: 400,
    height: 184,
    alt: "FSSAI mark",
    h: "h-9",
  },
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    shortTitle: "ISO 9001",
    authority: "International Organization for Standardization",
    category: "Quality Management",
    badge: "QMS Certified",
    tagline: "Standardized quality control across all production lines.",
    description:
      "Certified to ISO 9001:2015 for establishing and executing consistent quality management systems across raw seed procurement, refining, packaging, and dispatch.",
    verifiedSpecs: [
      "Standard operating procedures for intake and storage",
      "Continuous equipment maintenance and sanitation records",
      "Batch traceability from seed lot to finished case",
    ],
    packPlacement: "Declared on all commercial pack labeling and corporate trade documentation.",
    kind: "type",
    line1: "ISO",
    line2: "9001:2015",
  },
  {
    id: "iso-22000",
    title: "ISO 22000:2018",
    shortTitle: "ISO 22000",
    authority: "International Organization for Standardization",
    category: "Food Safety System",
    badge: "FSMS & HACCP",
    tagline: "Hazard control and sterile food safety management.",
    description:
      "Certified to ISO 22000:2018, demonstrating comprehensive food safety hazard controls (HACCP) covering processing hygiene, clean pipeline transfers, and sterile container filling.",
    verifiedSpecs: [
      "Critical control point (CCP) temperature tracking",
      "Preventive allergen and foreign-matter filtration",
      "Sanitary automated bottling environment",
    ],
    packPlacement: "Declared in official product specifications and corporate compliance records.",
    kind: "type",
    line1: "ISO",
    line2: "22000:2018",
  },
  {
    id: "fortified",
    title: "+F Fortified Standards",
    shortTitle: "Fortified (+F)",
    authority: "Food Fortification Resource Centre (FFRC) / FSSAI",
    category: "Micronutrient Standard",
    badge: "Vitamins A & D",
    tagline: "Nutritional enrichment for healthier daily consumption.",
    description:
      "North West Refined Soyabean Oil and Refined Palmolein Oil are fortified with Vitamins A and D to support dietary health, carrying the official +F logo as mandated by food fortification standards.",
    verifiedSpecs: [
      "Standardized Vitamin A and Vitamin D3 enrichment",
      "Homogeneous nutrient dispersion assay",
      "Transparent nutritional panel disclosure",
    ],
    packPlacement: "Prominent +F logo printed on front facing of refined soyabean and palmolein 15 KG & 15 L tins.",
    kind: "image",
    src: "/marks/fortified.webp",
    width: 248,
    height: 265,
    alt: "+F fortified mark",
    h: "h-11",
  },
  {
    id: "veg",
    title: "100% Vegetarian Origin",
    shortTitle: "Vegetarian",
    authority: "Bureau of Indian Standards / FSSAI",
    category: "Dietary Declaration",
    badge: "Pure Plant-Based",
    tagline: "Exclusively plant-derived oils with zero animal fats.",
    description:
      "All three North West oils are extracted exclusively from premium non-GMO mustard seeds, soybeans, and palm fruit. Free from tallow, animal fats, or non-vegetarian processing aids.",
    verifiedSpecs: [
      "100% plant-derived edible oil source",
      "Dedicated vegetarian processing equipment",
      "Standard green dot-in-square certified mark",
    ],
    packPlacement: "Green vegetarian symbol printed on every retail bottle, jar, pouch, and institutional tin.",
    kind: "image",
    src: "/marks/veg.webp",
    width: 290,
    height: 276,
    alt: "Green vegetarian mark",
    h: "h-10",
  },
  {
    id: "made-in-india",
    title: "Make in India",
    shortTitle: "Made in India",
    authority: "National Manufacturing Initiative",
    category: "Domestic Origin",
    badge: "Delhi & Bareilly",
    tagline: "Indigenous extraction, refining, and packaging facilities.",
    description:
      "Processed and packed at the company's operating units in South Delhi (Chattarpur) and Bareilly (Uttar Pradesh), contributing to Indian agricultural supply chains and regional distribution networks.",
    verifiedSpecs: [
      "Direct domestic seed and oil-stock sourcing",
      "Local packaging and manufacturing workforce",
      "PAN-India commercial dispatch network",
    ],
    packPlacement: "Make in India lion mark displayed on commercial shipping packaging and cartons.",
    kind: "image",
    src: "/marks/made-in-india.webp",
    width: 400,
    height: 193,
    alt: "Made in India mark",
    h: "h-8",
  },
];

export function Credentials() {
  return (
    <Section id="credentials" tone="paper" className="border-b border-line" aria-labelledby="credentials-heading">
      <Container>
        <SectionHeader
          id="credentials-heading"
          layout="split"
          eyebrow="Statutory & Quality Credentials"
          title="Licensed, certified, registered."
          intro="Every mark below is printed on the pack itself, so any retailer, distributor or buyer can check it on a tin, jar or bottle."
        />

        <RevealGroup
          as="ul"
          step={0.05}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        >
          {CREDENTIALS.map((item) => (
            <RevealItem as="li" key={item.id} className="flex flex-col bg-white p-6 sm:p-8">
              <span className="flex h-12 items-center">
                {item.kind === "image" && item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt ?? item.title}
                    width={item.width ?? 300}
                    height={item.height ?? 150}
                    sizes="96px"
                    className="h-11 w-auto max-w-24 object-contain object-left"
                  />
                ) : (
                  <span className="flex items-baseline gap-1.5 text-forest-900">
                    <span className="font-display text-2xl font-semibold leading-none">{item.line1}</span>
                    <span className="tnum text-sm font-medium text-forest-700">{item.line2}</span>
                  </span>
                )}
              </span>
              <span className="label mt-6 text-forest-800">{item.category}</span>
              <span className="card-title mt-2 text-ink">{item.title}</span>
              <span className="body-text mt-1.5">{item.tagline}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <TextLink
            href={whatsappLink(waMessage.documents)}
            icon={<WhatsAppIcon className="size-[1em]" />}
            withArrow={false}
          >
            Request certificates and documentation
          </TextLink>
          <TextLink href="/quality">See how every batch is tested</TextLink>
        </div>
      </Container>
    </Section>
  );
}
