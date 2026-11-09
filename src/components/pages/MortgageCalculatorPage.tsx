"use client";

import Link from "next/link";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { useLanguage } from "@/components/LanguageProvider";
import { PageHero } from "@/components/pages/BuyPage";
import { site } from "@/content/site";

export function MortgageCalculatorPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-20">
      <PageHero title={t.mortgage.pageTitle} subtitle={t.mortgage.pageSubtitle} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <MortgageCalculator />
      </section>
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-8 ring-1 ring-navy/10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-3xl text-navy">{t.mortgage.pageHelpTitle}</h2>
            <p className="mt-3 max-w-2xl text-ink-muted">{t.mortgage.pageHelpBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.listingsPhone.href}
              className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white"
            >
              {t.common.call} {site.listingsPhone.display}
            </a>
            <Link
              href="/listings"
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy"
            >
              {t.nav.listings}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
