import { Suspense } from "react";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { getTelHref, getZaloHref, restaurant } from "@/data/restaurant";
import { BreadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Đặt bàn",
  description: `Yêu cầu đặt bàn tại ${restaurant.name}. Giờ mở cửa: ${restaurant.hours.display}.`,
  path: "/reservation",
});

export default function ReservationPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Đặt bàn", path: "/reservation" },
        ]}
      />
      <PageHero
        title="Đặt bàn"
        description="Gửi yêu cầu đặt bàn, chúng tôi sẽ xác nhận chỗ trống. Muốn trao đổi nhanh? Gọi hotline hoặc nhắn Zalo."
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Đặt bàn" },
        ]}
      />
      <section className="pb-16 md:pb-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Suspense
            fallback={
              <p className="rounded-[6px] bg-gray-6 px-4 py-8 text-sm text-gray-2">
                Đang tải form đặt bàn…
              </p>
            }
          >
            <ReservationForm />
          </Suspense>
          <aside className="rounded-[6px] bg-[rgba(168,188,161,0.25)] p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-1">Cần hỗ trợ ngay?</h2>
            <p className="mb-6 text-base leading-6 text-gray-2">
              Với đặt bàn trong ngày hoặc nhóm đông, gọi điện hoặc Zalo thường nhanh nhất.
            </p>
            <ul className="mb-8 space-y-3 text-base text-gray-1">
              <li>
                <strong className="font-semibold">Hotline:</strong>{" "}
                <a href={getTelHref()} className="text-primary hover:underline">
                  {restaurant.phone.display}
                </a>
              </li>
              <li>
                <strong className="font-semibold">Zalo:</strong>{" "}
                <a href={getZaloHref()} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  {restaurant.zalo.display}
                </a>
              </li>
              <li>
                <strong className="font-semibold">Giờ mở cửa:</strong>{" "}
                {restaurant.hours.display}
              </li>
              <li>
                <strong className="font-semibold">Địa chỉ:</strong>{" "}
                {restaurant.address.display}
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button href={getTelHref()}>Gọi đặt bàn</Button>
              <Button href={getZaloHref()} variant="outline">
                Nhắn Zalo
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
