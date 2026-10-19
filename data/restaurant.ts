import { assets } from "@/lib/assets";

/**
 * Restaurant business details for PML Food (Ho Chi Minh City).
 * Update this file when verified business information changes.
 */
export const restaurant = {
  name: "PML Food",
  legalName: "PML Food",
  tagline: "Ẩm thực tươi ngon & lành mạnh",
  description:
    "PML Food phục vụ món ăn tươi ngon, cân bằng dinh dưỡng với nguyên liệu chọn lọc, chế biến tận tâm và không gian đón tiếp ấm áp.",
  shortDescription:
    "Thưởng thức cuộc sống lành mạnh và món ăn ngon — nguyên liệu tươi, chế biến kỹ lưỡng, chất lượng đáng tin cậy.",
  cuisine: ["Healthy", "Contemporary", "International"],
  priceRange: "$$",
  address: {
    street: "208 Trường Chinh",
    locality: "Phường Tân Bình",
    region: "TP. Hồ Chí Minh",
    country: "Việt Nam",
    /** Display string for UI */
    display: "208 Trường Chinh, Phường Tân Bình, TP.Hồ Chí Minh",
  },
  phone: {
    display: "0908 985 844",
    /** E.164-style tel href */
    tel: "+84908985844",
  },
  zalo: {
    display: "0908 985 844",
    href: "https://zalo.me/0908985844",
  },
  email: "pmluanvn@gmail.com",
  hours: {
    display: "Thứ 2 - Chủ nhật / 10:00 - 20:00",
    /** Structured hours for Schema.org */
    opens: "10:00",
    closes: "20:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ] as const,
  },
  /**
   * Social profiles — leave `href` empty until verified account URLs are available.
   * Icons still render in the footer; only configured profiles become links.
   */
  social: [
    { label: "Facebook", href: "", icon: assets.social[0] },
    { label: "Twitter", href: "", icon: assets.social[1] },
    { label: "Instagram", href: "", icon: assets.social[2] },
    { label: "YouTube", href: "", icon: assets.social[3] },
    { label: "Pinterest", href: "", icon: assets.social[4] },
  ],
  mapsQuery: "208 Trường Chinh, Phường Tân Bình, TP. Hồ Chí Minh",
  copyright: "Bản quyền © 2020-2026 PML Food. Đã đăng ký bản quyền.",
} as const;

export function getDirectionsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapsQuery)}`;
}

export function getTelHref() {
  return `tel:${restaurant.phone.tel}`;
}

export function getMailtoHref() {
  return `mailto:${restaurant.email}`;
}

export function getZaloHref() {
  return restaurant.zalo.href;
}
