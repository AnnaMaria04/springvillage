// ⚠️ RESOLVE before launch: confirm which phone number is canonical
// Options: +7 911 110-16-52 or +7 911 233-31-99
export const CONTACT = {
  phone: "+7 (911) XXX-XX-XX",
  phoneDial: "+7911XXXXXXX",
  phoneWhatsApp: "7911XXXXXXX",
  email: "springvillage@yandex.ru",
  telegram: "https://t.me/springvillage",
  instagram: "https://instagram.com/springvillage",
  address: "пос. Михалёво, Выборгский район, Ленинградская область",
  addressFull: "Песчаный проезд, 5а, пос. Михалёво, Выборгский район, ЛО",
  addressShort: "пос. Михалёво, 127 км от СПб",
  hours: "Ежедневно 9:00 – 21:00",
  coords: { lat: 60.983791, lng: 29.422227 },
  yandexMapOid: "193725846598",
  yandexMapUrl:
    "https://yandex.ru/map-widget/v1/?oid=193725846598&lang=ru_RU&scroll=false",
  // ⚠️ Update with actual Bnovo property UID from admin panel
  bnovoUid: "12e2e2c5-b04f-4f43-ab36-3eff3f10dc16",
} as const;

export const SITE = {
  name: "Spring Village",
  houseName: "Коттедж WILD",
  tagline: "A-frame у Михалёвского озера",
  description:
    "A-frame коттедж в карельском лесу. 127 км от Петербурга, тишина, озеро, своя баня.",
  rating: 4.9,
  reviewCount: 47,
  // ⚠️ Set actual starting price once confirmed in Bnovo
  priceFrom: 8000,
  distanceFromSpb: "127 км",
  yandexMetricaId: "90840167",
} as const;
