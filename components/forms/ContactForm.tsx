"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/forms";
import type { ActionResult } from "@/lib/forms";

const initialState: ActionResult | null = null;

const fieldClass =
  "w-full rounded-[6px] border border-gray-5 bg-white px-4 py-3 text-base text-gray-1 outline-none transition focus:border-primary";

function errorsFor(state: ActionResult | null, field: string) {
  if (!state || state.ok) return undefined;
  return state.fieldErrors?.[field];
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Họ tên"
          name="name"
          required
          errors={errorsFor(state, "name")}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          errors={errorsFor(state, "email")}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Điện thoại" name="phone" type="tel" errors={errorsFor(state, "phone")} />
        <Field
          label="Tiêu đề"
          name="subject"
          required
          errors={errorsFor(state, "subject")}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-2">
          Nội dung
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldClass}
          aria-invalid={Boolean(errorsFor(state, "message"))}
        />
        {errorsFor(state, "message")?.[0] && (
          <p className="mt-1 text-sm text-red-700">{errorsFor(state, "message")?.[0]}</p>
        )}
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
        className="inline-flex items-center justify-center rounded-none bg-primary px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#144800] disabled:opacity-60"
      >
        {pending ? "Đang gửi…" : "Gửi tin nhắn"}
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
