import { menuImages } from "@/lib/menu-images";

export type MenuCategoryId =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "dessert"
  | "drink"
  | "snack";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  calories?: number;
  category: MenuCategoryId;
  dietary?: Array<"vegetarian" | "vegan" | "gluten-free" | "spicy">;
  featured?: boolean;
  image: string;
};

export const menuCategories: {
  id: MenuCategoryId;
  label: string;
}[] = [
  { id: "breakfast", label: "Bữa sáng" },
  { id: "lunch", label: "Bữa trưa" },
  { id: "dinner", label: "Bữa tối" },
  { id: "dessert", label: "Tráng miệng" },
  { id: "drink", label: "Đồ uống" },
  { id: "snack", label: "Ăn nhẹ" },
];

/** Food category carousel — images matched to dish type. */
export const foodCategories = [
  {
    id: "grand-italiano",
    name: "Grand Italiano",
    itemCount: 26,
    image: menuImages.pastaBowl,
    href: "/menu?category=lunch",
  },
  {
    id: "pene-salmone",
    name: "Pene Salmone",
    itemCount: 23,
    image: menuImages.salmonSeared,
    href: "/menu?category=dinner",
  },
  {
    id: "molto-tagliatelle",
    name: "Molto Tagliatelle",
    itemCount: 20,
    image: menuImages.pastaBowl,
    href: "/menu?category=lunch",
  },
  {
    id: "pepperoni-tagli",
    name: "Pepperoni Tagli",
    itemCount: 26,
    image: menuImages.rusticPizza,
    href: "/menu?category=dinner",
  },
] as const;

/**
 * Thực đơn PML Food. Giữ id/slug ổn định; tên và mô tả hiển thị bằng tiếng Việt.
 */
