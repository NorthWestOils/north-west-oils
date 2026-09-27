/**
 * Company facts.
 *
 * Every value here is taken from a first-party source:
 *   1. the company profile deck (`.assets-src/NORTH WEST OILS PRIVATE LIMITED PDF.pdf`)
 *   2. text printed on the company's own packaging (the pack shots in /public/products)
 *   3. the company's registration certificates and public registry records
 *      (MCA, GST, IP India)
 *
 * Nothing is inferred or estimated. If a fact is not in one of those places it
 * does not belong in this file — and it does not belong on the website.
 */

export const SITE_URL = "https://northwestoilspvtltd.in";

export const company = {
  legalName: "North West Oils Private Limited",
  brandName: "North West",
  shortName: "North West Oils",
  /** Corporate Identity Number, from the certificate of incorporation. */
  cin: "U46909DL2024PTC430606",
  /** Printed on every pack in the range. */
  established: 1973,

  tagline: {
    hi: "जो खाता हूँ, वही खिलाता हूँ।",
    en: "The same oil we eat is the oil we serve.",
  },

  /** One-line description used for metadata and structured data. */
  summary:
    "North West Oils Private Limited supplies refined soyabean oil, Kachi Ghani mustard oil and refined palmolein oil in bulk and wholesale to distributors, wholesalers, retailers and institutional kitchens, PAN India.",

  locations: [
    {
      id: "delhi",
      label: "Delhi",
      role: "Registered office",
      /* As written on the GST, FSSAI and IEC certificates. The Google
         Business Profile uses this exact address too; change both together. */
      street: "Kh. No. 486, 496, 579, 580, 581, Village Fatehpur Beri",
      locality: "New Delhi",
      region: "Delhi",
      postalCode: "110074",
      country: "IN",
      full: "Kh. No. 486, 496, 579, 580, 581, Village Fatehpur Beri, South Delhi, New Delhi, Delhi 110074",
      mapsQuery: "Village Fatehpur Beri, New Delhi, Delhi 110074",
      phone: "+919810548867",
      phoneDisplay: "+91 98105 48867",
      email: "care.northwestoilspvtltd@gmail.com",
      geo: {
        latitude: 28.4907,
        longitude: 77.1652,
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
   * The contact the privacy policy must name under the IT (Reasonable Security
   * Practices) Rules, 2011. A director, per the GST registration certificate.
   */
  grievanceOfficer: {
    name: "Rishab Aggarwal",
    designation: "Director and Grievance Officer",
    email: "care.northwestoilspvtltd@gmail.com",
    phone: "+919810548867",
    phoneDisplay: "+91 98105 48867",
  },

  /**
   * The "North West" word-and-device mark, from the public IP India trade mark
   * search. It is an application, not yet a registration: use ™ if anything,
   * never ®, until it is registered.
   */
  trademark: {
    applicationNo: "7432627",
    mark: "North West with device NW",
    class: 29,
    filed: "31 December 2025",
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
      body: "High-quality raw material, starting with carefully selected mustard seed for the Kachi Ghani line, because nothing downstream fixes a poor start.",
    },
    {
      title: "Modern processing",
      body: "Cold-press extraction for Kachi Ghani, and strict quality control and hygienic conditions for every grade.",
    },
    {
      title: "Quality control",
      body: "Lab testing for purity and freshness, in line with FSSAI standards.",
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
      body: "A customer-care number and email printed on every pack.",
    },
  ],

  /** The five quality-assurance stages from the company deck. */
  process: [
    {
      step: "01",
      title: "Raw material selection",
      body: "High-quality raw material for all three oils, including carefully selected mustard seed for the Kachi Ghani line.",
    },
    {
      step: "02",
      title: "Extraction and refining",
      body: "Kachi Ghani mustard oil is cold-pressed to keep its strong aroma and pungency. Every grade is processed under strict quality control and hygienic conditions.",
    },
    {
      step: "03",
      title: "Lab testing",
      body: "Tested in a national laboratory for purity and freshness, in line with FSSAI standards.",
    },
    {
      step: "04",
      title: "Packing and storage",
      body: "Filled into tins, jars and PET bottles with safe packaging and storage, away from heat and light.",
    },
    {
      step: "05",
      title: "Dispatch",
      body: "Retail packs, bulk tins and loose oil go out to distributors, wholesalers, retailers and institutional buyers across India.",
    },
  ],

  /** Buyer categories the company states it serves. */
  buyers: [
    {
      title: "Distributors and wholesalers",
      body: "Supply across the retail and bulk range.",
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
      body: "Bulk and loose oil supply, PAN India.",
    },
  ],

  /** Frequently asked questions for search engines and answer engines (AEO). */
  faqs: [
    {
      question: "What oils does North West Oils produce and supply?",
      answer:
        "North West Oils produces and packages three core edible oils, all fortified with vitamins A and D: its hero product, refined Soyabean Oil, cold-pressed Kachi Ghani Mustard Oil (a refined mustard oil is also available), and refined Palmolein Oil.",
    },
    {
      question: "Which oil should I use: soyabean, mustard or palmolein?",
      answer:
        "Use North West Soyabean Refined Oil when the oil should stay out of the way of the food: frying, batters, baking and volume cooking. Use Kachi Ghani mustard oil when the food should taste of mustard. Use refined palmolein for frying heat that runs all day in commercial kitchens.",
    },
    {
      question: "Is North West Mustard Oil cold-pressed Kachi Ghani?",
      answer:
        "Yes. North West Kachi Ghani Mustard Oil is cold-pressed from carefully selected mustard seed, which keeps its strong aroma and distinct pungency. A refined mustard oil is also available.",
    },
    {
      question: "What packaging formats and sizes are available?",
      answer:
        "North West Mustard Oil is packed in 500 ML, 750 ML and 1 L PET bottles, 2 L and 5 L handled jars, and 15 KG metal tins. Refined Soyabean Oil is supplied in 15 KG tins, and Refined Palmolein Oil is supplied in 15 Litre tins for commercial and institutional kitchens.",
    },
    {
      question: "Where is North West Oils located?",
      answer:
        "North West Oils Private Limited is based at its registered office, Kh. No. 486, 496, 579, 580, 581, Village Fatehpur Beri, South Delhi, New Delhi, Delhi 110074, and supplies across India.",
    },
    {
      question: "What food safety and quality certifications does the company hold?",
      answer:
        "North West Oils Private Limited is centrally licensed by FSSAI, certified to ISO 9001:2015 (Quality Management System) and ISO 22000:2018 (Food Safety Management System), approved by the Ministry of Corporate Affairs, and registered with GST and MSME.",
    },
    {
      question: "Does North West Oils supply loose oil and bulk consignments across India?",
      answer:
        "Yes. North West Oils supplies retail packs, bulk tins and loose oil to distributors, wholesalers, retailers, institutional buyers and loose oil suppliers, with dispatch across India.",
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
        "Quality starts with high-quality raw material and runs through cold-press extraction for Kachi Ghani, processing under strict quality control and hygienic conditions, lab testing for purity and freshness in line with FSSAI standards, and safe packaging and storage. The company is certified to ISO 9001:2015 and ISO 22000:2018.",
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
        "Yes. All three North West oils (soyabean, mustard and palmolein) are fortified with vitamins A and D and carry the +F mark. All three are also 100% vegetarian.",
    },
  ],

  social: [] as { label: string; href: string }[],
} as const;

export type Company = typeof company;
