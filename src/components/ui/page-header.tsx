import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/section";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Breadcrumb({
  trail,
  className,
}: {
  trail: { name: string; href: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 text-[0.8125rem] text-ink-3">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink-2">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="-my-1.5 inline-block py-1.5 transition-colors duration-200 hover:text-ink"
                >
                  {item.name}
                </Link>
              )}
              {!last ? (
                <span aria-hidden="true" className="text-ink-4">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * The opening block of every interior page. Text only — interior pages earn
 * their imagery further down, where it has something to illustrate.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  trail,
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  trail?: { name: string; href: string }[];
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "border-b border-line bg-paper pt-18 lg:pt-20",
        className
      )}
    >
      <Container>
        <div className="pt-10 pb-12 lg:pt-14 lg:pb-16">
          {trail ? (
            <Reveal kind="fade">
              <Breadcrumb trail={trail} className="mb-8" />
            </Reveal>
          ) : null}

          <div className="grid gap-y-7 lg:grid-cols-12 lg:items-end lg:gap-x-12">
            <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
              <Reveal kind="fade">
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
              <MaskReveal as="h1" className="display-1 mt-5 text-ink" delay={0.04}>
                {title}
              </MaskReveal>
            </div>

            {lede || aside ? (
              <Reveal
                kind="rise"
                delay={0.1}
                className={aside ? "lg:col-span-5" : "lg:col-span-3"}
              >
                {lede ? <p className="body-text max-w-lg lg:pb-1.5">{lede}</p> : null}
                {aside}
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </header>
  );
}
