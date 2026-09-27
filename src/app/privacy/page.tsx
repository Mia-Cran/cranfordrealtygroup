import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { LegalPage } from "@/components/pages/RentalsPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.privacy);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.privacy.title}
        description={pages.privacy.description}
        path={pages.privacy.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <LegalPage kind="privacy" />
    </>
  );
}
