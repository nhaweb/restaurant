import {
  blogPosts as staticPosts,
  getBlogPost as staticGetPost,
  type BlogPost,
} from "@/data/content";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { postBySlugQuery, postsQuery } from "@/lib/sanity/queries";

type SanityPost = {
  slug?: string;
  title?: string;
  excerpt?: string;
  date?: string;
  dateLabel?: string;
  comments?: number;
  image?: unknown;
  imageUrl?: string;
  content?: string[];
};

function mapPost(doc: SanityPost): BlogPost | null {
  if (!doc.slug || !doc.title || !doc.date) return null;

  const dateLabel =
    doc.dateLabel ||
    new Date(`${doc.date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    date: doc.date,
    dateLabel,
    comments: doc.comments ?? 0,
    image: resolveImageUrl({
      image: doc.image as never,
      imageUrl: doc.imageUrl,
    }),
    content: doc.content?.length ? doc.content : [],
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return [...staticPosts];

  const docs = await sanityFetch<SanityPost[]>(postsQuery);
  if (!docs?.length) return [...staticPosts];

  const mapped = docs.map(mapPost).filter((p): p is BlogPost => p !== null);
  return mapped.length ? mapped : [...staticPosts];
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (isSanityConfigured()) {
    const doc = await sanityFetch<SanityPost>(postBySlugQuery, { slug });
    const mapped = doc ? mapPost(doc) : null;
    if (mapped) return mapped;
  }
  return staticGetPost(slug);
}

export type { BlogPost };
