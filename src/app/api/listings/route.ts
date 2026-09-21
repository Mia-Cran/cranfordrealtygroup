import { NextResponse } from "next/server";
import { loadListings } from "@/lib/listingsStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const listings = await loadListings();
  return NextResponse.json({ listings });
}
