import type { Metadata } from "next";
import { PageJsonLd } from "@/components/PageJsonLd";
import { MortgageCalculatorPage } from "@/components/pages/MortgageCalculatorPage";
import { pageMetadata, pages } from "@/content/seo";

export const metadata: Metadata = pageMetadata(pages.mortgageCalculator);

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.mortgageCalculator.title}
        description={pages.mortgageCalculator.description}
        path={pages.mortgageCalculator.path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Mortgage Calculator", path: "/mortgage-calculator" },
        ]}
      />
      <MortgageCalculatorPage />
    </>
  );
}
