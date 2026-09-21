import type { Metadata } from "next";
import { FeedbackPage } from "@/components/pages/FeedbackPage";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Tell Cranford Realty Group how we did. Leave a note after buying, selling, or renting in Middle Georgia.",
};

export default function Page() {
  return <FeedbackPage />;
}
