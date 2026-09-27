import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { AreasPage } from "@/components/pages/AreasPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.areas);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.areas.title}
        description={pages.areas.description}
        path={pages.areas.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
        ]}
      />
      <AreasPage />
    </>
  );
}
