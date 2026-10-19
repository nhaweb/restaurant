"use client";

import Image from "next/image";
import Link from "next/link";
import { usePreOrder } from "@/components/shop/CartProvider";
import { assets } from "@/lib/assets";

export function CartLink() {
  const { count } = usePreOrder();

  return (
    <Link
      href="/reservation#pre-order"
      className="relative inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-transparent transition-colors duration-200 hover:border-primary/20 hover:bg-gray-6"
      aria-label={
        count > 0
          ? `Món đã chọn cho đặt bàn, ${count} món`
          : "Món đã chọn cho đặt bàn"
      }
    >
      <Image src={assets.tote} alt="" width={22} height={22} className="brightness-0" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-4 text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