export const menuItems: MenuItem[] = [
  {
    id: "alder-grilled-chinook-salmon",
    name: "Cá hồi Chinook nướng gỗ Alder",
    description: "Bánh mì Pháp nướng phủ romano, cheddar",
    price: 32,
    calories: 560,
    category: "breakfast",
    featured: true,
    image: menuImages.salmonSeared,
  },
  {
    id: "garden-herb-omelette",
    name: "Trứng ốp la thảo mộc vườn",
    description: "Trứng tươi, thảo mộc theo mùa, cà chua nướng, phô mai mềm",
    price: 18,
    calories: 420,
    category: "breakfast",
    dietary: ["vegetarian"],
    image: menuImages.kitchenPrep,
  },
  {
    id: "avocado-toast-bowl",
    name: "Tô bánh mì bơ",
    description: "Bánh mì chua, bơ nghiền, ớt flakes, sốt cam quýt",
    price: 16,
    calories: 380,
    category: "breakfast",
    dietary: ["vegetarian", "vegan"],
    image: menuImages.saladBowl,
  },
  {
    id: "berry-yogurt-parfait",
    name: "Parfait sữa chua trái cây",
    description: "Sữa chua Hy Lạp, mật ong, granola rang, quả mọng tươi",
    price: 12,
    calories: 310,
    category: "breakfast",
    dietary: ["vegetarian"],
    image: menuImages.galleryFruit,
  },
  {
    id: "smoked-turkey-wrap",
    name: "Bánh cuốn gà tây xông khói",
    description: "Bánh mì nguyên cám, rau xanh, mù tạt cranberry, rau giòn",
    price: 22,
    calories: 480,
    category: "breakfast",
    image: menuImages.tacos,
  },
  {
    id: "classic-shakshuka",
    name: "Shakshuka cổ điển",
    description: "Trứng poached trong sốt cà chua cay với bánh flatbread ấm",
    price: 19,
    calories: 450,
    category: "breakfast",
    dietary: ["vegetarian", "spicy"],
    image: menuImages.breakfastBurger,
  },
  {
    id: "citrus-pancakes",
    name: "Bánh pancake ricotta cam",
    description: "Bánh mềm, vỏ cam, bơ maple",
    price: 15,
    calories: 520,
    category: "breakfast",
    dietary: ["vegetarian"],
    image: menuImages.chocolateCake,
  },
  {
    id: "morning-greens-salad",
    name: "Salad rau xanh buổi sáng",
    description: "Rau baby, dưa leo, hạt, sốt chanh",
    price: 14,
    calories: 240,
    category: "breakfast",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: menuImages.gardenSalad,
  },

  {
    id: "grand-italiano-bowl",
    name: "Tô Grand Italiano",
    description: "Pasta, dầu olive, tỏi, parmesan, húng quế tươi",
    price: 26,
    calories: 610,
    category: "lunch",
    dietary: ["vegetarian"],
    featured: true,
    image: menuImages.pastaBowl,
  },
  {
    id: "pene-salmone",
    name: "Pene Salmone",
    description: "Pasta penne, cá hồi xông khói, kem nhẹ, thì là",
    price: 28,
    calories: 590,
    category: "lunch",
    image: menuImages.salmonPlate,
  },
  {
    id: "molto-tagliatelle",
    name: "Molto Tagliatelle",
    description: "Tagliatelle cắt tay với ragu cà chua ninh chậm",
    price: 24,
    calories: 640,
    category: "lunch",
    image: menuImages.galleryPlate,
  },
  {
    id: "pepperoni-tagli",
    name: "Pepperoni Tagli",
    description: "Pepperoni cay, sốt cà, mozzarella, thảo mộc",
    price: 25,
    calories: 680,
    category: "lunch",
    dietary: ["spicy"],
    image: menuImages.rusticPizza,
  },
  {
    id: "grilled-chicken-plate",
    name: "Đĩa gà nướng",
    description: "Gà ướp thảo mộc, rau củ nướng, quinoa",
    price: 27,
    calories: 520,
    category: "lunch",
    dietary: ["gluten-free"],
    image: menuImages.friedChickenCorn,
  },
  {
    id: "mediterranean-salad",
    name: "Salad Địa Trung Hải",
    description: "Dưa leo, olive, feta, cà chua, sốt oregano",
    price: 18,
    calories: 360,
    category: "lunch",
    dietary: ["vegetarian", "gluten-free"],
    image: menuImages.gardenSalad,
  },
  {
    id: "roast-veggie-panini",
    name: "Panini rau củ nướng",
    description: "Ớt nướng, zucchini, pesto, mozzarella",
    price: 17,
    calories: 470,
    category: "lunch",
    dietary: ["vegetarian"],
    image: menuImages.cheeseburger,
  },
  {
    id: "lemon-herb-fish",
    name: "Cá sốt chanh thảo mộc",
    description: "Cá trắng áp chảo, bơ cam quýt, rau theo mùa",
    price: 29,
    calories: 430,
    category: "lunch",
    dietary: ["gluten-free"],
    image: menuImages.shrimpAvocadoSalad,
  },

  {
    id: "chinook-salmon-dinner",
    name: "Cá hồi Chinook nướng gỗ Alder",
    description: "Cá hồi nướng, củ nướng, bơ thảo mộc",
    price: 36,
    calories: 560,
    category: "dinner",
    featured: true,
    image: menuImages.salmonSeared,
  },
  {
    id: "slow-braised-short-rib",
    name: "Sườn bò hầm chậm",
    description: "Sườn bò, sốt rượu vang đỏ, khoai nghiền",
    price: 38,
    calories: 720,
    category: "dinner",
    image: menuImages.cheeseburger,
  },
  {
    id: "herb-roast-chicken",
    name: "Gà quay thảo mộc",
    description: "Nửa con gà, nước sốt tỏi, rau củ theo mùa",
    price: 30,
    calories: 580,
    category: "dinner",
    image: menuImages.friedChickenCorn,
  },
  {
    id: "mushroom-risotto",
    name: "Risotto nấm rừng",
    description: "Gạo Arborio, nấm hỗn hợp, parmesan, thyme",
    price: 26,
    calories: 540,
    category: "dinner",
    dietary: ["vegetarian"],
    image: menuImages.pastaBowl,
  },
  {
    id: "spicy-prawn-linguine",
    name: "Linguine tôm cay",
    description: "Tôm, ớt, tỏi, cà chua, ngò tây tươi",
    price: 32,
    calories: 610,
    category: "dinner",
    dietary: ["spicy"],
    image: menuImages.starterSalad,
  },
  {
    id: "grilled-vegetable-platter",
    name: "Đĩa rau củ nướng",
    description: "Rau theo mùa nướng than, tahini, hạt rang",
    price: 22,
    calories: 340,
    category: "dinner",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: menuImages.freshSaladPlate,
  },
  {
    id: "lamb-kofta-plate",
    name: "Đĩa kofta cừu",
    description: "Thịt cừu gia vị, sốt sữa chua, bánh flatbread, salad",
    price: 31,
    calories: 650,
    category: "dinner",
    dietary: ["spicy"],
    image: menuImages.tacos,
  },
  {
    id: "sea-bass-fillet",
    name: "Cá vược biển áp chảo",
    description: "Da cá giòn, salad thì là, nhũ tương cam quýt",
    price: 34,
    calories: 480,
    category: "dinner",
    dietary: ["gluten-free"],
    image: menuImages.salmonPlate,
  },

  {
    id: "chocolate-truffle-cake",
    name: "Bánh truffle socola",
    description: "Lớp socola đậm với điểm nhấn mật ong",
    price: 12,
    calories: 450,
    category: "dessert",
    featured: true,
    dietary: ["vegetarian"],
    image: menuImages.chocolateCake,
  },
  {
    id: "vanilla-panna-cotta",
    name: "Panna cotta vani",
    description: "Kem mịn, mứt quả mọng, bạc hà",
    price: 10,
    calories: 320,
    category: "dessert",
    dietary: ["vegetarian", "gluten-free"],
    image: menuImages.hazelnutCupcake,
  },
  {
    id: "lemon-tart",
    name: "Bánh tart chanh",
    description: "Đế bơ, kem chanh, đường bột",
    price: 11,
    calories: 380,
    category: "dessert",
    dietary: ["vegetarian"],
    image: menuImages.hazelnutCupcakeAlt,
  },
  {
    id: "seasonal-fruit-bowl",
    name: "Tô trái cây theo mùa",
    description: "Trái cây cắt sẵn với siro cam quýt",
    price: 9,
    calories: 180,
    category: "dessert",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: menuImages.galleryFruit,
  },

  {
    id: "fresh-orange-juice",
    name: "Nước cam tươi",
    description: "Cam ép lạnh, dùng mát",
    price: 6,
    calories: 110,
    category: "drink",
    dietary: ["vegan", "gluten-free"],
    image: menuImages.juiceSalad,
  },
  {
    id: "green-detox-smoothie",
    name: "Sinh tố detox xanh",
    description: "Rau bina, táo, gừng, chanh",
    price: 8,
    calories: 160,
    category: "drink",
    dietary: ["vegan", "gluten-free"],
    image: menuImages.galleryGreens,
  },
  {
    id: "house-lemonade",
    name: "Nước chanh nhà làm",
    description: "Chanh tươi, ngọt nhẹ, bạc hà",
    price: 5,
    calories: 90,
    category: "drink",
    dietary: ["vegan", "gluten-free"],
    image: menuImages.cocktails,
  },
  {
    id: "espresso",
    name: "Espresso",
    description: "Một hoặc hai shot, blend nhà",
    price: 4,
    calories: 5,
    category: "drink",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: menuImages.cocktailsAlt,
  },
  {
    id: "herbal-tea",
    name: "Trà thảo mộc",
    description: "Hỏi nhân viên về vị pha hôm nay",
    price: 4,
    calories: 0,
    category: "drink",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: menuImages.freshRadishes,
  },

  {
    id: "spiced-nuts",
    name: "Hạt rang gia vị",
    description: "Hạt rang ấm với ớt và thảo mộc",
    price: 7,
    calories: 280,
    category: "snack",
    dietary: ["vegetarian", "vegan", "gluten-free", "spicy"],
    image: menuImages.marinatedCheese,
  },
  {
    id: "hummus-plate",
    name: "Đĩa hummus",
    description: "Hummus mịn, dầu olive, bánh pita ấm",
    price: 10,
    calories: 360,
    category: "snack",
    dietary: ["vegetarian", "vegan"],
    image: menuImages.edamame,
  },
  {
    id: "cheese-olive-board",
    name: "Khay phô mai & olive",
    description: "Phô mai tuyển chọn, olive, bánh cracker",
    price: 14,
    calories: 420,
    category: "snack",
    dietary: ["vegetarian"],
    image: menuImages.cheeseBoard,
  },
  {
    id: "crispy-potato-bites",
    name: "Khoai tây giòn",
    description: "Khoai thảo mộc với sốt sữa chua tỏi",
    price: 9,
    calories: 340,
    category: "snack",
    dietary: ["vegetarian"],
    image: menuImages.galleryBowl,
  },
];

export function formatPrice(price: number) {
  return `${price}$`;
}

export function formatCalories(calories?: number) {
  if (calories == null) return undefined;
  return `${calories} calo`;
}

export function getMenuByCategory(category: MenuCategoryId) {
  return menuItems.filter((item) => item.category === category);
}

export function getFeaturedMenuItems(limit = 8) {
  const featured = menuItems.filter((item) => item.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return [...featured, ...menuItems.filter((i) => !i.featured)].slice(0, limit);
}

export function getMenuItemById(id: string) {
  return menuItems.find((item) => item.id === id);
}

export function isMenuCategoryId(value: string): value is MenuCategoryId {
  return menuCategories.some((c) => c.id === value);
}
