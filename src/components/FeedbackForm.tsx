"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

const workKeys = ["buy", "sell", "rent", "other"] as const;

export function FeedbackForm() {
  const { t, locale } = useLanguage();
  const labels = useMemo(() => t.feedback, [t]);
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          rating,
          _subject: "Cranford Realty Group — website feedback",
          language: locale,
        }),
      });
      if (!response.ok) throw new Error("Form failed");
      setStatus("sent");
      form.reset();
      setRating(5);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8"
    >
      <label className="grid gap-2 text-sm">
        {t.contact.name}
        <input
          required
          name="name"
          autoComplete="name"
          className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {t.contact.emailLabel}{" "}
          <span className="text-ink-muted">({labels.optional})</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t.contact.phone}{" "}
          <span className="text-ink-muted">({labels.optional})</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        {labels.workWith}
        <select
          name="workWith"
          className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
        >
          {workKeys.map((key) => (
            <option key={key} value={key}>
              {labels.workOptions[key]}
            </option>
          ))}
        </select>
      </label>
      <fieldset className="grid gap-2">
        <legend className="text-sm">{labels.rating}</legend>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`h-11 w-11 rounded-full text-sm font-semibold ${
                value <= rating
                  ? "bg-gold text-navy"
                  : "bg-cream text-ink-muted ring-1 ring-navy/10"
              }`}
              aria-label={`${value} of 5`}
            >
              {value}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-2 text-sm">
        {labels.message}
        <textarea
          required
          name="message"
          rows={5}
          className="rounded-xl border border-navy/15 bg-cream px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="shareOnWebsite"
          value="yes"
          className="mt-1"
        />
        {labels.share}
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
          <a className="underline" href={site.listingsPhone.href}>
            {site.listingsPhone.display}
          </a>
        </p>
      ) : null}
    </form>
  );
}
