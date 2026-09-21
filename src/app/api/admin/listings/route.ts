import { NextResponse } from "next/server";
import type { Listing } from "@/content/listings";
import { isAdmin } from "@/lib/adminAuth";
import { loadListings, saveListings } from "@/lib/listingsStore";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ listings: await loadListings() });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { listings?: Listing[] };
  if (!Array.isArray(body.listings)) {
    return NextResponse.json({ error: "Invalid listings." }, { status: 400 });
  }

  await saveListings(body.listings);
  return NextResponse.json({ ok: true });
}
