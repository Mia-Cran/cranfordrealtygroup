import listingsData from "./listings-data.json";

export type ListingStatus = "active" | "sold" | "land" | "rental" | "rented";
export type ListingType = "house" | "land" | "multi-family";

export type Listing = {
  slug: string;
  status: ListingStatus;
  type: ListingType;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds?: number;
  baths?: number;
  sqft?: number;
  acres?: number;
  yearBuilt?: number;
  mls?: string;
  image: string;
  photos?: string[];
  summary: string;
  summaryEs: string;
  /** Previous list price when a reduction is announced */
  originalPrice?: number;
  /** Short price/alert banner shown on listing surfaces */
  alert?: string;
  alertEs?: string;
  /** RentRedi (or other) online application link for rentals */
  applyUrl?: string;
};

export const listings: Listing[] = listingsData as Listing[];

export function getListing(slug: string) {
  return listings.find((listing) => listing.slug === slug);
}

export function isRental(listing: Listing) {
  return listing.status === "rental";
}

export function isRentalHome(listing: Listing) {
  return listing.status === "rental" || listing.status === "rented";
}

export function isForSale(listing: Listing) {
  return listing.status === "active" || listing.status === "land";
}

/** For-sale homes first, then homes we marked sold (only ones with our own photos, so they show with a SOLD band). */
export function showOnHomesPage(listing: Listing) {
  return (
    isForSale(listing) ||
    (listing.status === "sold" && !listing.image.includes("images.unsplash.com"))
  );
}

export function soldLast(a: Listing, b: Listing) {
  return Number(a.status === "sold") - Number(b.status === "sold");
}

export function activeListings() {
  return listings.filter(isForSale);
}

export function rentalListings() {
  return listings.filter(isRental);
}

export function rentedListings() {
  return listings.filter((listing) => listing.status === "rented");
}

export function soldListings() {
  return listings.filter((listing) => listing.status === "sold");
}

export function slugFromAddress(address: string, city: string) {
  return `${address} ${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
