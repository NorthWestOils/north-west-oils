/**
 * Company facts.
 *
 * Every value here is taken from one of two first-party sources:
 *   1. the company profile deck (`.assets-src/NORTH WEST OILS PRIVATE LIMITED PDF.pdf`)
 *   2. text printed on the company's own packaging (the pack shots in /public/products)
 *
 * Nothing is inferred or estimated. If a fact is not in one of those two places
 * it does not belong in this file — and it does not belong on the website.
 */

export const SITE_URL = "https://northwestoilspvtltd.in";

export const company = {
  legalName: "North West Oils Private Limited",
  brandName: "North West",
  shortName: "North West Oils",
  /** Printed on every pack in the range. */
  established: 1973,

  tagline: {
    hi: "जो खाता हूँ, वही खिलाता हूँ।",
    en: "The same oil we eat is the oil we serve.",
  },

  /** One-line description used for metadata and structured data. */
  summary:
    "North West Oils Private Limited supplies refined soyabean oil, Kachi Ghani mustard oil and refined palmolein oil to households, retailers, distributors and institutional kitchens across India.",

  locations: [
    {
      id: "delhi",
      label: "Delhi",
      role: "Registered office",
      street: "Kh. No. 486, Fatehpur Beri",
      locality: "Chattarpur, South Delhi",
      region: "Delhi",
      postalCode: "110074",
      country: "IN",
      full: "Kh. No. 486, Fatehpur Beri, Chattarpur, South Delhi 110074",
      mapsQuery: "Fatehpur Beri, Chattarpur, South Delhi 110074",
      phone: "+919810548867",
      phoneDisplay: "+91 98105 48867",
      email: "care.northwestoilspvtltd@gmail.com",
      geo: {
        latitude: 28.4907,
        longitude: 77.1652,
      },
    },
    {
      id: "bareilly",
      label: "Bareilly",
      role: "Uttar Pradesh unit",
      street: "Kh. No. 626, Faridpur",
      locality: "Bareilly",
      region: "Uttar Pradesh",
      postalCode: "243502",
      country: "IN",
      full: "Kh. No. 626, Faridpur, Bareilly, Uttar Pradesh 243502",
      mapsQuery: "Faridpur, Bareilly, Uttar Pradesh 243502",
      phone: "+918057110074",
      phoneDisplay: "+91 80571 10074",
      email: "northwestoils1973@gmail.com",
      geo: {
        latitude: 28.2106,
        longitude: 79.5444,
      },
    },
  ],

  contact: {
    phone: "+919810548867",
    phoneDisplay: "+91 98105 48867",
    whatsapp: "919810548867",
    email: "northwestoilspvtltd@gmail.com",
    careEmail: "care.northwestoilspvtltd@gmail.com",
  },

  /**
   * Registrations and certifications named in the company deck and printed on
   * the packs. Licence and certificate numbers are intentionally omitted: the
   * numbers on the pack renders are not legible with enough confidence to
   * publish. Add them here only from the paper certificates.
   */
  credentials: [
    {
      id: "fssai",
      name: "FSSAI",
      detail: "Central licence",
      note: "Licensed under the Food Safety and Standards Authority of India. The licence number is printed on every pack.",
    },
    {
      id: "iso-9001",
      name: "ISO 9001:2015",
      detail: "Quality management",
      note: "Quality management system certification, declared on the pack as an ISO certified company.",
    },
    {
      id: "iso-22000",
      name: "ISO 22000:2018",
      detail: "Food safety management",
      note: "Food safety management system certification covering hygiene and processing controls.",
    },
    {
      id: "mca",
      name: "MCA",
      detail: "Approved",
      note: "Incorporated as a private limited company under the Ministry of Corporate Affairs.",
    },
    {
      id: "gst",
      name: "GST",
      detail: "Registered (Central)",
      note: "Registered under central goods and services tax.",
    },
    {
      id: "msme",
      name: "MSME",
      detail: "Registered (Micro)",
      note: "Registered under the Ministry of Micro, Small and Medium Enterprises.",
    },
  ],

  /** Verbatim commitments from the company deck, rewritten for the page. */
  principles: [
    {
      title: "Raw material sourcing",
      body: "Seed and oil stock is selected before it enters the line, because nothing downstream fixes a poor starting material.",
    },
    {
      title: "Modern processing",
      body: "Cold-press extraction for Kachi Ghani, controlled refining for the soyabean and palmolein grades.",
    },
    {
      title: "Quality control",
      body: "Lab testing for purity and freshness, against FSSAI standards, before a batch is cleared.",
    },
    {
      title: "Competitive pricing",
      body: "Priced to work for a kirana shelf and for a kitchen buying by the tin.",
    },
    {
      title: "Reliable supply",
      body: "Retail and bulk packaging, dispatched to distributors, wholesalers, retailers and institutional buyers PAN India.",
    },
    {
      title: "Customer-centric",
      body: "A named customer-care line on every pack, answered from the Delhi office.",
    },
  ],

  /** The five quality-assurance stages from the company deck. */
  process: [
    {
      step: "01",
      title: "Raw material selection",
      body: "High-grade mustard seed and verified oil stock, checked on intake for the aroma, colour and condition the batch needs to start from.",
    },
    {
      step: "02",
      title: "Extraction and refining",
      body: "Kachi Ghani mustard oil is cold-pressed to keep its pungency intact. Soyabean and palmolein are refined under controlled temperature.",
    },
    {
      step: "03",
      title: "Lab testing",
      body: "Every batch is tested for purity and freshness against FSSAI standards before it is cleared for filling.",
    },
    {
      step: "04",
      title: "Packing and storage",
      body: "Filled into food-grade tins, jars and PET bottles, sealed, and held in conditions that keep the oil away from heat and light.",
    },
    {
      step: "05",
      title: "Dispatch",
      body: "Retail cartons and bulk tins move out to distributors, wholesalers, retailers and institutional buyers across India.",
    },
  ],

  /** Buyer categories the company states it serves. */
  buyers: [
    {
      title: "Distributors and wholesalers",
      body: "Full-range supply across retail pack sizes, with repeat dispatch schedules.",
    },
    {
      title: "Retailers",
      body: "Kirana stores and supermarkets stocking 500 ML to 5 L mustard oil packs.",
    },
    {
      title: "Institutional kitchens",
      body: "Caterers, canteens and food businesses buying 15 KG tins by the case.",
    },
    {
      title: "Loose oil suppliers",
      body: "Bulk supply for repackers and loose-oil traders, PAN India.",
    },
  ],

  /** Frequently asked questions for search engines and answer engines (AEO). */
  faqs: [
    {
      question: "What oils does North West Oils produce and supply?",
      answer:
        "North West Oils produces and packages three core edible oils: its flagship refined Soyabean Oil (fortified with Vitamins A and D), cold-pressed Kachi Ghani Mustard Oil, and refined Palmolein Oil (fortified with Vitamins A and D).",
    },
    {
      question: "Which oil should I use: soyabean, mustard or palmolein?",
      answer:
        "Use North West Soyabean Refined Oil when the oil should stay out of the way of the food: frying, batters, baking and volume cooking. Use Kachi Ghani mustard oil when the food should taste of mustard. Use refined palmolein for frying heat that runs all day in commercial kitchens.",
    },
    {
      question: "Is North West Mustard Oil cold-pressed Kachi Ghani?",
      answer:
        "Yes. North West Mustard Oil is cold-pressed using traditional Kachi Ghani extraction from selected mustard seed without artificial heating, preserving its natural pungency and sharp aroma.",
    },
    {
      question: "What packaging formats and sizes are available?",
      answer:
        "North West Mustard Oil is packed in 500 ML and 1 L PET bottles, 2 L and 5 L handled jars, and 15 KG metal tins. Refined Soyabean Oil is supplied in 15 KG tins, and Refined Palmolein Oil is supplied in 15 Litre tins for commercial and institutional kitchens.",
    },
    {
      question: "Where are North West Oils' facilities located?",
      answer:
        "North West Oils Private Limited has its registered corporate office at Kh. No. 486, Fatehpur Beri, Chattarpur, South Delhi (110074) and its processing and packaging unit at Kh. No. 626, Faridpur, Bareilly, Uttar Pradesh (243502).",
    },
    {
      question: "What food safety and quality certifications does the company hold?",
      answer:
        "North West Oils Private Limited is centrally licensed by FSSAI, certified to ISO 9001:2015 (Quality Management System) and ISO 22000:2018 (Food Safety Management System), approved by the Ministry of Corporate Affairs, and registered with GST and MSME.",
    },
    {
      question: "Does North West Oils supply loose oil and bulk consignments across India?",
      answer:
        "Yes. North West Oils provides cartons of retail packs, bulk tins by the pallet, and loose oil supply to distributors, wholesalers, repackers, and institutional kitchens with PAN India dispatch.",
    },
    {
      question: "How can I contact North West Oils for trade or distribution enquiries?",
      answer:
        "Trade inquiries can be placed directly via WhatsApp or telephone at +91 98105 48867, or by email at northwestoilspvtltd@gmail.com and care.northwestoilspvtltd@gmail.com.",
    },
  ],

  /** Frequently asked questions specifically addressing quality, lab testing, and certifications. */
  qualityFaqs: [
    {
      question: "How does North West Oils ensure the quality of its cooking oils?",
      answer:
        "Every batch runs through a strict sequence: raw material intake inspection, cold-press extraction or controlled refining, mandatory laboratory testing against FSSAI standards before clearance, food-grade packing, and sealed dispatch.",
    },
    {
      question: "What food safety and quality certifications does North West Oils have?",
      answer:
        "North West Oils Private Limited is certified to ISO 9001:2015 (Quality Management System) and ISO 22000:2018 (Food Safety Management System), and holds a central FSSAI licence printed directly on every pack.",
    },
    {
      question: "What is the shelf life and storage recommendation for North West oils?",
      answer:
        "All North West edible oils are best before nine months from packaging when stored in a cool, dry place away from direct heat and sunlight. The packaging date is printed on each pack.",
    },
    {
      question: "Are North West cooking oils fortified?",
      answer:
        "Yes, refined soyabean oil and refined palmolein oil carry the +F mark and are fortified with Vitamins A and D. All three oils are 100% vegetarian.",
    },
  ],

  social: [] as { label: string; href: string }[],
} as const;

export type Company = typeof company;
