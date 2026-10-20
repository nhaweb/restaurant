"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  formatCalories,
  formatPrice,
  isMenuCategoryId,
  menuCategories as defaultCategories,
  menuItems as defaultItems,
  type MenuCategoryId,
  type MenuItem,
} from "@/data/menu";

const dietaryLabels: Record<string, string> = {
  vegetarian: "Chay",
  vegan: "Thuần chay",
  "gluten-free": "Không gluten",
  spicy: "Cay",
};

type Props = {
  initialCategory?: string;
  limit?: number;
  showViewAll?: boolean;
  headingSlot?: ReactNode;
  /** Show dish thumbnails (default true). Homepage can keep denser text layout with images. */
  showImages?: boolean;
  items?: MenuItem[];
  categories?: Array<{ id: MenuCategoryId; label: string }>;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function MenuBoard({
  initialCategory,
  limit,
  showViewAll = false,
  headingSlot,
  showImages = true,
  items: itemsProp,
  categories: categoriesProp,
}: Props) {
  const reduceMotion = useReducedMotion();
  const menuItems = itemsProp ?? defaultItems;
  const menuCategories = categoriesProp ?? defaultCategories;

  const start: MenuCategoryId =
    initialCategory && isMenuCategoryId(initialCategory)
      ? initialCategory
      : "breakfast";
  const [active, setActive] = useState<MenuCategoryId>(start);

  const items = useMemo(() => {
    const filtered = menuItems.filter((item) => item.category === active);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [active, limit, menuItems]);

  return (
    <div>
      {headingSlot}
      <div
        className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10"
        role="tablist"
        aria-label="Danh mục thực đơn"
      >
        {menuCategories.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative cursor-pointer pb-2 text-base font-bold leading-7 transition-colors duration-200 sm:text-lg md:text-xl md:leading-8 ${
              active === tab.id ? "text-primary" : "text-gray-1 hover:text-primary/80"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <motion.span
                layoutId={reduceMotion ? undefined : "menu-board-tab"}
                className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                transition={{ duration: 0.28, ease }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          className="grid gap-x-8 gap-y-6 sm:gap-y-8 md:grid-cols-2 md:gap-x-12"
          role="tabpanel"
          initial={
            reduceMotion ? false : { opacity: 0, y: 12 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.32, ease }}
        >
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              className="flex gap-3 border-b border-gray-5 pb-5 sm:gap-5 sm:pb-6"
              initial={
                reduceMotion ? false : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.35,
                delay: reduceMotion ? 0 : index * 0.04,
                ease,
              }}
            >
              {showImages && (
                <div className="relative size-16 shrink-0 overflow-hidden rounded-[6px] bg-gray-6 sm:size-20 md:size-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-gray-1 sm:text-lg">{item.name}</h3>
                  <p className="shrink-0 text-base font-bold text-primary sm:text-lg">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm leading-6 text-gray-3">{item.description}</p>
                {(item.calories || item.dietary?.length) && (
                  <p className="mt-2 text-xs text-gray-3">
                    {[
                      formatCalories(item.calories),
                      ...(item.dietary?.map((d) => dietaryLabels[d] ?? d) ?? []),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {showViewAll && (
        <div className="mt-8 text-center">
          <Link
            href="/menu"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Xem toàn bộ thực đơn
          </Link>
        </div>
      )}
    </div>
  );
}
