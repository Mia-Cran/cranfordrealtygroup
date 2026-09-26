import type { Metadata } from "next";
import { site } from "@/content/site";

const ogImage = {
  url: "/hero-georgia.jpg",
  width: 1600,
  height: 900,
  alt: "Middle Georgia landscape — Cranford Realty Group",
};

export const areaPhrase = site.areas.join(", ");

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    keywords: [
      "Cranford Realty Group",
      "realtor Macon GA",
      "realtor Warner Robins",
      "Middle Georgia real estate",
      "sell house Macon",
      "buy home Warner Robins",
      "rental property management Macon",
      "bilingual realtor Georgia",
      ...site.areas.map((city) => `realtor ${city} GA`),
    ],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
