import { galleryImages as staticGallery } from "@/data/content";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { galleryImagesQuery } from "@/lib/sanity/queries";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type SanityGallery = {
  id?: string;
  image?: unknown;
  imageUrl?: string;
  alt?: string;
};

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!isSanityConfigured()) return [...staticGallery];

  const docs = await sanityFetch<SanityGallery[]>(galleryImagesQuery);
  if (!docs?.length) return [...staticGallery];

  const mapped = docs
    .map((doc): GalleryImage | null => {
      if (!doc.id || !doc.alt) return null;
      const src = resolveImageUrl({
        image: doc.image as never,
        imageUrl: doc.imageUrl,
      });
      if (!src) return null;
      return { id: doc.id, src, alt: doc.alt };
    })
    .filter((item): item is GalleryImage => item !== null);

  return mapped.length ? mapped : [...staticGallery];
}
