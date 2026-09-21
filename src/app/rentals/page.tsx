import type { Metadata } from "next";
import { RentalsPage } from "@/components/pages/RentalsPage";

export const metadata: Metadata = {
  title: "Rentals",
  description:
    "Cranford Realty Group lists and manages Middle Georgia rentals through Zillow Rental Manager. Apply on Zillow or call us about availability.",
};

export default function Page() {
  return <RentalsPage />;
}
