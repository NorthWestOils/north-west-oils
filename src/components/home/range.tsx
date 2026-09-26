import { Container, Eyebrow, Section } from "@/components/ui/section";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProductShot } from "@/components/ui/product-shot";
import { TextLink } from "@/components/ui/button";
import { accentVar, featuredProduct, orderedProducts } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * The range, as three editorial rows rather than three identical cards. The
 * order comes from `orderedProducts`, and the alternating sides keep the page
 * from settling into a rhythm you stop reading.
 */
export function Range() {
  return (
    <Section id="range" tone="paper" aria-labelledby="range-heading">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal kind="fade">
              <Eyebrow>Three oils</Eyebrow>
            </Reveal>
            <MaskReveal as="h2" className="display-2 mt-5 text-ink" delay={0.05}>
              <span id="range-heading">One range, three jobs in the kitchen.</span>
            </MaskReveal>
          </div>
          <Reveal kind="rise" delay={0.1} className="lg:col-span-5">
            <p className="body-text max-w-md lg:pb-2">
              Soyabean when the oil should get out of the way of the food.
              Mustard when the food should taste of mustard. Palmolein for heat
              that runs all day. Each one is filled into the pack size the buyer
              actually orders in.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col lg:mt-20">
          {orderedProducts.map((product, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={product.slug}
                className={cn(
                  "grid items-center gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-12 lg:py-16",
                  i === 0 && "border-t-0 pt-0 lg:pt-0"
                )}
              >
                <Reveal
                  kind="pack"
                  className={cn(
                    "lg:col-span-5",
                    flip && "lg:order-2 lg:col-start-8"
                  )}
                >
                  <ProductShot
                    src={product.heroImage}
                    alt={product.heroAlt}
                    width={product.heroWidth}
                    height={product.heroHeight}
                    sizes="(max-width: 640px) 60vw, (max-width: 1023px) 40vw, 32vw"
                    shadowWidth="54%"
                    className="mx-auto h-60 sm:h-76 lg:h-96"
                  />
                </Reveal>

                <RevealGroup
                  step={0.06}
                  className={cn("lg:col-span-6", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}
                >
                  <RevealItem>
                    <Eyebrow style={{ color: accentVar[product.accent] }}>
                      {product.slug === featuredProduct.slug && "Hero product · "}
                      {product.category}
                    </Eyebrow>
                  </RevealItem>

                  <RevealItem>
                    <h3 className="display-3 mt-4 text-ink">{product.name}</h3>
                  </RevealItem>

                  <RevealItem>
                    <p lang="hi" className="deva mt-2 text-[0.9375rem] text-ink-3">
                      {product.nameHi}
                    </p>
                  </RevealItem>

                  <RevealItem>
                    <p className="body-text mt-5 max-w-lg">{product.summary}</p>
                  </RevealItem>

                  <RevealItem>
                    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                      <div>
                        <dt className="eyebrow text-ink-4">Pack sizes</dt>
                        <dd className="tnum mt-2 text-[0.9375rem] text-ink">
                          {product.packs.map((p) => p.label).join(" · ")}
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-ink-4">Container</dt>
                        <dd className="mt-2 text-[0.9375rem] text-ink">
                          {product.packs.length > 1
                            ? "Tin, jar, bottle"
                            : product.packs[0].format}
                        </dd>
                      </div>
                    </dl>
                  </RevealItem>

                  <RevealItem>
                    <div className="mt-8">
                      <TextLink href={`/products/${product.slug}`}>
                        {product.name} details
                      </TextLink>
                    </div>
                  </RevealItem>
                </RevealGroup>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
