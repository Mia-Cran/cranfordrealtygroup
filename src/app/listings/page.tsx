import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { ListingsPage } from "@/components/pages/ListingsPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.listings);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.listings.title}
        description={pages.listings.description}
        path={pages.listings.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Homes", path: "/listings" },
        ]}
      />
      <ListingsPage />
    </>
  );
}
