"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waMessage, whatsappLink } from "@/lib/whatsapp";
import { ease } from "@/lib/motion";

/** How far down the page before the button appears: past the first screen,
    which already carries its own WhatsApp call to action. */
const SHOW_AFTER_PX = 480;

/**
 * Floating WhatsApp button, phones and tablets only.
 *
 * On desktop the header keeps "WhatsApp us" in view at all times; below `lg`
 * it lives inside the menu, so this is the one-tap route back to a chat. It is
 * a plain wa.me link (no third-party widget script) and it steps aside over
 * the footer, which has the contact details anyway.
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
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [overFooter, setOverFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) =>
      setOverFooter(entry.isIntersecting)
    );
    io.observe(footer);
    return () => io.disconnect();
  }, [pathname]);

  const slug = pathname.startsWith("/products/")
    ? pathname.slice("/products/".length)
    : "";
  const productName = productNames[slug];
  const message = productName ? waMessage.product(productName) : waMessage.general;

  const visible = scrolled && !overFooter;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="floating-whatsapp"
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            productName
              ? `Ask about ${productName} on WhatsApp`
              : "Chat with North West Oils on WhatsApp"
          }
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: reduced ? 0.15 : 0.3, ease: ease.out }}
          className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] z-40 flex size-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-[0_8px_24px_-6px_rgba(3,32,20,0.45)] transition-colors hover:bg-[#178A44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1FA855] active:bg-[#126E35] lg:hidden"
        >
          <WhatsAppIcon className="size-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
