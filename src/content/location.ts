export const LOCATION = {
  coords: { lat: 60.983791, lng: 29.422227 },
  yandexMapOid: "193725846598",
  // Coordinate-based widget with a placemark — centers reliably on the cottage
  yandexMapUrl:
    "https://yandex.ru/map-widget/v1/?oid=193725846598&ll=29.422227%2C60.983791&z=15&lang=ru_RU",
  yandexMapLink:
    "https://yandex.com/maps/org/spring_village/193725846598/?from=mapframe&ll=29.422337%2C61.013546&source=mapframe&utm_source=mapframe&z=12",
  distanceFromSpb: "127 км",
  driveTime: "~2 часа",
  address: "пос. Михалёво, Выборгский район, Ленинградская область",
  addressFull: "Песчаный проезд, 5а, пос. Михалёво, Выборгский район, ЛО",
  note: "Последние 2 км — грунтовая дорога. Проедет обычный легковой автомобиль.",
  byCar: [
    { step: 1, text: "Из Петербурга по трассе А-181 «Скандинавия» в сторону Выборга" },
    { step: 2, text: "Через ~100 км — съезд на Михалёво / Рощино" },
    { step: 3, text: "Через посёлок Михалёво, затем 2 км грунтовой дороги вдоль берега" },
    { step: 4, text: "Координаты для навигатора: 60.983791, 29.422227" },
  ],
  byTrain: {
    description:
      "С Финляндского вокзала до Выборга (~2 ч), далее такси ~30 мин. Трансфер можно организовать заранее.",
  },
} as const;
