import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { getSanityClient } from "@/lib/sanity/client";

export function urlForImage(source: SanityImageSource | null | undefined): string | null {
  if (!source) return null;
  const client = getSanityClient();
  if (!client) return null;

  try {
    return createImageUrlBuilder(client).image(source).width(1200).url();
  } catch {
    return null;
  }
}

export function resolveImageUrl(options: {
  image?: SanityImageSource | null;
  imageUrl?: string | null;
}): string {
  return urlForImage(options.image) ?? options.imageUrl ?? "";
}
