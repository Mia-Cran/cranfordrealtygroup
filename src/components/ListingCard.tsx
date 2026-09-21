"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { Listing } from "@/content/listings";
import { formatNumber, formatPrice } from "@/lib/format";

export function ListingCard({ listing }: { listing: Listing }) {
  const { t, locale } = useLanguage();
  const statusLabel =
    listing.status === "sold"
      ? t.common.sold
      : listing.status === "land"
        ? t.common.land
        : t.common.forSale;

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-navy/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy/10">
        <Image
          src={listing.image}
          alt={`${listing.address}, ${listing.city}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-navy/0 transition group-hover:bg-navy/25" />
        <span className="absolute left-4 top-4 rounded-full bg-navy/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {statusLabel}
        </span>
        <span className="absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full bg-gold px-4 py-2 text-xs font-semibold text-navy opacity-0 shadow-lg transition group-hover:opacity-100">
          {t.common.viewHome}
        </span>
      </div>
      <div className="grid gap-2 p-5">
        <p className="font-serif text-3xl text-navy">{formatPrice(listing.price)}</p>
        <p className="font-medium text-ink">{listing.address}</p>
        <p className="text-sm text-ink-muted">
          {listing.city}, {listing.state} {listing.zip}
        </p>
        <p className="text-sm text-ink-muted">
          {[
            listing.beds ? `${listing.beds} ${t.common.beds}` : null,
            listing.baths ? `${listing.baths} ${t.common.baths}` : null,
            listing.sqft ? `${formatNumber(listing.sqft)} ${t.common.sqft}` : null,
            listing.acres ? `${listing.acres} ${t.common.acres}` : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <p className="line-clamp-2 text-sm leading-6 text-ink-muted">
          {locale === "es" ? listing.summaryEs : listing.summary}
        </p>
      </div>
    </Link>
  );
}
