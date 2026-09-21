"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="font-serif text-5xl text-navy">{t.notFound.title}</h1>
      <p className="mt-4 text-lg text-ink-muted">{t.notFound.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white">
          {t.nav.home}
        </Link>
        <a href={site.listingsPhone.href} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy">
          {t.common.call} {site.listingsPhone.display}
        </a>
      </div>
    </div>
  );
}
