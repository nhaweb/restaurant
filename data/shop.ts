import { menuImages } from "@/lib/menu-images";

export type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  onSale?: boolean;
  featured?: boolean;
};

export const shopCategories = [
  "Bánh mì & sandwich",
  "Burger",
  "Gà chiên",
  "Đồ uống",
  "Pizza",
  "Thịt",
  "Món mặn",
  "Chưa phân loại",
] as const;

export const shopTags = [
  "Dịch vụ",
  "Thực đơn",
  "Pizza",
  "Bánh ngọt",
  "Burger",
  "Bánh quy",
  "Cửa hàng",
  "Gà Tandoori",
] as const;

export const shopProducts: ShopProduct[] = [
  {
    id: "fresh-lime",
    slug: "fresh-lime",
    name: "Nước chanh tươi",
    description:
      "Đồ uống chanh tươi sáng mát với bạc hà và chút mật ong — hoàn hảo bên cạnh món nướng.",
    price: 38,
    compareAtPrice: 45,
    image: menuImages.juiceSalad,
    gallery: [menuImages.juiceSalad, menuImages.cocktails, menuImages.gardenSalad, menuImages.freshRadishes],
    category: "Đồ uống",
    tags: ["Cửa hàng", "Dịch vụ"],
    inStock: true,
    rating: 5,
    reviewCount: 22,
    onSale: true,
    featured: true,
  },
  {
    id: "chocolate-muffin",
    slug: "chocolate-muffin",
    name: "Bánh muffin socola",
    description: "Bánh muffin cacao mềm, nhân socola tan chảy và lớp phủ bột mịn.",
    price: 28,
    image: menuImages.hazelnutCupcake,
    gallery: [menuImages.hazelnutCupcake, menuImages.hazelnutCupcakeAlt, menuImages.chocolateCake, menuImages.redVelvetCupcake],
    category: "Bánh ngọt",
    tags: ["Bánh ngọt", "Cửa hàng"],
    inStock: true,
    rating: 4.8,
    reviewCount: 18,
    onSale: true,
  },
  {
    id: "burger",
    slug: "burger",
    name: "Burger",
    description: "Burger bò xếp lớp với phô mai cheddar, dưa chua và sốt house trên bánh nướng.",
    price: 21,
    compareAtPrice: 45,
    image: menuImages.cheeseburger,
    gallery: [menuImages.cheeseburger, menuImages.breakfastBurger, menuImages.friedChickenCorn, menuImages.starterSalad],
    category: "Burger",
    tags: ["Burger", "Cửa hàng"],
    inStock: true,
    rating: 4.9,
    reviewCount: 34,
    onSale: true,
  },
  {
    id: "country-burger",
    slug: "country-burger",
    name: "Burger kiểu đồng quê",
    description: "Burger đậm đà với mứt hành hun khói và rau xà lách giòn.",
    price: 45,
    image: menuImages.breakfastBurger,
    gallery: [menuImages.breakfastBurger, menuImages.cheeseburger, menuImages.friedChickenCorn, menuImages.rusticPizza],
    category: "Burger",
    tags: ["Burger"],
    inStock: true,
    rating: 4.7,
    reviewCount: 16,
  },
  {
    id: "drink",
    slug: "drink",
    name: "Đồ uống đặc biệt",
    description: "Thức uống signature — mát lạnh, thơm nhẹ, pha mới theo yêu cầu.",
    price: 23,
    compareAtPrice: 45,
    image: menuImages.cocktails,
    gallery: [menuImages.cocktails, menuImages.cocktailsAlt, menuImages.juiceSalad, menuImages.freshRadishes],
    category: "Đồ uống",
    tags: ["Dịch vụ"],
    inStock: true,
    rating: 4.6,
    reviewCount: 12,
  },
  {
    id: "pizza",
    slug: "pizza",
    name: "Pizza",
    description: "Pizza nướng lò với cà chua, mozzarella và topping theo mùa.",
    price: 43,
    image: menuImages.rusticPizza,
    gallery: [menuImages.rusticPizza, menuImages.pastaBowl, menuImages.cheeseBoard, menuImages.starterSalad],
    category: "Pizza",
    tags: ["Pizza", "Thực đơn"],
    inStock: true,
    rating: 5,
    reviewCount: 41,
  },
  {
    id: "cheese-butter",
    slug: "cheese-butter",
    name: "Phô mai & bơ",
    description: "Đĩa phô mai ấm kèm bơ đánh, thảo mộc và bánh mì nướng.",
    price: 10,
    image: menuImages.cheeseBoard,
    gallery: [menuImages.cheeseBoard, menuImages.marinatedCheese, menuImages.edamame, menuImages.galleryBowl],
    category: "Bánh mì & sandwich",
    tags: ["Thực đơn"],
    inStock: true,
    rating: 4.5,
    reviewCount: 9,
  },
  {
    id: "sandwiches",
    slug: "sandwiches",
    name: "Sandwich",
    description: "Sandwich ép nóng với rau theo mùa, phô mai mềm và aioli house.",
    price: 25,
    image: menuImages.tacos,
    gallery: [menuImages.tacos, menuImages.shrimpAvocadoSalad, menuImages.gardenSalad, menuImages.cheeseBoard],
    category: "Bánh mì & sandwich",
    tags: ["Thực đơn", "Dịch vụ"],
    inStock: true,
    rating: 4.8,
    reviewCount: 21,
  },
  {
    id: "chicken-chup",
    slug: "yummy-chicken-chup",
    name: "Gà chiên giòn",
    description:
      "Gà chiên giòn ướp gia vị, kèm sốt chấm và rau vườn. Món ăn vặt đậm vị, giòn rụm.",
    price: 54,
    image: menuImages.friedChickenCorn,
    gallery: [
      menuImages.friedChickenCorn,
      menuImages.cheeseburger,
      menuImages.breakfastBurger,
      menuImages.starterSalad,
    ],
    category: "Gà chiên",
    tags: ["Cửa hàng", "Gà Tandoori"],
    inStock: true,
    rating: 5,
    reviewCount: 22,
    featured: true,
  },
  {
    id: "cookies",
    slug: "cookies",
    name: "Bánh quy",
    description: "Bánh quy nướng mới với miếng socola và muối biển.",
    price: 12,
    image: menuImages.hazelnutCupcakeAlt,
    gallery: [menuImages.hazelnutCupcakeAlt, menuImages.hazelnutCupcake, menuImages.chocolateCake, menuImages.galleryFruit],
    category: "Bánh ngọt",
    tags: ["Bánh quy", "Bánh ngọt"],
    inStock: true,
    rating: 4.4,
    reviewCount: 8,
  },
  {
    id: "cream-cheese",
    slug: "cream-cheese",
    name: "Phô mai kem",
    description: "Phô mai kem đánh với thảo mộc, kèm bánh quy giòn.",
    price: 14,
    image: menuImages.marinatedCheese,
    gallery: [menuImages.marinatedCheese, menuImages.cheeseBoard, menuImages.edamame, menuImages.galleryBowl],
    category: "Bánh mì & sandwich",
    tags: ["Cửa hàng"],
    inStock: true,
    rating: 4.3,
    reviewCount: 7,
  },
  {
    id: "mushroom-pizza",
    slug: "mushroom-pizza",
    name: "Pizza nấm",
    description: "Pizza nấm rừng với dầu tỏi và thyme tươi.",
    price: 36,
    compareAtPrice: 42,
    image: menuImages.pastaBowl,
    gallery: [menuImages.pastaBowl, menuImages.rusticPizza, menuImages.galleryPlate, menuImages.starterSalad],
    category: "Pizza",
    tags: ["Pizza"],
    inStock: true,
    rating: 4.9,
    reviewCount: 19,
    onSale: true,
  },
  {
    id: "spicy-wings",
    slug: "spicy-wings",
    name: "Cánh gà cay",
    description: "Cánh gà giòn trộn sốt ớt kèm sốt sữa chua mát.",
    price: 29,
    image: menuImages.friedChickenCorn,
    gallery: [menuImages.friedChickenCorn, menuImages.starterSalad, menuImages.gardenSalad, menuImages.cheeseburger],
    category: "Gà chiên",
    tags: ["Gà Tandoori"],
    inStock: true,
    rating: 4.7,
    reviewCount: 25,
  },
  {
    id: "garden-salad",
    slug: "garden-salad",
    name: "Salad vườn",
    description: "Rau theo mùa, hạt và sốt chanh dầu giấm.",
    price: 18,
    image: menuImages.gardenSalad,
    gallery: [menuImages.gardenSalad, menuImages.starterSalad, menuImages.shrimpAvocadoSalad, menuImages.freshSaladPlate],
    category: "Món mặn",
    tags: ["Thực đơn"],
    inStock: true,
    rating: 4.6,
    reviewCount: 14,
  },
  {
    id: "salmon-plate",
    slug: "salmon-plate",
    name: "Đĩa cá hồi",
    description: "Cá hồi áp chảo với bơ thảo mộc và củ nướng.",
    price: 48,
    image: menuImages.salmonSeared,
    gallery: [menuImages.salmonSeared, menuImages.salmonPlate, menuImages.shrimpAvocadoSalad, menuImages.gardenSalad],
    category: "Món mặn",
    tags: ["Cửa hàng"],
    inStock: true,
    rating: 5,
    reviewCount: 27,
  },
];

export function formatShopPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function getShopProductBySlug(slug: string) {
  return shopProducts.find((p) => p.slug === slug);
}

export function getSimilarProducts(slug: string, limit = 4) {
  const current = getShopProductBySlug(slug);
  const pool = shopProducts.filter((p) => p.slug !== slug);
  if (!current) return pool.slice(0, limit);
  const same = pool.filter((p) => p.category === current.category);
  return [...same, ...pool.filter((p) => p.category !== current.category)].slice(0, limit);
}

export function getLatestProducts(limit = 4) {
  return shopProducts.slice(0, limit);
}

export function getFeaturedShopProducts(limit = 4) {
  const featured = shopProducts.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return [...featured, ...shopProducts.filter((p) => !p.featured)].slice(0, limit);
}

export function getShopCategories() {
  return Array.from(new Set(shopProducts.map((p) => p.category)));
}
