import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { LegalDocument, type LegalSection } from "@/components/ui/legal-document";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { SITE_URL, company } from "@/data/company";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How North West Oils Private Limited handles the personal data it receives through its website and through trade enquiries, orders and deliveries.",
  alternates: { canonical: "/privacy-policy" },
  ...socialMetadata({
    title: "Privacy policy | North West Oils",
    description:
      "How North West Oils Private Limited handles personal data from enquiries, orders and deliveries.",
    path: "/privacy-policy",
  }),
};

const UPDATED = "27 September 2026";

const trail = [
  { name: "Home", href: "/" },
  { name: "Privacy policy", href: "/privacy-policy" },
];

const [office] = company.locations;
const officer = company.grievanceOfficer;
const domain = SITE_URL.replace(/^https?:\/\//, "");

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          This policy explains how {company.legalName} (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;) handles personal data in connection with this
          website, {domain}, and with the enquiries, orders and deliveries that
          follow from it.
        </p>
        <p>
          We are a private limited company (CIN {company.cin}) with our
          registered office at {office.full}. We decide why and how
          this personal data is used, which makes us responsible for it under
          the Information Technology Act, 2000, its rules, and the Digital
          Personal Data Protection Act, 2023.
        </p>
      </>
    ),
  },
  {
    id: "website",
    title: "What this website collects",
    body: (
      <>
        <p>
          Browsing this website does not ask you for anything. There are no
          forms, no accounts, and no advertising or analytics cookies or
          tracking scripts.
        </p>
        <p>
          Like any website, the servers that deliver it keep basic technical
          records of each request: the IP address, browser and device type, the
          page requested and the time. These records are used to deliver the
          site and keep it secure, not to identify visitors.
        </p>
      </>
    ),
  },
  {
    id: "enquiries",
    title: "Details you share when you contact us",
    body: (
      <>
        <p>
          When you call us, email us or message us on WhatsApp, including
          through the WhatsApp buttons on this site, you share details with us.
          Those buttons open a chat with a message already typed; nothing is
          sent until you send it. Depending on what you need, the details can
          include:
        </p>
        <ul>
          <li>your name and your business name</li>
          <li>your phone number and email address</li>
          <li>the delivery address or location</li>
          <li>your GST number, for invoicing</li>
          <li>the products, pack sizes and quantities you are asking about</li>
        </ul>
        <p>You decide what to share. We only ask for what the enquiry or order needs.</p>
      </>
    ),
  },
  {
    id: "use",
    title: "How we use your details",
    body: (
      <>
        <ul>
          <li>to reply to your enquiry and send quotations</li>
          <li>to confirm orders, arrange dispatch and raise invoices</li>
          <li>to handle questions or complaints about a product or a delivery</li>
          <li>
            to keep the records that tax, food safety and company law require
            of us
          </li>
        </ul>
        <p>
          We do not sell your personal data, and we do not use it for anything
          unrelated to your enquiry or order. If we ever want to send you
          product updates, we will ask first, and you can ask us to stop at any
          time.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>Only with the people who need it to do their part:</p>
        <ul>
          <li>transport and logistics partners, for the delivery details of an order</li>
          <li>our chartered accountants and auditors, for accounts and tax filings</li>
          <li>banks, for payments</li>
          <li>government authorities, where the law requires it</li>
        </ul>
        <p>
          Conversations on WhatsApp and email pass through those services, and
          their own privacy policies apply to them.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <>
        <p>
          Enquiry details are kept for as long as the enquiry and any follow-up
          need them. Order and invoice records are kept for as long as tax and
          company law require us to keep accounts, which under GST law is at
          least six years.
        </p>
        <p>
          When we no longer need your details and the law no longer requires
          us to keep them, we delete them.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <p>
        We follow reasonable security practices to protect personal data from
        loss, misuse and unauthorised access, and only the staff who need your
        details to handle your enquiry or order can see them. No way of sending
        or storing information is completely secure, so we cannot promise
        absolute security, but we will tell you and the authorities if a breach
        affects your data, as the law requires.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>
          Under the Digital Personal Data Protection Act, 2023 you can ask us
          to:
        </p>
        <ul>
          <li>give you a summary of the personal data we hold about you and how we use it</li>
          <li>correct, complete or update it</li>
          <li>
            erase it, except where the law requires us to keep it (for example,
            invoice records)
          </li>
          <li>stop using it where you gave consent, by withdrawing that consent</li>
          <li>
            act on the request of a person you nominate, in the event of your
            death or incapacity
          </li>
        </ul>
        <p>To use any of these rights, contact the Grievance Officer below.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        This website and our business are meant for adults and businesses. We
        do not knowingly collect personal data from anyone under 18.
      </p>
    ),
  },
  {
    id: "other-services",
    title: "Links to other services",
    body: (
      <p>
        This website links to WhatsApp, Google Maps and your email app. When
        you open one of them you leave this website, and that service&rsquo;s
        own privacy policy applies.
      </p>
    ),
  },
  {
    id: "grievance-officer",
    title: "Grievance Officer",
    body: (
      <>
        <p>
          For any question, request or complaint about your personal data,
          contact:
        </p>
        <address className="not-italic">
          <p>
            {officer.name ? (
              <>
                <strong>{officer.name}</strong>
                <br />
                {officer.designation}
              </>
            ) : (
              <strong>{officer.designation}</strong>
            )}
            <br />
            {company.legalName}
            <br />
            {office.full}
            <br />
            Email: <a href={`mailto:${officer.email}`}>{officer.email}</a>
            <br />
            Phone: <a href={`tel:${officer.phone}`}>{officer.phoneDisplay}</a>
          </p>
        </address>
        <p>
          We will respond within one month of receiving your complaint. If you
          are not satisfied with our response, you can complain to the Data
          Protection Board of India.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If the way we handle personal data changes, we will update this page
        and the date at the top of it.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={trail} />

      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lede="What personal data we receive, what we do with it, and how to reach us about it."
        trail={trail}
      />

      <LegalDocument updated={UPDATED} sections={sections} />
    </>
  );
}
