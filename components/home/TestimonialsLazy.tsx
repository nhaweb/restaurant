"use client";

import dynamic from "next/dynamic";
import type { Testimonial } from "@/lib/content/home";

const Testimonials = dynamic(
  () =>
    import("@/components/home/Testimonials").then((mod) => mod.Testimonials),
  {
    ssr: true,
    loading: () => (
      <section className="py-14 sm:py-16 md:py-24" aria-hidden>
        <div className="container-site h-64 animate-pulse rounded-md bg-gray-6/80" />
      </section>
    ),
  },
);

type Props = {
  items?: Testimonial[];
};

export function TestimonialsLazy({ items }: Props) {
  return <Testimonials items={items} />;
}
