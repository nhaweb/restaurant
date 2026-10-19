import { Resend } from "resend";

export type EmailPayload = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getFromAddress(): string {
  return process.env.CONTACT_FROM_EMAIL ?? "PML Food <onboarding@resend.dev>";
}

export function getStaffInbox(): string | null {
  return process.env.CONTACT_TO_EMAIL ?? null;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

async function sendViaResend(
  payload: EmailPayload,
): Promise<{ delivered: boolean; detail: string }> {
  const client = getResendClient();
  if (!client) {
    return {
      delivered: false,
      detail: "RESEND_API_KEY is not configured.",
    };
  }

  const { error } = await client.emails.send({
    from: getFromAddress(),
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
    replyTo: payload.replyTo,
  });

  if (error) {
    console.error("[resend]", error);
    return {
      delivered: false,
      detail: "Email delivery failed. Please try again or contact us directly.",
    };
  }

  return { delivered: true, detail: "Submitted via Resend." };
}

async function sendViaFormspree(payload: {
  type: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ delivered: boolean; detail: string }> {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    return { delivered: false, detail: "FORMSPREE_ENDPOINT is not configured." };
  }

  const res = await fetch(endpoint, {
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
      detail:
        "The form provider rejected the submission. Please try again or contact us directly.",
    };
  }

  return { delivered: true, detail: "Submitted via Formspree." };
}

/** Email to the restaurant staff inbox. */
export async function sendStaffEmail(payload: {
  type: "contact" | "reservation" | "newsletter" | "order";
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}): Promise<{ delivered: boolean; detail: string }> {
  if (process.env.FORMSPREE_ENDPOINT) {
    return sendViaFormspree(payload);
  }

  const to = getStaffInbox();
  if (!to) {
    return {
      delivered: false,
      detail:
        "No email provider is configured. Set FORMSPREE_ENDPOINT, or RESEND_API_KEY with CONTACT_TO_EMAIL.",
    };
  }

  return sendViaResend({
    to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
    replyTo: payload.replyTo,
  });
}

/** Confirmation / receipt email to the guest. Requires Resend. */
export async function sendGuestEmail(payload: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<{ delivered: boolean; detail: string }> {
  if (!process.env.RESEND_API_KEY) {
    return {
      delivered: false,
      detail: "Guest email skipped — RESEND_API_KEY is not configured.",
    };
  }

  return sendViaResend(payload);
}
