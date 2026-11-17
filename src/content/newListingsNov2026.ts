import type { Listing } from "@/content/listings";

const photos = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/listings/${dir}/${String(i + 1).padStart(2, "0")}.jpg`);

export const NOV_2026_NEW_LISTINGS: Listing[] = [
  {
    slug: "102-rivoli-oaks-circle-macon",
    status: "active",
    type: "house",
    address: "102 Rivoli Oaks Circle",
    city: "Macon",
    state: "GA",
    zip: "31210",
    price: 250000,
    beds: 3,
    baths: 2.5,
    sqft: 2233,
    image: "/listings/rivoli-oaks/01.jpg",
    photos: photos("rivoli-oaks", 15),
    summary:
      "Classic two-story home in North Macon with 3 bedrooms, 2.5 baths and about 2,233 sq ft on a large, tree-lined lot. Features a sunroom and a hot tub, a formal dining room, and a spacious living room. Call Bertha or Mayra for a showing.",
    summaryEs:
      "Casa clásica de dos pisos en el norte de Macon con 3 recámaras, 2.5 baños y unos 2,233 pies² en un lote amplio y arbolado. Tiene solárium y jacuzzi, comedor formal y sala amplia. Llame a Bertha o Mayra para visitarla.",
  },
  {
    slug: "330-carillon-ln-macon",
    status: "active",
    type: "house",
    address: "330 Carillon Lane",
    city: "Macon",
    state: "GA",
    zip: "31210",
    price: 440000,
    beds: 4,
    baths: 3.5,
    sqft: 2265,
    acres: 0.18,
    yearBuilt: 2009,
    image: "/listings/carillon/01.jpg",
    photos: photos("carillon", 22),
    summary:
      "4 bedroom, 3.5 bath home in the Providence (Carillon) neighborhood of North Macon, built in 2009 with about 2,265 sq ft. Hardwood floors, a stone fireplace, and an open kitchen with granite counters, an island and stainless appliances. Brick patio with a pergola and an attached garage. Call Bertha or Maria for a showing.",
    summaryEs:
      "Casa de 4 recámaras y 3.5 baños en el vecindario Providence (Carillon) en el norte de Macon, construida en 2009 con unos 2,265 pies². Pisos de madera, chimenea de piedra y cocina abierta con granito, isla y electrodomésticos de acero inoxidable. Patio de ladrillo con pérgola y garaje. Llame a Bertha o Maria para visitarla.",
  },
];

/** Adds Rivoli Oaks and Carillon Lane to the active listings (once). */
export function applyNewListingsNov2026(current: Listing[]): Listing[] {
  const slugs = new Set(current.map((listing) => listing.slug));
  return [...current, ...NOV_2026_NEW_LISTINGS.filter((listing) => !slugs.has(listing.slug))];
}

export const HUNTINGTON_LISTING: Listing = {
  slug: "2581-huntington-dr-macon",
  status: "active",
  type: "house",
  address: "2581 Huntington Dr",
  city: "Macon",
  state: "GA",
  zip: "31204",
  price: 149800,
  beds: 3,
  baths: 1,
  image: "/listings/huntington/01.jpg",
  // Front, kitchen, living room, dining room, 3 bedrooms, bathroom, back yard
  photos: ["01", "03", "04", "06", "07", "08", "09", "05", "02"].map((n) => `/listings/huntington/${n}.jpg`),
  agent: "Mayra Dominy",
  summary:
    "Just listed: 3 bedroom, 1 bath brick ranch in Macon with new floors and an updated kitchen. Call Mayra at 478-733-1283 to see it.",
  summaryEs:
    "Recién publicada: casa de ladrillo de una planta en Macon con 3 recámaras, 1 baño, pisos nuevos y cocina renovada. Llame a Mayra al 478-733-1283 para verla. Hablamos español.",
};

/** Adds 2581 Huntington Dr (Mayra's listing) to the active listings (once). */
export function applyHuntingtonListing(current: Listing[]): Listing[] {
  if (current.some((listing) => listing.slug === HUNTINGTON_LISTING.slug)) return current;
  return [HUNTINGTON_LISTING, ...current];
}

export const OGLETHORPE_LISTING: Listing = {
  slug: "3245-ga-49-oglethorpe",
  status: "active",
  type: "commercial",
  address: "3245 GA-49",
  city: "Oglethorpe",
  state: "GA",
  zip: "31068",
  price: 130000,
  image: "/listings/oglethorpe/01.jpg",
  photos: photos("oglethorpe", 16),
  agents: ["Bertha Cranford", "Mayra Dominy", "Maria Cranford"],
  summary:
    "Commercial building for sale in Oglethorpe on a large open lot. Inside is a big open main room plus a kitchen area, smaller rooms for offices or storage, and a restroom. Call Bertha, Mayra, or Maria to see it.",
  summaryEs:
    "Edificio comercial en venta en Oglethorpe, en un terreno grande y abierto. Por dentro tiene un salón principal amplio, área de cocina, cuartos más pequeños para oficina o almacenaje, y un baño. Llame a Bertha, Mayra o Maria para verlo. Hablamos español.",
};

/** Adds the Oglethorpe commercial property at the top of the listings (once). */
export function applyOglethorpeListing(current: Listing[]): Listing[] {
  if (current.some((listing) => listing.slug === OGLETHORPE_LISTING.slug)) return current;
  return [OGLETHORPE_LISTING, ...current];
}

/** 330 Carillon Lane is listed at $440,000. */
export function applyCarillonPrice(current: Listing[]): Listing[] {
  return current.map((listing) =>
    listing.slug === "330-carillon-ln-macon"
      ? { ...listing, price: 440000, originalPrice: undefined }
      : listing,
  );
}

/** Nov 16, 2026: 1316 Triple Hill and 3871 Tyler sold; 1046 Radio Dr listing let go (removed). */
export function applyNov16StatusUpdates(current: Listing[]): Listing[] {
  const sold = new Set(["1316-triple-hill-dr-macon", "3871-tyler-dr-macon"]);
  return current
    .filter((listing) => listing.slug !== "1046-radio-dr-macon")
    .map((listing) =>
      sold.has(listing.slug)
        ? {
            ...listing,
            status: "sold" as const,
            summary: listing.summary?.replace(" Currently under contract.", ""),
            summaryEs: listing.summaryEs?.replace(" Actualmente bajo contrato.", ""),
          }
        : listing,
    );
}

/** Nov 17, 2026: 330 Carillon Lane switches from for sale to FOR RENT ($2,600/mo), RentRedi unit MOQ352. */
export function applyCarillonForRent(current: Listing[]): Listing[] {
  return current.map((listing) =>
    listing.slug === "330-carillon-ln-macon"
      ? {
          ...listing,
          status: "rental" as const,
          price: 2600,
          applyUrl: "https://tenant.rentredi.com/getStarted/application/MOQ352",
          summary:
            "For rent: 4 bedroom, 3.5 bath home in the Providence (Carillon) neighborhood of North Macon, built in 2009 with about 2,265 sq ft. Hardwood floors, a stone fireplace, and an open kitchen with granite counters, an island and stainless appliances. Brick patio with a pergola and an attached garage. $2,600/month, $2,600 deposit, available now, 12-month lease preferred. Pet friendly ($300 one-time, non-refundable pet fee). Service animal: fee waived. Emotional support animal: $150 with a letter from a mental health professional explaining why it is needed. Apply online or call Maria.",
          summaryEs:
            "En renta: casa de 4 recámaras y 3.5 baños en el vecindario Providence (Carillon) en el norte de Macon, construida en 2009 con unos 2,265 pies². Pisos de madera, chimenea de piedra y cocina abierta con granito, isla y electrodomésticos de acero inoxidable. Patio de ladrillo con pérgola y garaje. $2,600 al mes, depósito de $2,600, disponible ahora, contrato de 12 meses preferido. Se aceptan mascotas (cuota única de $300, no reembolsable). Animal de servicio: sin cuota. Animal de apoyo emocional: $150 con una carta de un profesional de salud mental que explique por qué lo necesita. Solicite en línea o llame a Maria.",
        }
      : listing,
  );
}
