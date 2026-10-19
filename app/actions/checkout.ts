"use server";

import { z } from "zod";
import { restaurant } from "@/data/restaurant";
import { sendGuestEmail, sendStaffEmail } from "@/lib/email/resend";
import { createOrderCode, getPayosClient, isPayosConfigured } from "@/lib/payos/client";
import { toPayosAmountVnd } from "@/lib/payos/money";
import { getSiteUrl } from "@/lib/site";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

const checkoutSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(40).optional().or(z.literal("")),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        productName: z.string().min(1),
        unitPrice: z.number().min(0),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(50),
});

export type CheckoutResult =
  | { ok: true; checkoutUrl: string; orderCode: number }
  | { ok: false; message: string };

export async function createPayosCheckout(
  input: z.infer<typeof checkoutSchema>,
): Promise<CheckoutResult> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please check your checkout details." };
  }

  if (!isPayosConfigured()) {
    return {
      ok: false,
      message:
        "Online payment is not configured yet. Please call us to place an order.",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message:
        "Order storage is not configured. Please call us to place an order.",
    };
  }

  const payos = getPayosClient();
  const supabase = getSupabaseAdmin();
  if (!payos || !supabase) {
    return { ok: false, message: "Payment service is temporarily unavailable." };
  }

  const data = parsed.data;
  const displayTotal = data.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const amount = toPayosAmountVnd(displayTotal);
  const orderCode = createOrderCode();
  const siteUrl = getSiteUrl();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_code: orderCode,
      customer_name: data.name,
      customer_email: data.email,
      customer_phone: data.phone || null,
      amount,
      currency: "VND",
      status: "pending",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("[checkout] order insert failed:", orderError);
    return { ok: false, message: "Could not create your order. Please try again." };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    data.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      unit_price: Math.round(item.unitPrice * 25_000),
      quantity: item.quantity,
    })),
  );

  if (itemsError) {
    console.error("[checkout] items insert failed:", itemsError);
    await supabase.from("orders").delete().eq("id", order.id);
    return { ok: false, message: "Could not create your order. Please try again." };
  }

  try {
    const paymentLink = await payos.paymentRequests.create({
      orderCode,
      amount,
      description: `DH${orderCode}`.slice(0, 25),
      returnUrl: `${siteUrl}/checkout/success?orderCode=${orderCode}`,
      cancelUrl: `${siteUrl}/checkout/cancel?orderCode=${orderCode}`,
      buyerName: data.name,
      buyerEmail: data.email,
      buyerPhone: data.phone || undefined,
    });

    await supabase
      .from("orders")
      .update({
        status: "awaiting_payment",
        payos_payment_link_id: paymentLink.paymentLinkId ?? null,
        payos_checkout_url: paymentLink.checkoutUrl ?? null,
      })
      .eq("id", order.id);

    if (!paymentLink.checkoutUrl) {
      return { ok: false, message: "Payment link was not returned. Please try again." };
    }

    await sendStaffEmail({
      type: "order",
      subject: `[${restaurant.name}] New order #${orderCode}`,
      replyTo: data.email,
      text: [
        `New order awaiting payment.`,
        `Order code: ${orderCode}`,
        `Customer: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Amount: ${amount.toLocaleString("vi-VN")} VND`,
        "",
        ...data.items.map(
          (item) =>
            `- ${item.productName} x${item.quantity} (display $${item.unitPrice})`,
        ),
      ].join("\n"),
    });

    return {
      ok: true,
      checkoutUrl: paymentLink.checkoutUrl,
      orderCode,
    };
  } catch (error) {
    console.error("[checkout] PayOS create failed:", error);
    await supabase
      .from("orders")
      .update({ status: "failed" })
      .eq("id", order.id);
    return {
      ok: false,
      message: "Could not start payment. Please try again or call us.",
    };
  }
}

export async function notifyOrderPaid(orderCode: number) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("order_code", orderCode)
    .maybeSingle();

  if (!order || order.status === "paid") return;

  await sendGuestEmail({
    to: order.customer_email,
    subject: `Payment received — ${restaurant.name}`,
    text: [
      `Hi ${order.customer_name},`,
      "",
      `We received your payment for order #${order.order_code}.`,
      `Amount: ${order.amount.toLocaleString("vi-VN")} ${order.currency}`,
      "",
      `Thank you for ordering from ${restaurant.name}.`,
      `Phone: ${restaurant.phone.display}`,
    ].join("\n"),
  });

  await sendStaffEmail({
    type: "order",
    subject: `[${restaurant.name}] Paid order #${order.order_code}`,
    text: `Order #${order.order_code} is paid (${order.amount.toLocaleString("vi-VN")} VND).`,
  });
}
