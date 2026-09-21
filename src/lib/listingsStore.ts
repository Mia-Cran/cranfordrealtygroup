import { mkdir, writeFile } from "fs/promises";
import path from "path";
import type { Listing } from "@/content/listings";

export const listingsFile = path.join(
  process.cwd(),
  "src/content/listings-data.json",
);

export async function saveListings(listings: Listing[]) {
  await mkdir(path.dirname(listingsFile), { recursive: true });
  await writeFile(listingsFile, `${JSON.stringify(listings, null, 2)}\n`);
}
