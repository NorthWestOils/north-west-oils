import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { orderedProducts } from "@/data/products";

const PAGES = [
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/quality" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms and conditions", href: "/terms-and-conditions" },
];

const linkCls =
  "-my-1 inline-block py-1 text-[0.9375rem] text-forest-100 transition-colors duration-200 hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-paper">
      <div className="container-page">
        {/* Brand band: logo left, family credo right */}
        <div className="flex flex-col items-center text-center gap-8 border-b border-white/10 pt-14 pb-12 sm:pt-16 lg:flex-row lg:items-end lg:justify-between lg:text-left lg:pt-20">
          <Link href="/" className="inline-flex items-center gap-3.5 text-left">
            <Image src="/images/logo.webp" alt="" width={513} height={760} className="h-12 w-auto" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-xl font-medium tracking-[-0.015em]">North West Oils</span>
              <span className="label mt-1 text-forest-300">Private Limited, Est. {company.established}</span>
            </span>
          </Link>

          <div className="text-center lg:text-right">
            <p lang="hi" className="deva text-xl leading-tight text-gold-500 sm:text-2xl">
              {company.tagline.hi}
            </p>
            <p className="mt-1 text-sm leading-tight text-forest-300">{company.tagline.en}</p>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 lg:grid-cols-12 lg:gap-8">
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="label text-forest-400">Pages</h2>
            <ul className="mt-5 flex flex-col gap-3.5">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={linkCls}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label text-forest-400">The range</h2>
            <ul className="mt-5 flex flex-col gap-3.5">
              {orderedProducts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className={linkCls}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h2 className="label text-forest-400">Get in touch</h2>
            <ul className="mt-5 flex flex-col gap-3.5">
              <li>
                <a href={`tel:${company.contact.phone}`} className={`tnum ${linkCls}`}>
                  {company.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.contact.email}`} className={`wrap-anywhere ${linkCls}`}>
                  {company.contact.email.split("@")[0]}@<wbr />{company.contact.email.split("@")[1]}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.contact.careEmail}`} className={`wrap-anywhere ${linkCls}`}>
                  {company.contact.careEmail.split("@")[0]}@<wbr />{company.contact.careEmail.split("@")[1]}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 flex flex-col gap-6 lg:col-span-4">
            {company.locations.map((loc) => (
              <address key={loc.id} className="not-italic">
                <span className="label block text-forest-400">
                  {loc.label}, {loc.role}
                </span>
                <span className="mt-3 block text-[0.9375rem] leading-relaxed text-forest-200">{loc.full}</span>
              </address>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <ul className="flex flex-wrap gap-2 border-t border-white/10 py-6">
          {company.credentials.map((c) => (
            <li
              key={c.id}
              title={c.note}
              className="rounded-full border border-white/10 px-3 py-1.5 text-[0.75rem] text-forest-300"
            >
              <span className="font-medium text-forest-100">{c.name}</span> {c.detail}
            </li>
          ))}
        </ul>

        {/* Bottom bar */}
        <div className="flex flex-col items-center text-center gap-4 border-t border-white/10 pt-6 pb-12 text-[0.8125rem] text-forest-300 sm:flex-row sm:items-center sm:justify-between sm:text-left sm:pb-8">
          <p className="leading-relaxed text-forest-200/90 pr-14 sm:pr-0">
            © {year} {company.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="shrink-0">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
              {LEGAL.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-forest-200 transition-colors duration-200 hover:text-gold-500 hover:underline underline-offset-4"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
