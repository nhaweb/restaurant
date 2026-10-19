"use client";

import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ShopProduct } from "@/data/shop";

type Props = {
  products: ShopProduct[];
};

export function FeaturedDishes({ products }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Món đầu bếp chọn"
          title="Món gợi ý"
          description="Món được khách yêu thích — đặt trước, sau đó xem thực đơn đầy đủ khi bạn sẵn sàng."
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button href="#full-menu">Xem thực đơn đầy đủ</Button>
          <Button href="/reservation" variant="outline">
            Đặt bàn
          </Button>
        </div>
      </div>
    </section>
  );
}
