"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/content/site";

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 8 * 1024 * 1024;

export function MaintenanceForm() {
  const { t } = useLanguage();
  const labels = useMemo(() => t.rentals, [t]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [fileNote, setFileNote] = useState("");
  const [fileError, setFileError] = useState("");

  function onFilesChange(files: FileList | null) {
    const list = files ? Array.from(files) : [];
    if (list.length > MAX_FILES) {
      setFileError(labels.maintenanceTooMany);
      return;
    }
    const total = list.reduce((sum, file) => sum + file.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      setFileError(labels.maintenanceTooBig);
      return;
    }
    setFileError("");
    setFileNote(
      list.length
        ? list.map((file) => file.name).join(", ")
        : "",
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const files = formData.getAll("attachment").filter((item) => item instanceof File && item.size > 0);
    if (files.length > MAX_FILES) {
      setFileError(labels.maintenanceTooMany);
      return;
    }
    const total = files.reduce(
      (sum, file) => sum + (file instanceof File ? file.size : 0),
      0,
    );
    if (total > MAX_TOTAL_BYTES) {
      setFileError(labels.maintenanceTooBig);
      return;
    }

    formData.set("_subject", "MAINTENANCE REQUEST");
    formData.set("_template", "table");
    formData.set("_captcha", "false");
    const email = String(formData.get("email") || "");
    if (email) formData.set("_replyto", email);

    setStatus("sending");
    setFileError("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!response.ok) throw new Error("Form failed");
      setStatus("sent");
      form.reset();
      setFileNote("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {t.contact.name}
          <input
            required
            name="Name"
            autoComplete="name"
            className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t.contact.phone}
          <input
            required
            name="Phone"
            type="tel"
            autoComplete="tel"
            className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        {t.contact.emailLabel}
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm">
        {labels.maintenanceAddress}
        <input
          required
          name="Rental address"
          placeholder="1474 Westbury Dr"
          className="h-12 rounded-xl border border-navy/15 bg-cream px-4 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm">
        {labels.maintenanceIssue}
        <textarea
          required
          name="Issue"
          rows={5}
          className="rounded-xl border border-navy/15 bg-cream px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm">
        {labels.maintenancePhotos}
        <input
          name="attachment"
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => onFilesChange(event.target.files)}
          className="rounded-xl border border-navy/15 bg-cream px-4 py-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
        <span className="text-xs text-ink-muted">{labels.maintenancePhotosHint}</span>
        {fileNote ? <span className="text-xs text-navy">{fileNote}</span> : null}
        {fileError ? <span className="text-sm text-red-800">{fileError}</span> : null}
      </label>
      <button
        type="submit"
        disabled={status === "sending" || Boolean(fileError)}
        className="h-12 rounded-full bg-gold text-sm font-semibold text-navy transition hover:bg-gold-light disabled:opacity-70"
      >
        {status === "sending" ? labels.maintenanceSending : labels.maintenanceSubmit}
      </button>
      {status === "sent" ? (
        <p className="text-sm text-navy">{labels.maintenanceSent}</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-800">
          {labels.maintenanceError}{" "}
          <a className="underline" href={site.rentalsPhone.href}>
            {site.rentalsPhone.display}
          </a>
        </p>
      ) : null}
    </form>
  );
}
