import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thanh toán đã hủy",
  description: "Bạn đã hủy thanh toán. Giỏ hàng vẫn sẵn sàng khi bạn quay lại.",
  path: "/checkout/cancel",
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
      Mã đơn chưa thanh toán:{" "}
      <strong className="text-gray-1">#{orderCode}</strong>
    </p>
  );
}

export default function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ orderCode?: string }>;
}) {
  return (
    <PageShell>
      <PageHero
        title="Thanh toán đã hủy"
        description="Không sao — bạn có thể thử lại bất cứ lúc nào."
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thanh toán đã hủy" },
        ]}
      />
      <section className="pb-16 md:pb-24">
        <div className="container-site max-w-xl space-y-4 text-base text-gray-2">
          <Suspense fallback={null}>
            <OrderCodeNote searchParams={searchParams} />
          </Suspense>
          <Link
            href="/checkout"
            className="inline-flex font-bold text-primary hover:underline"
          >
            Quay lại giỏ hàng
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
