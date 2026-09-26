/**
 * Product data.
 *
 * Sources, in order of authority:
 *   1. text printed on the packs themselves (see /public/products)
 *   2. the company profile deck
 *
 * Numeric nutrition panels are deliberately not reproduced here. The values on
 * the pack renders cannot be read with the confidence a regulated nutrition
 * claim requires — take them from the printed artwork before publishing any.
 */

export type Accent = "mustard" | "soy" | "palm";

export interface Pack {
  id: string;
  /** Short label used in the pack switcher. */
  label: string;
  /** Full description of the container. */
  format: string;
  image: string;
  alt: string;
  /** Render dimensions, so the switcher never shifts layout. */
  width: number;
  height: number;
}

export interface Product {
  slug: string;
  name: string;
  nameHi: string;
  category: string;
  /** One line, used on cards and as the meta description seed. */
  summary: string;
  /** Two or three sentences for the product page intro. */
  intro: string;
  /** Search-result title, before the " | North West Oils" suffix. Keep it
      under about 44 characters so the whole line fits in a result. */
  seoTitle: string;
  /** Search-result description. 150–160 characters. */
  seoDescription: string;
  /** Other names buyers search for — spelling variants and the Hindi name
      in Latin script. Used in structured data, not shown on the page. */
  alternateNames: string[];
  /** Buyer questions specific to this oil, answered only from the facts
      above. Pack sizes, who it is for and how to get a price are added by
      the product page for every oil. */
  faqs: { question: string; answer: string }[];
  /** One-line answers for the comparison table on /products. */
  compare: { made: string; taste: string; bestUse: string };
  accent: Accent;
  /** Hero pack for cards and listings. */
  heroImage: string;
  heroAlt: string;
  heroWidth: number;
  heroHeight: number;
  packs: Pack[];
  /** Short, factual points taken from the pack and the company deck. */
  attributes: string[];
  /** Spec-sheet rows for the product page. */
  specs: { label: string; value: string }[];
  /** Who this grade is actually bought by. */
  bestFor: string[];
  /** Scene photograph for the product page. */
  scene?: { src: string; alt: string; transparent: boolean };
}

