"use client";

import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/pages/BuyPage";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

export function ContactPage() {
  const { t, locale } = useLanguage();
  const mayra = site.team.find((member) => member.name === "Mayra Dominy");

  return (
    <div className="pb-20">
      <PageHero title={t.contact.title} subtitle={t.contact.subtitle} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <a
            href={site.listingsPhone.href}
            className="block rounded-3xl bg-white p-6 ring-1 ring-navy/10"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
              {t.common.listingsLine}
            </p>
            <p className="mt-2 font-serif text-3xl text-navy">
              {site.listingsPhone.display}
            </p>
          </a>
          <a
            href={site.rentalsPhone.href}
            className="block rounded-3xl bg-white p-6 ring-1 ring-navy/10"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
              {t.common.rentalsLine}
            </p>
            <p className="mt-2 font-serif text-3xl text-navy">
              {site.rentalsPhone.display}
            </p>
          </a>
          {mayra ? (
            <div className="flex items-center gap-5 rounded-3xl bg-white p-6 ring-1 ring-navy/10">
              <Image
                src={mayra.photo}
                alt={mayra.name}
                width={96}
                height={96}
                className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-gold"
              />
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
                  {locale === "es" ? mayra.roleEs : mayra.role} · Hablamos español
                </p>
                <p className="mt-1 font-serif text-2xl text-navy">{mayra.name}</p>
                <a href={mayra.phoneHref} className="mt-1 block font-serif text-3xl text-navy">
                  {mayra.phoneDisplay}
                </a>
                <a href={mayra.sms} className="mt-1 inline-block text-sm font-semibold text-gold-dark">
                  {t.common.text} →
                </a>
              </div>
            </div>
          ) : null}
          <a
            href={`mailto:${site.email}`}
            className="block rounded-3xl bg-white p-6 ring-1 ring-navy/10"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
              {t.common.email}
            </p>
            <p className="mt-2 break-all font-serif text-2xl text-navy">{site.email}</p>
          </a>
          <div className="rounded-3xl bg-white p-6 ring-1 ring-navy/10">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
              {t.common.office}
            </p>
            <p className="mt-2 font-serif text-2xl text-navy">
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
            <a
              href={site.mapUrl}
              className="mt-3 inline-block text-sm font-semibold text-gold-dark"
              target="_blank"
              rel="noreferrer"
            >
              Google Maps →
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl ring-1 ring-navy/10">
            <iframe
              title={site.name}
              src={site.mapEmbed}
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <h2 className="mb-6 font-serif text-4xl text-navy">{t.contact.formTitle}</h2>
          <ContactForm />
          <p className="mt-6 text-sm text-ink-muted">
            <a href="/feedback" className="font-semibold text-gold-dark">
              {t.common.feedback} →
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
