import { menuImages } from "@/lib/menu-images";
import { assets } from "@/lib/assets";

/** Page banners and section art mapped to local Figma-sourced photos. */
export const pageImages = {
  menuHero: menuImages.freshRadishes,
  shopHero: menuImages.freshRadishes,
  aboutHero: menuImages.freshRadishes,
  galleryHero: menuImages.freshRadishes,
  blogHero: menuImages.freshRadishes,
  contactHero: menuImages.freshRadishes,
  statsBg: assets.teamBg,
  sectionStarter: menuImages.starterSalad,
  sectionMain: menuImages.cheeseburger,
  sectionDessert: menuImages.hazelnutCupcake,
  sectionDrinks: menuImages.cocktails,
  shopBanner: menuImages.friedChickenCorn,
} as const;
