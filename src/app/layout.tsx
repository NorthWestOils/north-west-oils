import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/motion/page-transition";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { SITE_URL, company } from "@/data/company";
import { products } from "@/data/products";

/* Fraunces carries the display voice. Only the optical-size axis is shipped:
   it is what gives large headings their tighter, higher-contrast cut, and
   leaving the SOFT axis out saves about 50 KB off the critical path. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

/* Loaded for the Hindi tagline and the Hindi product names. Not preloaded:
   the Devanagari subset is heavier than the two Latin faces put together, and
   it sets a handful of lines rather than the page. It still arrives early —
   just behind the type that renders the headline. */
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-deva",
  subsets: ["devanagari"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#032014",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Bulk Soyabean, Mustard & Palmolein Oil | North West Oils",
    template: "%s | North West Oils",
  },
  description: company.summary,
  applicationName: company.shortName,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  category: "Food & Beverage",
  keywords: [
    "North West Oils",
    "soyabean refined oil",
    "15 kg soyabean oil tin",
    "Kachi Ghani mustard oil",
    "mustard oil supplier",
    "refined palmolein oil",
    "edible oil supplier Delhi",
    "edible oil supplier South Delhi",
    "bulk edible oil supplier India",
    "15 kg mustard oil tin",
    "edible oil distributor",
    "FSSAI certified edible oil",
    "ISO 22000 certified oil mill",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi, Delhi, India",
    "geo.position": "28.4907;77.1652",
    "ICBM": "28.4907, 77.1652",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: company.legalName,
    title: `North West Oils | Edible oil expertise since ${company.guidance.tradeSince}`,
    description: company.summary,
    images: [
      {
        url: "/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "North West Oils: soyabean refined oil, Kachi Ghani mustard oil and refined palmolein oil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `North West Oils | Edible oil expertise since ${company.guidance.tradeSince}`,
    description: company.summary,
    images: ["/og/default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${instrument.variable} ${devanagari.variable}`}
    >
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-paper antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <Header />
        <PageTransition>
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </PageTransition>
        <FloatingWhatsApp
          productNames={Object.fromEntries(products.map((p) => [p.slug, p.name]))}
        />
      </body>
    </html>
  );
}
