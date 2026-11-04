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
    price: 345000,
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
