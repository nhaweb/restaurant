import {
  formatShopPrice,
  getFeaturedShopProducts as staticFeatured,
  getLatestProducts as staticLatest,
  getShopCategories as staticGetCategories,
  getShopProductBySlug as staticBySlug,
  getSimilarProducts as staticSimilar,
  shopCategories as staticCategories,
  shopProducts as staticProducts,
  shopTags,
  type ShopProduct,
} from "@/data/shop";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { productBySlugQuery, productsQuery } from "@/lib/sanity/queries";

type SanityProduct = {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  price?: number;
  compareAtPrice?: number;
  image?: unknown;
  imageUrl?: string;
  gallery?: string[];
  category?: string;
  tags?: string[];
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  onSale?: boolean;
  featured?: boolean;
};

function mapProduct(doc: SanityProduct): ShopProduct | null {
  if (!doc.id || !doc.slug || !doc.name || doc.price == null) return null;

  const image =
    resolveImageUrl({ image: doc.image as never, imageUrl: doc.imageUrl }) ||
    "";

  return {
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    description: doc.description ?? "",
    price: doc.price,
    compareAtPrice: doc.compareAtPrice,
    image,
    gallery: doc.gallery?.length ? doc.gallery : [image].filter(Boolean),
    category: doc.category ?? "Uncategorized",
    tags: doc.tags ?? [],
    inStock: doc.inStock ?? true,
    rating: doc.rating ?? 5,
    reviewCount: doc.reviewCount ?? 0,
    onSale: doc.onSale,
    featured: doc.featured,
  };
}

export async function getShopProducts(): Promise<ShopProduct[]> {
  if (!isSanityConfigured()) return staticProducts;

  const docs = await sanityFetch<SanityProduct[]>(productsQuery);
  if (!docs?.length) return staticProducts;

  const mapped = docs
    .map(mapProduct)
    .filter((p): p is ShopProduct => p !== null);

  return mapped.length ? mapped : staticProducts;
}

export async function getShopProductBySlug(slug: string) {
  if (isSanityConfigured()) {
    const doc = await sanityFetch<SanityProduct>(productBySlugQuery, { slug });
    const mapped = doc ? mapProduct(doc) : null;
    if (mapped) return mapped;
  }
  return staticBySlug(slug);
}

export async function getSimilarProducts(slug: string, limit = 4) {
  const products = await getShopProducts();
  const current = products.find((p) => p.slug === slug);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

export async function getLatestProducts(limit = 4) {
  const products = await getShopProducts();
  return products.slice(0, limit);
}

export async function getFeaturedShopProducts(limit = 4) {
  const products = await getShopProducts();
  const featured = products.filter((p) => p.featured);
  return (featured.length ? featured : products).slice(0, limit);
}

export async function getShopCategoriesList() {
  const products = await getShopProducts();
  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }
  if (!counts.size) return staticGetCategories();
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export {
  formatShopPrice,
  shopTags,
  staticCategories as shopCategories,
  staticFeatured,
  staticLatest,
  staticSimilar,
  staticBySlug,
  staticGetCategories,
};

export type { ShopProduct };
