"use client";

import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
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
          description="Món được khách yêu thích — xem chi tiết hoặc chọn trước khi đặt bàn."
        />

        <StaggerChildren
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.07}
        >
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          <Button href="#full-menu">Xem thực đơn đầy đủ</Button>
          <Button href="/reservation" variant="outline" shape="square">
            Đặt bàn
          </Button>
        </div>
      </div>
    </section>
  );
}
