"use client";

import { useActionState } from "react";
import { submitReservationForm } from "@/app/actions/forms";
import { restaurant } from "@/data/restaurant";
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

export function ReservationForm() {
  const [state, formAction, pending] = useActionState(
    submitReservationForm,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <p className="rounded-[6px] bg-gray-6 px-4 py-3 text-sm leading-5 text-gray-2">
        Giờ mở cửa: {restaurant.hours.display}. Gửi form này chỉ là yêu cầu —
        chưa phải xác nhận ngay trừ khi chúng tôi phản hồi xác nhận qua email.
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
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={20}
            defaultValue={2}
            required
            className={fieldClass}
            aria-invalid={Boolean(errorsFor(state, "guests"))}
          />
          {errorsFor(state, "guests")?.[0] && (
            <p className="mt-1 text-sm text-red-700">{errorsFor(state, "guests")?.[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-2">
          Ghi chú (tuỳ chọn)
        </label>
        <textarea id="notes" name="notes" rows={4} className={fieldClass} />
      </div>

      {state && (
        <p
          className={`text-sm leading-5 ${state.ok ? "text-primary" : "text-red-700"}`}
          role="status"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-[6px] bg-primary px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-[#144800] disabled:opacity-60"
      >
        {pending ? "Đang gửi…" : "Gửi yêu cầu đặt bàn"}
      </button>
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
