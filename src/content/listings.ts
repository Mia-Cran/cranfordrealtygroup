import listingsData from "./listings-data.json";

export type ListingStatus = "active" | "sold" | "land";
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
  summary: string;
  summaryEs: string;
};

export const listings: Listing[] = listingsData as Listing[];

export function getListing(slug: string) {
  return listings.find((listing) => listing.slug === slug);
}

export function activeListings() {
  return listings.filter((listing) => listing.status !== "sold");
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
