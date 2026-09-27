import { site } from "@/content/site";
import { absoluteUrl, defaultOgImage, pages } from "@/content/seo";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: absoluteUrl("/logo.png"),
        image: absoluteUrl(defaultOgImage),
        description: pages.home.description,
        telephone: [
          site.listingsPhone.display,
          site.rentalsPhone.display,
          site.officePhone.display,
        ],
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: "US",
        },
        areaServed: [
          ...site.areas.map((city) => ({ "@type": "City", name: city })),
          ...site.counties.map((county) => ({
            "@type": "AdministrativeArea",
            name: county,
          })),
        ],
        knowsLanguage: ["English", "Spanish"],
        sameAs: [] as string[],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        inLanguage: ["en", "es"],
        publisher: { "@id": `${site.url}/#organization` },
        potentialAction: {
          "@type": "CommunicateAction",
          name: "Contact Cranford Realty Group",
          target: absoluteUrl("/contact"),
        },
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/")}/#webpage`,
        name: pages.home.title,
        description: pages.home.description,
        url: absoluteUrl("/"),
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        primaryImageOfPage: absoluteUrl(defaultOgImage),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
