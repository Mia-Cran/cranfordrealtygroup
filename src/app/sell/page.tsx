import type { Metadata } from "next";
import { SellPage } from "@/components/pages/SellPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sell Your Home in Middle Georgia",
  description:
    "Sell your home in Macon, Warner Robins, Perry, Byron, Kathleen, Fort Valley, or Milledgeville. Get a straight price opinion and a local listing team at Cranford Realty Group.",
  path: "/sell",
});

export default function Page() {
  return <SellPage />;
}
