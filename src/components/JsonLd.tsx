import { site } from "@/content/site";

export function JsonLd() {
  const realEstateAgent = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    image: `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
    telephone: [site.listingsPhone.display, site.rentalsPhone.display],
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: site.areas.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Georgia",
      },
    })),
    knowsLanguage: ["en", "es"],
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cranford Realty Group services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Home buying assistance",
            url: `${site.url}/buy`,
            areaServed: site.areas.map((city) => city),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Home selling and listing",
            url: `${site.url}/sell`,
            areaServed: site.areas.map((city) => city),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Rental listing and landlord support",
            url: `${site.url}/rentals`,
            areaServed: site.areas.map((city) => city),
          },
        },
      ],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: ["en", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/listings?city={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
          text: "Yes. Renters can apply through Zillow Rental Manager. Landlords who are tired of day-to-day management can list with our local team. Call (478) 737-4973 or use the form on our rentals page.",
        },
      },
      {
        "@type": "Question",
        name: "Do you speak Spanish?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Cranford Realty Group works in English and Spanish from the first call through closing.",
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
  };

  const graph = [realEstateAgent, website, faq];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
