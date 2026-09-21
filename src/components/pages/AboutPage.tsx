"use client";

import { PageHero } from "@/components/pages/BuyPage";
import { TeamGrid } from "@/components/TeamGrid";
import { useLanguage } from "@/components/LanguageProvider";

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-20">
      <PageHero title={t.about.title} subtitle={t.about.subtitle} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-8 text-ink">{t.about.story}</p>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <h2 className="font-serif text-4xl text-navy">{t.about.teamTitle}</h2>
        <p className="mt-3 text-ink-muted">{t.about.teamBody}</p>
        <div className="mt-10">
          <TeamGrid />
        </div>
      </section>
    </div>
  );
}
