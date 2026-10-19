import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên.").max(80),
  email: z.string().trim().email("Vui lòng nhập email hợp lệ."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Vui lòng nhập tiêu đề.").max(120),
  message: z.string().trim().min(10, "Vui lòng viết nội dung ngắn gọn.").max(2000),
});

export const preOrderLineSchema = z.object({
  id: z.string().trim().min(1).max(80),
  slug: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1).max(120),
  price: z.coerce.number().min(0).max(1_000_000),
  quantity: z.coerce.number().int().min(1).max(50),
});

export const reservationSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên.").max(80),
  email: z.string().trim().email("Vui lòng nhập email hợp lệ."),
  phone: z.string().trim().min(7, "Vui lòng nhập số điện thoại.").max(40),
  date: z
    .string()
    .trim()
    .min(1, "Vui lòng chọn ngày.")
    .refine((value) => {
      const day = new Date(`${value}T00:00:00`);
      if (Number.isNaN(day.getTime())) return false;
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      return day >= start;
    }, "Vui lòng chọn hôm nay hoặc ngày trong tương lai."),
  time: z.string().trim().min(1, "Vui lòng chọn giờ."),
  guests: z.coerce.number().int().min(1, "Ít nhất 1 khách.").max(20, "Tối đa 20 khách."),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  /** JSON string from hidden form field — optional pre-ordered dishes */
  preOrder: z.preprocess((raw) => {
    if (raw == null || raw === "") return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw !== "string") return [];
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      return [];
    }
  }, z.array(preOrderLineSchema).max(40)),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Vui lòng nhập email hợp lệ."),
});

export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export function fieldErrorsFromZod(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] = fieldErrors[key] ?? [];
    fieldErrors[key].push(issue.message);
  }
  return fieldErrors;
}

/**
 * Optional outbound delivery via Formspree or Resend.
 * Returns null when no provider is configured.
 */
export async function deliverLeadEmail(payload: {
  type: "contact" | "reservation" | "newsletter";
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ delivered: boolean; detail: string }> {
  const formspree = process.env.FORMSPREE_ENDPOINT;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (formspree) {
    const res = await fetch(formspree, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        _subject: payload.subject,
        message: payload.text,
        email: payload.replyTo,
      }),
    });

    if (!res.ok) {
      return {
        delivered: false,
        detail: "Nhà cung cấp form từ chối gửi. Vui lòng thử lại hoặc liên hệ trực tiếp.",
      };
    }

    return { delivered: true, detail: "Đã gửi qua Formspree." };
  }

  if (resendKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: payload.subject,
        text: payload.text,
        reply_to: payload.replyTo,
      }),
    });

    if (!res.ok) {
      return {
        delivered: false,
        detail: "Gửi email thất bại. Vui lòng thử lại hoặc liên hệ trực tiếp.",
      };
    }

    return { delivered: true, detail: "Đã gửi qua Resend." };
  }

  return {
    delivered: false,
    detail:
      "Chưa cấu hình email. Thiết lập FORMSPREE_ENDPOINT hoặc RESEND_API_KEY với CONTACT_TO_EMAIL.",
  };
}
