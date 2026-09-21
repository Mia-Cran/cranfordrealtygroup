"use client";

import { ContactForm } from "@/components/ContactForm";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

export function BuyPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-20">
      <PageHero title={t.buy.title} subtitle={t.buy.subtitle} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-4xl text-navy">{t.buy.stepsTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.buy.steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl bg-white p-6 ring-1 ring-navy/10">
              <p className="text-gold font-serif text-3xl">0{index + 1}</p>
              <h3 className="mt-3 font-serif text-2xl text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
        <article className="rounded-3xl bg-white p-8 ring-1 ring-navy/10">
          <h2 className="font-serif text-3xl text-navy">{t.buy.firstTitle}</h2>
          <p className="mt-4 leading-7 text-ink-muted">{t.buy.firstBody}</p>
        </article>
        <article className="rounded-3xl bg-white p-8 ring-1 ring-navy/10">
          <h2 className="font-serif text-3xl text-navy">{t.buy.relocateTitle}</h2>
          <p className="mt-4 leading-7 text-ink-muted">{t.buy.relocateBody}</p>
        </article>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-4xl text-navy">{t.buy.calcTitle}</h2>
        <p className="mt-3 max-w-2xl text-ink-muted">{t.buy.calcBody}</p>
        <div className="mt-8">
          <MortgageCalculator />
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl text-navy">{t.contact.formTitle}</h2>
          <p className="mt-3 text-ink-muted">{t.contact.hours}</p>
          <a href={site.listingsPhone.href} className="mt-6 inline-block font-serif text-3xl text-navy">
            {site.listingsPhone.display}
          </a>
        </div>
        <ContactForm defaultInterest="buy" />
      </section>
    </div>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-navy px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{subtitle}</p>
      </div>
    </section>
  );
}
