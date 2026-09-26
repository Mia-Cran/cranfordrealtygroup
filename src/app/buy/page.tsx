import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { BuyPage } from "@/components/pages/BuyPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.buy);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.buy.title}
        description={pages.buy.description}
        path={pages.buy.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Buy", path: "/buy" },
        ]}
      />
      <BuyPage />
    </>
  );
}
