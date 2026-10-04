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
  /** Full list of commercial pack sizes available from the mill. */
  availableFormats?: string[];
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
    category: "Kachi Ghani",
    summary:
      "Kachi Ghani mustard oil with its pungency and aroma intact, fortified with vitamins A and D, in six pack sizes from 500 ML to 15 KG.",
    intro:
      "Our mustard oil comes from selected seed, processed under strict quality control, and it still smells and tastes of mustard by the time it reaches the pan. We fill six sizes, from a 500 ML bottle for a household to a 15 KG tin for a kitchen that cooks all day.",
    seoTitle: "Bulk Kachi Ghani Mustard Oil, 6 Pack Sizes",
    seoDescription:
      "Kachi Ghani mustard oil, fortified, in 500 ML, 750 ML and 1 L bottles, 2 L and 5 L jars and 15 KG tins. Bulk supply, PAN India.",
    alternateNames: ["Kachi Ghani Mustard Oil", "Mustard Oil", "Sarson ka Tel", "Kachi Ghani Sarson Tel"],
    compare: {
      made: "Refined",
      taste: "Pungent, with a natural mustard aroma",
      bestUse: "Traditional Indian cooking, regional gravies, pickling, and tempering",
    },
    faqs: [
      {
        question: "How is North West Mustard Oil made?",
        answer:
          "It is made from selected mustard seed under strict quality control and hygienic conditions, then lab tested for purity and freshness in line with FSSAI standards before it is filled.",
      },
      {
        question: "What is Kachi Ghani mustard oil used for?",
        answer:
          "It is ideal for traditional Indian curries, tadka, sautéing greens, and authentic pickling where robust mustard flavor and pungency are vital.",
      },
      {
        question: "Which North West Mustard Oil pack size should I buy?",
        answer:
          "500 ML, 750 ML, and 1 L PET bottles are ideal for retail display and daily kitchen pantries; 2 L and 5 L handled jars cater to regular household culinary use; and 15 KG heavy-gauge tins serve commercial kitchens, restaurants, and caterers.",
      },
      {
        question: "What is the shelf life of North West Mustard Oil?",
        answer:
          "Best before nine months from packaging. Store it in a dry place away from heat and light. The packaging date is printed on every pack.",
      },
      {
        question: "Is North West Mustard Oil fortified?",
        answer:
          "Yes. North West Kachi Ghani Mustard Oil is fortified with vitamins A and D and carries the +F fortification mark on the pack.",
      },
    ],
    accent: "mustard",
    heroImage: "/products/mustard-15kg-tin.webp",
    heroAlt: "North West Kachi Ghani Mustard Oil in a 15 kg food-grade tin",
    heroWidth: 1030,
      heroHeight: 1195,
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
        id: "750ml",
        label: "750 ML",
        format: "PET bottle",
        image: "/products/mustard-750ml-bottle.webp",
        alt: "North West Kachi Ghani Mustard Oil 750 ml PET bottle",
        width: 367,
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
    availableFormats: ["15 KG Tin", "5 L Jar", "2 L Jar", "1 L Bottle", "750 ML Bottle", "500 ML Bottle"],
    attributes: [
      "Processed under strict quality control",
      "Distinct pungency and natural mustard aroma",
      "Rich in monounsaturated fatty acids and omega-3",
      "Fortified with vitamins A and D",
      "100% vegetarian",
      "Best before nine months from packaging",
    ],
    specs: [
      { label: "Grade", value: "Refined" },
      { label: "Ingredient", value: "Mustard oil" },
      { label: "Pack sizes", value: "15 KG, 5 L, 2 L, 1 L, 750 ML, 500 ML" },
      { label: "Fortification", value: "Vitamins A and D" },
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
      src: "/images/mustard-retail-lineup.webp",
      alt: "The North West Kachi Ghani mustard oil range: 15 kg tin, 5 litre and 2 litre jars, and 1 litre and 500 ml bottles",
      transparent: true,
    },
  },
  {
    slug: "soyabean-refined-oil",
    name: "Soyabean Refined Oil",
    nameHi: "सोयाबीन रिफाइंड तेल",
    category: "Refined",
    summary:
      "Hero product: a crystal-clear, neutral refined oil fortified with vitamins A and D, supplied across all sizes from 500 ML bottles to 15 KG tins.",
    intro:
      "Refined Soyabean Oil is our hero product: a light, neutral cooking medium that allows the natural flavors and spices of every dish to take center stage. Highly stable at high cooking temperatures, it is the premier choice for daily sautéing, deep frying, confectionery, and commercial food preparation. Processed under strict ISO hygiene standards and fortified with vitamins A and D.",
    seoTitle: "Bulk Soyabean Refined Oil, All Pack Sizes",
    seoDescription:
      "North West Soyabean Refined Oil, our hero product: light, neutral and fortified with vitamins A and D, in 500 ML to 15 KG packs. Bulk and wholesale supply, PAN India.",
    alternateNames: ["Refined Soyabean Oil", "Soybean Refined Oil", "Refined Soybean Oil", "Soya Oil"],
    compare: {
      made: "Refined",
      taste: "Light body, neutral aroma",
      bestUse: "Frying, sautéing, batters, baking, and commercial culinary preparation",
    },
    faqs: [
      {
        question: "Is soyabean oil the same as soybean oil?",
        answer:
          "Yes. Soyabean is the prevailing spelling in India, while soybean is common internationally. Both refer to the identical edible oil, and North West Soyabean Refined Oil is premium refined soybean oil.",
      },
      {
        question: "Is North West Soyabean Refined Oil good for frying?",
        answer:
          "Excellent. Its light body, neutral aroma, and high smoke point make it ideal for delicate frying, crisps, batters, and volume cooking without altering the food's authentic flavors.",
      },
      {
        question: "Is North West Soyabean Refined Oil fortified?",
        answer:
          "Yes. It is fortified with vitamins A and D and carries the +F fortification mark on every pack.",
      },
      {
        question: "What pack sizes are available for North West Soyabean Refined Oil?",
        answer:
          "All six standard formats: 500 ML, 750 ML and 1 L consumer PET bottles, 2 L and 5 L handled jars, and heavy-gauge 15 KG commercial metal tins.",
      },
      {
        question: "What is the shelf life of North West Soyabean Refined Oil?",
        answer:
          "Best before nine months from packaging. Store in a cool, dry place away from direct heat and sunlight. The packaging date is printed on every pack.",
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
    availableFormats: ["15 KG Tin", "5 L Jar", "2 L Jar", "1 L Bottle", "750 ML Bottle", "500 ML Bottle"],
    attributes: [
      "Processed under strict quality control and hygienic conditions",
      "Lab tested, with a 100% purity guarantee on every pack",
      "Light body and neutral aroma",
      "Fortified with vitamins A and D",
      "100% vegetarian",
      "Best before nine months from packaging",
    ],
    specs: [
      { label: "Grade", value: "Refined edible grade" },
      { label: "Ingredient", value: "Soyabean refined oil" },
      { label: "Pack sizes", value: "15 KG, 5 L, 2 L, 1 L, 750 ML, 500 ML" },
      { label: "Containers", value: "Food-grade metal tin, handled jar, PET bottle" },
      { label: "Fortification", value: "Vitamins A and D" },
      { label: "Shelf life", value: "Nine months from packaging" },
    ],
    bestFor: [
      "Everyday household cooking and baking",
      "Caterers, restaurants and commercial canteens",
      "Retail shelves, supermarkets and kirana stock",
      "Wholesale, distributor consignments and loose-oil supply",
    ],
    scene: {
      src: "/products/soyabean-15kg-tin.webp",
      alt: "North West Soyabean Refined Oil 15 kg tin",
      transparent: true,
    },
  },
  {
    slug: "refined-palmolein-oil",
    name: "Refined Palmolein Oil",
    nameHi: "रिफाइंड पामोलिन तेल",
    category: "Refined, Frying grade",
    summary:
      "A frying-grade refined palmolein for commercial kitchens and retail, available in all formats from 500 ML to 15 L tins.",
    intro:
      "Palmolein holds up to heat that would break a lighter oil down, which is why commercial fryers and food businesses run on it. Ours is fortified with vitamins A and D, lab tested, and filled into bottles, jars and 15 litre tins. Marked for frying and commercial high-heat performance.",
    seoTitle: "Bulk Refined Palmolein Oil, All Pack Sizes",
    seoDescription:
      "Frying-grade refined palmolein oil, fortified with vitamins A and D, in 500 ML to 15 litre packs for commercial kitchens, retailers and caterers. Bulk supply, PAN India.",
    alternateNames: ["Palmolein Oil", "Palm Olein Oil", "Refined Palmolein"],
    compare: {
      made: "Refined, frying grade",
      taste: "Neutral, clean finish without flavor carryover",
      bestUse: "Continuous deep-frying, snacks, namkeen, and high-heat commercial food service",
    },
    faqs: [
      {
        question: "Is palmolein oil good for deep frying?",
        answer:
          "Yes. Refined palmolein provides superior thermal stability and a high smoke point, preventing foaming and chemical breakdown across extended continuous frying cycles.",
      },
      {
        question: "What is the difference between palm oil and palmolein?",
        answer:
          "Palmolein is the liquid fraction of palm oil, separated from the solid part by fractionation. It is the form of palm oil used for cooking and frying.",
      },
      {
        question: "Is North West Refined Palmolein Oil fortified?",
        answer:
          "Yes. It is fortified with vitamins A and D and carries the +F fortification mark on every pack.",
      },
      {
        question: "What pack sizes are available for Refined Palmolein Oil?",
        answer:
          "Available across consumer bottles (500 ML, 750 ML, 1 L), handled jars (2 L, 5 L), and 15 litre food-grade metal tins.",
      },
      {
        question: "What is the shelf life of North West Refined Palmolein Oil?",
        answer:
          "Best before nine months from packaging. Store in a cool, dry place away from direct heat and sunlight. The packaging date is printed on every pack.",
      },
    ],
    accent: "palm",
    heroImage: "/products/palmolein-15l-tin.webp",
    heroAlt: "North West Refined Palmolein Oil in a 15 litre food-grade tin",
    heroWidth: 610,
      heroHeight: 660,
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
    availableFormats: ["15 LTR / 15 KG Tin", "5 L Jar", "2 L Jar", "1 L Bottle", "750 ML Bottle", "500 ML Bottle"],
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
      { label: "Pack sizes", value: "15 LTR / 15 KG, 5 L, 2 L, 1 L, 750 ML, 500 ML" },
      { label: "Containers", value: "Food-grade metal tin, handled jar, PET bottle" },
      { label: "Use", value: "Frying, commercial kitchens and retail" },
      { label: "Shelf life", value: "Nine months from packaging" },
    ],
    bestFor: [
      "Commercial fryers and snack production",
      "Caterers and large institutional kitchens",
      "Retail grocers and supermarket shelves",
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
