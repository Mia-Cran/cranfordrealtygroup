import type { Metadata } from "next";
import { ListingsPage } from "@/components/pages/ListingsPage";

export const metadata: Metadata = {
  title: "Homes for Sale",
  description:
    "Current Cranford Realty Group listings in Macon and Middle Georgia, plus help searching the full market.",
};

export default function Page() {
  return <ListingsPage />;
}
