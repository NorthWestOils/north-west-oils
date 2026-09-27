"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button, on every page and every screen size.
 *
 * WhatsApp is how buyers reach the company, so the route to a chat is always
 * one tap away. It is a plain wa.me link rendered with the page (no widget
 * script, nothing waiting on JavaScript), and on a product page the opening
 * message already names the product.
 *
 * `productNames` comes from the server so only the three names, not the whole
 * product catalogue, end up in the client bundle.
 */
export function FloatingWhatsApp({
  productNames,
}: {
  productNames: Record<string, string>;
}) {
  const pathname = usePathname();
  const slug = pathname.startsWith("/products/")
    ? pathname.slice("/products/".length)
    : "";
  const productName = productNames[slug];
  const message = productName ? waMessage.product(productName) : waMessage.general;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        productName
          ? `Ask about ${productName} on WhatsApp`
          : "Chat with North West Oils on WhatsApp"
      }
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2.5 rounded-full border border-forest-700/40 bg-forest-950/90 text-paper px-4 py-2.5 backdrop-blur-md transition-all duration-200 hover:bg-forest-900 hover:border-forest-500 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400 select-none lg:right-6 lg:bottom-6"
    >
      <WhatsAppIcon className="size-5 text-[#25D366] shrink-0" />
      <span className="text-[0.8125rem] font-medium tracking-wide hidden sm:inline">
        WhatsApp Trade Desk
      </span>
    </a>
  );
}
