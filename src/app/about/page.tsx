import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Maria, Bertha, Mayra, and Nick at Cranford Realty Group — a bilingual family team in Macon, Georgia.",
};

export default function Page() {
  return <AboutPage />;
}
