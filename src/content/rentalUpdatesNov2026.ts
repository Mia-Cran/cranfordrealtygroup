import type { Listing } from "@/content/listings";

const RENTED_EN =
  "This Cranford Realty Group rental in Macon is currently rented. Call if you want to hear about homes that are coming available.";
const RENTED_ES =
  "Esta renta de Cranford Realty Group en Macon ya está ocupada. Llame si quiere saber de casas que van a quedar disponibles.";

const photos = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/rentals/${dir}/${String(i + 1).padStart(2, "0")}.jpg`);

export const NOV_2026_NEW_RENTALS: Listing[] = [
  {
    slug: "2109-ingleside-ave-macon",
    status: "rental",
    type: "multi-family",
    address: "2109 Ingleside Ave",
    city: "Macon",
    state: "GA",
    zip: "31204",
    price: 1600,
    beds: 4,
    baths: 2,
    sqft: 1300,
    yearBuilt: 1959,
    image: "/rentals/ingleside-2109/01.jpg",
    photos: photos("ingleside-2109", 15),
    applyUrl: "https://tenant.rentredi.com/getStarted/application/AGG121",
    summary:
      "Move-in ready 4 bedroom, 2 full bath duplex unit in Macon's Vineville area. Open living/dining combo, refrigerator, washer & dryer included, plus a basement for storage, a home office or flex space. Pet friendly ($300 one-time pet fee; waived for assistance animals). 12-month lease. Tenant pays power, water and gas (estimated about $150, $90 and $70 a month; estimates only, actual bills vary). Apply online or call Maria.",
    summaryEs:
      "Unidad dúplex de 4 recámaras y 2 baños completos en el área de Vineville en Macon. Sala/comedor abierto, refrigerador, lavadora y secadora incluidos, y sótano para almacenamiento, oficina o espacio flexible. Se aceptan mascotas (cuota única de $300; no aplica a animales de asistencia). Contrato de 12 meses. El inquilino paga luz, agua y gas (aprox. $150, $90 y $70 al mes; solo estimados). Solicite en línea o llame a Maria.",
  },
  {
    slug: "2107-ingleside-ave-macon",
    status: "rental",
    type: "multi-family",
    address: "2107 Ingleside Ave",
    city: "Macon",
    state: "GA",
    zip: "31204",
    price: 850,
    beds: 1,
    baths: 1,
    sqft: 750,
    yearBuilt: 1959,
    image: "/rentals/ingleside-2107/01.jpg",
    photos: photos("ingleside-2107", 9),
    applyUrl: "https://tenant.rentredi.com/getStarted/application/LUV328",
    summary:
      "1 bedroom, 1 bath duplex unit in Macon's Vineville area with brand-new flooring and fresh paint throughout. Refrigerator, washer & dryer included. Pet friendly ($300 one-time pet fee; waived for assistance animals). 12-month lease. Tenant pays power, water and gas. Apply online or call Maria.",
    summaryEs:
      "Unidad dúplex de 1 recámara y 1 baño en el área de Vineville en Macon, con piso nuevo y pintura fresca. Refrigerador, lavadora y secadora incluidos. Se aceptan mascotas (cuota única de $300; no aplica a animales de asistencia). Contrato de 12 meses. El inquilino paga luz, agua y gas. Solicite en línea o llame a Maria.",
  },
  {
    slug: "3913-blair-ct-macon",
    status: "rented",
    type: "house",
    address: "3913 Blair Ct",
    city: "Macon",
    state: "GA",
    zip: "31206",
    price: 0,
    image: "/rentals/blair-ct/01.jpg",
    summary: RENTED_EN,
    summaryEs: RENTED_ES,
  },
];

/** Counts the basement in 2109 Ingleside's square footage (about 1,300 sq ft). */
export function apply2109SqftUpdate(current: Listing[]): Listing[] {
  return current.map((listing) =>
    listing.slug === "2109-ingleside-ave-macon" ? { ...listing, sqft: 1300 } : listing,
  );
}

/** Puts the real front photo on 3913 Blair Ct. */
export function applyBlairPhotoUpdate(current: Listing[]): Listing[] {
  return current.map((listing) =>
    listing.slug === "3913-blair-ct-macon" ? { ...listing, image: "/rentals/blair-ct/01.jpg" } : listing,
  );
}

/** Adds the November 2026 rentals that aren't on the site yet and marks 104 Saint Thomas as rented. */
export function applyNov2026RentalUpdates(current: Listing[]): Listing[] {
  const slugs = new Set(current.map((listing) => listing.slug));
  const updated = current.map((listing) =>
    listing.slug === "104-saint-thomas-pl-macon"
      ? { ...listing, status: "rented" as const, price: 0, summary: RENTED_EN, summaryEs: RENTED_ES }
      : listing,
  );
  return [...updated, ...NOV_2026_NEW_RENTALS.filter((listing) => !slugs.has(listing.slug))];
}

const INGLESIDE_FRONT = "/listings/ingleside-2103/01.jpg";
const INGLESIDE_ALERT = "New duplex listing coming soon!!";
const INGLESIDE_ALERT_ES = "¡¡Nuevo dúplex a la venta muy pronto!!";

/**
 * Ingleside is being sold instead of rented: drop the two rental cards and show one
 * "coming soon" for-sale card for the duplex until it's listed.
 */
export function applyInglesideComingSoon(current: Listing[]): Listing[] {
  const comingSoon: Listing = {
    slug: "2103-ingleside-ave-macon",
    status: "active",
    type: "multi-family",
    address: "2103 Ingleside Ave",
    city: "Macon",
    state: "GA",
    zip: "31204",
    price: 0,
    yearBuilt: 1959,
    image: INGLESIDE_FRONT,
    photos: [INGLESIDE_FRONT, ...photos("ingleside-2109", 15)],
    alert: INGLESIDE_ALERT,
    alertEs: INGLESIDE_ALERT_ES,
    summary:
      "Duplex in Macon's Vineville area coming to market soon. Two units: a 4 bedroom, 2 bath and a 1 bedroom, 1 bath. Call us for details before it's listed.",
    summaryEs:
      "Dúplex en el área de Vineville en Macon que saldrá a la venta pronto. Dos unidades: una de 4 recámaras y 2 baños, y otra de 1 recámara y 1 baño. Llámenos para más detalles antes de que se publique.",
  };
  const ingleside = new Set(["2109-ingleside-ave-macon", "2107-ingleside-ave-macon", comingSoon.slug]);
  return [comingSoon, ...current.filter((listing) => !ingleside.has(listing.slug))];
}

/** New front photo and "New duplex listing coming soon!!" banner for 2103 Ingleside. */
export function applyInglesideDuplexPhoto(current: Listing[]): Listing[] {
  return current.map((listing) =>
    listing.slug === "2103-ingleside-ave-macon"
      ? {
          ...listing,
          image: INGLESIDE_FRONT,
          photos: [INGLESIDE_FRONT, ...(listing.photos ?? []).filter((photo) => photo !== INGLESIDE_FRONT)],
          alert: INGLESIDE_ALERT,
          alertEs: INGLESIDE_ALERT_ES,
        }
      : listing,
  );
}
