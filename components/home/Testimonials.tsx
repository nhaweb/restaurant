"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState, type TouchEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials as defaultTestimonials } from "@/data/content";
import type { Testimonial } from "@/lib/content/home";
import { assets } from "@/lib/assets";
import { formatPrice } from "@/data/menu";

type Props = {
  items?: Testimonial[];
};

export function Testimonials({ items }: Props) {
  const testimonials = items?.length ? items : defaultTestimonials;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const review = testimonials[index] ?? testimonials[0];

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      setDirection(dir);
      setIndex((nextIndex + testimonials.length) % testimonials.length);
    },
    [testimonials.length],
  );

  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) next();
    else prev();
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir > 0 ? 28 : -28,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir > 0 ? -28 : 28,
    }),
  };

  return (
    <section id="testimonials" className="py-14 sm:py-16 md:py-24">
      <div
        className="container-site grid items-start gap-10 lg:grid-cols-2 lg:gap-16"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="min-w-0">
          <SectionHeading
            align="left"
            eyebrow="Khách hàng nói gì"
            title="Đánh giá khách hàng"
          />
          <Image
            src={assets.quotes}
            alt=""
            width={60}
            height={60}
            className="mb-4 size-12 sm:mb-5 sm:size-[60px]"
          />

          <div className="relative min-h-[9rem] overflow-hidden sm:min-h-[8rem]" aria-live="polite">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={review.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 max-w-[536px] text-sm leading-6 text-gray-3 sm:text-base"
              >
                {review.quote}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <Image
                src={review.avatar}
                alt={review.name}
                width={72}
                height={72}
                className="size-14 rounded-full sm:size-[72px]"
              />
              <div className="min-w-0">
                <p className="truncate text-base font-bold leading-[26px] text-gray-2 sm:text-lg">
                  {review.name}
                </p>
                <p className="text-sm leading-6 text-gray-3 sm:text-base">{review.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Đánh giá trước"
                onClick={prev}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-gray-5 transition-colors duration-200 hover:border-primary/30 hover:bg-gray-6"
              >
                <Image
                  src={assets.arrowLeftNav}
                  alt=""
                  width={24}
                  height={24}
                  className="rotate-180"
                />
              </button>
              <button
                type="button"
                aria-label="Đánh giá tiếp"
                onClick={next}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-gray-5 transition-colors duration-200 hover:border-primary/30 hover:bg-gray-6"
              >
                <Image src={assets.arrowRightNav} alt="" width={24} height={24} />
              </button>
            </div>
          </div>

          <div
            className="mt-5 flex items-center gap-2"
            role="tablist"
            aria-label="Slide đánh giá"
          >
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show review ${i + 1}`}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={`h-2.5 cursor-pointer rounded-full transition-all duration-200 ${
                  i === index
                    ? "w-7 bg-primary"
                    : "w-2.5 bg-gray-5 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="relative aspect-[672/453] overflow-hidden rounded-[6px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={review.highlight.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={review.highlight.image}
                  alt={review.highlight.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 672px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative z-10 mx-auto -mt-12 w-[min(100%,434px)] rounded-[6px] bg-white p-4 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.1)] sm:-mt-16 sm:p-6 md:absolute md:bottom-8 md:left-0 md:mt-0 md:mx-0 lg:-left-6 xl:-left-8">
            <div className="mb-3 flex items-start justify-between gap-3 sm:gap-4">
              <p className="text-lg font-bold leading-7 text-gray-1 sm:text-xl">
                {review.highlight.title}
              </p>
              <p className="shrink-0 text-sm font-bold leading-6 text-gray-2 sm:text-base">
                {formatPrice(review.highlight.price)}
              </p>
            </div>
            <div
              className="mb-3 flex gap-1"
              aria-label={`${review.highlight.rating} trên 5 sao`}
            >
              {Array.from({ length: review.highlight.rating }).map((_, i) => (
                <Image key={i} src={assets.star} alt="" width={20} height={20} />
              ))}
            </div>
            <p className="text-sm leading-6 text-gray-3 sm:text-base">
              {review.highlight.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
