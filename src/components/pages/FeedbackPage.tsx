"use client";

import { FeedbackForm } from "@/components/FeedbackForm";
import { PageHero } from "@/components/pages/BuyPage";
import { useLanguage } from "@/components/LanguageProvider";

export function FeedbackPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-20">
      <PageHero title={t.feedback.title} subtitle={t.feedback.subtitle} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="font-serif text-4xl text-navy">{t.feedback.formTitle}</h2>
          <p className="mt-4 max-w-md leading-7 text-ink-muted">
            {t.feedback.subtitle}
          </p>
        </div>
        <FeedbackForm />
      </section>
    </div>
  );
}
