import { FeaturedDishes } from "@/components/menu/FeaturedDishes";
import { MenuCatalog } from "@/components/menu/MenuCatalog";
import { Partners } from "@/components/home/Partners";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { StatsBanner } from "@/components/shared/StatsBanner";
import { Button } from "@/components/ui/Button";
import { getTelHref } from "@/data/restaurant";
import { getFeaturedShopProducts, getShopProducts } from "@/lib/content/shop";
import { getMenuItems } from "@/lib/content/menu";
import { BreadcrumbJsonLd, MenuJsonLd } from "@/lib/json-ld";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thực đơn",
  description:
    "Món đầu bếp chọn và thực đơn đầy đủ PML Food — xem món, chọn trước khi đặt bàn.",
  path: "/menu",
});

export default async function MenuPage() {
  const [featured, products, menuItems] = await Promise.all([
    getFeaturedShopProducts(4),
    getShopProducts(),
    getMenuItems(),
  ]);

  return (
    <PageShell>
      <MenuJsonLd items={menuItems} />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Thực đơn", path: "/menu" },
        ]}
      />
      <PageHero
        variant="banner"
        title="Thực đơn"
        backgroundImage={pageImages.menuHero}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thực đơn" },
        ]}
      />

      <FeaturedDishes products={featured} />

      <StatsBanner />

      <MenuCatalog products={products} />

      <section className="py-14 md:py-20">
        <div className="container-site flex flex-wrap justify-center gap-2.5">
          <Button href="/reservation">Đặt bàn & chọn món</Button>
          <Button href={getTelHref()} variant="outline">
            Gọi đặt bàn
          </Button>
        </div>
      </section>

      <Partners />
    </PageShell>
  );
}
