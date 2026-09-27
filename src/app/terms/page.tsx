import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { LegalPage } from "@/components/pages/RentalsPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.terms);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.terms.title}
        description={pages.terms.description}
        path={pages.terms.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />
      <LegalPage kind="terms" />
    </>
  );
}
