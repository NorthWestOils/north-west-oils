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
  title: "Bulk Soyabean, Mustard & Palmolein Oil | North West Oils",
  description:
    "Bulk and wholesale soyabean, Kachi Ghani mustard and palmolein oil, supplied PAN India. Soyabean Refined Oil is our hero product. FSSAI licensed, since 1973.",
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
