import type { Metadata } from "next";
import { BuyPage } from "@/components/pages/BuyPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: "Buy a Home in Macon & Warner Robins",
  description:
    "Buy a home in Macon, Warner Robins, Perry, Byron, Kathleen, Fort Valley, Milledgeville, or toward Suwanee with Cranford Realty Group. First-time buyers and Robins AFB relocations welcome.",
  path: "/buy",
});

export default function Page() {
  return <BuyPage />;
}
