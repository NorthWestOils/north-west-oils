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
    id: "pure-safe",
    title: "Pure & Safe Quality Emblem",
    shortTitle: "Pure & Safe",
    authority: "North West Oils Quality Assurance",
    category: "Purity Guarantee",
    badge: "100% Pure Plant Oil",
    tagline: "Uncompromised purity and hygienic processing on every batch.",
    description:
      "Our hallmark Pure & Safe emblem represents our commitment to unadulterated, single-origin edible oils refined and packaged under sterile hygienic conditions.",
    verifiedSpecs: [
      "Zero adulteration or argemone contamination",
      "Virgin food-grade metal and PET packaging only",
      "Sealed with tamper-evident induction closures",
    ],
    packPlacement: "Printed on the top-left label facing of all North West edible oil containers.",
    kind: "image",
    src: "/marks/pure-safe.webp",
    width: 512,
    height: 512,
    alt: "Pure & Safe quality emblem",
    h: "h-11",
  },
  {
    id: "iso-certified",
    title: "ISO 9001 & ISO 22000 Certified",
    shortTitle: "ISO 9001 · 22000",
    authority: "International Organization for Standardization",
    category: "Quality & Safety Systems",
    badge: "QMS & FSMS Certified",
    tagline: "Standardized quality control and hazard management across all lines.",
    description:
      "Certified to ISO 9001:2015 (Quality Management) and ISO 22000:2018 (Food Safety Hazard Controls / HACCP), covering seed intake, refining, automated filling, and dispatch.",
    verifiedSpecs: [
      "Critical control point (CCP) temperature tracking",
      "Preventive foreign-matter filtration and hygiene audit",
      "Batch lot traceability from seed intake to delivered case",
    ],
    packPlacement: "Declared on all commercial pack labeling and trade documentation.",
    kind: "type",
    line1: "ISO",
    line2: "9001 · 22000",
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
