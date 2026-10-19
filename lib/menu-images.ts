/**
 * Local food photography for menu items.
 * Sourced from the Elite Foodtuck Figma template (Menu + Shop frames)
 * and existing `public/assets` exports already in the project.
 */
export const menuImages = {
  salmonSeared: "/images/menu/salmon-seared.png",
  salmonPlate: "/images/menu/salmon-plate.jpg",
  starterSalad: "/images/menu/starter-salad.png",
  shrimpAvocadoSalad: "/images/menu/shrimp-avocado-salad.png",
  gardenSalad: "/images/menu/garden-salad.png",
  breakfastBurger: "/images/menu/breakfast-burger.jpg",
  cheeseburger: "/images/menu/cheeseburger.png",
  cheeseBoard: "/images/menu/cheese-board.png",
  marinatedCheese: "/images/menu/marinated-cheese.png",
  edamame: "/images/menu/edamame.png",
  rusticPizza: "/images/menu/rustic-pizza.jpg",
  friedChickenCorn: "/images/menu/fried-chicken-corn.png",
  hazelnutCupcake: "/images/menu/hazelnut-cupcake.jpg",
  hazelnutCupcakeAlt: "/images/menu/hazelnut-cupcake-alt.png",
  cocktails: "/images/menu/cocktails.png",
  cocktailsAlt: "/images/menu/cocktails-alt.jpg",
  freshRadishes: "/images/menu/fresh-radishes.jpg",
  /** Existing homepage assets (already downloaded from Figma) */
  pastaBowl: "/assets/imgUnsplashOT7VI0HHg.png",
  saladBowl: "/assets/imgUnsplashIGfIgp5Onv0.png",
  redVelvetCupcake: "/assets/imgUnsplashMjPr6NOdppw.png",
  chocolateCake: "/assets/imgUnsplashWbMi3TlZdZc.png",
  juiceSalad: "/assets/imgUnsplashZuIdlSz3XLg.png",
  freshSaladPlate: "/assets/imgUnsplashZuIdlSz3XLg1.png",
  chefPrep: "/assets/imgUnsplashUB7Q7AipU2O.png",
  kitchenPrep: "/assets/imgUnsplashClMpC9UhyTo.png",
  tacos: "/assets/imgUnsplashLP5Mcm6NZ5A.png",
  galleryFruit: "/assets/imgUnsplash74YRjQCvNi.png",
  galleryBowl: "/assets/imgUnsplashPxJ9ZkM2WdA.png",
  galleryPlate: "/assets/imgUnsplashJeiqzOgwwKu.png",
  galleryGreens: "/assets/imgUnsplashW10NCsLVyc.png",
  footerFood: "/assets/imgUnsplashYCuVsIknzhY.png",
} as const;

export type MenuImagePath = (typeof menuImages)[keyof typeof menuImages];
