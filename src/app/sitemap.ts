import type { MetadataRoute } from "next";
import { loadListings } from "@/lib/listingsStore";
import { absoluteUrl } from "@/content/seo";

const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/buy", priority: 0.9, changeFrequency: "weekly" },
  { path: "/sell", priority: 0.9, changeFrequency: "weekly" },
  { path: "/listings", priority: 0.95, changeFrequency: "daily" },
  { path: "/rentals", priority: 0.9, changeFrequency: "weekly" },
  { path: "/areas", priority: 0.85, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/feedback", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await loadListings();
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...listings.map((listing) => ({
      url: absoluteUrl(`/listings/${listing.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: listing.status === "sold" || listing.status === "rented" ? 0.5 : 0.8,
    })),
  ];
}
