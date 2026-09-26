import type { Metadata } from "next";
import { AreasPage } from "@/components/pages/AreasPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: "Areas We Serve",
  description:
    "Cranford Realty Group serves Macon, Warner Robins, Perry, Byron, Kathleen, Fort Valley, Milledgeville, Bonaire, Lizella, and toward Suwanee, GA. Buy, sell, or rent with a local bilingual team.",
  path: "/areas",
});

export default function Page() {
  return <AreasPage />;
}
