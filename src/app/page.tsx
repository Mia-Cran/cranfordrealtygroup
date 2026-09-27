import { PageJsonLd } from "@/components/PageJsonLd";
import { HomePage } from "@/components/pages/HomePage";
import { pages } from "@/content/seo";

export default function Page() {
  return (
    <>
      <PageJsonLd
        title={pages.home.title}
        description={pages.home.description}
        path={pages.home.path}
      />
      <HomePage />
    </>
  );
}
