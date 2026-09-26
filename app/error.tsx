"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { waMessage, whatsappLink } from "@/lib/whatsapp";

/**
 * Route-level error boundary. The pages here are static, so this should never
 * be seen — but if something does throw, a visitor gets a way forward and a
 * phone number rather than a blank screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-paper pt-18 lg:pt-20">
      <Container>
        <div className="max-w-xl py-16">
          <span className="eyebrow text-ink-3">Something went wrong</span>
          <h1 className="display-2 mt-5 text-ink">This page did not load.</h1>
          <p className="body-text mt-5">
            Try again, or go back to the homepage. If you were in the middle of
            an enquiry, WhatsApp is the quickest way through.
          </p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center">
            <Button onClick={reset} withArrow>
              Try again
            </Button>
            <ButtonLink
              href={whatsappLink(waMessage.general)}
              variant="whatsapp"
            >
              WhatsApp us
            </ButtonLink>
            <ButtonLink href="/" variant="outline">
              Homepage
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
