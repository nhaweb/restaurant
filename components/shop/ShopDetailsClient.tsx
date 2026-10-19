"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductCard } from "@/components/shop/ProductCard";
import { useCart } from "@/components/shop/CartProvider";
import {
  formatShopPrice,
  getSimilarProducts,
  type ShopProduct,
} from "@/data/shop";
import { assets } from "@/lib/assets";

type Props = {
  product: ShopProduct;
};

export function ShopDetailsClient({ product }: Props) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"description" | "reviews">("description");
  const similar = getSimilarProducts(product.slug, 4);

  return (
    <div className="space-y-16 md:space-y-20">
      <FadeIn>
        <div className="grid gap-10 lg:grid-cols-[647px_minmax(0,1fr)] lg:gap-12">
          <div className="flex gap-4">
            <div className="flex w-[132px] shrink-0 flex-col gap-4">
              {product.gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square overflow-hidden border-2 ${
                    activeImage === index ? "border-primary" : "border-transparent"
                  }`}
                  aria-label={`Xem ảnh ${index + 1}`}
                  aria-pressed={activeImage === index}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="132px"
                  />
                </button>
              ))}
            </div>
            <div className="relative min-h-[360px] flex-1 overflow-hidden bg-gray-6 md:min-h-[596px]">
              <Image
                src={product.gallery[activeImage] ?? product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 491px"
                priority
              />
            </div>
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span
                className={`inline-flex items-center px-3 py-1 text-sm leading-[22px] ${
                  product.inStock
                    ? "bg-primary/15 text-primary"
                    : "bg-gray-6 text-gray-3"
                }`}
              >
                {product.inStock ? "Còn hàng" : "Hết hàng"}
              </span>
              <div className="flex items-center gap-3 text-base text-gray-2">
                <button type="button" className="hover:text-primary" disabled>
                  Trước
                </button>
                <button type="button" className="hover:text-primary" disabled>
                  Sau
                </button>
              </div>
            </div>

            <h1 className="text-[32px] font-bold leading-10 text-gray-1 md:text-[48px] md:leading-[56px]">
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-6 text-gray-2">
              {product.description}
            </p>

            <p className="mt-6 border-t border-gray-5 pt-6 text-[32px] font-bold leading-10 text-primary">
              {formatShopPrice(product.price)}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-base leading-6 text-gray-2">
              <div className="flex gap-1" aria-label={`${product.rating} trên 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image
                    key={i}
                    src={assets.star}
                    alt=""
                    width={20}
                    height={20}
                    className={i < Math.round(product.rating) ? "" : "opacity-30"}
                  />
                ))}
              </div>
              <span>{product.rating.toFixed(1)} điểm</span>
              <span aria-hidden>|</span>
              <span>{product.reviewCount} đánh giá</span>
            </div>

            <p className="mt-4 text-base leading-6 text-gray-2">
              {product.category} · {product.tags.slice(0, 2).join(", ")}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div
                className="inline-flex h-[50px] items-stretch border border-gray-5"
                role="group"
                aria-label="Số lượng"
              >
                <button
                  type="button"
                  className="w-14 text-xl text-gray-1 hover:bg-gray-6"
                  aria-label="Giảm số lượng"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="flex min-w-14 items-center justify-center border-x border-gray-5 text-lg font-bold">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="w-14 text-xl text-gray-1 hover:bg-gray-6"
                  aria-label="Tăng số lượng"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="inline-flex h-[50px] items-center gap-2 bg-primary px-6 text-base font-bold text-white transition hover:bg-[#144800]"
                onClick={() =>
                  addItem(
                    {
                      id: product.id,
                      slug: product.slug,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    },
                    quantity,
                  )
                }
              >
                <Image
                  src={assets.tote}
                  alt=""
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
                Thêm vào giỏ
              </button>
            </div>

            <div className="mt-8 space-y-2 border-t border-gray-5 pt-6 text-base leading-6 text-gray-2">
              <div className="flex flex-wrap gap-6">
                <button type="button" className="inline-flex items-center gap-2 hover:text-primary">
                  <span aria-hidden>♡</span> Thêm yêu thích
                </button>
                <button type="button" className="inline-flex items-center gap-2 hover:text-primary">
                  So sánh
                </button>
              </div>
              <p>
                <span className="text-gray-1">Danh mục:</span> {product.category}
              </p>
              <p>
                <span className="text-gray-1">Thẻ:</span>{" "}
                {product.tags.join(", ")}
              </p>
              <p className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-gray-1">Chia sẻ:</span>
                {assets.social.map((src) => (
                  <Image key={src} src={src} alt="" width={24} height={24} />
                ))}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div>
          <div className="mb-6 flex flex-wrap gap-2" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "description"}
              onClick={() => setTab("description")}
              className={`px-6 py-3 text-base font-bold ${
                tab === "description"
                  ? "bg-primary text-white"
                  : "bg-gray-6 text-gray-2"
              }`}
            >
              Mô tả
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "reviews"}
              onClick={() => setTab("reviews")}
              className={`px-6 py-3 text-base ${
                tab === "reviews"
                  ? "bg-primary font-bold text-white"
                  : "text-gray-2"
              }`}
            >
              Đánh giá ({product.reviewCount})
            </button>
          </div>

          {tab === "description" ? (
            <div className="space-y-4 text-base leading-6 text-gray-2">
              <p>
                {product.description} Món được chế biến tươi, giữ trọn hương vị
                nguyên liệu và trình bày gọn gàng — phù hợp dùng bữa tại chỗ hoặc
                mang về.
              </p>
              <p>
                Nếu bạn cần điều chỉnh khẩu phần hoặc ghi chú dị ứng, hãy cho nhân
                viên biết khi đặt món. Chúng tôi luôn sẵn sàng hỗ trợ.
              </p>
              <h2 className="pt-4 text-lg font-bold text-gray-1">Điểm nổi bật</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Nguyên liệu tươi, chế biến theo yêu cầu.</li>
                <li>Hương vị cân bằng, khẩu phần vừa ăn.</li>
                <li>Phù hợp ăn tại chỗ hoặc mang về.</li>
                <li>Đội ngũ bếp kiểm soát chất lượng từng món.</li>
                <li>Phục vụ nhanh trong giờ cao điểm.</li>
              </ul>
            </div>
          ) : (
            <p className="text-base leading-6 text-gray-2">
              Khách chấm {product.name} {product.rating.toFixed(1)}/5
              qua {product.reviewCount} đánh giá. Ghé thử món tươi từ bếp.
            </p>
          )}
        </div>
      </FadeIn>

      <FadeIn>
        <div>
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-[28px] font-bold leading-9 text-gray-1 md:text-[32px]">
              Sản phẩm tương tự
            </h2>
            <div className="flex gap-2">
              <Link
                href="/menu#full-menu"
                className="inline-flex size-10 items-center justify-center rounded-full border border-gray-5 text-gray-1 hover:border-primary hover:text-primary"
                aria-label="Về thực đơn"
              >
                <Image src={assets.arrowLeftNav} alt="" width={20} height={20} />
              </Link>
              <Link
                href="/menu#full-menu"
                className="inline-flex size-10 items-center justify-center rounded-full border border-gray-5 text-gray-1 hover:border-primary hover:text-primary"
                aria-label="Xem thêm món"
              >
                <Image src={assets.arrowRightNav} alt="" width={20} height={20} />
              </Link>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {similar.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
