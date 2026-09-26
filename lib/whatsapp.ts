import { company } from "@/data/company";

/**
 * WhatsApp is how trade buyers in this market actually open a conversation, so
 * it is the primary action across the site rather than a secondary one.
 *
 * `wa.me` opens the chat with the message already typed but *not* sent — the
 * prefill is an opening line the person edits or deletes, never something sent
 * on their behalf.
 */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${company.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

const HELLO = "Hello Team North West Oils,";

export const waMessage = {
  general: `${HELLO} I would like to enquire about your products and supply details.`,
  trade: `${HELLO} I would like to enquire about your products, pricing, and supply details.`,
  packs: `${HELLO} could you please share details on your available pack sizes and pricing?`,
  stock: `${HELLO} we are interested in stocking your products. Could you please share your catalog and trade terms?`,
  documents: `${HELLO} could you please share your quotation along with FSSAI licence and test documentation?`,
  product: (name: string) => `${HELLO} I would like to enquire about North West ${name}.`,
  quote: (name: string) => `${HELLO} could you please share a quotation for North West ${name}?`,
};
