import { absoluteUrl, defaultOgImage } from "@/content/seo";
import { site } from "@/content/site";
import type { Listing } from "@/content/listings";
import { formatPrice } from "@/lib/format";

type Crumb = { name: string; path: string };

type PageJsonLdProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  breadcrumbs?: Crumb[];
};

export function PageJsonLd({
  title,
  description,
  path,
  image = defaultOgImage,
  breadcrumbs,
}: PageJsonLdProps) {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: title,
      description,
      url,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#organization` },
      primaryImageOfPage: imageUrl,
    },
  ];

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}

export function ListingJsonLd({ listing }: { listing: Listing }) {
  const path = `/listings/${listing.slug}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(listing.image);
  const availability =
    listing.status === "sold"
      ? "https://schema.org/SoldOut"
      : "https://schema.org/InStock";

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: `${listing.address}, ${listing.city} GA`,
      description: listing.summary,
      url,
      isPartOf: { "@id": `${site.url}/#website` },
      primaryImageOfPage: imageUrl,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Homes",
          item: absoluteUrl("/listings"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: listing.address,
          item: url,
        },
      ],
    },
    {
      "@type": "RealEstateListing",
      name: `${listing.address}, ${listing.city}, ${listing.state}`,
      description: listing.summary,
      url,
      image: listing.photos?.length
        ? listing.photos.map((photo) => absoluteUrl(photo))
        : [imageUrl],
      datePosted: new Date().toISOString().slice(0, 10),
      offers: {
        "@type": "Offer",
        price: listing.price,
        priceCurrency: "USD",
        availability,
        url,
        seller: { "@id": `${site.url}/#organization` },
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: listing.address,
        addressLocality: listing.city,
        addressRegion: listing.state,
        postalCode: listing.zip,
        addressCountry: "US",
      },
      ...(listing.beds
        ? {
            numberOfRooms: listing.beds,
            numberOfBedrooms: listing.beds,
          }
        : {}),
      ...(listing.baths ? { numberOfBathroomsTotal: listing.baths } : {}),
      ...(listing.sqft
        ? {
            floorSize: {
              "@type": "QuantitativeValue",
              value: listing.sqft,
              unitCode: "FTK",
            },
          }
        : {}),
      ...(listing.yearBuilt ? { yearBuilt: listing.yearBuilt } : {}),
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Price display",
          value: formatPrice(listing.price),
        },
        ...(listing.mls
          ? [
              {
                "@type": "PropertyValue",
                name: "MLS",
                value: listing.mls,
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
