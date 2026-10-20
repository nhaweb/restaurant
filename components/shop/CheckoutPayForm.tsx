"use client";

import { useState, useTransition } from "react";
import { createPayosCheckout } from "@/app/actions/checkout";
import { useCart } from "@/components/shop/CartProvider";
import { Button } from "@/components/ui/Button";

type Props = {
  disabled?: boolean;
};

export function CheckoutPayForm({ disabled }: Props) {
  const { items, clear } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createPayosCheckout({
        name,
        email,
        phone,
        items: items.map((item) => ({
          productId: item.id,
          productName: item.name,
          unitPrice: item.price,
          quantity: item.quantity,
        })),
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      clear();
      window.location.href = result.checkoutUrl;
    });
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4 border-t border-gray-5 pt-6">
      <p className="text-sm text-gray-2">
        Thanh toán qua PayOS (VietQR / chuyển khoản). Điền thông tin để nhận xác nhận.
      </p>
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-1">
          Họ tên
          <input
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border border-gray-5 px-3 py-2 text-base font-normal outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm font-semibold text-gray-1">
          Email
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-gray-5 px-3 py-2 text-base font-normal outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm font-semibold text-gray-1">
          Số điện thoại
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full border border-gray-5 px-3 py-2 text-base font-normal outline-none focus:border-primary"
          />
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={disabled || pending || items.length === 0}
        size="lg"
        withArrow
        className="h-16 w-full"
      >
        {pending ? "Đang tạo thanh toán…" : "Thanh toán với PayOS"}
      </Button>
    </form>
  );
}
