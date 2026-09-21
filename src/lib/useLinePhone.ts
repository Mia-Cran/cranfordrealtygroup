"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function useLinePhone() {
  const pathname = usePathname();
  if (pathname.startsWith("/rentals")) {
    return site.rentalsPhone;
  }
  return site.listingsPhone;
}
