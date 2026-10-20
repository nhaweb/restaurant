"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getShopCategories,
  shopProducts as defaultProducts,
  type ShopProduct,
} from "@/data/shop";

const ALL = "Tất cả";

type Props = {
  products?: ShopProduct[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function MenuCatalog({ products: productsProp }: Props) {
  const reduceMotion = useReducedMotion();
  const shopProducts = productsProp ?? defaultProducts;
  const categories = useMemo(() => {
    if (productsProp) {
      const unique = [...new Set(productsProp.map((p) => p.category))].sort();
      return [ALL, ...unique];
    }
    return [ALL, ...getShopCategories()];
  }, [productsProp]);
  const [active, setActive] = useState(ALL);

  const items = useMemo(() => {
    if (active === ALL) return shopProducts;
    return shopProducts.filter((p) => p.category === active);
  }, [active, shopProducts]);

  return (
    <section
      id="full-menu"
      className="scroll-mt-28 bg-gray-6/40 py-16 md:scroll-mt-32 md:py-24"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Thực đơn đầy đủ"
          title="Xem món & chọn trước khi đặt bàn"
          description="Lọc theo danh mục, xem chi tiết món hoặc thêm vào danh sách đặt bàn (tuỳ chọn)."
        />

        <div
          className="mb-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-x-8"
          role="tablist"
          aria-label="Danh mục thực đơn"
        >
          {categories.map((category) => {
            const selected = active === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(category)}
                className={`relative cursor-pointer pb-2 text-base font-bold leading-7 transition-colors duration-200 sm:text-lg md:text-xl ${
                  selected ? "text-primary" : "text-gray-1 hover:text-primary/80"
                }`}
              >
                {category}
                {selected && (
                  <motion.span
                    layoutId={reduceMotion ? undefined : "menu-catalog-tab"}
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                    transition={{ duration: 0.28, ease }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            role="tabpanel"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.28, ease }}
          >
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.35,
                  delay: reduceMotion ? 0 : index * 0.04,
                  ease,
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {items.length === 0 && (
          <p className="py-16 text-center text-gray-3">
            Chưa có món trong danh mục này.
          </p>
        )}
      </div>
    </section>
  );
}
