"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { company } from "@/data/company";

const { guidance } = company;

const MILESTONES = [
  {
    year: String(guidance.tradeSince),
    title: "Into the Oil Trade",
    description: `${guidance.name} begins in the edible oil business, the start of more than five decades of trade experience.`,
  },
  {
    year: String(company.established),
    title: "Company Incorporated",
    description: `North West Oils Private Limited is formally incorporated in New Delhi under the guidance of ${guidance.name}.`,
  },
  {
    year: "Licensed",
    title: "Central FSSAI & Dual ISO",
    description: "Central FSSAI licensing along with ISO 9001:2015 and ISO 22000:2018 certifications.",
  },
  {
    year: "Today",
    title: "PAN India Distribution",
    description: "Supplying bulk commercial packs and retail bottles to distributors, retailers and institutional kitchens nationwide.",
  },
];

const METRICS = [
  { value: "50+", label: "Years of Trade Experience", sub: `In edible oils since ${guidance.tradeSince}` },
  { value: "3", label: "Master Oils", sub: "Soyabean, Mustard, Palmolein" },
  { value: "100%", label: "Lab Tested", sub: "FSSAI & NABL verified" },
  { value: "PAN India", label: "Supply Reach", sub: "Tins, Jars, Bottles & Tankers" },
];

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden section-y bg-forest-950 text-paper" aria-labelledby="story-heading">
      <Container className="relative z-10">
        {/* Top Header Block */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              id="story-heading"
              tone="light"
              eyebrow={<>Our Story &amp; Governance</>}
              title={<>Five decades of experience. One standard.</>}
              intro={<>North West Oils Private Limited was formally incorporated in New Delhi in {company.established} under the guidance of {guidance.name}, who has been in the edible oil business since {guidance.tradeSince}. That experience shapes a single standard: pure edible oils backed by verifiable statutory licensing and laboratory testing.</>}
            />
          </div>

          <div className="lg:col-span-5 lg:pl-4">
            <div className="rounded-2xl border border-white/10 bg-forest-900/60 p-6 sm:p-8 backdrop-blur-md">
              <span className="label text-gold-500">
                The Founder&apos;s Credo
              </span>
              <p lang="hi" className="deva mt-3 text-xl font-medium leading-relaxed text-gold-500 sm:text-2xl">
                {company.tagline.hi}
              </p>
              <p className="mt-2 text-xs italic text-forest-300">
                &ldquo;{company.tagline.en}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Tangible Metrics Strip */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-18 lg:gap-6">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-forest-900/30 p-5 text-center sm:p-6"
            >
              <p className="stat-value text-gold-500">
                {metric.value}
              </p>
              <p className="mt-2 text-xs font-medium text-paper sm:text-sm">
                {metric.label}
              </p>
              <p className="mt-0.5 text-[0.6875rem] text-forest-300">
                {metric.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Archival Milestone Timeline */}
        <div className="mt-16 border-t border-white/10 pt-14 lg:mt-20 lg:pt-16">
          <div className="max-w-xl">
            <span className="label text-gold-500">
              Corporate Timeline
            </span>
            <h3 className="display-3 mt-2 text-paper">
              Milestones that shaped our standards.
            </h3>
          </div>

          <RevealGroup step={0.06} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((item) => (
              <RevealItem key={item.year}>
                <div className="h-full rounded-2xl border border-white/10 bg-forest-900/30 p-5 sm:p-6 transition-colors duration-300 hover:border-gold-500/40 hover:bg-forest-900/60">
                  <span className="tnum text-sm font-medium text-gold-500">
                    {item.year}
                  </span>
                  <h4 className="card-title mt-3 text-paper">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-forest-200">
                    {item.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Bottom Story CTA Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-forest-900/40 p-6 sm:flex-row sm:p-8">
          <div>
            <h4 className="card-title text-paper">
              Corporate profile &amp; facility specifications
            </h4>
            <p className="mt-0.5 text-xs text-forest-300">
              Read our company profile, trade registrations, and processing capabilities.
            </p>
          </div>
          <ButtonLink href="/about" variant="outline-light" size="sm" withArrow className="shrink-0">
            Learn more about us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
