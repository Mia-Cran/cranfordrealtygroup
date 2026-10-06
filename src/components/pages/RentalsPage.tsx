"use client";

import { ContactForm } from "@/components/ContactForm";
import { ListingCard } from "@/components/ListingCard";
import { PageHero } from "@/components/pages/BuyPage";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";
import { useListings } from "@/lib/useListings";

export function RentalsPage() {
  const { t } = useLanguage();
  const listings = useListings();
  const rentals = listings.filter((listing) => listing.status === "rental");
  const rented = listings.filter((listing) => listing.status === "rented");

  return (
    <div className="pb-20">
      <PageHero title={t.rentals.title} subtitle={t.rentals.subtitle} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl text-navy">
              {t.rentals.availableTitle}
            </h2>
            <p className="mt-3 leading-7 text-ink-muted">
              {t.rentals.availableBody}
            </p>
          </div>
          <a
            href={site.rentalsPhone.href}
            className="inline-flex rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy"
          >
            {t.common.call} {site.rentalsPhone.display}
          </a>
        </div>
        {rentals.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rentals.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-ink-muted">{t.rentals.empty}</p>
        )}
        {rented.length ? (
          <div className="mt-16">
            <h2 className="font-serif text-4xl text-navy">
              {t.rentals.rentedTitle}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-ink-muted">
              {t.rentals.rentedBody}
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rented.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-12 rounded-3xl bg-white p-8 ring-1 ring-navy/10">
          <h2 className="font-serif text-3xl text-navy">{t.rentals.applyTitle}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ink-muted">{t.rentals.applyBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.rentalsPhone.href}
              className="inline-flex rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white"
            >
              {t.common.call} {site.rentalsPhone.display}
            </a>
            <a
              href="#rental-form"
              className="inline-flex rounded-full border border-navy/15 px-5 py-3 text-sm font-semibold text-navy"
            >
              {t.rentals.cta}
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-ink-muted">{t.rentals.disclaimer}</p>
      </section>

      <section className="bg-navy px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            {t.rentals.landlordTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
            {t.rentals.landlordBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#owner-form"
              className="inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy"
            >
              {t.rentals.landlordCta}
            </a>
            <a
              href={site.rentalsPhone.href}
              className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white"
            >
              {t.common.call} {site.rentalsPhone.display}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-4xl text-navy">
          {t.rentals.landlordStepsTitle}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.rentals.landlordSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl bg-white p-6 ring-1 ring-navy/10"
            >
              <p className="font-serif text-3xl text-gold">0{index + 1}</p>
              <h3 className="mt-3 font-serif text-2xl text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="owner-form"
        className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2"
      >
        <div>
          <h2 className="font-serif text-4xl text-navy">
            {t.rentals.ownerFormTitle}
          </h2>
          <p className="mt-3 text-ink-muted">{t.rentals.ownerFormBody}</p>
          <a
            href={site.rentalsPhone.href}
            className="mt-6 inline-block font-serif text-3xl text-navy"
          >
            {site.rentalsPhone.display}
          </a>
        </div>
        <ContactForm defaultInterest="landlord" />
      </section>

      <section
        id="rental-form"
        className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2"
      >
        <div>
          <h2 className="font-serif text-4xl text-navy">{t.rentals.cta}</h2>
          <p className="mt-3 text-ink-muted">{t.contact.hours}</p>
        </div>
        <ContactForm defaultInterest="rent" />
      </section>
    </div>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useLanguage();
  const title = kind === "privacy" ? t.legal.privacyTitle : t.legal.termsTitle;
  const body = kind === "privacy" ? t.legal.privacyBody : t.legal.termsBody;

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="font-serif text-5xl text-navy">{title}</h1>
      <p className="mt-8 leading-8 text-ink">{body}</p>
    </div>
  );
}
