import type { Metadata } from "next";
import { ListingsPage } from "@/components/pages/ListingsPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: "Homes for Sale in Macon & Middle Georgia",
  description:
    "Browse Cranford Realty Group listings in Macon and Middle Georgia, or ask us to search Warner Robins, Perry, Byron, Kathleen, Fort Valley, and Milledgeville for you.",
  path: "/listings",
});

export default function Page() {
  return <ListingsPage />;
}
