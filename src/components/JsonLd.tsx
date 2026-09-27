import { absoluteUrl, defaultOgImage, pages } from "@/content/seo";
import { site } from "@/content/site";

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
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 32.8407,
          longitude: -83.6324,
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
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cranford Realty Group services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Home buying assistance",
                url: absoluteUrl("/buy"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Home selling and listing",
                url: absoluteUrl("/sell"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Rental listing and landlord support",
                url: absoluteUrl("/rentals"),
              },
            },
          ],
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
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Where does Cranford Realty Group work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `We help buyers, sellers, and rental owners across Middle Georgia — including ${site.areas.join(", ")}.`,
            },
          },
          {
            "@type": "Question",
            name: "Do you help with rental properties?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Renters can apply through Zillow Rental Manager. Landlords who are tired of day-to-day management can list with our local bilingual team. Call (478) 737-4973 or use the form on our rentals page.",
            },
          },
          {
            "@type": "Question",
            name: "Do you speak Spanish?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Cranford Realty Group is a bilingual real estate team. We work in English and Spanish from the first call through closing.",
            },
          },
          {
            "@type": "Question",
            name: "How do I sell my home in Macon or Warner Robins?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Call or text Cranford Realty Group. We walk the home, recommend a list price based on nearby sales, handle photos and listing, and stay with you through closing.",
            },
          },
        ],
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
