import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { AboutPage } from "@/components/pages/AboutPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.about);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.about.title}
        description={pages.about.description}
        path={pages.about.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutPage />
    </>
  );
}
