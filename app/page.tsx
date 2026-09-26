import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Credentials } from "@/components/home/credentials";
import { Range } from "@/components/home/range";
import { PackFormats } from "@/components/home/pack-formats";
import { Process } from "@/components/home/process";
import { Supply } from "@/components/home/supply";
import { Story } from "@/components/home/story";
import { FaqSection } from "@/components/home/faq";
import { ContactCta } from "@/components/ui/contact-cta";
import { FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "North West Oils | Soyabean Refined, Mustard & Palmolein Oil",
  description:
    "Refined soyabean oil, our flagship, with Kachi Ghani mustard and refined palmolein oil. Retail and bulk packs from North West Oils, FSSAI licensed, since 1973.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <FAQJsonLd />
      <Hero />
      <Credentials />
      <Range />
      <PackFormats />
      <Process />
      <Supply />
      <Story />
      <FaqSection />
      <ContactCta />
    </>
  );
}
