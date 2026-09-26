import type { Metadata } from "next";
import { FeedbackPage } from "@/components/pages/FeedbackPage";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata({
  title: "Client Feedback",
  description:
    "Share feedback with Cranford Realty Group after buying, selling, or renting in Middle Georgia. Honest notes help our family team improve.",
  path: "/feedback",
});

export default function Page() {
  return <FeedbackPage />;
}
