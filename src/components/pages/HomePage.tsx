"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { ListingCard } from "@/components/ListingCard";
import { TeamGrid } from "@/components/TeamGrid";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";
import { useListings } from "@/lib/useListings";

const heroImage = "/hero-georgia.jpg";

const pathImages = {
  buy: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  sell: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  rent: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
};

export function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const listings = useListings();
  const featured = listings.filter((listing) => listing.status !== "sold");
  const sold = listings
    .filter((listing) => listing.status === "sold")
    .slice(0, 3);
  const cities = [...site.areas, ...site.areas];

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const intent = String(data.get("intent") || "buy");
    const city = String(data.get("city") || "");
    if (intent === "sell") {
      router.push(`/sell?city=${encodeURIComponent(city)}`);
      return;
    }
    if (intent === "rent") {
      router.push(`/rentals?city=${encodeURIComponent(city)}`);
      return;
    }
    router.push(`/listings?city=${encodeURIComponent(city)}`);
  }

  return (
    <div>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-navy text-white">
        <Image
          src={heroImage}
          alt="Georgia pines and rolling hills at sunset"
          fill
          priority
          className="hero-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/45 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/20" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            {t.hero.kicker}
          </p>
          <span className="mt-4 block h-px w-16 bg-gold" />
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.listingsPhone.href}
              className="gold-glow rounded-full bg-gold px-8 py-4 text-base font-semibold text-navy transition hover:bg-gold-light"
            >
              {t.hero.primary}
            </a>
            <Link
              href="/listings"
              className="rounded-full border border-white/50 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {t.hero.secondary}
            </Link>
          </div>
          <form
            onSubmit={onSearch}
            className="mt-12 grid max-w-3xl gap-3 rounded-3xl bg-white p-4 text-ink shadow-2xl sm:grid-cols-[1fr_1fr_auto] sm:items-end"
          >
            <label className="grid gap-2 text-sm">
              {t.hero.intentLabel}
              <select name="intent" className="h-12 rounded-xl border border-navy/15 bg-cream px-3">
                <option value="buy">{t.hero.buy}</option>
                <option value="sell">{t.hero.sell}</option>
                <option value="rent">{t.hero.rent}</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              {t.hero.where}
              <select name="city" className="h-12 rounded-xl border border-navy/15 bg-cream px-3">
                {site.areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="h-12 rounded-xl bg-navy px-6 text-sm font-semibold text-white transition hover:bg-navy-deep"
            >
              {t.hero.go}
            </button>
          </form>
        </div>
      </section>

      <div className="overflow-hidden border-y border-navy/10 bg-navy py-3 text-gold">
        <div className="marquee-track flex w-max gap-10 text-xs font-semibold uppercase tracking-[0.28em]">
          {cities.map((city, index) => (
            <span key={`${city}-${index}`} className="flex items-center gap-10">
              {city}
              <span className="text-white/30">·</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-serif text-4xl text-navy sm:text-5xl">{t.paths.title}</h2>
        <p className="mt-3 max-w-2xl text-ink-muted">{t.paths.subtitle}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { href: "/buy", title: t.paths.buyTitle, body: t.paths.buyBody, image: pathImages.buy },
            { href: "/sell", title: t.paths.sellTitle, body: t.paths.sellBody, image: pathImages.sell },
            { href: "/rentals", title: t.paths.rentTitle, body: t.paths.rentBody, image: pathImages.rent },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative min-h-[280px] overflow-hidden rounded-3xl text-white shadow-md"
            >
              <Image
                src={card.image}
                alt={`${card.title} — Cranford Realty Group`}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />
              <div className="relative flex h-full min-h-[280px] flex-col justify-end p-8">
                <h3 className="font-serif text-4xl">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/85">{card.body}</p>
                <span className="mt-5 text-sm font-semibold text-gold">
                  {t.common.learnMore} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-4xl text-navy sm:text-5xl">{t.about.teamTitle}</h2>
          <p className="mt-3 max-w-2xl text-ink-muted">{t.about.teamBody}</p>
          <div className="mt-10">
            <TeamGrid />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-4xl text-navy sm:text-5xl">{t.featured.title}</h2>
              <p className="mt-3 max-w-2xl text-ink-muted">{t.featured.subtitle}</p>
            </div>
            <Link href="/listings" className="text-sm font-semibold text-gold-dark">
              {t.featured.viewAll} →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
          <h3 className="mt-16 font-serif text-3xl text-navy">{t.featured.soldTitle}</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {sold.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-serif text-4xl text-navy sm:text-5xl">{t.why.title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {t.why.items.map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-8 ring-1 ring-navy/10">
              <h3 className="font-serif text-2xl text-navy">{item.title}</h3>
              <p className="mt-3 leading-7 text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-4 sm:px-6">
          {t.stats.items.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-6xl text-gold">{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-serif text-4xl text-navy sm:text-5xl">{t.areas.title}</h2>
        <p className="mt-3 max-w-3xl text-ink-muted">{t.areas.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {site.areas.map((area) => (
            <Link
              key={area}
              href="/areas"
              className="rounded-full bg-white px-5 py-2 text-sm text-navy ring-1 ring-navy/10 transition hover:ring-navy/30"
            >
              {area}
            </Link>
          ))}
        </div>
        <Link
          href="/areas"
          className="mt-6 inline-flex text-sm font-semibold text-gold-dark"
        >
          {t.areas.link} →
        </Link>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-4xl text-navy sm:text-5xl">{t.testimonials.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.testimonials.items.map((item) => (
              <blockquote
                key={item.name}
                className="rounded-3xl bg-cream p-8 ring-1 ring-navy/10"
              >
                <p className="font-serif text-3xl leading-none text-gold">“</p>
                <p className="leading-7 text-ink">{item.quote}</p>
                <footer className="mt-6 text-sm font-semibold text-navy">
                  {item.name}
                  <span className="block font-normal text-ink-muted">{item.place}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-5xl sm:text-6xl">{t.bilingual.title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
              {t.bilingual.body}
            </p>
            <Link
              href="/contact"
              className="gold-glow mt-8 inline-flex rounded-full bg-gold px-8 py-4 text-base font-semibold text-navy"
            >
              {t.bilingual.cta}
            </Link>
          </div>
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/15">
            <p className="text-sm uppercase tracking-[0.2em] text-gold">{t.common.getInTouch}</p>
            <a href={site.listingsPhone.href} className="mt-4 block font-serif text-5xl">
              {site.listingsPhone.display}
            </a>
            <p className="mt-2 text-sm text-white/60">
              {t.common.listingsLine}
            </p>
            <a href={site.rentalsPhone.href} className="mt-5 block font-serif text-3xl">
              {site.rentalsPhone.display}
            </a>
            <p className="mt-2 text-sm text-white/60">{t.common.rentalsLine}</p>
            <a href={`mailto:${site.email}`} className="mt-3 block text-white/80">
              {site.email}
            </a>
            <p className="mt-6 text-white/70">
              {site.address.line1}, {site.address.city}, {site.address.state}{" "}
              {site.address.zip}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
