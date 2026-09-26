import Link from "next/link";
import type { ElementType } from "react";
import { ProductShot } from "@/components/ui/product-shot";
import { ButtonArrow } from "@/components/ui/button";
import { accentVar, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * A product entry. The whole block is the link, so the target is large and the
 * hover state can be a single coordinated move: the pack lifts a few pixels,
 * the rule under the name draws itself, the arrow steps right.
 */
export function ProductCard({
  product,
  featured = false,
  headingLevel: Heading = "h3",
  className,
}: {
  product: Product;
  featured?: boolean;
  /** Set by the page so the heading outline never skips a level. */
  headingLevel?: ElementType;
  className?: string;
}) {
  const accent = accentVar[product.accent];

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group/card relative flex flex-col border-t border-line pt-8 transition-colors duration-300 hover:border-line-strong",
        featured ? "lg:flex-row lg:items-center lg:gap-14 lg:pt-10" : "",
        className
      )}
    >
      <div
        className={cn(
          "flex items-end justify-center",
          featured
            ? "h-64 w-full sm:h-88 lg:h-108 lg:w-[38%] lg:shrink-0"
            : "h-60 w-full sm:h-72"
        )}
      >
        <ProductShot
          src={product.heroImage}
          alt={product.heroAlt}
          width={product.heroWidth}
          height={product.heroHeight}
          sizes={
            featured
              ? "(max-width: 1023px) 55vw, 30vw"
              : "(max-width: 640px) 50vw, (max-width: 1023px) 34vw, 24vw"
          }
          shadowWidth="52%"
          className="h-full transition-transform duration-500 ease-out-expo group-hover/card:-translate-y-1.5"
        />
      </div>

      <div className={cn("mt-8", featured && "lg:mt-0 lg:flex-1")}>
        <span
          className="eyebrow inline-flex items-center gap-2.5"
          style={{ color: accent }}
        >
          <span aria-hidden="true" className="h-px w-5" style={{ backgroundColor: accent }} />
          {featured && "Hero product · "}
          {product.category}
        </span>

        <Heading
          className={cn(
            "mt-3.5 font-display font-medium tracking-[-0.022em] text-ink",
            featured ? "text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06]" : "text-[1.375rem] leading-tight"
          )}
        >
          <span className="relative inline">
            {product.name}
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-400 ease-out-expo group-hover/card:scale-x-100"
            />
          </span>
        </Heading>

        <p lang="hi" className="deva mt-2 text-[0.875rem] text-ink-3">
          {product.nameHi}
        </p>

        <p
          className={cn(
            "mt-4 leading-relaxed text-ink-2",
            featured ? "max-w-xl text-[1rem]" : "text-[0.9375rem]"
          )}
        >
          {product.summary}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
          <div>
            <dt className="eyebrow text-ink-4">Pack sizes</dt>
            <dd className="tnum mt-1.5 text-[0.875rem] text-ink">
              {product.packs.map((p) => p.label).join(" · ")}
            </dd>
          </div>
        </dl>

        <span className="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-forest-800 group-hover/card:[&_svg]:translate-x-0.75">
          View product
          <ButtonArrow className="transition-transform duration-300 ease-out-expo" />
        </span>
      </div>
    </Link>
  );
}
