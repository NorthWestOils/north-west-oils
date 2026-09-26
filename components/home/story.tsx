import { Container, Eyebrow } from "@/components/ui/section";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { TextLink } from "@/components/ui/button";
import { company } from "@/data/company";

export function Story() {
  return (
    <section id="story" className="relative bg-forest-950" aria-labelledby="story-heading">
      <ParallaxImage
        src="/images/soyabean-field.webp"
        alt="A soybean field at golden hour, pods ripening on the plants"
        width={1448}
        height={1086}
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
        travel={5}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,32,20,0.92),rgba(3,32,20,0.7))] lg:bg-[linear-gradient(100deg,rgba(3,32,20,0.96)_0%,rgba(3,32,20,0.9)_42%,rgba(3,32,20,0.45)_74%,rgba(3,32,20,0.2)_100%)]"
      />

      <Container className="relative">
        <div className="max-w-2xl py-20 lg:py-32">
          <Reveal kind="fade">
            <Eyebrow tone="light">The company</Eyebrow>
          </Reveal>

          <MaskReveal as="h2" className="display-2 mt-5 text-paper" delay={0.05}>
            <span id="story-heading">
              {company.established} is printed on every pack.
            </span>
          </MaskReveal>

          <Reveal kind="rise" delay={0.1}>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-forest-100">
              North West Oils Private Limited is registered with the Ministry of
              Corporate Affairs, licensed by FSSAI, and certified to ISO
              9001:2015 and ISO 22000:2018. It works from a registered office in
              Fatehpur Beri, South Delhi and a unit in Faridpur, Bareilly.
            </p>
          </Reveal>

          <Reveal kind="rise" delay={0.16}>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-forest-200">
              Both addresses and a customer-care number are printed on the side
              of every tin. Of everything a company can say about itself, that
              is the part you can check.
            </p>
          </Reveal>

          <Reveal kind="rise" delay={0.22} className="mt-9">
            <TextLink href="/about" className="text-forest-100">
              More about North West Oils
            </TextLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
