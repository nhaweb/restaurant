import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Logo } from "@/components/ui/Logo";
import { footerLinks, legalLinks } from "@/data/navigation";
import { getGalleryImages } from "@/lib/content/gallery";
import {
  getDirectionsUrl,
  getMailtoHref,
  getRestaurant,
  getTelHref,
  getZaloHref,
} from "@/lib/content/restaurant";
import { assets } from "@/lib/assets";

function NewsletterFallback() {
  return (
    <div className="mb-3 flex max-w-xs overflow-hidden rounded-md">
      <input
        type="email"
        placeholder="Nhập email của bạn"
        className="w-full bg-white px-4 py-3 text-sm text-gray-1 outline-none"
        aria-label="Email"
        disabled
      />
      <span className="inline-flex items-center justify-center bg-primary px-4 opacity-60">
        <Image src={assets.send} alt="" width={20} height={20} />
      </span>
    </div>
  );
}

export async function SiteFooter() {
  const [restaurant, galleryImages] = await Promise.all([
    getRestaurant(),
    getGalleryImages(),
  ]);
  const footerGallery = galleryImages.slice(0, 6);

  return (
    <footer className="relative mt-10 overflow-hidden">
      <div className="bg-[rgba(168,188,161,0.3)] pt-16 md:pt-20">
        <div className="container-site grid gap-12 pb-16 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Logo className="mb-4 inline-block" />
            <p className="mb-6 max-w-[254px] text-lg leading-[26px] text-gray-1">
              Đăng ký bản tin để nhận ưu đãi 25%
            </p>
            <Suspense fallback={<NewsletterFallback />}>
              <NewsletterForm />
            </Suspense>
            <div className="flex items-center gap-2">
              {restaurant.social.map((social) =>
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="relative size-6 overflow-hidden"
                  >
                    <Image
                      src={social.icon ?? assets.social[0]}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    title={`Trang ${social.label} sắp ra mắt`}
                    className="relative size-6 overflow-hidden opacity-70"
                  >
                    <Image
                      src={social.icon ?? assets.social[0]}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  </span>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold leading-7 text-gray-1">
              Liên hệ
            </h3>
            <ul className="space-y-5 text-lg leading-[26px] text-gray-1">
              <li className="flex items-start gap-3">
                <Image src={assets.mapPin} alt="" width={24} height={24} />
                <a
                  href={getDirectionsUrl(restaurant)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {restaurant.address.display}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Image src={assets.phone} alt="" width={24} height={24} />
                <a href={getTelHref(restaurant)} className="hover:text-primary">
                  <span className="font-semibold">Hotline:</span>{" "}
                  {restaurant.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Image src={assets.phone} alt="" width={24} height={24} />
                <a
                  href={getZaloHref(restaurant)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  <span className="font-semibold">Zalo:</span> {restaurant.zalo.display}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Image src={assets.envelope} alt="" width={24} height={24} />
                <a
                  href={getMailtoHref(restaurant)}
                  className="break-all hover:text-primary"
                >
                  {restaurant.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Image src={assets.clock} alt="" width={24} height={24} />
                <span>{restaurant.hours.display}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold leading-7 text-gray-1">Liên kết</h3>
            <ul className="space-y-4 text-base leading-6 text-gray-1">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold leading-7 text-gray-1">
              Thư viện Instagram
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {footerGallery.map((image) => (
                <Link
                  key={image.id}
                  href="/gallery"
                  className="relative aspect-square overflow-hidden bg-white"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="109px"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary py-5 text-white">
        <div className="container-site flex flex-col gap-4 text-base leading-6 md:flex-row md:items-center md:justify-between">
          <p>{restaurant.copyright}</p>
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <Link key={link.href + link.label} href={link.href} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
