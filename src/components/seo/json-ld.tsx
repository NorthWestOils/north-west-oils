import { SITE_URL, company } from "@/data/company";
import type { Product } from "@/data/products";

/**
 * Structured Data (JSON-LD) for SEO, AEO (Answer Engine Optimization),
 * and GEO (Generative Engine & Local Search Optimization).
 *
 * Adheres strictly to Schema.org standards and Google Search Central requirements:
 * - Organization & Corporation with verified credentials and departments
 * - LocalBusiness for the registered office, with geo-coordinates
 * - Product schema with measurements, origins, and availability
 * - ItemList schema for catalogs
 * - FAQPage schema for AI answer engine extraction (Perplexity, ChatGPT, SGE)
 * - BreadcrumbList for navigational search hierarchy
 * - WebSite, AboutPage, and ContactPage schemas
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Enterprise Organization & Corporation schema.
 * Represents North West Oils Private Limited as an established manufacturer
 * with food safety certifications and trade credentials.
 */
export function OrganizationJsonLd() {
  const [delhi] = company.locations;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["Organization", "Corporation"],
        "@id": ORG_ID,
        name: company.legalName,
        legalName: company.legalName,
        alternateName: [
          company.shortName,
          "North West Oils Pvt. Ltd.",
          company.brandName,
          "North West Mustard Oil",
        ],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo.png`,
          width: 513,
          height: 760,
        },
        image: `${SITE_URL}/og/default.jpg`,
        description: company.summary,
        slogan: company.tagline.hi,
        foundingDate: String(company.established),
        email: company.contact.email,
        telephone: company.contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: delhi.street,
          addressLocality: delhi.locality,
          addressRegion: delhi.region,
          postalCode: delhi.postalCode,
          addressCountry: delhi.country,
        },
        department: [
          {
            "@type": ["LocalBusiness", "Corporation"],
            "@id": `${SITE_URL}/#delhi-office`,
            name: company.legalName,
            description: "Registered office",
            telephone: delhi.phone,
            email: delhi.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: delhi.street,
              addressLocality: delhi.locality,
              addressRegion: delhi.region,
              postalCode: delhi.postalCode,
              addressCountry: delhi.country,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: delhi.geo.latitude,
              longitude: delhi.geo.longitude,
            },
            areaServed: ["Delhi", "NCR", "North India", "PAN India"],
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: company.contact.phone,
            email: company.contact.email,
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
          {
            "@type": "ContactPoint",
            telephone: company.contact.phone,
            email: company.contact.careEmail,
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
        ],
        hasCredential: company.credentials.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certification",
          name: `${c.name} (${c.detail})`,
          description: c.note,
        })),
        knowsAbout: [
          "Refined soyabean oil",
          "Kachi Ghani cold-press mustard oil extraction",
          "Edible oil manufacturing and packaging",
          "Refined palmolein oil",
          "Food safety management ISO 22000:2018",
          "FSSAI central food licensing compliance",
          "PAN India edible oil bulk distribution and loose oil supply",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Edible Oils Range",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Refined Soyabean Oil (15 KG Tins)",
            },
            {
              "@type": "OfferCatalog",
              name: "Kachi Ghani Mustard Oil (500 ML, 750 ML, 1 L, 2 L, 5 L, 15 KG)",
            },
            {
              "@type": "OfferCatalog",
              name: "Refined Palmolein Oil (15 Litre Tins)",
            },
          ],
        },
      }}
    />
  );
}

/**
 * WebSite schema with publisher connection and language declarations.
 */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: company.shortName,
        alternateName: company.legalName,
        description: company.summary,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-IN",
      }}
    />
  );
}

/**
 * LocalBusiness schema for the registered office in South Delhi.
 * Highly valuable for Google Local Search, Google Maps, and GEO generative discovery.
 */
export function LocalBusinessJsonLd() {
  const [delhi] = company.locations;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["LocalBusiness", "Corporation"],
            "@id": `${SITE_URL}/#delhi-office`,
            name: company.legalName,
            description: "Registered office",
            parentOrganization: { "@id": ORG_ID },
            url: `${SITE_URL}/contact`,
            telephone: delhi.phone,
            email: delhi.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: delhi.street,
              addressLocality: delhi.locality,
              addressRegion: delhi.region,
              postalCode: delhi.postalCode,
              addressCountry: delhi.country,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: delhi.geo.latitude,
              longitude: delhi.geo.longitude,
            },
            hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              delhi.mapsQuery
            )}`,
            areaServed: ["Delhi", "NCR", "North India", "PAN India"],
          },
        ],
      }}
    />
  );
}

/**
 * FAQPage schema for Answer Engine Optimization (AEO).
 * Provides clean, authoritative Q&A structured data that Perplexity,
 * ChatGPT Search, Google SGE / AI Overviews ingest directly.
 */
export function FAQJsonLd({
  items,
}: {
  items?: readonly { question: string; answer: string }[];
}) {
  const faqList = items ?? company.faqs;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqList.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

/**
 * Product schema with measurements and packaging options.
 *
 * No `offers`: prices are quoted per order, and an Offer without a real price
 * (the old one said ₹0) is read by Google as the price. Add offers back only
 * with a published price.
 */
export function ProductJsonLd({ product }: { product: Product }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${company.brandName} ${product.name}`,
        alternateName: [product.nameHi, ...product.alternateNames],
        description: product.summary,
        category: "Edible Oil",
        url: `${SITE_URL}/products/${product.slug}`,
        image: product.packs.map((p) => `${SITE_URL}${p.image}`),
        brand: {
          "@type": "Brand",
          name: company.brandName,
        },
        manufacturer: { "@id": ORG_ID },
        countryOfOrigin: {
          "@type": "Country",
          name: "India",
        },
        hasMeasurement: product.packs.map((p) => ({
          "@type": "QuantitativeValue",
          name: p.label,
          description: p.format,
        })),
      }}
    />
  );
}

/**
 * ItemList schema for collection/catalog pages.
 */
export function ItemListJsonLd({
  items,
}: {
  items: { name: string; url: string; description: string; position: number }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: items.map((item) => ({
          "@type": "ListItem",
          position: item.position,
          name: item.name,
          url: item.url,
          description: item.description,
        })),
      }}
    />
  );
}

/**
 * AboutPage schema for the company about page.
 */
export function AboutPageJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: `About ${company.legalName}`,
        description: company.summary,
        mainEntity: { "@id": ORG_ID },
        inLanguage: "en-IN",
      }}
    />
  );
}

/**
 * ContactPage schema for the contact page.
 */
export function ContactPageJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#webpage`,
        url: `${SITE_URL}/contact`,
        name: `Contact & Trade Enquiries | ${company.shortName}`,
        description: `Trade and bulk supply contact details for ${company.legalName}.`,
        mainEntity: { "@id": ORG_ID },
        inLanguage: "en-IN",
      }}
    />
  );
}

/**
 * BreadcrumbList schema for structured search navigational hierarchies.
 */
export function BreadcrumbJsonLd({
  trail,
}: {
  trail: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE_URL}${item.href}`,
        })),
      }}
    />
  );
}
