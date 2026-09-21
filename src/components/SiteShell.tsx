"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import { useLinePhone } from "@/lib/useLinePhone";

function MobileCallBar() {
  const { t } = useLanguage();
  const phone = useLinePhone();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-navy/10 bg-cream/95 p-3 backdrop-blur md:hidden">
      <a
        href={phone.href}
        className="rounded-full bg-navy px-4 py-3 text-center text-sm font-semibold text-white"
      >
        {t.common.call} {phone.display}
      </a>
      <a
        href={phone.sms}
        className="rounded-full bg-gold px-4 py-3 text-center text-sm font-semibold text-navy"
      >
        {t.common.textUs}
      </a>
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main id="main" className="flex-1 pb-24 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileCallBar />
    </LanguageProvider>
  );
}
