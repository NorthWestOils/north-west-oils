import { SITE_URL, company } from "@/data/company";
import { orderedProducts } from "@/data/products";

/**
 * /llms.txt — a plain-text brief for AI assistants and answer engines, built
 * from the same data as the pages so the two can never disagree.
 * Format: https://llmstxt.org
 */
export const dynamic = "force-static";

export function GET() {
  const [heroOil] = orderedProducts;

  const lines = [
    `# ${company.legalName}`,
    "",
    `> ${company.summary} Established ${company.established}. Hero product: North West ${heroOil.name}.`,
    "",
    "## Products",
    "",
    ...orderedProducts.map(
      (p) =>
        `- [North West ${p.name}](${SITE_URL}/products/${p.slug}): ${p.summary} Pack sizes: ${p.packs
          .map((pk) => pk.label)
          .join(", ")}. Also known as: ${p.alternateNames.join(", ")}.`
    ),
    "",
    "## Company",
    "",
    `- Established: ${company.established}`,
    ...company.locations.map(
      (l) => `- ${l.role}: ${l.full}. Phone ${l.phoneDisplay}.`
    ),
    `- Certifications: ${company.credentials
      .map((c) => `${c.name} (${c.detail})`)
      .join("; ")}`,
    `- Trade enquiries: WhatsApp or call ${company.contact.phoneDisplay}, email ${company.contact.email}`,
    "",
    "## Pages",
    "",
    `- [Products](${SITE_URL}/products): the full range and pack formats`,
    `- [Quality](${SITE_URL}/quality): testing, certifications and what is printed on the pack`,
    `- [About](${SITE_URL}/about): company registration, principles and addresses`,
    `- [Contact](${SITE_URL}/contact): trade, bulk and distribution enquiries`,
    "",
    "## Frequently asked questions",
    "",
    ...[...company.faqs, ...company.qualityFaqs].flatMap((f) => [
      `### ${f.question}`,
      "",
      f.answer,
      "",
    ]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
