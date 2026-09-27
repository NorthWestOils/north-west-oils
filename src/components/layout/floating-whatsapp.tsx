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
      className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] z-40 flex size-12 items-center justify-center rounded-full bg-[#1FA855] text-white border-2 border-white/40 transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-[#178A44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1FA855] active:scale-95 active:bg-[#126E35] motion-reduce:transition-none motion-reduce:hover:scale-100 lg:right-8 lg:bottom-8 lg:size-13"
    >
      <WhatsAppIcon className="size-6 lg:size-7" />
    </a>
  );
}
