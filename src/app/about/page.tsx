import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Our Macon Real Estate Team",
  description:
    "Meet Maria, Bertha, Mayra, and Nick at Cranford Realty Group — a bilingual family brokerage in Macon serving Warner Robins and Middle Georgia.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
