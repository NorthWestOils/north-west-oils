import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";
import { ContactCta } from "@/components/ui/contact-cta";
import { waMessage } from "@/lib/whatsapp";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/data/company";
import { socialMetadata } from "@/lib/seo";
import { orderedProducts, productBySlug, type Product } from "@/data/products";

export const metadata: Metadata = {
  title: "Soyabean, Mustard & Palmolein Oil Products",
  description:
    "The North West Oils range: Refined Soyabean Oil, Kachi Ghani Mustard Oil, and Refined Palmolein Oil — all available across six calibrated pack sizes from 500 ML to 15 KG / 15 L.",
  alternates: { canonical: "/products" },
  ...socialMetadata({
    title: "Soyabean, Mustard & Palmolein Oil Products | North West Oils",
    description:
      "Refined Soyabean Oil, Kachi Ghani Mustard Oil, and Refined Palmolein Oil — all available across six calibrated pack sizes from 500 ML to 15 KG / 15 L.",
    path: "/products",
  }),
};

const [featured, ...rest] = orderedProducts;
const mustard = productBySlug("mustard-oil")!;

const COMPARE_ROWS: { label: string; value: (p: Product) => string }[] = [
  { label: "Made by", value: (p) => p.compare.made },
  { label: "Taste", value: (p) => p.compare.taste },
  { label: "Best use", value: (p) => p.compare.bestUse },
  {
    label: "Packs",
    value: (p) =>
      p.specs.find((s) => s.label === "Pack sizes")?.value ??
      p.packs.map((pk) => pk.label).join(", "),
  },
  { label: "Shelf life", value: () => "Nine months from packaging date" },
];

export default function ProductsPage() {
  return (
    <>
      <ItemListJsonLd
        items={orderedProducts.map((p, i) => ({
          name: `North West ${p.name}`,
          url: `${SITE_URL}/products/${p.slug}`,
          description: p.summary,
          position: i + 1,
        }))}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />

      <PageHeader
        eyebrow="Commercial Product Catalog"
        title="Three calibrated edible oils, engineered for every temperature."
        lede="From cold-expeller pressed Kachi Ghani mustard preserving volatile pungency, to continuous enclosed refining for crystal-clear soyabean and palmolein oils. Fully certified under Central FSSAI and ISO protocols."
        trail={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />

      {/* The range */}
      <Section tone="paper" className="border-b border-line" aria-labelledby="range-heading">
        <Container>
          <SectionHeader
            id="range-heading"
            layout="split"
            eyebrow="The Range"
            title="Three oils, one standard of refining."
            intro="Our hero refined soyabean oil leads the line, with Kachi Ghani mustard and refined palmolein built for regional cooking and continuous frying."
          />

          <RevealGroup step={0.08} className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-2 lg:gap-6">
            <RevealItem className="lg:col-span-2">
              <ProductCard product={featured} index={1} featured headingLevel="h3" />
            </RevealItem>
            {rest.map((product, i) => (
              <RevealItem key={product.slug} className="h-full">
                <ProductCard product={product} index={i + 2} headingLevel="h3" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Format availability */}
      <Section tone="paper-2" className="border-b border-line" aria-labelledby="formats-heading">
        <Container>
          <SectionHeader
            id="formats-heading"
            layout="split"
            eyebrow="Format Availability"
            title="Six calibrated pack sizes across the range."
            intro="From 500 ML, 750 ML and 1 L consumer bottles for retail shelves, to 2 L and 5 L jars for catering, and heavy-gauge 15 KG tins for high-volume commercial frying. Every pack carries a tamper-evident closure and statutory lot coding."
          />

          <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6">
            <Reveal kind="image" className="lg:col-span-7">
              <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
                <div className="flex flex-1 items-end justify-center bg-linear-to-b from-gold-500/25 via-gold-500/5 to-paper px-6 pt-10 sm:px-10">
                  <Image
                    src="/images/mustard-retail-lineup.webp"
                    alt="The full North West Kachi Ghani mustard oil line: 15 kg tin, 5 litre and 2 litre jars, and 1 litre and 500 ml bottles"
                    width={1370}
                    height={850}
                    sizes="(max-width: 1023px) 92vw, 54vw"
                    className="h-auto w-full select-none"
                  />
                </div>
                <figcaption className="border-t border-line p-6 sm:p-8">
                  <span className="label text-forest-800">Packaging</span>
                  <p className="body-text mt-2 text-ink-2">
                    Virgin food-grade tinplate, HDPE containers and recyclable PET bottles.
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal kind="rise" delay={0.08} className="lg:col-span-5">
              <div className="h-full rounded-3xl border border-line bg-white p-6 sm:p-8">
                <span className="label text-forest-800">Standard Pack Formats</span>
                <p className="caption mt-1 text-ink-3">Supplied across all three edible oil variants</p>
                <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                  {mustard.packs.map((p) => (
                    <div key={p.id} className="flex items-baseline justify-between gap-4 py-3.5">
                      <dt className="tnum card-title text-ink">{p.label}</dt>
                      <dd className="text-right text-ink-2">{p.format}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Comparative matrix */}
      <Section tone="paper" aria-labelledby="compare-heading">
        <Container>
          <SectionHeader
            id="compare-heading"
            layout="split"
            eyebrow="Side by Side"
            title="How the three oils compare."
            intro="Processing, taste, recommended use and pack formats across the range, at a glance."
          />

          <Reveal kind="rise" delay={0.1} className="mt-14 lg:mt-20">
            <div className="overflow-hidden rounded-3xl border border-line bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-160 border-collapse text-left">
                  <caption className="sr-only">
                    North West soyabean, mustard and palmolein oil compared
                  </caption>
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="label w-[22%] px-6 py-6 align-bottom text-ink-4">
                        Parameter
                      </th>
                      {orderedProducts.map((p) => (
                        <th key={p.slug} scope="col" className="px-6 py-6 align-bottom">
                          <span className="label block text-forest-800">{p.category}</span>
                          <Link
                            href={`/products/${p.slug}`}
                            className="card-title mt-1 block text-ink transition-colors hover:text-forest-700"
                          >
                            {p.name}
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-sm leading-relaxed text-ink-2">
                    {COMPARE_ROWS.map((row) => (
                      <tr key={row.label}>
                        <th scope="row" className="label px-6 py-5 align-top text-ink-4">
                          {row.label}
                        </th>
                        {orderedProducts.map((p) => (
                          <td key={p.slug} className="px-6 py-5 align-top">
                            {row.value(p)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactCta
        heading="Stocking the range?"
        body="Tell us the pack sizes and the quantity you move in a month, and where it needs to reach."
        message={waMessage.stock}
      />
    </>
  );
}
