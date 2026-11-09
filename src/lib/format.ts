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
  labels: { callForRent: string; perMonth: string; rented: string; comingSoon?: string },
) {
  if (listing.status === "rented") return labels.rented;
  if (listing.status === "rental") {
    if (!listing.price) return labels.callForRent;
    return `${formatPrice(listing.price)}${labels.perMonth}`;
  }
  if (!listing.price) return labels.comingSoon ?? "Coming soon";
  return formatPrice(listing.price);
}
