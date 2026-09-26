"use client";

import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/pages/BuyPage";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

export function AreasPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-20">
      <PageHero title={t.areasPage.title} subtitle={t.areasPage.subtitle} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="max-w-3xl text-lg leading-8 text-ink-muted">
          {t.areasPage.intro}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {site.areas.map((city) => (
            <article
              key={city}
              className="rounded-3xl bg-white p-8 ring-1 ring-navy/10"
            >
              <h2 className="font-serif text-3xl text-navy">
                {t.areasPage.blurbs[city as keyof typeof t.areasPage.blurbs]
                  ?.heading ?? city}
              </h2>
              <p className="mt-4 leading-7 text-ink-muted">
                {t.areasPage.blurbs[city as keyof typeof t.areasPage.blurbs]?.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-ink-muted">{t.areasPage.counties}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/buy"
            className="inline-flex rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white"
          >
            {t.paths.buyTitle}
          </Link>
          <Link
            href="/sell"
            className="inline-flex rounded-full border border-navy/15 px-5 py-3 text-sm font-semibold text-navy"
          >
            {t.paths.sellTitle}
          </Link>
          <Link
            href="/rentals"
            className="inline-flex rounded-full border border-navy/15 px-5 py-3 text-sm font-semibold text-navy"
          >
            {t.paths.rentTitle}
          </Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl text-navy">{t.areasPage.formTitle}</h2>
          <p className="mt-3 text-ink-muted">{t.areasPage.formBody}</p>
          <a
            href={site.listingsPhone.href}
            className="mt-6 inline-block font-serif text-3xl text-navy"
          >
            {site.listingsPhone.display}
          </a>
        </div>
        <ContactForm defaultInterest="buy" />
      </section>
    </div>
  );
}
