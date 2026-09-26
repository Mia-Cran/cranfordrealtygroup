import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { pageMetadata } from "@/content/seo";
import { site } from "@/content/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Cranford Realty Group | Bilingual Realtor in Macon & Middle Georgia",
    description:
      "Cranford Realty Group is a bilingual real estate team for Macon, Warner Robins, Perry, Byron, Kathleen, Fort Valley, Milledgeville, and toward Suwanee. Buy, sell, or rent in English or Spanish. Call (478) 718-2783.",
    path: "/",
  }),
  metadataBase: new URL(site.url),
  title: {
    default:
      "Cranford Realty Group | Bilingual Realtor in Macon & Middle Georgia",
    template: "%s | Cranford Realty Group",
  },
  robots: {
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
  category: "real estate",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <JsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
