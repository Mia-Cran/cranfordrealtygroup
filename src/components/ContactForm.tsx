"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

type Interest = "buy" | "sell" | "rent" | "value" | "other";

const interestKeys: Interest[] = ["buy", "sell", "rent", "value", "other"];

export function ContactForm({
  defaultInterest = "buy",
  compact = false,
}: {
  defaultInterest?: Interest;
  compact?: boolean;
}) {
  const { t, locale } = useLanguage();
  const fallbackPhone =
    defaultInterest === "rent" ? site.rentalsPhone : site.listingsPhone;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const labels = useMemo(() => t.contact, [t]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${site.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...data,
            _subject: `Cranford Realty Group website — ${data.interest}`,
            language: locale,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Form failed");
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`grid gap-4 ${compact ? "" : "rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8"}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {labels.name}
          <input
            required
            name="name"
            autoComplete="name"
            className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {labels.phone}
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        {labels.emailLabel}
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {labels.interest}
          <select
            name="interest"
            defaultValue={defaultInterest}
            className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
          >
            {interestKeys.map((key) => (
              <option key={key} value={key}>
                {labels.interests[key]}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          {labels.city}
          <input
            name="city"
            placeholder="Macon"
            className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        {labels.notes}
        <textarea
          name="message"
          rows={4}
          className="rounded-xl border border-navy/15 bg-cream px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="h-12 rounded-full bg-navy text-sm font-semibold text-white transition hover:bg-navy-deep disabled:opacity-70"
      >
        {status === "sending" ? labels.sending : labels.submit}
      </button>
      {status === "sent" ? (
        <p className="text-sm text-navy">{labels.sent}</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-800">
          {labels.error}{" "}
          <a className="underline" href={fallbackPhone.href}>
            {fallbackPhone.display}
          </a>
        </p>
      ) : null}
      <p className="text-xs text-ink-muted">{labels.hours}</p>
    </form>
  );
}
