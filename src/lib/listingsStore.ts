import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { get, list, put } from "@vercel/blob";
import seed from "@/content/listings-data.json";
import type { Listing } from "@/content/listings";
import { applyHuntingtonListing, applyNewListingsNov2026 } from "@/content/newListingsNov2026";
import {
  apply2109SqftUpdate,
  applyBlairPhotoUpdate,
  applyInglesideComingSoon,
  applyInglesideDuplexPhoto,
  applyFlamingoSold,
  applyNov2026RentalUpdates,
} from "@/content/rentalUpdatesNov2026";

export const listingsFile = path.join(
  process.cwd(),
  "src/content/listings-data.json",
);

const BLOB_PATH = "content/listings-data.json";

function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

/** The connected Blob store (BLOB_STORE_ID) is private; older token-based stores were public. */
export function blobAccess(): "public" | "private" {
  return process.env.BLOB_STORE_ID ? "private" : "public";
}

const MIGRATIONS: { path: string; apply: (current: Listing[]) => Listing[] }[] = [
  { path: "content/migrations/2026-11-rentals.json", apply: applyNov2026RentalUpdates },
  { path: "content/migrations/2026-11-blair-photo.json", apply: applyBlairPhotoUpdate },
  { path: "content/migrations/2026-11-2109-sqft.json", apply: apply2109SqftUpdate },
  { path: "content/migrations/2026-11-rivoli-carillon.json", apply: applyNewListingsNov2026 },
  { path: "content/migrations/2026-11-ingleside-coming-soon.json", apply: applyInglesideComingSoon },
  { path: "content/migrations/2026-11-ingleside-duplex-photo.json", apply: applyInglesideDuplexPhoto },
  { path: "content/migrations/2026-11-flamingo-sold.json", apply: applyFlamingoSold },
  { path: "content/migrations/2026-11-huntington.json", apply: applyHuntingtonListing },
];

/** One-time updates applied to the saved (Blob) listings, so later admin edits/removals stick. */
async function applyMigrations(current: Listing[]): Promise<Listing[]> {
  let next = current;
  for (const migration of MIGRATIONS) {
    try {
      const marker = await get(migration.path, { access: blobAccess(), useCache: false });
      if (marker && marker.statusCode === 200) continue;
    } catch {
      // Not applied yet.
    }
    next = migration.apply(next);
    await saveListings(next);
    await put(migration.path, '{"applied":true}', {
      access: blobAccess(),
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
  }
  return next;
}

export async function loadListings(): Promise<Listing[]> {
  const current = await loadSavedListings();
  if (!blobEnabled()) return current;
  try {
    return await applyMigrations(current);
  } catch {
    return current;
  }
}

async function loadSavedListings(): Promise<Listing[]> {
  if (blobEnabled() && blobAccess() === "private") {
    try {
      const result = await get(BLOB_PATH, { access: "private", useCache: false });
      if (result && result.statusCode === 200) {
        return (await new Response(result.stream).json()) as Listing[];
      }
    } catch {
      // Nothing saved yet; fall back to the listings in the code.
    }
  } else if (blobEnabled()) {
    const { blobs } = await list({ prefix: "content/listings-data", limit: 10 });
    const match = blobs.find((blob) => blob.pathname.replace(/^\//, "") === BLOB_PATH) ?? blobs[0];
    if (match) {
      const response = await fetch(match.url, { cache: "no-store" });
      if (response.ok) {
        return (await response.json()) as Listing[];
      }
    }
  }

  try {
    const raw = await readFile(listingsFile, "utf8");
    return JSON.parse(raw) as Listing[];
  } catch {
    return seed as Listing[];
  }
}

export async function saveListings(listings: Listing[]) {
  const body = `${JSON.stringify(listings, null, 2)}\n`;

  if (blobEnabled()) {
    await put(BLOB_PATH, body, {
      access: blobAccess(),
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  await mkdir(path.dirname(listingsFile), { recursive: true });
  await writeFile(listingsFile, body);
}
