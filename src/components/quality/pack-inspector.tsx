import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const PACK_POINTS = [
  {
    number: "01",
    title: "Central FSSAI licence and logo",
    location: "Front and side panel of every tin and bottle",
    body: "The 14-digit licence number (10014011001948) is printed on every pack and can be verified publicly on the official FSSAI FoSCoS portal.",
  },
  {
    number: "02",
    title: "+F fortification logo",
    location: "Upper right of the label",
    body: "Confirms fortification with Vitamin A and Vitamin D. Look for the +F mark with the fortification declaration printed beneath.",
  },
  {
    number: "03",
    title: "Green vegetarian mark",
    location: "Next to the brand title",
    body: "A green circle inside a green square confirms 100% plant-origin oil, printed on every retail and commercial container.",
  },
  {
    number: "04",
    title: "ISO 9001 and ISO 22000 declaration",
    location: "Lower side panel",
    body: "Declared on the container artwork, with certificate documentation available on trade inquiry.",
  },
  {
    number: "05",
    title: "Batch lot code and shelf life",
    location: "Tin lid or bottle shoulder",
    body: "Each container links back to its lab clearance record and packing date. Best before 9 months from packaging, with retention samples archived for every lot.",
  },
  {
    number: "06",
    title: "Registered office and helpline",
    location: "Back specification panel",
    body: "The Village Fatehpur Beri, South Delhi address and phone +91 98105 48867 are printed on every tin and carton.",
  },
];

export function PackInspector() {
  return (
    <Section tone="paper" className="border-b border-line" aria-labelledby="pack-heading">
      <Container>
        <SectionHeader
          id="pack-heading"
          layout="split"
          eyebrow="Read the Pack"
          title="Six things printed on every tin."
          intro="An authentic product needs no blind trust. Each of these markings can be checked on the pack itself."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-12">
          <Reveal kind="rise" className="lg:col-span-5">
            <div className="flex items-center justify-center rounded-2xl bg-paper-2 p-10 lg:sticky lg:top-28">
              <Image
                src="/products/soyabean-15kg-tin.webp"
                alt="North West 15 KG edible oil tin showing its printed markings"
                width={771}
                height={1150}
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="h-80 w-auto object-contain sm:h-96"
              />
            </div>
          </Reveal>

          <RevealGroup as="ol" step={0.05} className="divide-y divide-line border-y border-line lg:col-span-7">
            {PACK_POINTS.map((pt) => (
              <RevealItem as="li" key={pt.number} className="flex gap-6 py-6 sm:py-8">
                <span className="tnum pt-0.5 text-sm font-medium text-gold-600">{pt.number}</span>
                <div>
                  <h3 className="card-title text-ink">{pt.title}</h3>
                  <p className="label mt-2 text-forest-800">{pt.location}</p>
                  <p className="body-text mt-3">{pt.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
