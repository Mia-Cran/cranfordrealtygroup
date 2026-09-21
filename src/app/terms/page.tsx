import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/RentalsPage";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return <LegalPage kind="terms" />;
}
