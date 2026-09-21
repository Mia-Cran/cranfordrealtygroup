import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, text, or email Cranford Realty Group at (478) 737-4973. 168 Orange St, Macon, GA.",
};

export default function Page() {
  return <ContactPage />;
}
