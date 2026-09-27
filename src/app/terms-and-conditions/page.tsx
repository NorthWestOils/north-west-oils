import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { LegalDocument, type LegalSection } from "@/components/ui/legal-document";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { SITE_URL, company } from "@/data/company";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "The terms for using the North West Oils website: product information, quotations and orders, the North West trade mark, and governing law.",
  alternates: { canonical: "/terms-and-conditions" },
  ...socialMetadata({
    title: "Terms and conditions | North West Oils",
    description:
      "The terms for using the North West Oils website, quotations and orders.",
    path: "/terms-and-conditions",
  }),
};

const UPDATED = "27 September 2026";

const trail = [
  { name: "Home", href: "/" },
  { name: "Terms and conditions", href: "/terms-and-conditions" },
];

const [office] = company.locations;
const { contact, trademark } = company;
const domain = SITE_URL.replace(/^https?:\/\//, "");

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <>
        <p>
          These terms apply to your use of {domain}, the website of{" "}
          {company.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, CIN{" "}
          {company.cin}), whose registered office is at {office.full}. By using
          the website you agree to them.
        </p>
        <p>
          How we handle personal data is set out separately in our{" "}
          <Link href="/privacy-policy">privacy policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "product-information",
    title: "Product information",
    body: (
      <>
        <p>
          The descriptions, pack sizes and photographs on this website are for
          general information. The label on the pack you receive is the
          authority on its contents: ingredients, nutrition information,
          FSSAI licence number, packing date and best-before date.
        </p>
        <p>
          Pack artwork is updated from time to time, and colours on screen can
          differ from the printed pack.
        </p>
      </>
    ),
  },
  {
    id: "quotations-and-orders",
    title: "Quotations and orders",
    body: (
      <>
        <p>
          We do not sell through this website and do not publish prices on it.
          Nothing on the website is an offer to sell at a particular price or
          quantity.
        </p>
        <ul>
          <li>Prices are quoted for each enquiry, and a quotation is valid for the period it states.</li>
          <li>An order is accepted only when we confirm it in writing, by WhatsApp or email.</li>
          <li>
            Quantities, prices, taxes, payment, delivery and dispatch are as set
            out in the quotation, the invoice, or a separate supply agreement,
            and those documents take priority over these terms.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "storage",
    title: "Storage and use",
    body: (
      <p>
        Store our oils as printed on the pack: in a cool, dry place away from
        heat and direct sunlight, and use them before the best-before date.
        Report any problem with a delivery or a pack to us as soon as you find
        it, with the details printed on the pack.
      </p>
    ),
  },
  {
    id: "brand",
    title: "The North West name and brand",
    body: (
      <>
        <p>
          The &ldquo;North West&rdquo; name and the NW logo belong to{" "}
          {company.legalName}. Trade mark application No.{" "}
          {trademark.applicationNo} for the &ldquo;North West&rdquo; mark with
          the NW device was filed in Class {trademark.class} (edible oils) on{" "}
          {trademark.filed}.
        </p>
        <p>
          The pack artwork, product photography and text on this website are
          also our property. You may not copy them, or use our name or logo on
          any product, pack, listing or advertisement, without our written
          permission.
        </p>
      </>
    ),
  },
  {
    id: "impersonation",
    title: "People claiming to represent us",
    body: (
      <p>
        If someone offers you a dealership, distributorship or supply in our
        name and you are not sure they are genuine, check with us first on{" "}
        <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a> or{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> before you make
        any payment.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Using this website",
    body: (
      <p>
        Do not use this website for anything unlawful, try to disrupt it or
        gain unauthorised access to it, or pass yourself off as us or as
        someone connected with us.
      </p>
    ),
  },
  {
    id: "links",
    title: "Links to other services",
    body: (
      <p>
        The website links to WhatsApp, Google Maps and your email app. We do
        not control those services, and their own terms apply when you use
        them.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Accuracy and liability",
    body: (
      <>
        <p>
          We take care to keep the website accurate and available, but we may
          change it at any time, and it may occasionally be unavailable. To the
          extent the law allows, we are not liable for any loss that comes from
          relying on the website rather than on a quotation, an invoice or the
          pack itself.
        </p>
        <p>
          Nothing in these terms limits your rights under the Consumer
          Protection Act, 2019, the Food Safety and Standards Act, 2006, or any
          other law that cannot be excluded by agreement.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. Any dispute about them
        or about the website is subject to the jurisdiction of the courts at
        Delhi.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms. The date at the top of this page shows when
        they last changed.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        {company.legalName}
        <br />
        CIN {company.cin}
        <br />
        {office.full}
        <br />
        Phone: <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
        <br />
        Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={trail} />

      <PageHeader
        eyebrow="Legal"
        title="Terms and conditions"
        lede="The terms for using this website, and how quotations and orders work."
        trail={trail}
      />

      <LegalDocument updated={UPDATED} sections={sections} />
    </>
  );
}
