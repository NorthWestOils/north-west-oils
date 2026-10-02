import type { ReactNode } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import { company } from "@/data/company";
import { waMessage, whatsappLink } from "@/lib/whatsapp";

export function ContactCta({
  eyebrow = "Procurement & Trade Desk",
  heading = "Direct access to the manufacturing desk.",
  body = "Whether you require weekly scheduled 15 KG tins for high-volume commercial kitchens or truckload consignments for regional distribution networks, our commercial desk responds with transparent volume pricing and dispatch schedules.",
  message = waMessage.trade,
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  message?: string;
}) {
  const channels: { label: string; value: string; href: string; icon?: ReactNode; external?: boolean }[] = [
    {
      label: "WhatsApp",
      value: "Message the trade desk",
      href: whatsappLink(message),
      icon: <WhatsAppIcon className="size-[1.1em]" />,
      external: true,
    },
    { label: "Call", value: company.contact.phoneDisplay, href: `tel:${company.contact.phone}` },
    { label: "Email", value: company.contact.email, href: `mailto:${company.contact.email}` },
  ];

  return (
    <Section id="enquiries" tone="paper" aria-labelledby="cta-heading">
      <Container>
        <div className="relative overflow-hidden rounded-4xl bg-forest-900 px-5 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <Image
            src="/images/soyabean-field.webp"
            alt=""
            fill
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="pointer-events-none object-cover object-[80%_35%] select-none"
          />
          {/* Deep green wash keeps the copy readable; the field shows through on the right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-r from-forest-950 via-forest-950/85 to-forest-950/30"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-forest-950/50 to-transparent"
          />
          {/* Frosted layer behind the contact links, fading out toward the copy */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-3/5 bg-forest-950/10 backdrop-blur-[3px] mask-[linear-gradient(to_right,transparent,black_35%)] lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/10"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader
                id="cta-heading"
                tone="light"
                eyebrow={eyebrow}
                title={heading}
                intro={body}
              />
            </div>

            <RevealGroup
              as="ul"
              step={0.07}
              delay={0.1}
              className="flex flex-col border-t border-white/10 lg:col-span-6"
            >
              {channels.map((c) => (
                <RevealItem as="li" key={c.label} className="border-b border-white/10">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-3 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 sm:gap-6 sm:py-5"
                  >
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="label text-forest-300">{c.label}</span>
                      <span className="tnum flex items-center gap-2 text-paper transition-colors duration-200 group-hover:text-gold-500 text-sm font-medium sm:text-base lg:text-lg">
                        {c.icon ? <span className="shrink-0">{c.icon}</span> : null}
                        <span className="min-w-0 wrap-anywhere">
                          {c.label === "Email" && c.value.includes("@") ? (
                            <>
                              {c.value.split("@")[0]}@<wbr />{c.value.split("@")[1]}
                            </>
                          ) : (
                            c.value
                          )}
                        </span>
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-paper text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-forest-950 sm:size-10 sm:text-base"
                    >
                      →
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
