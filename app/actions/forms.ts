"use server";

import {
  contactSchema,
  fieldErrorsFromZod,
  newsletterSchema,
  reservationSchema,
  type ActionResult,
} from "@/lib/forms";
import { sendGuestEmail, sendStaffEmail } from "@/lib/email/resend";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { restaurant } from "@/data/restaurant";

export async function submitContactForm(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: fieldErrorsFromZod(parsed.error),
    };
  }

  const data = parsed.data;

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      });

      if (error) {
        console.error("[contact] insert failed:", error);
        return {
          ok: false,
          message: `We could not save your message. Please try again or reach us at ${restaurant.email}.`,
        };
      }
    }
  }

  const staffText = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  const delivery = await sendStaffEmail({
    type: "contact",
    subject: `[${restaurant.name}] Contact: ${data.subject}`,
    replyTo: data.email,
    text: staffText,
  });

  if (!delivery.delivered && !isSupabaseConfigured()) {
    return {
      ok: false,
      message: `${delivery.detail} You can reach us at ${restaurant.email} or ${restaurant.phone.display}.`,
    };
  }

  await sendGuestEmail({
    to: data.email,
    subject: `We received your message — ${restaurant.name}`,
    text: [
      `Hi ${data.name},`,
      "",
      `Thanks for contacting ${restaurant.name}. We received your message about "${data.subject}" and will get back to you soon.`,
      "",
      `Phone: ${restaurant.phone.display}`,
      `Email: ${restaurant.email}`,
    ].join("\n"),
  });

  return {
    ok: true,
    message: "Thanks — your message was sent. We will get back to you soon.",
  };
}

export async function submitReservationForm(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = reservationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    time: formData.get("time"),
    guests: formData.get("guests"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: fieldErrorsFromZod(parsed.error),
    };
  }

  const data = parsed.data;

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("reservations").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: data.guests,
        notes: data.notes || null,
        status: "confirmed",
      });

      if (error) {
        console.error("[reservation] insert failed:", error);
        return {
          ok: false,
          message: `We could not save your reservation. Please call ${restaurant.phone.display} or email ${restaurant.email}.`,
        };
      }
    }
  } else {
    // Without Supabase, still require staff email delivery so the booking is not lost.
    const delivery = await sendStaffEmail({
      type: "reservation",
      subject: `[${restaurant.name}] Reservation confirmed — ${data.date} ${data.time}`,
      replyTo: data.email,
      text: formatReservationStaffText(data),
    });

    if (!delivery.delivered) {
      return {
        ok: false,
        message: `${delivery.detail} To book a table now, call ${restaurant.phone.display} or email ${restaurant.email}.`,
      };
    }

    await sendGuestReservationEmail(data);

    return {
      ok: true,
      message:
        "Your table is confirmed. A confirmation email is on its way — see you soon!",
    };
  }

  const staffDelivery = await sendStaffEmail({
    type: "reservation",
    subject: `[${restaurant.name}] Reservation confirmed — ${data.date} ${data.time}`,
    replyTo: data.email,
    text: formatReservationStaffText(data),
  });

  if (!staffDelivery.delivered) {
    console.error("[reservation] staff email failed:", staffDelivery.detail);
  }

  await sendGuestReservationEmail(data);

  return {
    ok: true,
    message:
      "Your table is confirmed. A confirmation email is on its way — see you soon!",
  };
}

export async function submitNewsletterForm(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
      fieldErrors: fieldErrorsFromZod(parsed.error),
    };
  }

  const email = parsed.data.email;

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("newsletter_subscribers").upsert(
        { email },
        { onConflict: "email", ignoreDuplicates: true },
      );

      if (error) {
        console.error("[newsletter] upsert failed:", error);
        return {
          ok: false,
          message: `We could not subscribe you right now. Email us at ${restaurant.email}.`,
        };
      }
    }
  }

  const delivery = await sendStaffEmail({
    type: "newsletter",
    subject: `[${restaurant.name}] Newsletter signup`,
    replyTo: email,
    text: `Newsletter signup: ${email}`,
  });

  if (!delivery.delivered && !isSupabaseConfigured()) {
    return {
      ok: false,
      message: `${delivery.detail} Email us at ${restaurant.email} to join updates.`,
    };
  }

  await sendGuestEmail({
    to: email,
    subject: `You are subscribed — ${restaurant.name}`,
    text: [
      "Thanks for subscribing!",
      "",
      `You will receive updates from ${restaurant.name} about menus, events, and offers.`,
      "",
      `If this was not you, reply to ${restaurant.email} and we will remove your address.`,
    ].join("\n"),
  });

  return {
    ok: true,
    message: "You are subscribed. Watch your inbox for updates.",
  };
}

function formatReservationStaffText(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Date: ${data.date}`,
    `Time: ${data.time}`,
    `Guests: ${data.guests}`,
    `Notes: ${data.notes || "—"}`,
    "",
    "Status: CONFIRMED (auto-confirm).",
  ].join("\n");
}

async function sendGuestReservationEmail(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}) {
  await sendGuestEmail({
    to: data.email,
    subject: `Reservation confirmed — ${restaurant.name}`,
    text: [
      `Hi ${data.name},`,
      "",
      `Your table at ${restaurant.name} is confirmed.`,
      "",
      `Date: ${data.date}`,
      `Time: ${data.time}`,
      `Guests: ${data.guests}`,
      data.notes ? `Notes: ${data.notes}` : null,
      "",
      `Address: ${restaurant.address.display}`,
      `Phone: ${restaurant.phone.display}`,
      "",
      "Need to change or cancel? Call or email us and we will help.",
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
