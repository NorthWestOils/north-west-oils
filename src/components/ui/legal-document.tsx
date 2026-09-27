import type { ReactNode } from "react";
import { Container, Section } from "@/components/ui/section";

export type LegalSection = { id: string; title: string; body: ReactNode };

/**
 * The body of the privacy policy and the terms. Static on purpose — no reveal
 * motion on text someone is reading clause by clause — with a contents list
 * that stays in view on wide screens.
 */
export function LegalDocument({
  updated,
  sections,
}: {
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-14">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="text-[0.8125rem] text-ink-3">Last updated {updated}</p>
              <ol className="mt-6 hidden flex-col gap-3 border-t border-line pt-6 lg:flex">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-my-1 flex gap-3 py-1 text-[0.875rem] text-ink-2 transition-colors duration-200 hover:text-ink"
                    >
                      <span className="tnum w-5 shrink-0 text-ink-4">{i + 1}.</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="max-w-2xl lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-heading`}
                className="scroll-mt-24 border-t border-line py-9 first:border-t-0 first:pt-0 lg:scroll-mt-28"
              >
                <h2
                  id={`${s.id}-heading`}
                  className="display-3 text-ink"
                >
                  <span className="tnum mr-3 text-ink-4">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="body-text mt-4 [&_a]:text-forest-600 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-forest-800 [&_li]:mt-2 [&_p+p]:mt-4 [&_p+ul]:mt-3 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul+p]:mt-4">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
