"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatShopPrice,
  getLatestProducts,
  shopCategories,
  shopTags,
} from "@/data/shop";
import { pageImages } from "@/lib/page-images";
import { assets } from "@/lib/assets";

type Props = {
  activeCategory?: string;
  onCategoryChange?: (category: string | undefined) => void;
  priceMax?: number;
  onPriceMaxChange?: (value: number) => void;
};

export function ShopSidebar({
  activeCategory,
  onCategoryChange,
  priceMax = 8000,
  onPriceMaxChange,
}: Props) {
  const latest = getLatestProducts(4);

  return (
    <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
      <form
        role="search"
        className="relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="shop-search" className="sr-only">
          Tìm sản phẩm
        </label>
        <input
          id="shop-search"
          type="search"
          placeholder="Tìm sản phẩm"
          className="h-[46px] w-full border border-gray-5 bg-white py-2 pl-4 pr-12 text-base text-gray-1 placeholder:text-gray-3"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center bg-primary text-white"
          aria-label="Tìm kiếm"
        >
          <Image src={assets.search} alt="" width={20} height={20} className="brightness-0 invert" />
        </button>
      </form>

      <div>
        <h2 className="mb-4 text-xl font-bold leading-7 text-gray-1">Danh mục</h2>
        <ul className="space-y-3">
          {shopCategories.map((category) => {
            const active = activeCategory === category;
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() =>
                    onCategoryChange?.(active ? undefined : category)
                  }
                  className={`flex w-full items-center gap-3 text-left text-base leading-6 transition-colors ${
                    active ? "font-bold text-primary" : "text-gray-2 hover:text-primary"
                  }`}
                >
                  <span
                    className={`inline-flex size-4 shrink-0 items-center justify-center border ${
                      active ? "border-primary bg-primary text-white" : "border-gray-5"
                    }`}
                    aria-hidden
                  >
                    {active ? "✓" : ""}
                  </span>
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Link
        href="/shop/yummy-chicken-chup"
        className="relative block overflow-hidden text-white"
      >
        <div className="relative min-h-[286px]">
          <Image
            src={pageImages.shopBanner}
            alt="Khuyến mãi nhà hàng"
            fill
            className="object-cover"
            sizes="312px"
          />
          <div className="absolute inset-0 bg-[#0d0d0d]/55" />
          <div className="relative z-10 flex min-h-[286px] flex-col justify-between p-6">
            <div>
              <p className="text-base leading-6">Hương vị hoàn hảo</p>
              <p className="mt-2 text-xl font-bold leading-7">Nhà hàng classic</p>
              <p className="mt-4 text-base font-bold text-primary">45.00$</p>
            </div>
            <span className="inline-flex items-center gap-2 text-base">
              Mua ngay
              <Image src={assets.arrowRight} alt="" width={20} height={20} className="brightness-0 invert" />
            </span>
          </div>
        </div>
      </Link>

      <div>
        <h2 className="mb-4 text-xl font-bold leading-7 text-gray-1">
          Lọc theo giá
        </h2>
        <input
          type="range"
          min={0}
          max={8000}
          step={50}
          value={priceMax}
          onChange={(e) => onPriceMaxChange?.(Number(e.target.value))}
          className="w-full accent-primary"
          aria-label="Giá tối đa"
        />
        <div className="mt-2 flex items-center justify-between text-base leading-6 text-gray-2">
          <span>
            Từ $0 đến ${priceMax}
          </span>
          <span className="font-bold text-gray-1">Lọc</span>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold leading-7 text-gray-1">
          Sản phẩm mới
        </h2>
        <ul className="space-y-4">
          {latest.map((product) => (
            <li key={product.id}>
              <Link
                href={`/shop/${product.slug}`}
                className="flex gap-3 transition-opacity hover:opacity-90"
              >
                <div className="relative size-[67px] shrink-0 overflow-hidden bg-gray-6">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="67px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base leading-6 text-gray-1">
                    {product.name}
                  </p>
                  <div className="flex gap-0.5" aria-label={`${product.rating} sao`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Image
                        key={i}
                        src={assets.star}
                        alt=""
                        width={12}
                        height={12}
                        className={i < Math.round(product.rating) ? "" : "opacity-30"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-primary">
                    {formatShopPrice(product.price)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold leading-7 text-gray-1">
          Thẻ sản phẩm
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-3">
          {shopTags.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                className="border-b border-transparent text-base leading-6 text-gray-2 transition-colors hover:border-primary hover:text-primary"
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
