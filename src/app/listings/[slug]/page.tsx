import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/pages/ListingDetail";
import { getListing, listings } from "@/content/listings";

export const dynamicParams = true;

export function generateStaticParams() {
  return listings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
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
  const listing = getListing(slug);
  if (!listing) notFound();
  return <ListingDetail listing={listing} />;
}
