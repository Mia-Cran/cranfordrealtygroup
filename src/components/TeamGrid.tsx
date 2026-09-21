"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

export function TeamGrid() {
  const { t, locale } = useLanguage();

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {site.team.map((person) => (
        <article
          key={person.name}
          className="overflow-hidden rounded-3xl bg-white ring-1 ring-navy/10"
        >
          <div className="relative aspect-[4/5] bg-navy/10">
            <Image
              src={person.photo}
              alt={person.name}
              fill
              className="object-cover object-[center_18%]"
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
          <div className="p-6">
            <h3 className="font-serif text-3xl text-navy">{person.name}</h3>
            <p className="mt-1 text-sm uppercase tracking-[0.12em] text-gold-dark">
              {locale === "es" ? person.roleEs : person.role}
            </p>
            <p className="mt-4 leading-7 text-ink-muted">
              {locale === "es" ? person.bioEs : person.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <a href={person.phoneHref} className="text-navy">
                {t.common.call} {person.phoneDisplay}
              </a>
              <a href={person.sms} className="text-gold-dark">
                {t.common.text}
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
