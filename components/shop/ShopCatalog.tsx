"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { shopProducts } from "@/data/shop";

const ease = [0.22, 1, 0.36, 1] as const;

const PAGE_SIZE = 9;

export function ShopCatalog() {
  const reduceMotion = useReducedMotion();
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">(
    "newest",
  );
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>();
  const [priceMax, setPriceMax] = useState(8000);

  const filtered = useMemo(() => {
    let list = shopProducts.filter((p) => p.price <= priceMax);
    if (category) {
      list = list.filter((p) => p.category === category);
    }
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [category, priceMax, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_312px] lg:gap-8">
      <div>
        <div className="mb-6 flex flex-wrap items-center gap-4 md:gap-8">
          <label className="flex items-center gap-3 text-xl leading-7 text-gray-1">
            <span>Sắp xếp:</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as typeof sort);
                setPage(1);
              }}
              className="h-[46px] min-w-[180px] border border-gray-5 bg-white px-3 text-base text-gray-2"
            >
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá: thấp đến cao</option>
              <option value="price-desc">Giá: cao đến thấp</option>
            </select>
          </label>
          <label className="flex items-center gap-3 text-xl leading-7 text-gray-1">
            <span>Hiển thị:</span>
            <select
              value={PAGE_SIZE}
              disabled
              className="h-[46px] min-w-[180px] border border-gray-5 bg-white px-3 text-base text-gray-2"
              aria-label="Số sản phẩm mỗi trang"
            >
              <option value={PAGE_SIZE}>Mặc định</option>
            </select>
          </label>
        </div>

        {pageItems.length === 0 ? (
          <p className="py-16 text-center text-gray-3">
            Không có sản phẩm phù hợp bộ lọc.
          </p>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${category ?? "all"}-${sort}-${currentPage}`}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.28, ease }}
            >
              {pageItems.map((product, index) => (
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
        )}

        <nav
          className="mt-12 flex items-center justify-center gap-4"
          aria-label="Phân trang cửa hàng"
        >
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex size-[50px] items-center justify-center border border-gray-5 text-primary disabled:opacity-40"
            aria-label="Trang trước"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 3)
            .map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === currentPage ? "page" : undefined}
                className={`inline-flex size-[50px] items-center justify-center border text-base ${
                  n === currentPage
                    ? "border-primary bg-primary text-white"
                    : "border-gray-5 text-primary hover:border-primary"
                }`}
              >
                {n}
              </button>
            ))}
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex size-[50px] items-center justify-center border border-gray-5 text-primary disabled:opacity-40"
            aria-label="Trang sau"
          >
            ›
          </button>
        </nav>
      </div>

      <ShopSidebar
        activeCategory={category}
        onCategoryChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
        priceMax={priceMax}
        onPriceMaxChange={(value) => {
          setPriceMax(value);
          setPage(1);
        }}
      />
    </div>
  );
}