export const products: Product[] = [
  {
    slug: "mustard-oil",
    name: "Mustard Oil",
    nameHi: "कच्ची घानी सरसों का तेल",
    category: "Kachi Ghani & Refined",
    summary:
      "Cold-pressed Kachi Ghani mustard oil with its pungency and aroma intact, in five pack sizes from 500 ML to 15 KG.",
    intro:
      "Kachi Ghani means the seed is pressed cold, not heated. It is the slower way to get oil out of mustard, and it is the reason the oil still smells and tastes of mustard by the time it reaches the pan. We press from selected seed and fill five sizes, from a 500 ML bottle for a household to a 15 KG tin for a kitchen that cooks all day.",
    seoTitle: "Kachi Ghani Mustard Oil, 500 ML to 15 KG",
    seoDescription:
      "Cold-pressed Kachi Ghani mustard oil with its natural pungency and aroma, in 500 ML and 1 L bottles, 2 L and 5 L jars and 15 KG tins. FSSAI licensed.",
    alternateNames: ["Kachi Ghani Mustard Oil", "Cold-pressed Mustard Oil", "Sarson ka Tel", "Kachi Ghani Sarson Tel"],
    compare: {
      made: "Cold-pressed (Kachi Ghani)",
      taste: "Pungent, with a natural mustard aroma",
      bestUse: "Everyday cooking where the food should taste of mustard",
    },
    faqs: [
      {
        question: "What does Kachi Ghani mean?",
        answer:
          "Kachi Ghani means the mustard seed is pressed cold instead of being heated. It is the slower way to get oil out of mustard, and it is why North West Mustard Oil still smells and tastes of mustard when it reaches the pan.",
      },
      {
        question: "What is Kachi Ghani mustard oil used for?",
        answer:
          "It is bought for everyday household cooking, where the food should taste of mustard. Its natural pungency and aroma are kept by pressing the seed cold.",
      },
      {
        question: "Which North West Mustard Oil pack size should I buy?",
        answer:
          "500 ML and 1 L PET bottles suit the shelf, 2 L and 5 L handled jars suit a household that gets through it, and the 15 KG tin suits kitchens that buy by weight.",
      },
      {
        question: "What is the shelf life of North West Mustard Oil?",
        answer:
          "Best before nine months from packaging. Store it in a dry place away from heat and light. The packaging date is printed on every pack.",
      },
    ],
    accent: "mustard",
    heroImage: "/products/mustard-15kg-tin.webp",
    heroAlt: "North West Kachi Ghani Mustard Oil in a 15 kg food-grade tin",
    heroWidth: 815,
    heroHeight: 1150,
    packs: [
      {
        id: "15kg",
        label: "15 KG",
        format: "Food-grade metal tin",
        image: "/products/mustard-15kg-tin.webp",
        alt: "North West Kachi Ghani Mustard Oil 15 kg tin",
        width: 815,
        height: 1150,
      },
      {
        id: "5l",
        label: "5 L",
        format: "Handled jar",
        image: "/products/mustard-5l-jar.webp",
        alt: "North West Kachi Ghani Mustard Oil 5 litre handled jar",
        width: 760,
        height: 1150,
      },
      {
        id: "2l",
        label: "2 L",
        format: "Handled jar",
        image: "/products/mustard-2l-jar.webp",
        alt: "North West Kachi Ghani Mustard Oil 2 litre handled jar",
        width: 768,
        height: 1150,
      },
      {
        id: "1l",
        label: "1 L",
        format: "PET bottle",
        image: "/products/mustard-1l-bottle.webp",
        alt: "North West Kachi Ghani Mustard Oil 1 litre PET bottle",
        width: 335,
        height: 1150,
      },
      {
        id: "500ml",
        label: "500 ML",
        format: "PET bottle",
        image: "/products/mustard-500ml-bottle.webp",
        alt: "North West Kachi Ghani Mustard Oil in a PET bottle",
        width: 367,
        height: 1150,
      },
    ],
    attributes: [
      "Cold-pressed by the Kachi Ghani method",
      "Distinct pungency and natural mustard aroma",
      "Rich in monounsaturated fatty acids and omega-3",
      "100% vegetarian",
      "Best before nine months from packaging",
    ],
    specs: [
      { label: "Grade", value: "Kachi Ghani (cold-pressed) and refined" },
      { label: "Ingredient", value: "Mustard oil" },
      { label: "Pack sizes", value: "15 KG · 5 L · 2 L · 1 L · 500 ML" },
      { label: "Containers", value: "Metal tin, handled jar, PET bottle" },
      { label: "Shelf life", value: "Nine months from packaging" },
      { label: "Storage", value: "Dry place, away from heat and light" },
    ],
    bestFor: [
      "Everyday household cooking",
      "Retail shelves and kirana stores",
      "Distributor and wholesale stock",
      "Institutional kitchens buying 15 KG tins",
    ],
    scene: {
      src: "/images/mustard-range.webp",
      alt: "The North West mustard oil range: 15 kg tin, 5 litre jar and PET bottles with mustard flowers, seed and a bowl of oil",
      transparent: true,
    },
  },
  {
    slug: "soyabean-refined-oil",
    name: "Soyabean Refined Oil",
    nameHi: "सोयाबीन रिफाइंड तेल",
    category: "Refined",
    summary:
      "Hero product: a light, neutral refined oil fortified with vitamins A and D, supplied in 15 KG tins.",
    intro:
      "Refined soyabean oil does the work mustard oil is too assertive for: frying that should not taste of the oil, batters, baking, and volume cooking where consistency matters more than character. It is refined under controlled conditions, fortified with vitamins A and D, and filled into 15 KG tins.",
    seoTitle: "Soyabean Refined Oil 15 KG Tin, Fortified",
    seoDescription:
      "North West Soyabean Refined Oil, our hero product: a light, neutral oil fortified with vitamins A and D, in 15 KG food-grade tins for homes, caterers and trade.",
    alternateNames: ["Refined Soyabean Oil", "Soybean Refined Oil", "Refined Soybean Oil", "Soya Oil"],
    compare: {
      made: "Refined under controlled conditions",
      taste: "Light body, neutral aroma",
      bestUse: "Frying, batters, baking and volume cooking",
    },
    faqs: [
      {
        question: "Is soyabean oil the same as soybean oil?",
        answer:
          "Yes. Soyabean is the spelling most used in India and soybean is the international spelling. Both name the same oil, and North West Soyabean Refined Oil is refined soybean oil.",
      },
      {
        question: "Is North West Soyabean Refined Oil good for frying?",
        answer:
          "Yes. It has a light body and a neutral aroma, so it suits frying where the food should not taste of the oil, as well as batters, baking and volume cooking where consistency matters more than character.",
      },
      {
        question: "Is North West Soyabean Refined Oil fortified?",
        answer:
          "Yes. It is fortified with vitamins A and D and carries the +F fortification mark on the tin.",
      },
      {
        question: "What is the shelf life of North West Soyabean Refined Oil?",
        answer:
          "Best before nine months from packaging. Store the tin in a cool, dry place away from direct heat and sunlight. The packaging date is printed on every tin.",
      },
    ],
    accent: "soy",
    heroImage: "/products/soyabean-15kg-tin.webp",
    heroAlt: "North West Soyabean Refined Oil in a 15 kg food-grade tin",
    heroWidth: 771,
    heroHeight: 1150,
    packs: [
      {
        id: "15kg",
        label: "15 KG",
        format: "Food-grade metal tin",
        image: "/products/soyabean-15kg-tin.webp",
        alt: "North West Soyabean Refined Oil 15 kg tin",
        width: 771,
        height: 1150,
      },
    ],
    attributes: [
      "Refined under controlled, hygienic conditions",
      "Light body and neutral aroma",
      "Fortified with vitamins A and D",
      "100% vegetarian",
      "Best before nine months from packaging",
    ],
    specs: [
      { label: "Grade", value: "Refined edible grade" },
      { label: "Ingredient", value: "Soyabean refined oil" },
      { label: "Pack size", value: "15 KG" },
      { label: "Container", value: "Food-grade metal tin" },
      { label: "Fortification", value: "Vitamins A and D" },
      { label: "Shelf life", value: "Nine months from packaging" },
    ],
    bestFor: [
      "Everyday household cooking and baking",
      "Caterers and canteens",
      "Food businesses buying by the tin",
      "Wholesale and loose-oil supply",
    ],
    scene: {
      src: "/images/soyabean-scene.webp",
      alt: "North West Soyabean Refined Oil 15 kg tin with soybeans and soy leaves",
      transparent: true,
    },
  },
  {
    slug: "refined-palmolein-oil",
    name: "Refined Palmolein Oil",
    nameHi: "रिफाइंड पामोलिन तेल",
    category: "Refined · Frying grade",
    summary:
      "A frying-grade refined palmolein for commercial kitchens, supplied in 15 litre tins.",
    intro:
      "Palmolein holds up to heat that would break a lighter oil down, which is why commercial fryers run on it. Ours is refined to national standards, fortified with vitamins A and D, and filled into 15 litre tins. The pack is marked for frying and commercial use.",
    seoTitle: "Refined Palmolein Oil 15 Litre Frying Tin",
    seoDescription:
      "Frying-grade refined palmolein oil, fortified with vitamins A and D, in 15 litre food-grade tins for commercial kitchens, caterers and snack makers.",
    alternateNames: ["Palmolein Oil", "Palm Olein Oil", "Refined Palmolein"],
    compare: {
      made: "Refined, frying grade",
      taste: "Neutral, leaves the seasoning alone",
      bestUse: "Deep frying and commercial fryers that run all day",
    },
    faqs: [
      {
        question: "Is palmolein oil good for deep frying?",
        answer:
          "Yes. Palmolein holds up to heat that would break a lighter oil down, which is why commercial fryers run on it. The North West pack is marked for frying and commercial use.",
      },
      {
        question: "What is the difference between palm oil and palmolein?",
        answer:
          "Palmolein is the liquid fraction of palm oil, separated from the solid part by fractionation. It is the form of palm oil used for cooking and frying.",
      },
      {
        question: "Is North West Refined Palmolein Oil fortified?",
        answer:
          "Yes. It is fortified with vitamins A and D and carries the +F fortification mark on the tin.",
      },
      {
        question: "What is the shelf life of North West Refined Palmolein Oil?",
        answer:
          "Best before nine months from packaging. Store the tin in a cool, dry place away from direct heat and sunlight. The packaging date is printed on every tin.",
      },
    ],
    accent: "palm",
    heroImage: "/products/palmolein-15l-tin.webp",
    heroAlt: "North West Refined Palmolein Oil in a 15 litre food-grade tin",
    heroWidth: 812,
    heroHeight: 1150,
    packs: [
      {
        id: "15l",
        label: "15 LTR",
        format: "Food-grade metal tin",
        image: "/products/palmolein-15l-tin.webp",
        alt: "North West Refined Palmolein Oil 15 litre tin",
        width: 812,
        height: 1150,
      },
    ],
    attributes: [
      "Refined palmolein for sustained frying heat",
      "Neutral taste that leaves seasoning alone",
      "Fortified with vitamins A and D",
      "100% vegetarian",
      "Best before nine months from packaging",
    ],
    specs: [
      { label: "Grade", value: "Refined palmolein, frying grade" },
      { label: "Ingredient", value: "Palmolein refined oil" },
      { label: "Pack size", value: "15 LTR" },
      { label: "Container", value: "Food-grade metal tin" },
      { label: "Use", value: "Frying and commercial kitchens" },
      { label: "Shelf life", value: "Nine months from packaging" },
    ],
    bestFor: [
      "Commercial fryers and snack production",
      "Caterers and large kitchens",
      "Food manufacturing units",
      "Bulk and institutional supply",
    ],
    scene: {
      src: "/images/palmolein-scene.webp",
      alt: "North West Refined Palmolein Oil 15 litre tin with palm fruit and palm leaves",
      transparent: false,
    },
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

/**
 * The order products appear in across the site. Kept separate from the data
 * order so changing which grade leads is a one-line edit, not a reshuffle of
 * the records.
 */
const DISPLAY_ORDER = [
  "soyabean-refined-oil",
  "mustard-oil",
  "refined-palmolein-oil",
] as const;

export const orderedProducts: Product[] = DISPLAY_ORDER.map(
  (slug) => products.find((p) => p.slug === slug)!
);

/** The grade the homepage and the range page lead with. */
export const featuredProduct = orderedProducts[0];

export const accentVar: Record<Accent, string> = {
  mustard: "var(--color-mustard)",
  soy: "var(--color-soy)",
  palm: "var(--color-palm)",
};
