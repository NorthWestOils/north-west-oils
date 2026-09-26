import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { orderedProducts } from "@/data/products";

const PAGES = [
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/quality" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-paper">
      <div className="container-page">
        <div className="grid gap-10 pt-16 pb-12 lg:grid-cols-12 lg:gap-8 lg:pt-20">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3.5">
              <Image
                src="/images/logo.webp"
                alt=""
                width={513}
                height={760}
                className="h-11 w-auto"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-xl font-medium tracking-[-0.015em]">
                  North West Oils
                </span>
                <span className="mt-1 text-[0.6875rem] tracking-[0.13em] text-forest-300 uppercase">
                  Private Limited · Est. {company.established}
                </span>
              </span>
            </Link>

            <p className="deva mt-7 max-w-xs text-lg text-forest-200">
              {company.tagline.hi}
            </p>
            <p className="mt-2 max-w-xs text-sm text-forest-300">
              {company.tagline.en}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow text-forest-400">Pages</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="-my-1 inline-block py-1 text-[0.9375rem] text-forest-100 transition-colors duration-200 hover:text-white"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="eyebrow mt-9 text-forest-400">The range</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {orderedProducts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="-my-1 inline-block py-1 text-[0.9375rem] text-forest-100 transition-colors duration-200 hover:text-white"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow text-forest-400">Get in touch</h2>
            <ul className="mt-5 flex flex-col gap-4 text-[0.9375rem]">
              <li>
                <a
                  href={whatsappLink(waMessage.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-my-1 inline-flex items-center gap-2.5 py-1 text-forest-100 transition-colors duration-200 hover:text-white"
                >
                  <WhatsAppIcon className="size-[1.05em] text-forest-300" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.contact.phone}`}
                  className="tnum -my-1 inline-block py-1 text-forest-100 transition-colors duration-200 hover:text-white"
                >
                  {company.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="-my-1 inline-block py-1 break-all text-forest-100 transition-colors duration-200 hover:text-white"
                >
                  {company.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.contact.careEmail}`}
                  className="-my-1 inline-block py-1 break-all text-forest-100 transition-colors duration-200 hover:text-white"
                >
                  {company.contact.careEmail}
                </a>
              </li>
            </ul>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7">
              {company.locations.map((loc) => (
                <address key={loc.id} className="text-[0.875rem] not-italic">
                  <span className="eyebrow block text-forest-400">
                    {loc.label} · {loc.role}
                  </span>
                  <span className="mt-2.5 block leading-relaxed text-forest-200">
                    {loc.full}
                  </span>
                </address>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 py-6">
          {company.credentials.map((c) => (
            <span
              key={c.id}
              className="text-[0.8125rem] text-forest-300"
              title={c.note}
            >
              <span className="text-forest-100">{c.name}</span>{" "}
              <span className="text-forest-400">{c.detail}</span>
            </span>
          ))}
        </div>

        {/* Extra bottom space so the floating WhatsApp button never sits on
            top of this line when the page is scrolled to the end. */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-7 pb-24 text-[0.8125rem] text-forest-400 sm:flex-row sm:items-center sm:justify-between lg:pb-28">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p>
            Pack artwork and product photography are the property of{" "}
            {company.legalName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
