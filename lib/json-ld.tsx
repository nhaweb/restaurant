import { menuItems as staticMenuItems, type MenuItem } from "@/data/menu";
import { getDirectionsUrl, restaurant } from "@/data/restaurant";
import { getSiteUrl } from "@/lib/site";

export function RestaurantJsonLd() {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.description,
    url: siteUrl,
    telephone: restaurant.phone.tel,
    email: restaurant.email,
    image: `${siteUrl}/assets/imgUnsplashIGfIgp5Onv0.png`,
    servesCuisine: restaurant.cuisine,
    priceRange: restaurant.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.locality,
      addressRegion: restaurant.address.region,
      addressCountry: restaurant.address.country,
    },
    openingHoursSpecification: restaurant.hours.days.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day,
      opens: restaurant.hours.opens,
      closes: restaurant.hours.closes,
    })),
    hasMenu: `${siteUrl}/menu`,
    menu: `${siteUrl}/menu`,
    acceptsReservations: true,
    potentialAction: {
      "@type": "ReserveAction",
      target: `${siteUrl}/reservation`,
    },
    map: getDirectionsUrl(),
    ...(restaurant.social.some((s) => s.href)
      ? { sameAs: restaurant.social.map((s) => s.href).filter(Boolean) }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function MenuJsonLd({ items }: { items?: MenuItem[] } = {}) {
  const siteUrl = getSiteUrl();
  const menuItems = items ?? staticMenuItems;

  const data = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `Thực đơn ${restaurant.name}`,
    url: `${siteUrl}/menu`,
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Thực đơn đầy đủ",
        hasMenuItem: menuItems.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "USD",
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
