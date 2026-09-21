import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
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
  metadataBase: new URL(site.url),
  title: {
    default: "Cranford Realty Group | Homes in Macon & Warner Robins",
    template: "%s | Cranford Realty Group",
  },
  description:
    "Buy, sell, or rent a home in Macon, Warner Robins, Perry, and nearby Middle Georgia. A local bilingual team you can actually call.",
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Cranford Realty Group",
    description:
      "Local real estate help in Macon and Warner Robins. Call (478) 737-4973.",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
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
