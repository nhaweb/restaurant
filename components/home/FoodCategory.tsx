"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SideGreens } from "@/components/home/SideGreens";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { foodCategories } from "@/data/menu";
import { assets } from "@/lib/assets";

export function FoodCategory() {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-category-card]");
    const amount = card ? card.offsetWidth + 24 : Math.min(320, el.clientWidth * 0.85);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-x-clip py-14 sm:py-16 md:py-24">
      <SideGreens side="left" className="-top-6 xl:top-0" />

      <div className="container-site relative z-10">
        <SectionHeading
          showLeaf
          title="Danh mục món ăn"
          description="Khám phá các bộ sưu tập signature — pasta yêu thích và món theo mùa chế biến tươi mỗi ngày."
        />

        <div className="relative">
          <div
            ref={scroller}
            className="snap-carousel flex gap-4 overflow-x-auto scroll-smooth pb-3 sm:gap-6 sm:pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Danh mục món ăn"
          >
            {foodCategories.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                data-category-card
                className="w-[min(72vw,260px)] shrink-0 cursor-pointer transition-opacity duration-200 hover:opacity-95 sm:w-[280px] md:w-[312px]"
              >
                <article>
                  <div className="relative mb-3 aspect-[312/364] overflow-hidden rounded-[6px] sm:mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                      sizes="(max-width: 640px) 72vw, 312px"
                    />
                  </div>
                  <h3 className="text-center text-lg font-bold leading-7 text-gray-2 sm:text-xl">
                    {item.name}
                  </h3>
                  <p className="text-center text-sm leading-6 text-gray-3 sm:text-base">
                    {item.itemCount} món
                  </p>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6">
            <button
              type="button"
              aria-label="Danh mục trước"
              disabled={!canPrev}
              onClick={() => scrollBy(-1)}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded bg-primary/30 transition-opacity duration-200 hover:bg-primary/40 disabled:cursor-not-allowed disabled:opacity-40 sm:size-[54px]"
            >
              <Image
                src={assets.caretRight}
                alt=""
                width={24}
                height={24}
                className="rotate-180"
              />
            </button>
            <button
              type="button"
              aria-label="Danh mục tiếp"
              disabled={!canNext}
              onClick={() => scrollBy(1)}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded bg-primary transition-opacity duration-200 hover:bg-[#144800] disabled:cursor-not-allowed disabled:opacity-40 sm:size-[54px]"
            >
              <Image src={assets.caretRightWhite} alt="" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
