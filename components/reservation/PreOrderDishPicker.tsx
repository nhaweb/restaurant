"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { usePreOrder } from "@/components/shop/CartProvider";
import { formatShopPrice, type ShopProduct } from "@/data/shop";

type Props = {
  products: ShopProduct[];
};

const PAGE_SIZE = 6;

export function PreOrderDishPicker({ products }: Props) {
  const { addItem, items } = usePreOrder();
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = page * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [page, products]);

  return (
    <div className="rounded-[6px] border border-gray-5 bg-gray-6/40 p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-primary">Tuỳ chọn</p>
          <h3 className="text-lg font-bold text-gray-1">Chọn món trước</h3>
          <p className="mt-1 text-sm text-gray-2">
            Thêm món vào đặt bàn — bếp chuẩn bị khi bạn đến.
          </p>
        </div>
        <p className="text-sm text-gray-3">
          Trang {page + 1}/{totalPages}
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {pageItems.map((product) => {
          const selected = items.find((line) => line.id === product.id);
          return (
            <li
              key={product.id}
              className="flex items-center gap-3 rounded-[6px] bg-white p-3"
            >
              <div className="relative size-14 shrink-0 overflow-hidden rounded bg-gray-6">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-gray-1">
                  {product.name}
                </p>
                <p className="text-sm text-primary">
                  {formatShopPrice(product.price)}
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#144800]"
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
                {selected ? `+ (${selected.quantity})` : "+ Thêm"}
              </button>
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-gray-1 transition hover:bg-white disabled:opacity-40"
          >
            ‹ Trước
          </button>
          <button
            type="button"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-gray-1 transition hover:bg-white disabled:opacity-40"
          >
            Sau ›
          </button>
        </div>
      )}
    </div>
  );
}
