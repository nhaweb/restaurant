import {
  teamMembers as staticTeam,
  testimonials as staticTestimonials,
} from "@/data/content";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { teamMembersQuery, testimonialsQuery } from "@/lib/sanity/queries";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  highlight: {
    title: string;
    price: number;
    description: string;
    image: string;
    rating: number;
  };
};

type SanityTeam = {
  name?: string;
  role?: string;
  image?: unknown;
  imageUrl?: string;
};

type SanityTestimonial = {
  id?: string;
  name?: string;
  role?: string;
  quote?: string;
  avatar?: unknown;
  avatarUrl?: string;
  highlight?: {
    title?: string;
    price?: number;
    description?: string;
    imageUrl?: string;
    rating?: number;
  };
};

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!isSanityConfigured()) {
    return staticTeam.map((m) => ({ ...m }));
  }

  const docs = await sanityFetch<SanityTeam[]>(teamMembersQuery);
  if (!docs?.length) return staticTeam.map((m) => ({ ...m }));

  const mapped = docs
    .map((doc): TeamMember | null => {
      if (!doc.name) return null;
      return {
        name: doc.name,
        role: doc.role ?? "",
        image: resolveImageUrl({
          image: doc.image as never,
          imageUrl: doc.imageUrl,
        }),
      };
    })
    .filter((m): m is TeamMember => Boolean(m?.image));

  return mapped.length ? mapped : staticTeam.map((m) => ({ ...m }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured()) {
    return staticTestimonials.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      quote: t.quote,
      avatar: t.avatar,
      highlight: { ...t.highlight },
    }));
  }

  const docs = await sanityFetch<SanityTestimonial[]>(testimonialsQuery);
  if (!docs?.length) {
    return staticTestimonials.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      quote: t.quote,
      avatar: t.avatar,
      highlight: { ...t.highlight },
    }));
  }

  const mapped: Testimonial[] = [];
  for (const doc of docs) {
    if (!doc.id || !doc.name || !doc.quote || !doc.highlight) continue;
    const fallback = staticTestimonials[0];
    mapped.push({
      id: doc.id,
      name: doc.name,
      role: doc.role ?? "Customer",
      quote: doc.quote,
      avatar:
        resolveImageUrl({
          image: doc.avatar as never,
          imageUrl: doc.avatarUrl,
        }) || fallback.avatar,
      highlight: {
        title: doc.highlight.title ?? fallback.highlight.title,
        price: doc.highlight.price ?? fallback.highlight.price,
        description:
          doc.highlight.description ?? fallback.highlight.description,
        image: doc.highlight.imageUrl ?? fallback.highlight.image,
        rating: doc.highlight.rating ?? fallback.highlight.rating,
      },
    });
  }

  return mapped.length
    ? mapped
    : staticTestimonials.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        quote: t.quote,
        avatar: t.avatar,
        highlight: { ...t.highlight },
      }));
}
