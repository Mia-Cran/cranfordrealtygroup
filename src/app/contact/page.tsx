import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact a Macon GA Realtor",
  description:
    "Call, text, or email Cranford Realty Group. Listings (478) 718-2783 · Rentals (478) 737-4973 · 168 Orange St, Macon, GA 31201.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
