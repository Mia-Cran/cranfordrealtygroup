"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { nav, site } from "@/content/site";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/logo.png"
            alt={site.name}
            width={651}
            height={331}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
            {t.footer.blurb}
          </p>
          <p className="mt-4 text-sm text-gold">{t.common.hablamos}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {t.common.serving}
          </p>
          <nav className="mt-4 grid gap-2 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white"
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <Link href="/areas" className="text-white/80 hover:text-white">
              {t.areasPage.title}
            </Link>
          </nav>
        </div>
        <div className="text-sm leading-7 text-white/80">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {t.common.office}
          </p>
          <p className="mt-4">
            {site.address.line1}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
          <p>
            {t.common.listingsLine}
            <br />
            <a className="hover:text-white" href={site.listingsPhone.href}>
              {site.listingsPhone.display}
            </a>
          </p>
          <p>
            {t.common.rentalsLine}
            <br />
            <a className="hover:text-white" href={site.rentalsPhone.href}>
              {site.rentalsPhone.display}
            </a>
          </p>
          <p>
            <a className="hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {t.footer.copyright}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy">{t.common.privacy}</Link>
            <Link href="/terms">{t.common.terms}</Link>
            <Link href="/feedback">{t.common.feedback}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
