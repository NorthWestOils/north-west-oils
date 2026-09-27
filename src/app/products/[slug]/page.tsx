import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/page-header";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PackSwitcher } from "@/components/products/pack-switcher";
import { ProductShot } from "@/components/ui/product-shot";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { STAGE_TINT } from "@/components/products/product-card";
import { cn } from "@/lib/utils";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { socialMetadata } from "@/lib/seo";
import { company } from "@/data/company";
import { ContactCta } from "@/components/ui/contact-cta";
import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  ProductJsonLd,
} from "@/components/seo/json-ld";
import { featuredProduct, orderedProducts, productBySlug, products } from "@/data/products";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/products/${product.slug}` },
    ...socialMetadata({
      title: `North West ${product.name} | North West Oils`,
      description: product.seoDescription,
      path: `/products/${product.slug}`,
      image: {
        url: `/og/${product.slug}.jpg`,
        width: 1200,
        height: 630,
        alt: `North West ${product.name} (${product.category})`,
      },
    }),
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const featured = product.slug === featuredProduct.slug;
  const others = orderedProducts.filter((p) => p.slug !== product.slug);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  const buyers = product.bestFor.map((b) => b.charAt(0).toLowerCase() + b.slice(1));
  const rawFaqs = [
    {
      question: `What pack sizes are available for North West ${product.name}?`,
      answer: `North West ${product.name} is available in ${
        product.availableFormats
          ? product.availableFormats.join(", ")
          : product.packs.map((p) => `${p.label} (${p.format.toLowerCase()})`).join(", ")
      }.`,
    },
    ...product.faqs,
    {
      question: `Who is North West ${product.name} for?`,
      answer: `It is supplied for ${buyers.slice(0, -1).join(", ")} and ${buyers.at(-1)}.`,
    },
    {
      question: `How do I get a price for North West ${product.name}?`,
      answer: `Wholesale prices are structured around order volume, chosen pack formats, and delivery pincode. Share your estimated requirements directly on WhatsApp or call our commercial desk at ${company.contact.phoneDisplay} for immediate volume quotes.`,
    },
  ];

  const seenFaq = new Set<string>();
  const productFaqs = rawFaqs.filter((f) => {
    if (seenFaq.has(f.question)) return false;
    seenFaq.add(f.question);
    return true;
  });

  return (
    <>
      <ProductJsonLd product={product} />
      <FAQJsonLd items={productFaqs} />
      <BreadcrumbJsonLd trail={trail} />

      {/* Hero */}
      <section className="border-b border-line bg-paper pt-18 lg:pt-22">
        <Container>
          <div className="pt-8 pb-16 lg:pt-10 lg:pb-24">
            <Reveal kind="fade">
              <Breadcrumb trail={trail} className="mb-8" />
            </Reveal>

            <div className="grid gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-16">
              <Reveal kind="pack" className="lg:col-span-5">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-3xl border bg-gradient-to-b px-6 pt-12 pb-6 sm:px-10",
                    featured ? "border-forest-800/25" : "border-line",
                    STAGE_TINT[product.accent]
                  )}
                >
                  {featured ? (
                    <span className="label absolute right-5 top-5 z-10 rounded-full bg-gold-500 px-2.5 py-1 text-forest-950">
                      Hero
                    </span>
                  ) : null}
                  {product.packs.length > 1 ? (
                    <PackSwitcher packs={product.packs} accent={product.accent} priority />
                  ) : (
                    <div className="flex w-full flex-col items-center">
                      <ProductShot
                        src={product.heroImage}
                        alt={product.heroAlt}
                        width={product.heroWidth}
                        height={product.heroHeight}
                        sizes="(max-width: 1023px) 62vw, 34vw"
                        priority
                        className="mx-auto h-72 sm:h-96 lg:h-112"
                      />
                      {product.availableFormats && product.availableFormats.length > 1 ? (
                        <div className="mt-6 w-full border-t border-line pt-4 text-center">
                          <span className="label block text-ink-4">Commercial and bulk formats</span>
                          <p className="tnum mt-2 text-sm text-ink-2">{product.availableFormats.join(", ")}</p>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </Reveal>

              <div className="lg:col-span-7">
                <Reveal kind="fade">
                  <Eyebrow>{product.category}</Eyebrow>
                </Reveal>

                <MaskReveal as="h1" className="display-1 mt-5 text-ink" delay={0.04}>
                  {product.name}
                </MaskReveal>

                <Reveal kind="rise" delay={0.1}>
                  <p lang="hi" className="deva mt-2 text-xl font-semibold text-ink-3">
                    {product.nameHi}
                  </p>
                </Reveal>

                <Reveal kind="rise" delay={0.14}>
                  <p className="section-intro mt-6 max-w-xl">{product.intro}</p>
                </Reveal>

                <Reveal kind="rise" delay={0.18}>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <ButtonLink href={whatsappLink(waMessage.product(product.name))} variant="whatsapp">
                      Inquire trade pricing on WhatsApp
                    </ButtonLink>
                    <ButtonLink href="/quality" variant="outline">
                      Review quality protocols
                    </ButtonLink>
                  </div>
                </Reveal>

                <RevealGroup as="ul" step={0.06} delay={0.22} className="mt-10 divide-y divide-line border-y border-line">
                  {product.attributes.map((a) => (
                    <RevealItem as="li" key={a} className="body-text py-3.5 text-ink-2">
                      {a}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Specification */}
      <Section tone="paper-2" className="border-b border-line" aria-labelledby="spec-heading">
        <Container>
          <SectionHeader
            id="spec-heading"
            layout="split"
            eyebrow="Specification"
            title="Pack and product parameters."
            intro="The Central FSSAI licence number, batch identification and nutritional declarations are printed on every pack."
          />

          <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6">
            <Reveal kind="rise" className="lg:col-span-7">
              <div className="h-full rounded-2xl border border-line bg-white p-6 sm:p-8">
                <span className="label text-forest-800">Technical specification</span>
                <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="grid gap-1 py-3.5 sm:grid-cols-12 sm:gap-6">
                      <dt className="label text-ink-4 sm:col-span-4 sm:pt-0.5">{spec.label}</dt>
                      <dd className="text-ink sm:col-span-8">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal kind="rise" delay={0.08} className="lg:col-span-5">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 sm:p-8">
                <span className="label text-forest-800">Supplied for</span>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {product.bestFor.map((b) => (
                    <li key={b} className="body-text py-3.5 text-ink-2">
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <TextLink
                    href={whatsappLink(waMessage.quote(product.name))}
                    icon={<WhatsAppIcon className="size-[1em]" />}
                    withArrow={false}
                  >
                    Request a volume quotation
                  </TextLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Lineup */}
      {product.scene ? (
        <Section tone="paper" className="border-b border-line" aria-labelledby="lineup-heading">
          <Container>
            <SectionHeader
              id="lineup-heading"
              eyebrow="The Lineup"
              title={<>North West {product.name}, every format.</>}
            />
            <Reveal kind="image" className="mt-14 lg:mt-20">
              <figure
                className={cn(
                  "overflow-hidden rounded-3xl border border-line bg-gradient-to-b px-6 pt-10 sm:px-10",
                  STAGE_TINT[product.accent]
                )}
              >
                <Image
                  src={product.scene.src}
                  alt={product.scene.alt}
                  width={1400}
                  height={950}
                  sizes="(max-width: 1023px) 92vw, 78vw"
                  className="mx-auto h-auto w-full max-w-4xl select-none"
                />
              </figure>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* FAQs */}
      <Section tone="paper-2" className="border-b border-line" aria-labelledby="product-faq-heading">
        <Container>
          <SectionHeader
            id="product-faq-heading"
            layout="split"
            eyebrow="Product FAQs"
            title={<>{product.name} questions.</>}
            intro="Packaging, composition, applications and pricing."
          />
          <Reveal kind="rise" delay={0.1} className="mt-14 lg:mt-20">
            <FaqAccordion items={productFaqs} />
          </Reveal>
        </Container>
      </Section>

      {/* Also in the range */}
      <Section tone="paper" aria-labelledby="also-heading">
        <Container>
          <SectionHeader id="also-heading" eyebrow="Also in the Range" title="Explore the other oils." />
          <RevealGroup step={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:gap-6">
            {others.map((other) => (
              <RevealItem key={other.slug} className="h-full">
                <article className="group relative flex h-full overflow-hidden rounded-3xl border border-line bg-white transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_24px_60px_-30px_rgb(20_40_25/0.35)]">
                  <div
                    className={cn(
                      "flex w-2/5 shrink-0 items-end justify-center bg-gradient-to-b px-4 pt-8 pb-4",
                      STAGE_TINT[other.accent]
                    )}
                  >
                    <ProductShot
                      src={other.heroImage}
                      alt=""
                      width={other.heroWidth}
                      height={other.heroHeight}
                      sizes="160px"
                      className="h-36 w-auto transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <span className="label text-forest-800">{other.category}</span>
                    <h3 className="card-title mt-2 text-ink">
                      <Link
                        href={`/products/${other.slug}`}
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                      >
                        {other.name}
                      </Link>
                    </h3>
                    <p lang="hi" className="deva mt-1 text-sm text-ink-3">
                      {other.nameHi}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-forest-800">
                      View specifications
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <ContactCta message={waMessage.product(product.name)} />
    </>
  );
}
