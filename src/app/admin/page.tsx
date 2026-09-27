import type { Metadata } from "next";
import { AdminPage } from "@/components/pages/AdminPage";

export const metadata: Metadata = {
  title: { absolute: "Update homes | Cranford Realty Group" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminPage />;
}
