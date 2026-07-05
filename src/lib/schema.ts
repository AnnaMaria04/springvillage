import { SITE, CONTACT } from "@/content/site";
import { HOUSE } from "@/content/house";

export function lodgingBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "VacationRental"],
    name: "Spring Village — Коттедж WILD",
    description:
      "Уединённый A-frame коттедж 60 м² на берегу Михалёвского озера. Пирс, лодки, SUP. До 5 гостей. 127 км от Петербурга.",
    url: "https://www.springvillage.ru",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    image: "https://www.springvillage.ru/images/exterior-winter-snow.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Песчаный проезд, 5а",
      addressLocality: "пос. Михалёво",
      addressRegion: "Ленинградская область",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.coords.lat,
      longitude: CONTACT.coords.lng,
    },
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
  };
}
