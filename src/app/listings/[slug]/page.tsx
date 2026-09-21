import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/pages/ListingDetail";
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
  return {
    title: `${listing.address}, ${listing.city}`,
    description: listing.summary,
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
