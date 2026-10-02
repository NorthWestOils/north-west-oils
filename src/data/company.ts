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

/** Central FSSAI licence number. */
const FSSAI_LICENCE = "13325002000037";

export const company = {
  legalName: "North West Oils Private Limited",
  brandName: "North West",
  shortName: "North West Oils",
  /** Corporate Identity Number, from the certificate of incorporation. */
  cin: "U46909DL2024PTC430606",
  /** Year of incorporation, matching the CIN above. */
  established: 2024,
  /** The company was incorporated under the guidance of Trilok Goyal, who
      has been in the edible oil business since 1973. */
  guidance: { name: "Trilok Goyal", tradeSince: 1973 },
  fssaiLicence: FSSAI_LICENCE,

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
      note: `Licensed under the Food Safety and Standards Authority of India, licence no. ${FSSAI_LICENCE}. The licence number is printed on every pack.`,
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
      body: "Strict quality control and hygienic conditions for every grade.",
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
      body: "Every grade is processed under strict quality control and hygienic conditions.",
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

  /** Buyer categories the company serves. */
  buyers: [
    {
      title: "Regional Distributors & Wholesalers",
      body: "Reliable supply across consumer and bulk packaging with consistent quality and competitive trade margins.",
    },
    {
      title: "Retailers & Supermarket Chains",
      body: "Consumer-ready 500 ML to 5 L bottles and handled jars with tamper-evident seals and clear barcode labeling.",
    },
    {
      title: "Commercial & Institutional Kitchens",
      body: "Caterers, restaurants, and cloud kitchens requiring steady dispatches of 15 KG and 15 L tins engineered for high culinary volume.",
    },
    {
      title: "Bulk & Industrial Processors",
      body: "Dedicated food-grade tanker loads and palletized shipments dispatched nationwide for manufacturing operations.",
    },
  ],

  /** Frequently asked questions for search engines and answer engines (AEO). */
  faqs: [
    {
      question: "What oils does North West Oils produce and supply?",
      answer:
        "North West Oils produces and packages three essential edible oils, all fortified with vitamins A and D: Refined Soyabean Oil, Kachi Ghani Mustard Oil, and Refined Palmolein Oil.",
    },
    {
      question: "Which oil should I use: soyabean, mustard or palmolein?",
      answer:
        "Choose Refined Soyabean Oil for a light, neutral cooking medium that allows the authentic flavours of your dishes to shine. Choose Kachi Ghani Mustard Oil for traditional Indian recipes, pickles, and gravies that call for authentic pungency and aroma. Choose Refined Palmolein Oil for high-heat, heavy-duty commercial frying with long fry life.",
    },
    {
      question: "How is North West Mustard Oil made?",
      answer:
        "North West Kachi Ghani Mustard Oil is made from carefully selected mustard seed under strict quality control, keeping its natural pungency and rich aroma.",
    },
    {
      question: "What packaging formats and sizes are available?",
      answer:
        "We offer complete packaging flexibility: 500 ML, 750 ML, and 1 L PET bottles; 2 L and 5 L handled jars; and 15 KG / 15 Litre heavy-gauge metal tins, along with dedicated bulk tanker dispatches.",
    },
    {
      question: "When was North West Oils founded?",
      answer:
        "North West Oils Private Limited was formally incorporated in New Delhi in 2024 under the guidance of Trilok Goyal, who has been in the edible oil business since 1973.",
    },
    {
      question: "Where is North West Oils located?",
      answer:
        "North West Oils Private Limited operates from its registered corporate and packaging facilities in New Delhi (Village Fatehpur Beri, New Delhi 110074), managing nationwide dispatch and logistics.",
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
        "Quality starts with high-quality raw material and runs through processing under strict quality control and hygienic conditions, lab testing for purity and freshness in line with FSSAI standards, and safe packaging and storage. The company is certified to ISO 9001:2015 and ISO 22000:2018.",
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
