"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { orderedProducts, featuredProduct } from "@/data/products";
import { cn } from "@/lib/utils";

const PRODUCT_ROLES: Record<
  string,
  { role: string; profile: string; use: string; stage: string }
> = {
  "soyabean-refined-oil": {
    role: "Refined",
    profile: "High smoke point, neutral taste",
    use: "Deep frying, namkeen processing and daily restaurant cooking.",
    stage: "from-forest-100/70 via-paper-2 to-paper",
  },
  "mustard-oil": {
    role: "Kachi Ghani",
    profile: "Pungent, natural aroma",
    use: "Regional curries, pickles, tadka and household kitchens.",
    stage: "from-gold-500/25 via-gold-500/5 to-paper",
  },
  "refined-palmolein-oil": {
    role: "Frying grade",
    profile: "Non-foaming, long fry life",
    use: "Bakeries, snack manufacturing and continuous frying lines.",
    stage: "from-palm/20 via-palm/5 to-paper",
  },
};

/* Hero grade sits in the middle, flanked by the other two. */
const others = orderedProducts.filter((p) => p.slug !== featuredProduct.slug);
const displayProducts = [others[0], featuredProduct, ...others.slice(1)].filter(Boolean);

export function Range() {
  return (
    <Section id="range" tone="paper" className="border-b border-line" aria-labelledby="range-heading">
      <Container>
        <SectionHeader
          id="range-heading"
          layout="split"
          eyebrow="The Core Culinary Range"
          title="Three essential oils. Purpose-built for Indian kitchens."
          intro="Each oil is made for distinct culinary demands—from neutral frying clarity that protects natural flavours to authentic regional pungency."
        />

        <RevealGroup step={0.08} className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:items-center lg:gap-6">
          {displayProducts.map((product, i) => {
            const meta = PRODUCT_ROLES[product.slug] ?? {
              role: product.category,
              profile: "FSSAI licensed",
              use: product.summary,
              stage: "from-paper-2 to-paper",
            };
            const formats = product.availableFormats ?? product.packs.map((p) => p.label);
            const featured = product.slug === featuredProduct.slug;

            return (
              <RevealItem key={product.slug} className={cn("h-full", featured && "relative z-10 order-first lg:order-0 lg:-my-8")}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-colors duration-500",
                    featured
                      ? "border-gold-500/60 ring-1 ring-gold-500/30"
                      : "border-line hover:border-line-strong"
                  )}
                >
                  {/* Stage */}
                  <div
                    className={cn(
                      "relative flex aspect-[4/3.6] items-end justify-center overflow-hidden bg-linear-to-b px-8 pt-12",
                      meta.stage
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-6 top-4 font-display text-[5.5rem] leading-none tracking-tight text-ink/6 tnum"
                    >
                      0{i + 1}
                    </span>
                    {featured ? (
                      <span className="label absolute right-5 top-5 rounded-full bg-gold-500 px-2.5 py-1 text-forest-950">
                        Hero
                      </span>
                    ) : null}
                    <Image
                      src={product.heroImage}
                      alt={product.heroAlt}
                      width={product.heroWidth}
                      height={product.heroHeight}
                      unoptimized
                      priority={featured}
                      loading={featured ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 420px"
                      className="relative mb-6 h-[85%] w-auto object-contain select-none transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <span className="label text-forest-800">{meta.role}</span>
                    <h3 className="display-3 mt-2 text-ink">
                      <Link
                        href={`/products/${product.slug}`}
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p lang="hi" className="deva mt-1 text-sm text-ink-3">
                      {product.nameHi}
                    </p>

                    <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                      <div className="flex flex-col gap-1 py-3.5">
                        <dt className="label text-ink-4">Profile</dt>
                        <dd className="text-ink">{meta.profile}</dd>
                      </div>
                      <div className="flex flex-col gap-1 py-3.5">
                        <dt className="label text-ink-4">Best for</dt>
                        <dd className="text-ink-2">{meta.use}</dd>
                      </div>
                      <div className="flex flex-col gap-1 py-3.5">
                        <dt className="label text-ink-4">Packs</dt>
                        <dd className="tnum text-ink-2">{formats.join(", ")}</dd>
                      </div>
                    </dl>

                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-forest-800">
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
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-10 flex justify-center">
          <TextLink href="/contact">Need bulk or private-label volumes? Talk to the trade desk</TextLink>
        </div>
      </Container>
    </Section>
  );
}
