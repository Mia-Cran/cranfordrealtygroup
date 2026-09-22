"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { useLanguage } from "@/components/LanguageProvider";
import type { Listing } from "@/content/listings";
import { formatNumber, formatPrice } from "@/lib/format";
import { site } from "@/content/site";

export function ListingDetail({ listing }: { listing: Listing }) {
  const { t, locale } = useLanguage();
  const photos = listing.photos?.length ? listing.photos : [listing.image];
  const [photoIndex, setPhotoIndex] = useState(0);
  const currentPhoto = photos[photoIndex] ?? listing.image;
  const statusLabel =
    listing.status === "sold"
      ? t.common.sold
      : listing.status === "land"
        ? t.common.land
        : t.common.forSale;

  return (
    <div className="pb-20">
      <div className="relative h-[48vh] min-h-[320px] bg-navy">
        <img
          src={currentPhoto}
          alt={`${listing.address}, ${listing.city}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {photos.length > 1 ? (
          <p className="absolute bottom-4 right-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-white">
            {photoIndex + 1} / {photos.length}
          </p>
        ) : null}
      </div>
      {photos.length > 1 ? (
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {photos.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setPhotoIndex(index)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 ${
                index === photoIndex ? "ring-gold" : "ring-transparent"
              }`}
              aria-label={`Photo ${index + 1} of ${photos.length}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      ) : null}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Link href="/listings" className="text-sm font-semibold text-navy">
            ← {t.common.backToListings}
          </Link>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gold-dark">
            {statusLabel}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            {listing.address}
          </h1>
          <p className="mt-2 text-lg text-ink-muted">
            {listing.city}, {listing.state} {listing.zip}
          </p>
          <p className="mt-6 font-serif text-4xl text-navy">{formatPrice(listing.price)}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {listing.beds ? (
              <Stat label={t.common.beds} value={String(listing.beds)} />
            ) : null}
            {listing.baths ? (
              <Stat label={t.common.baths} value={String(listing.baths)} />
            ) : null}
            {listing.sqft ? (
              <Stat label={t.common.sqft} value={formatNumber(listing.sqft)} />
            ) : null}
            {listing.acres ? (
              <Stat label={t.common.acres} value={String(listing.acres)} />
            ) : null}
          </dl>
          <p className="mt-8 max-w-2xl leading-8 text-ink">
            {locale === "es" ? listing.summaryEs : listing.summary}
          </p>
          {photos.length <= 1 ? (
            <p className="mt-4 text-sm text-ink-muted">{t.listing.photoNote}</p>
          ) : null}
          {listing.mls ? (
            <p className="mt-4 text-sm text-ink-muted">
              {t.listing.mls} #{listing.mls}
            </p>
          ) : null}
        </div>
        <div className="rounded-3xl bg-white p-6 ring-1 ring-navy/10 sm:p-8">
          <h2 className="font-serif text-3xl text-navy">{t.listing.next}</h2>
          <p className="mt-3 text-sm leading-6 text-ink-muted">{t.listing.nextBody}</p>
          <a
            href={site.listingsPhone.href}
            className="mt-6 mb-6 inline-flex w-full items-center justify-center rounded-full bg-navy px-4 py-3 text-sm font-semibold text-white"
          >
            {t.common.call} {site.listingsPhone.display}
          </a>
          <ContactForm defaultInterest="buy" compact />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-navy/10">
      <dt className="text-xs uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="mt-1 font-serif text-2xl text-navy">{value}</dd>
    </div>
  );
}
