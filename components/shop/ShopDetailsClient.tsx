"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductCard } from "@/components/shop/ProductCard";
import { usePreOrder } from "@/components/shop/CartProvider";
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
  const { addItem } = usePreOrder();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState<"description" | "reviews">("description");
  const similar = getSimilarProducts(product.slug, 4);

  function reserveWithDish() {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1,
    );
    router.push("/reservation#pre-order");
  }

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
            <div className="mb-4">
              <span className="inline-flex items-center bg-primary/15 px-3 py-1 text-sm leading-[22px] text-primary">
                Có trên thực đơn
              </span>
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
              {product.category}
              {product.tags.length > 0 ? ` · ${product.tags.slice(0, 2).join(", ")}` : ""}
            </p>

            <p className="mt-6 max-w-md text-sm leading-6 text-gray-3">
              Món này chỉ xem trên website. Muốn dùng tại quán, hãy đặt bàn và chọn
              món trước — chúng tôi xác nhận chỗ và chuẩn bị theo yêu cầu.
            </p>

            <div className="mt-6">
              <Button
                type="button"
                className="min-w-[180px]"
                withArrow
                onClick={reserveWithDish}
              >
                Đặt bàn với món này
              </Button>
            </div>

            <div className="mt-8 space-y-2 border-t border-gray-5 pt-6 text-base leading-6 text-gray-2">
              <p>
                <span className="text-gray-1">Danh mục:</span> {product.category}
              </p>
              <p>
                <span className="text-gray-1">Thẻ:</span> {product.tags.join(", ")}
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
                {product.description} Món được chế biến tươi khi bạn đến bàn —
                giữ hương vị nguyên liệu và trình bày gọn gàng.
              </p>
              <p>
                Có thể chọn món này khi đặt bàn (tuỳ chọn). Ghi chú dị ứng hoặc
                khẩu phần trong form đặt bàn — bếp sẽ chuẩn bị theo yêu cầu.
              </p>
              <h2 className="pt-4 text-lg font-bold text-gray-1">Điểm nổi bật</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Nguyên liệu tươi, chế biến theo yêu cầu.</li>
                <li>Hương vị cân bằng, khẩu phần vừa ăn.</li>
                <li>Chọn trước khi đặt bàn — thanh toán tại quán.</li>
                <li>Đội ngũ bếp kiểm soát chất lượng từng món.</li>
              </ul>
            </div>
          ) : (
            <p className="text-base leading-6 text-gray-2">
              Khách chấm {product.name} {product.rating.toFixed(1)}/5 qua{" "}
              {product.reviewCount} đánh giá. Ghé thử món tươi từ bếp.
            </p>
          )}
        </div>
      </FadeIn>

      <FadeIn>
        <div>
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-[28px] font-bold leading-9 text-gray-1 md:text-[32px]">
              Món tương tự
            </h2>
            <Link
              href="/menu#full-menu"
              className="text-base font-medium text-primary hover:underline"
            >
              Xem thực đơn
            </Link>
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
