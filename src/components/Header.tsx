"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { nav, site } from "@/content/site";
import { useLinePhone } from "@/lib/useLinePhone";

export function Header() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const phone = useLinePhone();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-3 focus:py-2 focus:text-navy"
      >
        {t.common.skip}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt={site.name}
            width={651}
            height={331}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm tracking-wide transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {t.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/20 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-2.5 py-1 ${locale === "en" ? "bg-white text-navy" : "text-white/80"}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("es")}
              className={`rounded-full px-2.5 py-1 ${locale === "es" ? "bg-white text-navy" : "text-white/80"}`}
            >
              ES
            </button>
          </div>
          <a
            href={phone.href}
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy gold-glow transition hover:bg-gold-light sm:inline-flex"
          >
            {t.common.callNow}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" />
              ) : (
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.6" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-navy px-4 py-4 lg:hidden">
          <nav className="grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-white/90 hover:bg-white/5"
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`flex-1 rounded-full border px-3 py-2 text-sm ${locale === "en" ? "border-gold bg-gold text-navy" : "border-white/20"}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLocale("es")}
              className={`flex-1 rounded-full border px-3 py-2 text-sm ${locale === "es" ? "border-gold bg-gold text-navy" : "border-white/20"}`}
            >
              Español
            </button>
          </div>
          <a
            href={phone.href}
            className="mt-3 flex items-center justify-center rounded-full bg-gold px-4 py-3 text-sm font-semibold text-navy"
          >
            {t.common.call} {phone.display}
          </a>
        </div>
      ) : null}
    </header>
  );
}
