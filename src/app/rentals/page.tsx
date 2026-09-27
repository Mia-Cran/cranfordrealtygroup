import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { RentalsPage } from "@/components/pages/RentalsPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.rentals);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.rentals.title}
        description={pages.rentals.description}
        path={pages.rentals.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Rentals", path: "/rentals" },
        ]}
      />
      <RentalsPage />
    </>
  );
}
