export const CONTACT = {
  phone: "+7 (911) 110-16-52",
  phoneDial: "+79111101652",
  phoneWhatsApp: "79111101652",
  email: "springvillage@yandex.ru",
  telegram: "https://t.me/springvillage",
  instagram: "https://instagram.com/springvillage",
  address: "пос. Михалёво, Выборгский район, Ленинградская область",
  addressFull: "Песчаный проезд, 5а, пос. Михалёво, Выборгский район, ЛО",
  addressShort: "пос. Михалёво, 127 км от СПб",
  hours: "Ежедневно 9:00 – 21:00",
  coords: { lat: 60.983791, lng: 29.422227 },
  yandexMapOid: "193725846598",
  // mode=search → collapsed labeled pin (not the expanded business card)
  yandexMapUrl:
    "https://yandex.ru/map-widget/v1/?mode=search&ol=biz&oid=193725846598&ll=29.422227%2C60.983791&z=16&lang=ru_RU",
  // ⚠️ Confirm this is the Yandex Business org ID with reviews enabled
  yandexReviewsWidget: "https://yandex.ru/maps-reviews-widget/193725846598?comments",
  // Clean org URL — opens the Spring Village listing directly (no stray search)
  yandexOrgUrl: "https://yandex.ru/maps/org/house_by_the_lake/193725846598/",
  bnovoUid: "12e2e2c5-b04f-4f43-ab36-3eff3f10dc16",
  bnovoBookingUrl: "https://reservationsteps.ru/rooms/index/12e2e2c5-b04f-4f43-ab36-3eff3f10dc16",
} as const;

export const SITE = {
  name: "Spring Village",
  houseName: "Коттедж WILD",
  tagline: "A-frame у Михалёвского озера",
  description:
    "A-frame коттедж в карельском лесу. 127 км от Петербурга, тишина, озеро, карельская природа.",
  rating: 4.8,
  reviewCount: 15,
  priceFrom: 20000,
  priceFromLabel: "от 20 000 ₽",
  priceFromSub: "за ночь",
  distanceFromSpb: "127 км",
  yandexMetricaId: "90840167",
} as const;
