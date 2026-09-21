"use client";

import { useMemo, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { ListingCard } from "@/components/ListingCard";
import { PageHero } from "@/components/pages/BuyPage";
import { useLanguage } from "@/components/LanguageProvider";
import { activeListings } from "@/content/listings";

type Filter = "all" | "house" | "land";

export function ListingsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const homes = useMemo(() => {
    return activeListings().filter((listing) => {
      if (filter === "all") return true;
      if (filter === "land") return listing.type === "land";
      return listing.type !== "land";
    });
  }, [filter]);

  return (
    <div className="pb-20">
      <PageHero title={t.listingsPage.title} subtitle={t.listingsPage.subtitle} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", t.listingsPage.filterAll],
              ["house", t.listingsPage.filterHomes],
              ["land", t.listingsPage.filterLand],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-5 py-2 text-sm ${
                filter === key ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {homes.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {homes.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-ink-muted">{t.listingsPage.empty}</p>
        )}
        <div className="mt-16 grid gap-8 rounded-3xl bg-white p-8 ring-1 ring-navy/10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl text-navy">{t.listingsPage.customSearch}</h2>
            <p className="mt-3 leading-7 text-ink-muted">{t.listingsPage.customSearchBody}</p>
          </div>
          <ContactForm defaultInterest="buy" compact />
        </div>
      </section>
    </div>
  );
}
