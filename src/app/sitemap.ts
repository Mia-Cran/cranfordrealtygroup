import type { MetadataRoute } from "next";
import { loadListings } from "@/lib/listingsStore";
import { site } from "@/content/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await loadListings();
  const routes = ["", "/buy", "/sell", "/listings", "/about", "/contact", "/rentals", "/feedback"];
  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
    })),
    ...listings.map((listing) => ({
      url: `${site.url}/listings/${listing.slug}`,
      lastModified: new Date(),
    })),
  ];
}
