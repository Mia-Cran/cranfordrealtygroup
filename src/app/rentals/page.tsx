import type { Metadata } from "next";
import { RentalsPage } from "@/components/pages/RentalsPage";

export const metadata: Metadata = {
  title: "Rentals",
  description:
    "Find a Middle Georgia rental or list yours with Cranford Realty Group. We list on Zillow Rental Manager and help owners with showings and tenants.",
};

export default function Page() {
  return <RentalsPage />;
}
