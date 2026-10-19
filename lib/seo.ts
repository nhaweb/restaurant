import type { Metadata } from "next";
import { restaurant } from "@/data/restaurant";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${restaurant.name} — ${restaurant.tagline}`,
    template: `%s | ${restaurant.name}`,
  },
  description: restaurant.shortDescription,
  applicationName: restaurant.name,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: restaurant.name,
    title: `${restaurant.name} — ${restaurant.tagline}`,
    description: restaurant.shortDescription,
    images: [
      {
        url: "/assets/imgUnsplashIGfIgp5Onv0.png",
        width: 1200,
        height: 630,
        alt: `Món signature của ${restaurant.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurant.name} — ${restaurant.tagline}`,
    description: restaurant.shortDescription,
    images: ["/assets/imgUnsplashIGfIgp5Onv0.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${restaurant.name}`,
      description,
      url,
      images: defaultMetadata.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${restaurant.name}`,
      description,
      images: ["/assets/imgUnsplashIGfIgp5Onv0.png"],
    },
  };
}
