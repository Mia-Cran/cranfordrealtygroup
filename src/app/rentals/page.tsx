import type { Metadata } from "next";
import { RentalsPage } from "@/components/pages/RentalsPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: "Rentals & Landlord Help in Middle Georgia",
  description:
    "Find a Middle Georgia rental on Zillow, or list your rental with Cranford Realty Group. We help landlords in Macon, Warner Robins, Perry, Byron, and nearby who are ready to stop managing day-to-day.",
  path: "/rentals",
});

export default function Page() {
  return <RentalsPage />;
}
