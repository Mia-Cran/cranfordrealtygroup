import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/pages/ListingDetail";
import { site } from "@/content/site";
import { loadListings } from "@/lib/listingsStore";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = (await loadListings()).find((item) => item.slug === slug);
  if (!listing) return { title: "Home" };
  const title = `${listing.address}, ${listing.city} GA`;
  const description =
    listing.summary ||
    `${listing.status === "sold" ? "Recently sold" : "For sale"} in ${listing.city}, Georgia. Contact Cranford Realty Group for details and showings.`;
  const url = `${site.url}/listings/${listing.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Cranford Realty Group`,
      description,
      url,
      images: listing.image
        ? [{ url: listing.image }]
        : [{ url: "/hero-georgia.jpg" }],
    },
  };
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = (await loadListings()).find((item) => item.slug === slug);
  if (!listing) notFound();
  return <ListingDetail listing={listing} />;
}
