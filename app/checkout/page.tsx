import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { CartView } from "@/components/shop/CartView";
import { BreadcrumbJsonLd } from "@/lib/json-ld";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Giỏ hàng",
  description:
    "Xem lại đơn PML Food, nhập mã giảm giá và tiến hành thanh toán.",
  path: "/checkout",
});

export default function CheckoutPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Giỏ hàng", path: "/checkout" },
        ]}
      />
      <PageHero
        variant="banner"
        title="Giỏ hàng"
        backgroundImage={pageImages.shopHero}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Giỏ hàng" },
        ]}
      />
      <section className="py-14 md:py-20">
        <div className="container-site">
          <CartView />
        </div>
      </section>
    </PageShell>
  );
}
