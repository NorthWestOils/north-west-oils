import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Eyebrow, Section } from "@/components/ui/section";
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
    "The North West Oils range: our hero product, refined soyabean oil in 15 KG tins, Kachi Ghani mustard oil in six sizes and refined palmolein in 15 litre tins.",
  alternates: { canonical: "/products" },
  ...socialMetadata({
    title: "Soyabean, Mustard & Palmolein Oil Products | North West Oils",
    description:
      "Our hero product, refined soyabean oil in 15 KG tins, Kachi Ghani mustard oil in six pack sizes and refined palmolein oil in 15 litre tins.",
    path: "/products",
  }),
};

const [featured, ...rest] = orderedProducts;
const mustard = productBySlug("mustard-oil")!;

const COMPARE_ROWS: { label: string; value: (p: Product) => string }[] = [
  { label: "How it is made", value: (p) => p.compare.made },
  { label: "Taste and aroma", value: (p) => p.compare.taste },
  { label: "Best used for", value: (p) => p.compare.bestUse },
  { label: "Pack sizes", value: (p) => p.packs.map((pk) => pk.label).join(" · ") },
  { label: "Shelf life", value: () => "Nine months from packaging" },
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
        eyebrow="Products"
        title="Three oils, made for different heat."
        lede="One is pressed cold and tastes of the seed. Two are refined to get out of the way of the food. All three are packed under the same standard and the same name."
        trail={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />

      <Section tone="paper">
        <Container>
          <ProductCard
            product={featured}
            featured
            headingLevel="h2"
            className="border-t-0 pt-0 lg:pt-0"
          />

          <div className="mt-16 grid gap-x-12 gap-y-14 lg:mt-24 lg:grid-cols-2">
            {rest.map((product) => (
              <ProductCard key={product.slug} product={product} headingLevel="h2" />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper-2" tight>
        <Container>
          <div className="grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-4">
              <Reveal kind="fade">
                <Eyebrow>The mustard line</Eyebrow>
              </Reveal>
              <Reveal kind="rise" delay={0.05}>
                <h2 className="display-3 mt-5 text-ink">
                  Six sizes of the same oil.
                </h2>
              </Reveal>
              <Reveal kind="rise" delay={0.1}>
                <p className="body-text mt-5 max-w-md">
                  500 ML, 750 ML and 1 L bottles for the shelf, 2 L and 5 L jars for a
                  household that gets through it, and the 15 KG tin for kitchens
                  that buy by weight.
                </p>
              </Reveal>
              <RevealGroup step={0.06} delay={0.12} className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                {mustard.packs.map((p) => (
                  <RevealItem
                    key={p.id}
                    as="span"
                    className="tnum text-[0.875rem] text-ink-2"
                  >
                    {p.label}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <Reveal kind="image" delay={0.08} className="lg:col-span-7 lg:col-start-6">
              <Image
                src="/images/mustard-retail-lineup.webp"
                alt="The full North West Kachi Ghani mustard oil line: 15 kg tin, 5 litre and 2 litre jars, and 1 litre and 500 ml bottles"
                width={1370}
                height={850}
                sizes="(max-width: 1023px) 92vw, 54vw"
                className="h-auto w-full"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Which oil for which job: a plain table, because it is the answer to
          "soyabean or mustard oil?" and tables are what answer engines lift. */}
      <Section tone="paper" tight aria-labelledby="compare-heading">
        <Container>
          <Reveal kind="fade">
            <Eyebrow>Which oil for which job</Eyebrow>
          </Reveal>
          <Reveal kind="rise" delay={0.05}>
            <h2 id="compare-heading" className="display-3 mt-5 max-w-2xl text-ink">
              Soyabean, mustard or palmolein?
            </h2>
          </Reveal>

          <Reveal kind="rise" delay={0.1} className="mt-10">
            <div className="rounded-[2rem] border border-line bg-paper-2/60 p-1.5 sm:p-2 overflow-hidden">
              <div className="overflow-x-auto rounded-[calc(2rem-0.375rem)] border border-line-subtle bg-paper p-5 sm:p-8">
                <table className="w-full min-w-160 border-collapse text-left">
                  <caption className="sr-only">
                    North West soyabean, mustard and palmolein oil compared
                  </caption>
                  <thead>
                    <tr className="border-b border-line-strong">
                      <td className="w-[20%] py-4 text-[0.75rem] font-medium uppercase tracking-wider text-ink-4">
                        Specification
                      </td>
                      {orderedProducts.map((p) => (
                        <th
                          key={p.slug}
                          scope="col"
                          className="py-4 pr-6 align-bottom"
                        >
                          <div className="flex flex-col gap-1.5">
                            <span className="eyebrow text-[0.6875rem] text-forest-700">
                              {p.slug === "soyabean-refined-oil" ? "Hero Product" : p.category}
                            </span>
                            <Link
                              href={`/products/${p.slug}`}
                              className="font-display text-[1.125rem] font-medium leading-snug text-ink underline-offset-4 hover:underline"
                            >
                              {p.name}
                            </Link>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[0.9375rem] leading-relaxed text-ink-2 divide-y divide-line">
                    {COMPARE_ROWS.map((row) => (
                      <tr
                        key={row.label}
                        className="align-top transition-colors duration-150 hover:bg-paper-2/40"
                      >
                        <th scope="row" className="py-4.5 pr-6 text-[0.8125rem] font-medium text-ink-3">
                          {row.label}
                        </th>
                        {orderedProducts.map((p) => (
                          <td key={p.slug} className="py-4.5 pr-6">
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
