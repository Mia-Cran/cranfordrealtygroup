import type { Metadata } from "next";
import type { Listing } from "@/content/listings";
import { site } from "@/content/site";
import { formatPrice } from "@/lib/format";

export const defaultOgImage = "/hero-georgia.jpg";
export const defaultOgImageAlt =
  "Middle Georgia homes with Cranford Realty Group in Macon and Warner Robins";

export const siteKeywords = [
  "Macon real estate",
  "Warner Robins realtor",
  "homes for sale Macon GA",
  "Middle Georgia realtor",
  "buy home Warner Robins",
  "sell house Macon",
  "bilingual realtor Georgia",
  "bilingual real estate team",
  "Cranford Realty Group",
  "Perry GA homes",
  "Byron GA real estate",
  "Kathleen GA realtor",
  "Fort Valley homes",
  "Milledgeville real estate",
  "landlord property management Macon",
  ...site.areas.map((city) => `realtor ${city} GA`),
] as const;

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return `${site.url}/`;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = siteKeywords,
  image = defaultOgImage,
  imageAlt = defaultOgImageAlt,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    // Absolute so the root "%s | Cranford Realty Group" template does not
    // double-brand titles that already include the company name.
    title: { absolute: title },
    description,
    keywords: [...keywords],
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.legalName,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const pages = {
  home: {
    title:
      "Bilingual Realtor in Macon & Warner Robins | Cranford Realty Group",
    description:
      "Cranford Realty Group is a bilingual real estate team for Macon, Warner Robins, Perry, Byron, Kathleen, Fort Valley, Milledgeville, and toward Suwanee. Buy, sell, or rent in English or Spanish.",
    path: "/",
    keywords: [
      ...siteKeywords,
      "local realtor Macon",
      "Middle Georgia homes for sale",
    ],
  },
  buy: {
    title: "Buy a Home in Macon & Warner Robins | Cranford Realty Group",
    description:
      "Buy a home in Macon, Warner Robins, Perry, Byron, Kathleen, Fort Valley, Milledgeville, or toward Suwanee with Cranford Realty Group. First-time buyers and Robins AFB relocations welcome.",
    path: "/buy",
    keywords: [
      "buy home Macon GA",
      "first time home buyer Warner Robins",
      "realtor Perry GA",
      "homes for sale Middle Georgia",
      ...siteKeywords,
    ],
  },
  sell: {
    title: "Sell Your Home in Middle Georgia | Cranford Realty Group",
    description:
      "Sell your home in Macon, Warner Robins, Perry, Byron, Kathleen, Fort Valley, or Milledgeville. Get a straight price opinion and a local bilingual listing team.",
    path: "/sell",
    keywords: [
      "sell house Macon GA",
      "home value Warner Robins",
      "list my home Middle Georgia",
      ...siteKeywords,
    ],
  },
  listings: {
    title: "Homes for Sale in Macon & Middle Georgia | Cranford Realty Group",
    description:
      "Browse current Cranford Realty Group listings in Macon and Middle Georgia, or ask us to search Warner Robins, Perry, Byron, Kathleen, Fort Valley, and Milledgeville.",
    path: "/listings",
    keywords: [
      "MLS listings Macon",
      "houses for sale Warner Robins",
      "active listings Middle Georgia",
      ...siteKeywords,
    ],
  },
  rentals: {
    title:
      "Rentals & Landlord Help in Middle Georgia | Cranford Realty Group",
    description:
      "Find a Middle Georgia rental on Zillow, or list yours with Cranford Realty Group. We help landlords in Macon, Warner Robins, Perry, Byron, and nearby who are ready to stop managing day-to-day.",
    path: "/rentals",
    keywords: [
      "Macon rentals",
      "Warner Robins apartments for rent",
      "Zillow Rental Manager Macon",
      "landlord property management Middle Georgia",
      "tired of managing rental Macon",
      ...siteKeywords,
    ],
  },
  areas: {
    title: "Areas We Serve in Middle Georgia | Cranford Realty Group",
    description:
      "Cranford Realty Group serves Macon, Warner Robins, Perry, Byron, Kathleen, Fort Valley, Milledgeville, Bonaire, Lizella, and toward Suwanee. Buy, sell, or rent with a bilingual local team.",
    path: "/areas",
    keywords: [
      "realtor near me Middle Georgia",
      "areas served Cranford Realty",
      ...siteKeywords,
    ],
  },
  about: {
    title: "About Our Bilingual Macon Realty Team | Cranford Realty Group",
    description:
      "Meet Maria, Bertha, Mayra, and Nick at Cranford Realty Group — a bilingual family real estate team serving Macon and Middle Georgia.",
    path: "/about",
    keywords: [
      "bilingual realtor Macon",
      "Spanish speaking realtor Georgia",
      "Cranford Realty team",
      ...siteKeywords,
    ],
  },
  contact: {
    title: "Contact Cranford Realty Group in Macon, GA",
    description:
      "Call, text, or email Cranford Realty Group. Listings (478) 718-2783 · Rentals (478) 737-4973 · Office at 168 Orange St, Macon, GA 31201.",
    path: "/contact",
    keywords: [
      "Cranford Realty phone number",
      "realtor Macon contact",
      "168 Orange St Macon",
      ...siteKeywords,
    ],
  },
  feedback: {
    title: "Client Feedback | Cranford Realty Group",
    description:
      "Tell Cranford Realty Group how we did after buying, selling, or renting in Macon, Warner Robins, or Middle Georgia.",
    path: "/feedback",
  },
  privacy: {
    title: "Privacy Policy | Cranford Realty Group",
    description:
      "How Cranford Realty Group handles contact details and website information for clients in Middle Georgia.",
    path: "/privacy",
  },
  terms: {
    title: "Terms of Use | Cranford Realty Group",
    description:
      "Terms for using the Cranford Realty Group website and contacting our Macon, Georgia real estate team.",
    path: "/terms",
  },
} as const;

export function listingMetadata(listing: Listing): Metadata {
  const path = `/listings/${listing.slug}`;
  const statusLabel =
    listing.status === "sold"
      ? "Sold"
      : listing.type === "land"
        ? "Land for sale"
        : "Home for sale";
  const title = `${listing.address}, ${listing.city} GA | ${statusLabel} | Cranford Realty Group`;
  const priceBit = listing.price ? ` Listed at ${formatPrice(listing.price)}.` : "";
  const bedBath =
    listing.beds && listing.baths
      ? ` ${listing.beds} bed, ${listing.baths} bath.`
      : "";
  const description =
    listing.summary ||
    `${statusLabel} at ${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}.${bedBath}${priceBit} Call Cranford Realty Group for a showing.`;

  return pageMetadata({
    title,
    description,
    path,
    image: listing.image,
    imageAlt: `${listing.address} in ${listing.city}, Georgia`,
    keywords: [
      `${listing.city} homes for sale`,
      `${listing.address} ${listing.city}`,
      `realtor ${listing.city} GA`,
      ...siteKeywords,
    ],
  });
}
