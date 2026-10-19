"use client";

import Image from "next/image";
import { usePreOrder } from "@/components/shop/CartProvider";
import { formatShopPrice } from "@/data/shop";

export function PreOrderSummary() {
  const { items, count, subtotal, setQuantity, removeItem, clear } =
    usePreOrder();

  return (
    <aside
      id="pre-order"
      className="scroll-mt-28 rounded-[6px] border border-gray-5 bg-white p-6 md:scroll-mt-32 md:p-8"
      aria-labelledby="pre-order-heading"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            Món chọn trước
          </p>
          <h2
            id="pre-order-heading"
            className="mt-1 text-xl font-bold text-gray-1"
          >
            Đã chọn ({count} món)
          </h2>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="rounded-full px-2.5 py-1 text-xs font-semibold text-gray-3 transition hover:bg-gray-6 hover:text-primary"
          >
            Xóa hết
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="rounded-[6px] bg-gray-6 px-4 py-6 text-sm leading-6 text-gray-2">
          Chưa chọn món. Dùng “+ Thêm món” bên dưới hoặc trên thực đơn — tuỳ chọn,
          thanh toán tại quán.
        </p>
      ) : (
        <ul className="max-h-80 space-y-4 overflow-y-auto pr-1">
          {items.map((line) => (
            <li key={line.id} className="flex gap-3 border-b border-gray-5 pb-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded bg-gray-6">
                <Image
                  src={line.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-1">{line.name}</p>
                <p className="text-sm text-primary">
                  {formatShopPrice(line.price)}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex size-7 items-center justify-center rounded-full border border-gray-5 text-gray-1 hover:border-primary"
                    aria-label={`Giảm ${line.name}`}
                    onClick={() => setQuantity(line.id, line.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="min-w-6 text-center text-sm font-bold">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    className="inline-flex size-7 items-center justify-center rounded-full border border-gray-5 text-gray-1 hover:border-primary"
                    aria-label={`Tăng ${line.name}`}
                    onClick={() => setQuantity(line.id, line.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="ml-auto rounded-full px-2 py-0.5 text-xs text-gray-3 hover:bg-gray-6 hover:text-red-700"
                    onClick={() => removeItem(line.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-6 space-y-2 border-t border-gray-5 pt-4 text-base">
        <div className="flex justify-between gap-4">
          <dt className="text-gray-2">Số món</dt>
          <dd className="font-medium text-gray-1">
            {count > 0 ? count : "Chưa có"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-2">Tổng ước tính</dt>
          <dd className="font-bold text-primary">
            {formatShopPrice(subtotal)}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-xs leading-5 text-gray-3">
        Không thu phí đặt bàn. Thanh toán món khi dùng tại quán.
      </p>
    </aside>
  );
}
