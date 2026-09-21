import type { Metadata } from "next";
import { SellPage } from "@/components/pages/SellPage";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "Find out what your Middle Georgia home can sell for. Cranford Realty Group handles pricing, listing, and closing.",
};

export default function Page() {
  return <SellPage />;
}
