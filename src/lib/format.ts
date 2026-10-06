import type { Listing } from "@/content/listings";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatListingPrice(
  listing: Pick<Listing, "status" | "price">,
  labels: { callForRent: string; perMonth: string },
) {
  if (listing.status === "rental") {
    if (!listing.price) return labels.callForRent;
    return `${formatPrice(listing.price)}${labels.perMonth}`;
  }
  return formatPrice(listing.price);
}
