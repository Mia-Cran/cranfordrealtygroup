"use client";

import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/pages/BuyPage";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

export function SellPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-20">
      <PageHero title={t.sell.title} subtitle={t.sell.subtitle} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl text-navy">{t.sell.valueTitle}</h2>
          <p className="mt-4 max-w-xl leading-7 text-ink-muted">{t.sell.valueBody}</p>
          <a
            href={site.listingsPhone.href}
            className="mt-8 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white"
          >
            {t.common.call} {site.listingsPhone.display}
          </a>
        </div>
        <ContactForm defaultInterest="value" />
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <h2 className="font-serif text-4xl text-navy">{t.sell.stepsTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.sell.steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl bg-white p-6 ring-1 ring-navy/10">
              <p className="font-serif text-3xl text-gold">0{index + 1}</p>
              <h3 className="mt-3 font-serif text-2xl text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
