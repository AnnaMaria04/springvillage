import { SITE, HOUSE, CONTACT } from "./data";

export function lodgingBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: `${SITE.name} — ${HOUSE.name}`,
    description: SITE.description,
    url: "https://springvillage.vercel.app",
    telephone: CONTACT.phone,
    email: CONTACT.email,
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
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: HOUSE.capacity,
    },
    priceRange: `от ${SITE.priceFrom.toLocaleString("ru-RU")} ₽/ночь`,
  };
}
