import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/page-header";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PackSwitcher } from "@/components/products/pack-switcher";
import { ProductShot } from "@/components/ui/product-shot";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { socialMetadata } from "@/lib/seo";
import { company } from "@/data/company";
import { ContactCta } from "@/components/ui/contact-cta";
import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  ProductJsonLd,
} from "@/components/seo/json-ld";
import { accentVar, orderedProducts, productBySlug, products } from "@/data/products";

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

  const accent = accentVar[product.accent];
  const others = orderedProducts.filter((p) => p.slug !== product.slug);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  const buyers = product.bestFor.map((b) => b.charAt(0).toLowerCase() + b.slice(1));
  const productFaqs = [
    {
      question: `What pack sizes are available for North West ${product.name}?`,
      answer: `North West ${product.name} is available in ${product.packs.map((p) => `${p.label} (${p.format.toLowerCase()})`).join(", ")}.`,
    },
    ...product.faqs,
    {
      question: `Who is North West ${product.name} for?`,
      answer: `It is supplied for ${buyers.slice(0, -1).join(", ")} and ${buyers.at(-1)}.`,
    },
    {
      question: `How do I get a price for North West ${product.name}?`,
      answer: `Prices are quoted per order, because they depend on the pack, the quantity and where it has to reach. Send those three on WhatsApp or call ${company.contact.phoneDisplay} and we will come back with a quote.`,
    },
  ];

  return (
    <>
      <ProductJsonLd product={product} />
      <FAQJsonLd items={productFaqs} />
      <BreadcrumbJsonLd trail={trail} />

      <section className="border-b border-line bg-paper pt-18 lg:pt-20">
        <Container>
          <div className="pt-10 pb-14 lg:pt-10 lg:pb-16">
            <Reveal kind="fade">
              <Breadcrumb trail={trail} className="mb-8" />
            </Reveal>

            <div className="grid gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-14">
              <Reveal kind="pack" className="lg:col-span-5">
                {product.packs.length > 1 ? (
                  <PackSwitcher
                    packs={product.packs}
                    accent={product.accent}
                    priority
                  />
                ) : (
                  <ProductShot
                    src={product.heroImage}
                    alt={product.heroAlt}
                    width={product.heroWidth}
                    height={product.heroHeight}
                    sizes="(max-width: 1023px) 62vw, 34vw"
                    priority
                    shadowWidth="52%"
                    className="mx-auto h-72 sm:h-96 lg:h-112"
                  />
                )}
              </Reveal>

              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal kind="fade">
                  <span
                    className="eyebrow inline-flex items-center gap-2.5"
                    style={{ color: accent }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-6"
                      style={{ backgroundColor: accent }}
                    />
                    {product.category}
                  </span>
                </Reveal>

                <MaskReveal as="h1" className="display-1 mt-5 text-ink" delay={0.04}>
                  {product.name}
                </MaskReveal>

                <Reveal kind="rise" delay={0.1}>
                  <p lang="hi" className="deva mt-4 text-lg text-ink-3">
                    {product.nameHi}
                  </p>
                </Reveal>

                <Reveal kind="rise" delay={0.14}>
                  <p className="lede mt-7 max-w-xl">{product.intro}</p>
                </Reveal>

                <Reveal kind="rise" delay={0.18}>
                  <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center">
                    <ButtonLink
                      href={whatsappLink(waMessage.product(product.name))}
                      variant="whatsapp"
                    >
                      Ask about this on WhatsApp
                    </ButtonLink>
                    <ButtonLink href="/quality" variant="outline">
                      How it is made
                    </ButtonLink>
                  </div>
                </Reveal>

                <RevealGroup step={0.06} delay={0.22} className="mt-10 flex flex-col">
                  {product.attributes.map((a) => (
                    <RevealItem
                      key={a}
                      className="flex gap-3.5 border-t border-line py-3 last:border-b"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] size-1 shrink-0 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-ink-2">
                        {a}
                      </span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper-2">
        <Container>
          <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-7">
              <Reveal kind="fade">
                <Eyebrow>Specification</Eyebrow>
              </Reveal>
              <Reveal kind="rise" delay={0.05}>
                <h2 className="display-3 mt-5 text-ink">What is in the pack.</h2>
              </Reveal>

              <RevealGroup step={0.05} delay={0.08} className="mt-9">
                <dl className="flex flex-col">
                  {product.specs.map((spec) => (
                    <RevealItem
                      key={spec.label}
                      className="grid grid-cols-1 gap-1 border-t border-line py-4 last:border-b sm:grid-cols-12 sm:gap-6 sm:py-4.5"
                    >
                      <dt className="text-[0.8125rem] text-ink-3 sm:col-span-4">
                        {spec.label}
                      </dt>
                      <dd className="text-[0.9375rem] text-ink sm:col-span-8">
                        {spec.value}
                      </dd>
                    </RevealItem>
                  ))}
                </dl>
              </RevealGroup>

              <Reveal kind="fade" delay={0.1}>
                <p className="mt-6 max-w-xl text-[0.8125rem] leading-relaxed text-ink-3">
                  The FSSAI licence number, batch details and full nutritional
                  declaration are printed on every pack. For documentation
                  against an order, ask us and we will send it with the quote.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal kind="fade">
                <Eyebrow as="h2">Bought by</Eyebrow>
              </Reveal>
              <RevealGroup step={0.06} delay={0.06} className="mt-7 flex flex-col">
                {product.bestFor.map((b) => (
                  <RevealItem
                    key={b}
                    className="border-t border-line py-3.5 text-[0.9375rem] text-ink-2 last:border-b"
                  >
                    {b}
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal kind="rise" delay={0.1} className="mt-8">
                <TextLink
                  href={whatsappLink(waMessage.quote(product.name))}
                  icon={<WhatsAppIcon className="size-[1em]" />}
                  withArrow={false}
                >
                  Ask for a quotation
                </TextLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {product.scene ? (
        <Section tone="paper" tight>
          <Container>
            <Reveal kind="image">
              <figure>
                <div
                  className={
                    product.scene.transparent
                      ? ""
                      : "overflow-hidden rounded-lg border border-line"
                  }
                >
                  <Image
                    src={product.scene.src}
                    alt={product.scene.alt}
                    width={1400}
                    height={950}
                    sizes="(max-width: 1023px) 92vw, 78vw"
                    className="mx-auto h-auto w-full max-w-4xl"
                  />
                </div>
                <figcaption className="mt-6 text-center text-[0.8125rem] text-ink-3">
                  {product.name}: {product.packs.map((p) => p.label).join(", ")}.
                </figcaption>
              </figure>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      <Section tone="paper-2" tight className="border-t border-line" aria-labelledby="product-faq-heading">
        <Container>
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-4">
              <Reveal kind="fade">
                <Eyebrow>Product FAQs</Eyebrow>
              </Reveal>
              <MaskReveal as="h2" className="display-2 mt-4 text-ink" delay={0.05}>
                <span id="product-faq-heading">{product.name} questions.</span>
              </MaskReveal>
              <Reveal kind="rise" delay={0.1}>
                <p className="body-text mt-4 text-ink-3">
                  Key details on packaging, composition, and culinary applications.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal kind="rise" delay={0.1}>
                <FaqAccordion items={productFaqs} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" tight className="border-t border-line">
        <Container>
          <Reveal kind="fade">
            <Eyebrow as="h2">Also in the range</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {others.map((other) => (
              <Reveal kind="rise" key={other.slug}>
                <Link
                  href={`/products/${other.slug}`}
                  className="group/next flex items-center gap-6 border-t border-line pt-6"
                >
                  <ProductShot
                    src={other.heroImage}
                    alt=""
                    width={other.heroWidth}
                    height={other.heroHeight}
                    sizes="90px"
                    shadow={false}
                    className="h-20 w-auto shrink-0 transition-transform duration-500 ease-out-expo group-hover/next:-translate-y-1"
                  />
                  <span className="flex flex-col">
                    <span className="font-display text-xl font-medium tracking-[-0.02em] text-ink">
                      {other.name}
                    </span>
                    <span className="mt-1 text-[0.8125rem] text-ink-3">
                      {other.category}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCta message={waMessage.product(product.name)} />
    </>
  );
}
