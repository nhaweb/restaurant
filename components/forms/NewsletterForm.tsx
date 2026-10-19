"use client";

import Image from "next/image";
import { useActionState } from "react";
import { submitNewsletterForm } from "@/app/actions/forms";
import { assets } from "@/lib/assets";
import type { ActionResult } from "@/lib/forms";

const initialState: ActionResult | null = null;

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    submitNewsletterForm,
    initialState,
  );

  return (
    <div>
      <form action={formAction} className="mb-3 flex max-w-xs overflow-hidden rounded-md">
        <input
          type="email"
          name="email"
          required
          placeholder="Nhập email của bạn"
          className="w-full bg-white px-4 py-3 text-sm text-gray-1 outline-none"
          aria-label="Email"
          aria-invalid={state && !state.ok ? true : undefined}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center bg-primary px-4 disabled:opacity-60"
          aria-label="Đăng ký"
        >
          <Image src={assets.send} alt="" width={20} height={20} />
        </button>
      </form>
      {state && (
        <p
          className={`mb-4 max-w-xs text-sm leading-5 ${
            state.ok ? "text-primary" : "text-red-700"
          }`}
          role="status"
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
