import { NextResponse } from "next/server";
import { notifyOrderPaid } from "@/app/actions/checkout";
import { getPayosClient, isPayosConfigured } from "@/lib/payos/client";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!isPayosConfigured()) {
    return NextResponse.json({ message: "PayOS not configured" }, { status: 503 });
  }

  const payos = getPayosClient();
  const supabase = getSupabaseAdmin();
  if (!payos || !supabase) {
    return NextResponse.json({ message: "Service unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  try {
    const webhookData = await payos.webhooks.verify(
      body as Parameters<typeof payos.webhooks.verify>[0],
    );
    const orderCode = webhookData.orderCode;

    const { data: order } = await supabase
      .from("orders")
      .select("id, status")
      .eq("order_code", orderCode)
      .maybeSingle();

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.status !== "paid") {
      await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("id", order.id);

      await notifyOrderPaid(orderCode);
    }

    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.error("[payos webhook]", error);
    return NextResponse.json({ message: "Invalid webhook" }, { status: 400 });
  }
}
