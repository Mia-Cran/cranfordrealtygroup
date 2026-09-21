"use client";

import { useEffect, useState } from "react";
import { listings as seed, type Listing } from "@/content/listings";

export function useListings() {
  const [listings, setListings] = useState<Listing[]>(seed);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/listings")
      .then((response) => response.json())
      .then((data: { listings?: Listing[] }) => {
        if (!cancelled && Array.isArray(data.listings)) {
          setListings(data.listings);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return listings;
}
