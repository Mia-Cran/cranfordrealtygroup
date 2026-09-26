import type { Metadata } from "next";
import { BuyPage } from "@/components/pages/BuyPage";

export const metadata: Metadata = {
  title: "Buy a Home",
  description:
    "Buy a home in Macon, Warner Robins, Perry, Byron, Kathleen, Fort Valley, Milledgeville, or toward Suwanee with Cranford Realty Group.",
};

export default function Page() {
  return <BuyPage />;
}
