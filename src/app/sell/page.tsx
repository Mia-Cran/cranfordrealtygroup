import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { SellPage } from "@/components/pages/SellPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.sell);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.sell.title}
        description={pages.sell.description}
        path={pages.sell.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Sell", path: "/sell" },
        ]}
      />
      <SellPage />
    </>
  );
}
