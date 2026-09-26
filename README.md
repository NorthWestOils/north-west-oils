# North West Oils

Marketing site for **North West Oils Private Limited** — Kachi Ghani mustard oil,
refined soyabean oil and refined palmolein oil, sold to households, retailers,
distributors and institutional kitchens across India.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Motion · TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start
npm run lint
```

## How this is put together

```
app/
  layout.tsx            fonts, metadata, header/footer shell
  page.tsx              home
  error.tsx             route error boundary
  not-found.tsx         404
  favicon.ico icon.png apple-icon.png   the only icons; Next serves and links
                                        them from here, so nothing duplicates
                                        them in public/
  products/             range index + a page per product
  about/ quality/
  contact/              contact details, how to reach us, locations
  sitemap.ts robots.ts  generated from the data files
components/
  layout/               header (scroll state, dark-hero variant, mobile menu), footer
  home/                 the home page sections
  products/             product card, pack-size switcher
  motion/               Reveal / RevealGroup / MaskReveal, route transition
  ui/                   Section, Container, Eyebrow, Button, ProductShot, icons, …
  seo/json-ld.tsx       Organization, WebSite, Product, BreadcrumbList
data/
  company.ts            every company fact used on the site
  products.ts           every product fact used on the site
lib/
  motion.ts             the motion vocabulary — easings, durations, springs, variants
  whatsapp.ts           wa.me links and the prefilled opening lines
```

### Content rules

`data/company.ts` and `data/products.ts` are the only places facts live, and
each entry comes from one of two first-party sources: the company profile deck,
or text printed on the packs themselves. Nothing on this site is estimated,
rounded up, or invented — no years of experience, tonnage, customer counts,
awards, ratings, reviews or health claims.

Two things were deliberately left out because they could not be read with
enough confidence from the pack artwork, and both should be filled in from the
paper documents before launch:

- **the FSSAI licence number** — the site says the number is printed on every
  pack, which is true, but does not reproduce it. Add it to
  `company.credentials` when you have it from the certificate.
- **numeric nutrition panels** — the per-100 g tables are on the packs and are
  regulated content. Take them from the printed artwork, not from a render.

### Structure notes

There is no backend. Every route is static HTML, there are no server actions,
no API routes and no database — enquiries go through WhatsApp, the phone or
email. That is why the site can be hosted anywhere that serves files and why
there is nothing to configure before it goes live.

### Design system

Colour, type, spacing and motion tokens live in `app/globals.css` under
`@theme`. The palette is sampled from the real brand: `--color-forest-600`
(`#006028`) is the green of the logo droplet, `--color-gold-500` (`#F4D600`) the
yellow of the NW monogram, and the three product accents are the label colours
of the three packs — red for mustard, green for soyabean, blue for palmolein.

The homepage opens on a dark forest hero; the header detects that route and
switches to its light treatment until you scroll. Add a route to
`DARK_HERO_ROUTES` in `components/layout/header.tsx` if another page ever opens
the same way.

Type is Fraunces for display (optical-size axis only; the SOFT axis costs 50 KB
and buys almost nothing), Instrument Sans for everything else, and Noto Sans
Devanagari for the Hindi lines — not preloaded, because it is heavier than both
Latin faces combined and sets a handful of lines rather than the page.

### Motion

`lib/motion.ts` holds the whole vocabulary. Components animate by naming a
variant (`<Reveal kind="pack">`), never by writing values inline. Every
animated component checks `useReducedMotion()` and renders a plain element when
motion is reduced, and a `<noscript>` rule resets `[data-reveal]` so the page is
readable even if the JavaScript never arrives.

## WhatsApp

WhatsApp is the primary call to action across the site — header, hero, every
section CTA, the footer and the contact page. It is how this trade actually
opens a conversation, and unlike the form it needs no backend to work.

[`lib/whatsapp.ts`](lib/whatsapp.ts) builds the links. The number comes from
`company.contact.whatsapp`, so changing it is one edit. Each link carries a
prefilled opening line matched to where it was clicked — a product page opens
with that product's name, the quality page asks for the licence and test
documentation, the products index asks about stocking the range. `wa.me` types
the message into the chat but **does not send it**; the person edits or deletes
it first.

Links open in a new tab with `rel="noopener noreferrer"`.

There is deliberately no floating WhatsApp bubble. The header is sticky and its
button is always on screen, which does the same job without the badge sitting
over the content.

`/contact` is the full version: the WhatsApp button, the phone number, both
email addresses, both locations with map links, and a short list of what to
put in a first message so an enquiry can be answered with a quotation rather
than a round of questions.

## Images

```
public/products/   pack shots, one per SKU
public/images/     scenes, logo, field and texture imagery
public/marks/      certification marks lifted from the company's own packs
public/process/    the five quality-assurance stages
public/og/         per-product social cards
```

All of it is optimised WebP. The original camera/render files are archived,
untracked, in `.assets-src/` along with the company profile PDF, so nothing is
lost and nothing oversized ships.

The three tin shots had an opaque background baked into the supplied files;
they were cut out so every pack sits on the page as a true cut-out. Pack
artwork itself is untouched — nothing on a label has been edited, recoloured or
rewritten.

**Certification marks.** The FSSAI mark, the +F fortification mark, the green
vegetarian mark, the Make in India mark and the Pure & Safe seal in the
credentials strip are cropped from the company's own pack artwork, not redrawn
and not taken from a logo site. ISO 9001 and ISO 22000 are set as type, because
the pack declares them in words rather than with a logo.

**Reference photography.** Three images in the quality section — mustard seed,
oil pouring from a press, and a laboratory sample — are from Unsplash under its
free licence, and the page says so underneath them. Stages four and five are
the company's own packs. No image on this site implies a facility the company
has not shown us.

## Measured weight

Homepage, production build: **~245 KB of JavaScript gzipped**, 8 KB of CSS, and
95 KB of preloaded font. Every route is static HTML. Images are AVIF/WebP at
18–45 KB for a full-size pack shot.

Most of the JavaScript is the React + Next runtime plus Motion. If it ever
needs to come down, the lever is Motion's `LazyMotion` — swapping `motion.*`
for `m.*` and loading `domMax` lazily. It was measured and left alone here
because the saving is real but modest and the refactor touches every animated
component. (`experimental.optimizePackageImports` was also measured: on this
project it changes nothing, so it is not in the config.)

## Before launch

- Confirm `company.contact.whatsapp` is the number that is actually on
  WhatsApp. It is currently the same as the published phone number — if the
  business uses a separate WhatsApp Business line, change it there.
- Confirm the canonical domain in `data/company.ts` (`SITE_URL`) — everything
  else, including the sitemap, metadata and structured data, follows from it.
- Add the FSSAI licence number if the company wants it shown.
