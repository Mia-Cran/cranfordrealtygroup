import type { Metadata } from "next";
import { BuyPage } from "@/components/pages/BuyPage";

export const metadata: Metadata = {
  title: "Buy a Home",
  description:
    "Buy a home in Macon, Warner Robins, Perry, or Byron with Cranford Realty Group. First-time buyers and relocations welcome.",
};

export default function Page() {
  return <BuyPage />;
}
