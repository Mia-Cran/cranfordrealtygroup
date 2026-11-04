import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { get, list, put } from "@vercel/blob";
import seed from "@/content/listings-data.json";
import type { Listing } from "@/content/listings";
import { applyNov2026RentalUpdates } from "@/content/rentalUpdatesNov2026";

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

const MIGRATION_PATH = "content/migrations/2026-11-rentals.json";

/** One-time update applied to the saved (Blob) listings, so later admin edits/removals stick. */
async function applyMigrations(current: Listing[]): Promise<Listing[]> {
  try {
    const marker = await get(MIGRATION_PATH, { access: blobAccess(), useCache: false });
    if (marker && marker.statusCode === 200) return current;
  } catch {
    // Not applied yet.
  }
  const next = applyNov2026RentalUpdates(current);
  await saveListings(next);
  await put(MIGRATION_PATH, '{"applied":true}', {
    access: blobAccess(),
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
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
