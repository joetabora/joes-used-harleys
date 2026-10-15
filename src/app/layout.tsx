import type { Metadata } from "next";
import { Oswald, Source_Serif_4 } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalyticsRoot } from "@/components/analytics/google-analytics";
import { SiteChrome } from "@/components/site-chrome";
import { gaDataLayerGuardScript, normalizeGaMeasurementId } from "@/lib/analytics/ga";
import { websiteJsonLd, personJsonLd, localBusinessJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const gaMeasurementId = normalizeGaMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [websiteJsonLd(), personJsonLd(), localBusinessJsonLd()].filter(
    Boolean,
  );

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {gaMeasurementId ? (
          <script dangerouslySetInnerHTML={{ __html: gaDataLayerGuardScript() }} />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
        <GoogleAnalyticsRoot />
        <Toaster />
      </body>
    </html>
  );
}
