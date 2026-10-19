"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatShopPrice, type ShopProduct } from "@/data/shop";
import { useCart } from "@/components/shop/CartProvider";

type Props = {
  product: ShopProduct;
};

function IconSearch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M18.75 10.875a7.875 7.875 0 1 1-15.75 0 7.875 7.875 0 0 1 15.75 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m16.443 16.444 4.556 4.556"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTote({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M19.579 20.25H4.421a.75.75 0 0 1-.745-.667L2.343 7.583a.75.75 0 0 1 .745-.833h17.824a.75.75 0 0 1 .745.833l-1.333 12a.75.75 0 0 1-.745.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 9.75V6.75a3.75 3.75 0 1 1 7.5 0v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHeart({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      aria-hidden
    >
      <path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const actionBtnClass =
  "inline-flex size-10 items-center justify-center bg-white text-gray-1 shadow-sm transition duration-200 hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-safe:hover:scale-105";

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const [saved, setSaved] = useState(false);

  return (
    <article className="group relative flex flex-col">
      <div className="relative mb-3 aspect-[312/267] overflow-hidden bg-gray-6">
        <Link href={`/shop/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 312px"
          />
          <span className="sr-only">Xem {product.name}</span>
        </Link>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100"
          aria-hidden
        />

        {product.onSale && (
          <span className="absolute left-4 top-4 z-10 bg-primary px-3 py-0.5 text-sm leading-[22px] text-white">
            Giảm giá
          </span>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2 opacity-0 transition-all duration-300 ease-out motion-safe:translate-y-2 group-hover:pointer-events-auto group-hover:opacity-100 motion-safe:group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 motion-safe:group-focus-within:translate-y-0 max-md:pointer-events-auto max-md:translate-y-0 max-md:opacity-100">
          <Link
            href={`/shop/${product.slug}`}
            className={actionBtnClass}
            aria-label={`Xem chi tiết ${product.name}`}
          >
            <IconSearch className="size-[18px]" />
          </Link>
          <button
            type="button"
            className={actionBtnClass}
            aria-label={`Thêm ${product.name} vào giỏ`}
            onClick={() =>
              addItem({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
          >
            <IconTote className="size-[18px]" />
          </button>
          <button
            type="button"
            className={`${actionBtnClass} ${saved ? "bg-primary text-white" : ""}`}
            aria-label={
              saved ? `Bỏ ${product.name} khỏi yêu thích` : `Lưu ${product.name} vào yêu thích`
            }
            aria-pressed={saved}
            onClick={() => setSaved((v) => !v)}
          >
            <IconHeart className="size-[18px]" filled={saved} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold leading-[26px] text-gray-1">
        <Link href={`/shop/${product.slug}`} className="transition-colors hover:text-primary">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 flex flex-wrap items-center gap-2 text-base leading-6">
        <span className="text-primary">{formatShopPrice(product.price)}</span>
        {product.compareAtPrice != null && (
          <span className="text-gray-3 line-through">
            {formatShopPrice(product.compareAtPrice)}
          </span>
        )}
      </p>
    </article>
  );
}
