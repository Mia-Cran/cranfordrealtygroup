"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Listing } from "@/content/listings";
import { formatNumber, formatPrice } from "@/lib/format";

export function HomesSlideshow({
  listings,
  fullBleed = false,
}: {
  listings: Listing[];
  fullBleed?: boolean;
}) {
  const { t, locale } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (listings.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % listings.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [listings.length]);

  if (listings.length === 0) return null;

  const listing = listings[index] ?? listings[0];
  const statusLabel =
    listing.status === "sold"
      ? t.common.sold
      : listing.status === "land"
        ? t.common.land
        : t.common.forSale;

  const frameClass = fullBleed
    ? "relative overflow-hidden bg-navy text-white"
    : "relative overflow-hidden rounded-[2rem] bg-navy text-white shadow-xl";
  const heightClass = fullBleed
    ? "min-h-[78vh] sm:min-h-[85vh]"
    : "min-h-[420px] sm:min-h-[520px]";

  return (
    <div className={frameClass}>
      <div className={`relative ${heightClass}`}>
        <Image
          key={listing.slug}
          src={listing.image}
          alt={`${listing.address}, ${listing.city}`}
          fill
          priority
          className="object-cover brightness-110 saturate-110 transition duration-700"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />

        <div className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
            <span className="inline-flex rounded-full bg-gold px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-navy shadow-lg">
              {statusLabel}
            </span>
          </div>
        </div>

        <div
          className={`relative mx-auto flex max-w-6xl flex-col justify-end gap-6 px-4 py-10 sm:px-6 sm:py-14 lg:flex-row lg:items-end lg:justify-between ${heightClass}`}
        >
          <div className="max-w-xl [text-shadow:0_2px_12px_rgba(18,36,61,0.55)]">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Cranford Realty Group
            </p>
            {listing.alert ? (
              <p
                role="status"
                className="mt-4 inline-flex max-w-full rounded-full border border-gold bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy"
              >
                {locale === "es" && listing.alertEs
                  ? listing.alertEs
                  : listing.alert}
              </p>
            ) : null}
            <p className="mt-4 font-serif text-4xl text-gold sm:text-5xl">
              {formatPrice(listing.price)}
              {listing.originalPrice ? (
                <span className="ml-3 text-2xl text-white/55 line-through">
                  {formatPrice(listing.originalPrice)}
                </span>
              ) : null}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight [font-variant-ligatures:no-common-ligatures] sm:text-5xl">
              {listing.address}
            </h2>
            <p className="mt-2 text-white/90">
              {listing.city}, {listing.state} {listing.zip}
            </p>
            <p className="mt-3 text-sm text-white/90">
              {[
                listing.beds ? `${listing.beds} ${t.common.beds}` : null,
                listing.baths ? `${listing.baths} ${t.common.baths}` : null,
                listing.sqft
                  ? `${formatNumber(listing.sqft)} ${t.common.sqft}`
                  : null,
                listing.acres ? `${listing.acres} ${t.common.acres}` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/90">
              {locale === "es" ? listing.summaryEs : listing.summary}
            </p>
            <Link
              href={`/listings/${listing.slug}`}
              className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy"
            >
              {t.common.viewHome}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous home"
              onClick={() =>
                setIndex(
                  (current) =>
                    (current - 1 + listings.length) % listings.length,
                )
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next home"
              onClick={() =>
                setIndex((current) => (current + 1) % listings.length)
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/10 bg-navy px-4 py-3 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-2">
          {listings.map((item, itemIndex) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-label={`Show ${item.address}`}
              className={`h-2.5 rounded-full transition ${
                itemIndex === index ? "w-8 bg-gold" : "w-2.5 bg-white/35"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
