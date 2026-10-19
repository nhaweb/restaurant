import { Suspense } from "react";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { PreOrderSummary } from "@/components/reservation/PreOrderSummary";
import { Button } from "@/components/ui/Button";
import { getTelHref, getZaloHref, restaurant } from "@/data/restaurant";
import { shopProducts as staticProducts } from "@/data/shop";
import { getShopProducts } from "@/lib/content/shop";
import { BreadcrumbJsonLd } from "@/lib/json-ld";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Đặt bàn",
  description: `Đặt bàn tại ${restaurant.name}. Chọn món trước (tuỳ chọn), xác nhận chỗ — thanh toán tại quán. ${restaurant.hours.display}.`,
  path: "/reservation",
});

export default async function ReservationPage() {
  const products = await getShopProducts();
  const menu = products.length ? products : staticProducts;

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Đặt bàn", path: "/reservation" },
        ]}
      />
      <PageHero
        variant="banner"
        title="Đặt bàn"
        backgroundImage={pageImages.shopHero}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Đặt bàn" },
        ]}
      />
      <section className="py-14 md:py-20">
        <div className="container-site mb-10 max-w-3xl md:mb-14">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            Đặt bàn & chọn món
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-1 md:text-3xl">
            Giữ chỗ cho buổi ăn đáng nhớ
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-2">
            Xác nhận bàn nhanh. Có thể chọn món trước — bếp chuẩn bị khi bạn đến.
            Không thu phí đặt bàn; thanh toán tại quán.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-2">
            <li>Xác nhận nhanh</li>
            <li aria-hidden>·</li>
            <li>Chọn món trước (tuỳ chọn)</li>
            <li aria-hidden>·</li>
            <li>Nhóm đông — gọi trước</li>
          </ul>
        </div>

        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:gap-12">
          <div className="space-y-8">
            <Suspense
              fallback={
                <p className="rounded-[6px] bg-gray-6 px-4 py-8 text-sm text-gray-2">
                  Đang tải form đặt bàn…
                </p>
              }
            >
              <ReservationForm products={menu} />
            </Suspense>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <PreOrderSummary />

            <aside className="rounded-[6px] bg-[rgba(168,188,161,0.25)] p-6 md:p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-1">
                Cần hỗ trợ ngay?
              </h2>
              <p className="mb-6 text-base leading-6 text-gray-2">
                Đặt trong ngày hoặc nhóm đông — gọi điện hoặc Zalo thường nhanh
                nhất.
              </p>
              <ul className="mb-6 space-y-3 text-base text-gray-1">
                <li>
                  <strong className="font-semibold">Hotline:</strong>{" "}
                  <a href={getTelHref()} className="text-primary hover:underline">
                    {restaurant.phone.display}
                  </a>
                </li>
                <li>
                  <strong className="font-semibold">Zalo:</strong>{" "}
                  <a
                    href={getZaloHref()}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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

              <div className="mb-6 rounded-[6px] bg-white/70 p-4 text-sm leading-6 text-gray-2">
                <p className="font-semibold text-gray-1">Chính sách đặt bàn</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Giữ bàn tối đa khoảng 15 phút sau giờ đặt.</li>
                  <li>Nhóm trên 8 khách vui lòng gọi trước.</li>
                  <li>Hủy hoặc đổi lịch trước ít nhất 2 giờ.</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button href={getTelHref()}>Gọi đặt bàn</Button>
                <Button href={getZaloHref()} variant="outline">
                  Nhắn Zalo
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
