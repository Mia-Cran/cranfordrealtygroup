import type { MetadataRoute } from "next";
import { listings } from "@/content/listings";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
