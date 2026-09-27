import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { ContactPage } from "@/components/pages/ContactPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.contact);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.contact.title}
        description={pages.contact.description}
        path={pages.contact.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactPage />
    </>
  );
}
