import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { FeedbackPage } from "@/components/pages/FeedbackPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.feedback);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.feedback.title}
        description={pages.feedback.description}
        path={pages.feedback.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Feedback", path: "/feedback" },
        ]}
      />
      <FeedbackPage />
    </>
  );
}
