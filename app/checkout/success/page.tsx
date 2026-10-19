import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thanh toán thành công",
  description: "Cảm ơn bạn đã đặt hàng tại PML Food.",
  path: "/checkout/success",
});

async function OrderCodeNote({
  searchParams,
}: {
  searchParams: Promise<{ orderCode?: string }>;
}) {
  const { orderCode } = await searchParams;
  if (!orderCode) return null;
  return (
    <p>
      Mã đơn: <strong className="text-gray-1">#{orderCode}</strong>
    </p>
  );
}

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderCode?: string }>;
}) {
  return (
    <PageShell>
      <PageHero
        title="Thanh toán thành công"
        description="Chúng tôi đã nhận đơn của bạn. Email xác nhận sẽ được gửi khi PayOS xác nhận giao dịch."
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thanh toán thành công" },
        ]}
      />
      <section className="pb-16 md:pb-24">
        <div className="container-site max-w-xl space-y-4 text-base text-gray-2">
          <Suspense fallback={null}>
            <OrderCodeNote searchParams={searchParams} />
          </Suspense>
          <p>
            Nếu bạn vừa thanh toán, trạng thái đơn sẽ cập nhật sau khi webhook
            PayOS xác nhận (thường trong vài giây).
          </p>
          <Link
            href="/menu"
            className="inline-flex font-bold text-primary hover:underline"
          >
            Tiếp tục xem thực đơn
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
