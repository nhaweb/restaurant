import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import {
  getDirectionsUrl,
  getMailtoHref,
  getTelHref,
  getZaloHref,
  restaurant,
} from "@/data/restaurant";
import { assets } from "@/lib/assets";
import { BreadcrumbJsonLd } from "@/lib/json-ld";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Liên hệ",
  description: `Liên hệ ${restaurant.name} — địa chỉ, hotline, Zalo, email, giờ mở cửa và form gửi tin nhắn.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Liên hệ", path: "/contact" },
        ]}
      />
      <PageHero
        variant="banner"
        title="Liên hệ"
        backgroundImage={pageImages.contactHero}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" },
        ]}
      />
      <section className="py-14 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-1">Ghé thăm & gọi điện</h2>
            <ul className="mb-8 space-y-5 text-lg leading-[26px] text-gray-1">
              <li className="flex items-start gap-3">
                <Image src={assets.mapPin} alt="" width={24} height={24} />
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {restaurant.address.display}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Image src={assets.phone} alt="" width={24} height={24} />
                <a href={getTelHref()} className="hover:text-primary">
                  <span className="font-semibold">Hotline:</span>{" "}
                  {restaurant.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Image src={assets.phone} alt="" width={24} height={24} />
                <a
                  href={getZaloHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  <span className="font-semibold">Zalo:</span> {restaurant.zalo.display}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Image src={assets.envelope} alt="" width={24} height={24} />
                <a href={getMailtoHref()} className="break-all hover:text-primary">
                  {restaurant.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Image src={assets.clock} alt="" width={24} height={24} />
                <span>{restaurant.hours.display}</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button href={getDirectionsUrl()}>Chỉ đường</Button>
              <Button href={getTelHref()} variant="outline">
                Gọi ngay
              </Button>
              <Button href={getZaloHref()} variant="outline">
                Nhắn Zalo
              </Button>
            </div>
            <div className="mt-8 overflow-hidden rounded-[6px] border border-gray-5 bg-gray-6">
              <iframe
                title={`Bản đồ tới ${restaurant.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(restaurant.mapsQuery)}&z=14&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-1">Gửi tin nhắn</h2>
            <Suspense
              fallback={
                <p className="rounded-[6px] bg-gray-6 px-4 py-8 text-sm text-gray-2">
                  Đang tải form liên hệ…
                </p>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
