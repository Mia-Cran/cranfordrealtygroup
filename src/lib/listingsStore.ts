import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { list, put } from "@vercel/blob";
import seed from "@/content/listings-data.json";
import type { Listing } from "@/content/listings";

export const listingsFile = path.join(
  process.cwd(),
  "src/content/listings-data.json",
);

const BLOB_PATH = "content/listings-data.json";

function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function loadListings(): Promise<Listing[]> {
  if (blobEnabled()) {
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
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  await mkdir(path.dirname(listingsFile), { recursive: true });
  await writeFile(listingsFile, body);
}
