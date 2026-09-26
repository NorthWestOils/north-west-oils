import type { Metadata } from "next";
import { Container } from "@/components/ui/section";
import { ButtonLink, TextLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-paper pt-18 lg:pt-20">
      <Container>
        <div className="max-w-xl py-16">
          <span className="eyebrow text-ink-3">404</span>
          <h1 className="display-2 mt-5 text-ink">
            That page is not here.
          </h1>
          <p className="body-text mt-5">
            The link may be old, or the address slightly off. The range, the
            quality process and the contact details are all a click away.
          </p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center">
            <ButtonLink href="/" withArrow>
              Back to the homepage
            </ButtonLink>
            <TextLink href="/products" className="xs:ml-4">
              See the range
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
