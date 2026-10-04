import Image from "next/image";
import Link from "next/link";
import type { ElementType } from "react";
import type { Accent, Product } from "@/data/products";
import { cn } from "@/lib/utils";

/** Per-oil tinted stage, shared with the home page range cards. */
export const STAGE_TINT: Record<Accent, string> = {
  soy: "from-forest-100/70 via-paper-2 to-paper",
  mustard: "from-gold-500/25 via-gold-500/5 to-paper",
  palm: "from-palm/20 via-palm/5 to-paper",
};

/**
 * Product card in the same language as the home page range:
 * tinted stage per oil, faint index numeral, clean detail rows.
 */
export function ProductCard({
  product,
  index,
  featured = false,
  headingLevel: Heading = "h3",
  className,
}: {
  product: Product;
  /** 1-based position, shown as a faint numeral on the stage. */
  index?: number;
  featured?: boolean;
  /** Set by the page so the heading outline never skips a level. */
  headingLevel?: ElementType;
  className?: string;
}) {
  const formats = product.availableFormats ?? product.packs.map((p) => p.label);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-[border-color,box-shadow] duration-500",
        "hover:border-line-strong hover:shadow-[0_24px_60px_-30px_rgb(20_40_25/0.35)]",
        featured ? "border-forest-800/25 lg:grid lg:grid-cols-2" : "border-line",
        className
      )}
    >
      {/* Stage */}
      <div
        className={cn(
          "relative flex items-end justify-center overflow-hidden bg-linear-to-b px-8 pt-12",
          featured ? "aspect-[4/3.6] lg:aspect-auto lg:min-h-128" : "aspect-[4/3.6]",
          STAGE_TINT[product.accent]
        )}
      >
        {index ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-4 font-display text-[5.5rem] leading-none tracking-tight text-ink/6 tnum"
          >
            0{index}
          </span>
        ) : null}
        {featured ? (
          <span className="label absolute right-5 top-5 rounded-full bg-gold-500 px-2.5 py-1 text-forest-950">
            Hero
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] bg-ink/10 blur-xl"
        />
        <Image
          src={product.heroImage}
          alt={product.heroAlt}
          width={product.heroWidth}
          height={product.heroHeight}
          unoptimized
          priority={featured}
          loading={featured ? "eager" : "lazy"}
          sizes={featured ? "(max-width: 1023px) 90vw, 55vw" : "(max-width: 1023px) 90vw, 45vw"}
          className="relative mb-6 h-[85%] w-auto object-contain select-none transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.03]"
        />
      </div>

      {/* Details */}
      <div className={cn("flex flex-1 flex-col p-6 sm:p-8", featured && "lg:p-12")}>
        <span className="label text-forest-800">{product.category}</span>
        <Heading className="display-3 mt-2 text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </Heading>
        <p lang="hi" className="deva mt-1 text-sm text-ink-3">
          {product.nameHi}
        </p>

        <p className="body-text mt-4 max-w-xl text-ink-2">{product.summary}</p>

        <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
          <div className="flex flex-col gap-1 py-3.5">
            <dt className="label text-ink-4">Profile</dt>
            <dd className="text-ink">{product.compare.taste}</dd>
          </div>
          <div className="flex flex-col gap-1 py-3.5">
            <dt className="label text-ink-4">Best for</dt>
            <dd className="text-ink-2">{product.compare.bestUse}</dd>
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
  );
}
