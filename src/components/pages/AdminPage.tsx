"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Listing, ListingStatus, ListingType } from "@/content/listings";
import { slugFromAddress } from "@/content/listings";

type Draft = Listing;

const emptyDraft = (): Draft => ({
  slug: "",
  status: "active",
  type: "house",
  address: "",
  city: "Macon",
  state: "GA",
  zip: "",
  price: 0,
  image: "",
  summary: "",
  summaryEs: "",
});

function cleanListing(draft: Draft): Listing {
  const slug = draft.slug || slugFromAddress(draft.address, draft.city);
  return {
    ...draft,
    slug,
    price: Number(draft.price) || 0,
    beds: draft.beds ? Number(draft.beds) : undefined,
    baths: draft.baths ? Number(draft.baths) : undefined,
    sqft: draft.sqft ? Number(draft.sqft) : undefined,
    acres: draft.acres ? Number(draft.acres) : undefined,
    yearBuilt: draft.yearBuilt ? Number(draft.yearBuilt) : undefined,
    mls: draft.mls || undefined,
    summaryEs: draft.summaryEs || draft.summary,
  };
}

export function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadListings() {
    const response = await fetch("/api/admin/listings");
    if (!response.ok) {
      setAuthed(false);
      setReady(true);
      return;
    }
    const data = (await response.json()) as { listings: Listing[] };
    setListings(data.listings);
    setAuthed(true);
    setReady(true);
  }

  useEffect(() => {
    void loadListings();
  }, []);

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!response.ok) {
      setMessage("That password didn't work.");
      return;
    }
    setPassword("");
    await loadListings();
  }

  async function saveAll(next: Listing[], success = "Saved. Refresh the Homes page to see it.") {
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/admin/listings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listings: next }),
    });
    setBusy(false);
    if (!response.ok) {
      setMessage("Could not save. Try again.");
      return false;
    }
    setListings(next);
    setMessage(success);
    return true;
  }

  async function onSaveDraft(event: FormEvent) {
    event.preventDefault();
    if (!draft.address || !draft.city || !draft.zip || !draft.price) {
      setMessage("Address, city, zip, and price are required.");
      return;
    }
    if (!draft.image) {
      setMessage("Add a photo or paste a photo link.");
      return;
    }
    const listing = cleanListing(draft);
    const next = editingSlug
      ? listings.map((item) => (item.slug === editingSlug ? listing : item))
      : [listing, ...listings.filter((item) => item.slug !== listing.slug)];
    const ok = await saveAll(next);
    if (ok) {
      setDraft(emptyDraft());
      setEditingSlug(null);
    }
  }

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    const body = new FormData();
    body.set("file", file);
    setBusy(true);
    const response = await fetch("/api/admin/photo", { method: "POST", body });
    setBusy(false);
    const data = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !data.url) {
      setMessage(data.error || "Photo didn't upload.");
      return;
    }
    setDraft((current) => ({ ...current, image: data.url || "" }));
    setMessage("Photo added.");
  }

  if (!ready) {
    return <p className="px-4 py-16 text-ink-muted">Loading…</p>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 sm:px-6">
        <h1 className="font-serif text-4xl text-navy">Team login</h1>
        <p className="mt-3 text-ink-muted">
          This page is only for Cranford Realty Group. It is not linked in the public menu.
        </p>
        <form onSubmit={onLogin} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 rounded-xl border border-navy/15 bg-white px-4"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="h-12 rounded-full bg-navy text-sm font-semibold text-white"
          >
            {busy ? "Checking…" : "Log in"}
          </button>
          {message ? <p className="text-sm text-red-800">{message}</p> : null}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Admin
          </p>
          <h1 className="mt-2 font-serif text-4xl text-navy">Update homes</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-muted">
            Add a listing, change a price, or mark a home sold. Changes save on this
            computer and show on the site after you refresh Homes. When the website
            is live on cranfordrealtygroup.com, this same page can keep working — we
            just need to connect it during launch.
          </p>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-navy"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            setAuthed(false);
          }}
        >
          Log out
        </button>
      </div>

      <form
        onSubmit={onSaveDraft}
        className="mt-10 grid gap-4 rounded-3xl bg-white p-6 ring-1 ring-navy/10 sm:p-8"
      >
        <h2 className="font-serif text-3xl text-navy">
          {editingSlug ? "Edit this home" : "Add a home"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Street address"
            value={draft.address}
            onChange={(address) => setDraft((current) => ({ ...current, address }))}
          />
          <Field
            label="City"
            value={draft.city}
            onChange={(city) => setDraft((current) => ({ ...current, city }))}
          />
          <Field
            label="Zip"
            value={draft.zip}
            onChange={(zip) => setDraft((current) => ({ ...current, zip }))}
          />
          <Field
            label="Price"
            type="number"
            value={draft.price ? String(draft.price) : ""}
            onChange={(price) =>
              setDraft((current) => ({ ...current, price: Number(price) || 0 }))
            }
          />
          <label className="grid gap-2 text-sm">
            Status
            <select
              value={draft.status}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  status: event.target.value as ListingStatus,
                }))
              }
              className="h-12 rounded-xl border border-navy/15 bg-cream px-4"
            >
              <option value="active">For sale</option>
              <option value="land">Land</option>
              <option value="sold">Sold</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Type
            <select
              value={draft.type}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  type: event.target.value as ListingType,
                }))
              }
              className="h-12 rounded-xl border border-navy/15 bg-cream px-4"
            >
              <option value="house">House</option>
              <option value="multi-family">Multi-family</option>
              <option value="land">Land</option>
            </select>
          </label>
          <Field
            label="Beds"
            type="number"
            value={draft.beds ? String(draft.beds) : ""}
            onChange={(beds) =>
              setDraft((current) => ({
                ...current,
                beds: beds ? Number(beds) : undefined,
              }))
            }
          />
          <Field
            label="Baths"
            type="number"
            value={draft.baths ? String(draft.baths) : ""}
            onChange={(baths) =>
              setDraft((current) => ({
                ...current,
                baths: baths ? Number(baths) : undefined,
              }))
            }
          />
          <Field
            label="Square feet"
            type="number"
            value={draft.sqft ? String(draft.sqft) : ""}
            onChange={(sqft) =>
              setDraft((current) => ({
                ...current,
                sqft: sqft ? Number(sqft) : undefined,
              }))
            }
          />
          <Field
            label="Acres"
            type="number"
            value={draft.acres ? String(draft.acres) : ""}
            onChange={(acres) =>
              setDraft((current) => ({
                ...current,
                acres: acres ? Number(acres) : undefined,
              }))
            }
          />
          <Field
            label="MLS number"
            value={draft.mls || ""}
            onChange={(mls) => setDraft((current) => ({ ...current, mls }))}
          />
          <Field
            label="Year built"
            type="number"
            value={draft.yearBuilt ? String(draft.yearBuilt) : ""}
            onChange={(yearBuilt) =>
              setDraft((current) => ({
                ...current,
                yearBuilt: yearBuilt ? Number(yearBuilt) : undefined,
              }))
            }
          />
        </div>
        <label className="grid gap-2 text-sm">
          Photo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => void onPhoto(event.target.files?.[0])}
          />
        </label>
        <Field
          label="Or paste a photo link"
          value={draft.image}
          onChange={(image) => setDraft((current) => ({ ...current, image }))}
        />
        {draft.image ? (
          <div className="h-40 overflow-hidden rounded-2xl bg-navy/10">
            {/* Preview can be a local upload or a pasted link */}
            <img src={draft.image} alt="" className="h-full w-full object-cover" />
          </div>
        ) : null}
        <label className="grid gap-2 text-sm">
          Short description (English)
          <textarea
            value={draft.summary}
            onChange={(event) =>
              setDraft((current) => ({ ...current, summary: event.target.value }))
            }
            rows={3}
            className="rounded-xl border border-navy/15 bg-cream px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Short description (Spanish) — leave blank to copy English
          <textarea
            value={draft.summaryEs}
            onChange={(event) =>
              setDraft((current) => ({ ...current, summaryEs: event.target.value }))
            }
            rows={3}
            className="rounded-xl border border-navy/15 bg-cream px-4 py-3"
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white"
          >
            {editingSlug ? "Save changes" : "Add to website"}
          </button>
          {editingSlug ? (
            <button
              type="button"
              className="rounded-full px-6 py-3 text-sm font-semibold text-navy"
              onClick={() => {
                setDraft(emptyDraft());
                setEditingSlug(null);
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
        {message ? <p className="text-sm text-navy">{message}</p> : null}
      </form>

      <h2 className="mt-14 font-serif text-3xl text-navy">Homes on the site now</h2>
      <div className="mt-6 grid gap-4">
        {listings.map((listing) => (
          <article
            key={listing.slug}
            className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-5 ring-1 ring-navy/10"
          >
            <div>
              <p className="font-serif text-2xl text-navy">{listing.address}</p>
              <p className="text-sm text-ink-muted">
                {listing.city} · ${listing.price.toLocaleString("en-US")} ·{" "}
                {listing.status === "sold"
                  ? "Sold"
                  : listing.status === "land"
                    ? "Land"
                    : "For sale"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-navy"
                onClick={() => {
                  setDraft(listing);
                  setEditingSlug(listing.slug);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Edit
              </button>
              {listing.status !== "sold" ? (
                <button
                  type="button"
                  className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-navy"
                  onClick={() =>
                    void saveAll(
                      listings.map((item) =>
                        item.slug === listing.slug
                          ? { ...item, status: "sold" }
                          : item,
                      ),
                      "Marked sold.",
                    )
                  }
                >
                  Mark sold
                </button>
              ) : null}
              <button
                type="button"
                className="rounded-full px-4 py-2 text-sm font-semibold text-red-800"
                onClick={() => {
                  if (confirm(`Remove ${listing.address} from the website?`)) {
                    void saveAll(
                      listings.filter((item) => item.slug !== listing.slug),
                      "Removed.",
                    );
                  }
                }}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-xl border border-navy/15 bg-cream px-4"
      />
    </label>
  );
}
