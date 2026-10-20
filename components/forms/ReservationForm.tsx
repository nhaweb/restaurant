"use client";

import { useActionState, useEffect } from "react";
import { submitReservationForm } from "@/app/actions/forms";
import { PreOrderDishPicker } from "@/components/reservation/PreOrderDishPicker";
import { usePreOrder } from "@/components/shop/CartProvider";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/data/restaurant";
import type { ShopProduct } from "@/data/shop";
import type { ActionResult } from "@/lib/forms";

const initialState: ActionResult | null = null;

const fieldClass =
  "w-full rounded-[6px] border border-gray-5 bg-white px-4 py-3 text-base text-gray-1 outline-none transition focus:border-primary";

const times = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
];

function errorsFor(state: ActionResult | null, field: string) {
  if (!state || state.ok) return undefined;
  return state.fieldErrors?.[field];
}

type Props = {
  products: ShopProduct[];
};

export function ReservationForm({ products }: Props) {
  const [state, formAction, pending] = useActionState(
    submitReservationForm,
    initialState,
  );
  const { items, clear } = usePreOrder();

  useEffect(() => {
    if (state?.ok) clear();
  }, [state, clear]);

  const preOrderPayload = JSON.stringify(
    items.map(({ id, slug, name, price, quantity }) => ({
      id,
      slug,
      name,
      price,
      quantity,
    })),
  );

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <input type="hidden" name="preOrder" value={preOrderPayload} />

      <p className="rounded-[6px] bg-gray-6 px-4 py-3 text-sm leading-5 text-gray-2">
        Giờ mở cửa: {restaurant.hours.display}. Gửi form là yêu cầu đặt bàn kèm
        món chọn trước (nếu có) — thanh toán tại quán khi dùng bữa.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Họ tên" name="name" required errors={errorsFor(state, "name")} />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          errors={errorsFor(state, "email")}
        />
      </div>
      <Field
        label="Điện thoại"
        name="phone"
        type="tel"
        required
        errors={errorsFor(state, "phone")}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-2">
            Ngày
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className={fieldClass}
            aria-invalid={Boolean(errorsFor(state, "date"))}
          />
          {errorsFor(state, "date")?.[0] && (
            <p className="mt-1 text-sm text-red-700">{errorsFor(state, "date")?.[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="time" className="mb-2 block text-sm font-medium text-gray-2">
            Giờ
          </label>
          <select
            id="time"
            name="time"
            required
            className={fieldClass}
            defaultValue=""
            aria-invalid={Boolean(errorsFor(state, "time"))}
          >
            <option value="" disabled>
              Chọn giờ
            </option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errorsFor(state, "time")?.[0] && (
            <p className="mt-1 text-sm text-red-700">{errorsFor(state, "time")?.[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="guests" className="mb-2 block text-sm font-medium text-gray-2">
            Số khách
          </label>
          <select
            id="guests"
            name="guests"
            required
            className={fieldClass}
            defaultValue="2"
            aria-invalid={Boolean(errorsFor(state, "guests"))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
              <option key={n} value={n}>
                {n >= 8 ? `${n} khách${n >= 10 ? " (nhóm)" : ""}` : `${n} khách`}
              </option>
            ))}
          </select>
          {errorsFor(state, "guests")?.[0] && (
            <p className="mt-1 text-sm text-red-700">{errorsFor(state, "guests")?.[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-2">
          Ghi chú (tuỳ chọn)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className={fieldClass}
          placeholder="Dị ứng, sinh nhật, chỗ ngồi…"
        />
      </div>

      <PreOrderDishPicker products={products} />

      {state && (
        <p
          className={`text-sm leading-5 ${state.ok ? "text-primary" : "text-red-700"}`}
          role="status"
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        size="lg"
        withArrow
        className="w-full md:w-auto"
      >
        {pending ? "Đang xác nhận…" : "Xác nhận đặt bàn"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={fieldClass}
        aria-invalid={Boolean(errors?.length)}
      />
      {errors?.[0] && <p className="mt-1 text-sm text-red-700">{errors[0]}</p>}
    </div>
  );
}
