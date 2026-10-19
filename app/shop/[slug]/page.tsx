import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { ShopDetailsClient } from "@/components/shop/ShopDetailsClient";
import { shopProducts as staticProducts } from "@/data/shop";
import { getRestaurant } from "@/lib/content/restaurant";
import { getShopProductBySlug, getShopProducts } from "@/lib/content/shop";
import { BreadcrumbJsonLd } from "@/lib/json-ld";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getShopProducts();
  const list = products.length ? products : staticProducts;
  return list.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [product, restaurant] = await Promise.all([
    getShopProductBySlug(slug),
    getRestaurant(),
  ]);
  if (!product) {
    return pageMetadata({
      title: "Món ăn",
      description: `Xem món tại ${restaurant.name} — đặt bàn để dùng tại quán.`,
      path: "/menu",
    });
  }
  return pageMetadata({
    title: product.name,
    description: product.description,
    path: `/shop/${product.slug}`,
  });
}

export default async function ShopDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [product, restaurant] = await Promise.all([
    getShopProductBySlug(slug),
    getRestaurant(),
  ]);
  if (!product) notFound();

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Thực đơn", path: "/menu" },
          { name: product.name, path: `/shop/${product.slug}` },
        ]}
      />
      <PageHero
        variant="banner"
        title={product.name}
        backgroundImage={pageImages.shopHero}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thực đơn", href: "/menu" },
          { label: product.name },
        ]}
      />
      <section className="py-14 md:py-20">
        <div className="container-site">
          <ShopDetailsClient product={product} />
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.image,
            brand: { "@type": "Brand", name: restaurant.name },
            offers: {
              "@type": "Offer",
              priceCurrency: "VND",
              price: product.price.toFixed(0),
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }),
        }}
      />
    </PageShell>
  );
}
