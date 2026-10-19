import {
  foodCategories as staticFoodCategories,
  formatCalories,
  formatPrice,
  getFeaturedMenuItems as staticFeatured,
  getMenuByCategory as staticByCategory,
  getMenuItemById as staticById,
  isMenuCategoryId,
  menuCategories as staticCategories,
  menuItems as staticItems,
  type MenuCategoryId,
  type MenuItem,
} from "@/data/menu";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { menuCategoriesQuery, menuItemsQuery } from "@/lib/sanity/queries";

type SanityMenuItem = {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  calories?: number;
  category?: string;
  dietary?: MenuItem["dietary"];
  featured?: boolean;
  image?: unknown;
  imageUrl?: string;
};

type SanityCategory = {
  id?: string;
  label?: string;
};

function mapMenuItem(doc: SanityMenuItem): MenuItem | null {
  if (!doc.id || !doc.name || doc.price == null || !doc.category) return null;
  if (!isMenuCategoryId(doc.category)) return null;

  return {
    id: doc.id,
    name: doc.name,
    description: doc.description ?? "",
    price: doc.price,
    calories: doc.calories,
    category: doc.category,
    dietary: doc.dietary,
    featured: doc.featured,
    image: resolveImageUrl({
      image: doc.image as never,
      imageUrl: doc.imageUrl,
    }),
  };
}

export async function getMenuCategories() {
  if (!isSanityConfigured()) return staticCategories;

  const docs = await sanityFetch<SanityCategory[]>(menuCategoriesQuery);
  if (!docs?.length) return staticCategories;

  const mapped = docs
    .filter((d): d is SanityCategory & { id: string; label: string } =>
      Boolean(d.id && d.label),
    )
    .filter((d) => isMenuCategoryId(d.id))
    .map((d) => ({ id: d.id as MenuCategoryId, label: d.label }));

  return mapped.length ? mapped : staticCategories;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!isSanityConfigured()) return staticItems;

  const docs = await sanityFetch<SanityMenuItem[]>(menuItemsQuery);
  if (!docs?.length) return staticItems;

  const mapped = docs
    .map(mapMenuItem)
    .filter((item): item is MenuItem => item !== null);

  return mapped.length ? mapped : staticItems;
}

export async function getMenuByCategory(category: MenuCategoryId) {
  const items = await getMenuItems();
  return items.filter((item) => item.category === category);
}

export async function getFeaturedMenuItems(limit = 8) {
  const items = await getMenuItems();
  const featured = items.filter((item) => item.featured);
  return (featured.length ? featured : items).slice(0, limit);
}

export async function getMenuItemById(id: string) {
  const items = await getMenuItems();
  return items.find((item) => item.id === id);
}

export {
  formatCalories,
  formatPrice,
  isMenuCategoryId,
  staticFoodCategories as foodCategories,
  staticByCategory,
  staticFeatured,
  staticById,
};

export type { MenuCategoryId, MenuItem };
