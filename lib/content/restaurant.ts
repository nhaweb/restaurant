import {
  restaurant as staticRestaurant,
  getDirectionsUrl as staticDirections,
  getTelHref as staticTel,
  getMailtoHref as staticMailto,
  getZaloHref as staticZalo,
} from "@/data/restaurant";
import { assets } from "@/lib/assets";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import { restaurantSettingsQuery } from "@/lib/sanity/queries";

export type RestaurantInfo = {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  shortDescription: string;
  cuisine: string[];
  priceRange: string;
  address: {
    street: string;
    locality: string;
    region: string;
    country: string;
    display: string;
  };
  phone: { display: string; tel: string };
  zalo: { display: string; href: string };
  email: string;
  hours: {
    display: string;
    opens: string;
    closes: string;
    days: readonly string[];
  };
  social: ReadonlyArray<{ label: string; href: string; icon?: string }>;
  mapsQuery: string;
  copyright: string;
};

type SanityRestaurant = {
  name?: string;
  legalName?: string;
  tagline?: string;
  description?: string;
  shortDescription?: string;
  cuisine?: string[];
  priceRange?: string;
  address?: RestaurantInfo["address"];
  phone?: RestaurantInfo["phone"];
  zalo?: RestaurantInfo["zalo"];
  email?: string;
  hours?: {
    display?: string;
    opens?: string;
    closes?: string;
    days?: string[];
  };
  social?: Array<{ label?: string; href?: string }>;
  mapsQuery?: string;
  copyright?: string;
};

function mergeWithStatic(doc: SanityRestaurant | null): RestaurantInfo {
  const base = staticRestaurant;
  if (!doc) {
    return {
      ...base,
      cuisine: [...base.cuisine],
      hours: { ...base.hours, days: [...base.hours.days] },
      social: base.social.map((s) => ({ ...s })),
    };
  }

  return {
    name: doc.name ?? base.name,
    legalName: doc.legalName ?? base.legalName,
    tagline: doc.tagline ?? base.tagline,
    description: doc.description ?? base.description,
    shortDescription: doc.shortDescription ?? base.shortDescription,
    cuisine: doc.cuisine?.length ? doc.cuisine : [...base.cuisine],
    priceRange: doc.priceRange ?? base.priceRange,
    address: {
      street: doc.address?.street ?? base.address.street,
      locality: doc.address?.locality ?? base.address.locality,
      region: doc.address?.region ?? base.address.region,
      country: doc.address?.country ?? base.address.country,
      display: doc.address?.display ?? base.address.display,
    },
    phone: {
      display: doc.phone?.display ?? base.phone.display,
      tel: doc.phone?.tel ?? base.phone.tel,
    },
    zalo: {
      display: doc.zalo?.display ?? base.zalo.display,
      href: doc.zalo?.href ?? base.zalo.href,
    },
    email: doc.email ?? base.email,
    hours: {
      display: doc.hours?.display ?? base.hours.display,
      opens: doc.hours?.opens ?? base.hours.opens,
      closes: doc.hours?.closes ?? base.hours.closes,
      days: doc.hours?.days?.length
        ? doc.hours.days
        : [...base.hours.days],
    },
    social: (doc.social?.length
      ? doc.social.map((item, index) => ({
          label: item.label ?? base.social[index]?.label ?? "Social",
          href: item.href ?? "",
          icon: assets.social[index] ?? assets.social[0],
        }))
      : base.social.map((s) => ({ ...s }))),
    mapsQuery: doc.mapsQuery ?? base.mapsQuery,
    copyright: doc.copyright ?? base.copyright,
  };
}

export async function getRestaurant(): Promise<RestaurantInfo> {
  if (!isSanityConfigured()) {
    return mergeWithStatic(null);
  }

  const doc = await sanityFetch<SanityRestaurant>(restaurantSettingsQuery);
  return mergeWithStatic(doc);
}

export function getDirectionsUrl(info?: RestaurantInfo) {
  const query = info?.mapsQuery ?? staticRestaurant.mapsQuery;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getTelHref(info?: RestaurantInfo) {
  return `tel:${info?.phone.tel ?? staticRestaurant.phone.tel}`;
}

export function getMailtoHref(info?: RestaurantInfo) {
  return `mailto:${info?.email ?? staticRestaurant.email}`;
}

export function getZaloHref(info?: RestaurantInfo) {
  return info?.zalo.href ?? staticZalo();
}

/** Sync helpers for modules that cannot be async yet. */
export {
  staticRestaurant as restaurantFallback,
  staticDirections,
  staticTel,
  staticMailto,
  staticZalo,
};
