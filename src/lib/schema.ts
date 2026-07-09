import { SITE, CONTACT } from "@/content/site";
import { HOUSE } from "@/content/house";

const BASE = "https://www.springvillage.ru";

export function lodgingBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "VacationRental"],
    name: "Spring Village — Коттедж WILD",
    description:
      "Уединённый A-frame коттедж 60 м² на берегу Михалёвского озера. Пирс, лодки, SUP. До 5 гостей. 127 км от Петербурга.",
    url: BASE,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    image: [
      `${BASE}/images/exterior-winter-snow.jpg`,
      `${BASE}/images/exterior-night-deck.jpeg`,
      `${BASE}/images/dock-boat-dusk.jpeg`,
      `${BASE}/images/interior-aframe-window.jpeg`,
      `${BASE}/images/lake-panorama-autumn.jpeg`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Песчаный проезд, 5а",
      addressLocality: "пос. Михалёво",
      addressRegion: "Ленинградская область",
      postalCode: "188994",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.coords.lat,
      longitude: CONTACT.coords.lng,
    },
    hasMap: `https://yandex.ru/maps/org/house_by_the_lake/${CONTACT.yandexMapOid}/`,
    sameAs: [
      `https://yandex.ru/maps/org/house_by_the_lake/${CONTACT.yandexMapOid}/`,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating,
      reviewCount: SITE.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    amenityFeature: HOUSE.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    numberOfRooms: HOUSE.bedrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: HOUSE.area,
      unitCode: "MTK",
    },
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: HOUSE.capacity,
    },
    priceRange: `от ${SITE.priceFrom.toLocaleString("ru-RU")} ₽ за ночь`,
    checkinTime: HOUSE.rules.checkIn,
    checkoutTime: HOUSE.rules.checkOut,
    petsAllowed: true,
    currenciesAccepted: "RUB",
    paymentAccepted: "Кредитная карта, банковский перевод",
    availableLanguage: { "@type": "Language", name: "Russian", alternateName: "ru" },
    tourBookingPage: CONTACT.bnovoBookingUrl,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "09:00",
      closes: "21:00",
    },
    yearBuilt: HOUSE.rules.builtYear,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.url}`,
    })),
  };
}
