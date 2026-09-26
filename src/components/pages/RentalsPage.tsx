"use client";

import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/pages/BuyPage";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

export function RentalsPage() {
  const { t } = useLanguage();
  const hasProfile = Boolean(site.zillow.profileUrl);

  return (
    <div className="pb-20">
      <PageHero title={t.rentals.title} subtitle={t.rentals.subtitle} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-8 ring-1 ring-navy/10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Zillow
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy">
              {t.rentals.zillowTitle}
            </h2>
            <p className="mt-4 leading-7 text-ink-muted">{t.rentals.zillowBody}</p>
            <div className="mt-6 grid gap-3">
              {hasProfile ? (
                <a
                  href={site.zillow.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white"
                >
                  {t.rentals.ourListings}
                </a>
              ) : null}
              <a
                href={site.zillow.maconRentals}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-navy/15 px-5 py-3 text-sm font-semibold text-navy"
              >
                {t.rentals.browseMacon}
              </a>
              <a
                href={site.zillow.warnerRobinsRentals}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-navy/15 px-5 py-3 text-sm font-semibold text-navy"
              >
                {t.rentals.browseWarner}
              </a>
            </div>
          </article>
          <article className="rounded-3xl bg-white p-8 ring-1 ring-navy/10">
            <h2 className="font-serif text-3xl text-navy">{t.rentals.applyTitle}</h2>
            <p className="mt-4 leading-7 text-ink-muted">{t.rentals.applyBody}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.rentalsPhone.href}
                className="inline-flex rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy"
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
          </article>
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
