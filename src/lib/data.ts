// Single source of truth for all site data

export const CONTACT = {
  phone: "+7 (495) 123-45-67",
  phoneDial: "+74951234567",
  phoneWhatsApp: "74951234567",
  email: "info@springvillage.ru",
  telegram: "https://t.me/springvillage",
  instagram: "https://instagram.com/springvillage",
  address: "Московская область, Ярославское шоссе, 50 км от МКАД",
  addressShort: "50 км от Москвы, Ярославское ш.",
  hours: "Ежедневно 9:00 – 21:00",
  yandexMapOid: "193725846598",
  bnovoUid: "12e2e2c5-b04f-4f43-ab36-3eff3f10dc16",
} as const;

export const SITE = {
  name: "Spring Village",
  tagline: "Коттеджи в природе",
  description: "Уютные коттеджи в окружении леса. 50 км от Москвы.",
  totalCottages: 6,
  totalGuests: 500,
  rating: 4.9,
  reviewCount: 185,
  yearsOperating: 6,
} as const;

export type CottageData = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  priceWeekday: number;
  priceWeekend: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeVariant?: "default" | "accent" | "secondary";
  urgency?: string;
  amenities: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  color: string;
  featured: boolean;
};

export const COTTAGES: CottageData[] = [
  {
    slug: "sosnovaya",
    name: "Сосновая",
    tagline: "Панорамные окна · пруд · баня",
    description: "Просторный коттедж в сосновом бору с панорамными окнами и собственной баней на берегу пруда.",
    longDescription: "Коттедж «Сосновая» расположен в самом сердце соснового бора. Огромные панорамные окна открывают захватывающий вид на пруд и лес. К вашим услугам — баня на 6 человек, просторная терраса с мебелью и мангальная зона. Идеально для семейного отдыха или компании.",
    capacity: 8,
    bedrooms: 3,
    bathrooms: 2,
    priceWeekday: 12000,
    priceWeekend: 15000,
    rating: 4.9,
    reviewCount: 47,
    badge: "Хит",
    badgeVariant: "default",
    urgency: "Осталось 2 даты в июле",
    amenities: ["Баня на 6 чел.", "Мангал и барбекю", "Wi-Fi 100 Мбит/с", "Парковка на 3 авто", "Посудомоечная машина", "Стиральная машина", "Телевизор 65\"", "Детская кроватка", "Терраса", "Пруд в 50 м"],
    highlights: ["Вид на пруд", "Баня 6 мест", "Сосновый бор", "3 спальни"],
    included: ["Постельное бельё и полотенца", "Посуда и кухонные принадлежности", "Wi-Fi", "Парковка", "Баня (1 раз в сутки)", "Дрова для мангала", "Уборка перед заездом"],
    notIncluded: ["Питание", "Доп. топка бани (+500 ₽)", "Трансфер (по запросу)"],
    color: "from-emerald-900 to-emerald-700",
    featured: true,
  },
  {
    slug: "lipovaya",
    name: "Липовая",
    tagline: "Камин · джакузи · уединение",
    description: "Уютный коттедж для пар с камином, джакузи и видом на цветущий сад.",
    longDescription: "Романтический коттедж «Липовая» создан для двоих. Камин в гостиной, джакузи на двоих, живописный вид на цветущий липовый сад. Здесь всё для максимального уединения — отдельный участок, закрытая терраса, тихий уголок природы.",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    priceWeekday: 7500,
    priceWeekend: 9500,
    rating: 4.8,
    reviewCount: 63,
    badge: "Для пар",
    badgeVariant: "accent",
    urgency: undefined,
    amenities: ["Камин", "Джакузи", "Мангал", "Wi-Fi", "Парковка", "Кофемашина", "Телевизор", "Уединённый сад"],
    highlights: ["Камин", "Джакузи 2 мест", "Закрытый сад", "Уединение"],
    included: ["Постельное бельё и полотенца", "Посуда и кухонные принадлежности", "Wi-Fi", "Парковка", "Дрова для камина", "Уборка перед заездом"],
    notIncluded: ["Питание", "Трансфер (по запросу)"],
    color: "from-amber-900 to-amber-700",
    featured: true,
  },
  {
    slug: "dubovaya",
    name: "Дубовая",
    tagline: "Бассейн · детская · баня",
    description: "Большой семейный коттедж с бассейном, детской площадкой и просторной террасой.",
    longDescription: "Коттедж «Дубовая» — лучший выбор для большой семьи или корпоратива. 4 спальни, бассейн, детская площадка, баня, крытая терраса. Здесь есть всё, чтобы 12 человек провели время незабываемо.",
    capacity: 12,
    bedrooms: 4,
    bathrooms: 3,
    priceWeekday: 18000,
    priceWeekend: 22000,
    rating: 4.9,
    reviewCount: 31,
    badge: "Семья",
    badgeVariant: "secondary",
    urgency: "Популярен летом",
    amenities: ["Детская площадка", "Бассейн (летний)", "Баня", "Мангал", "Wi-Fi", "Парковка ×4", "ТВ в каждой спальне", "Посудомоечная машина", "Пинг-понг"],
    highlights: ["Бассейн", "Детская площадка", "До 12 гостей", "4 спальни"],
    included: ["Постельное бельё и полотенца", "Посуда и кухонные принадлежности", "Wi-Fi", "Парковка", "Баня (1 раз в сутки)", "Дрова для мангала", "Уборка перед заездом"],
    notIncluded: ["Питание", "Доп. топка бани (+500 ₽)", "Трансфер (по запросу)"],
    color: "from-teal-900 to-teal-700",
    featured: true,
  },
  {
    slug: "berezovaya",
    name: "Берёзовая",
    tagline: "Тишина · берёзовая роща · уют",
    description: "Светлый коттедж в берёзовой роще — идеальное место для тихого уединённого отдыха.",
    longDescription: "Коттедж «Берёзовая» — для тех, кто ищет настоящий покой. Лёгкий интерьер в скандинавском стиле, светлая терраса, окружённая берёзовой рощей. Здесь слышно только ветер и птиц.",
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    priceWeekday: 10000,
    priceWeekend: 12500,
    rating: 4.7,
    reviewCount: 24,
    badge: undefined,
    urgency: undefined,
    amenities: ["Баня", "Мангал", "Wi-Fi", "Парковка", "Посудомоечная машина", "Терраса"],
    highlights: ["Берёзовая роща", "Скандинавский стиль", "3 спальни", "Тишина"],
    included: ["Постельное бельё и полотенца", "Посуда и кухонные принадлежности", "Wi-Fi", "Парковка", "Баня (1 раз в сутки)", "Дрова для мангала", "Уборка перед заездом"],
    notIncluded: ["Питание", "Доп. топка бани (+500 ₽)", "Трансфер (по запросу)"],
    color: "from-stone-700 to-stone-500",
    featured: false,
  },
  {
    slug: "kedrovaya",
    name: "Кедровая",
    tagline: "Бассейн · сауна · кинотеатр",
    description: "Премиум-коттедж с полным набором удобств: бассейн, финская сауна и домашний кинотеатр.",
    longDescription: "«Кедровая» — флагманский коттедж Spring Village. Здесь есть абсолютно всё: подогреваемый бассейн, финская сауна, домашний кинотеатр, летняя кухня и огромная терраса. Для тех, кто привык к лучшему.",
    capacity: 10,
    bedrooms: 4,
    bathrooms: 3,
    priceWeekday: 22000,
    priceWeekend: 27000,
    rating: 5.0,
    reviewCount: 18,
    badge: "Премиум",
    badgeVariant: "default",
    urgency: "Редкое предложение",
    amenities: ["Бассейн (подогрев)", "Финская сауна", "Кинотеатр", "Wi-Fi", "Летняя кухня", "Мангал", "Парковка ×4", "ТВ в каждой спальне"],
    highlights: ["Бассейн с подогревом", "Финская сауна", "Кинотеатр", "4 спальни"],
    included: ["Постельное бельё и полотенца", "Посуда и кухонные принадлежности", "Wi-Fi", "Парковка", "Сауна (включена)", "Дрова для мангала", "Уборка перед заездом"],
    notIncluded: ["Питание", "Трансфер (по запросу)"],
    color: "from-slate-800 to-slate-600",
    featured: false,
  },
  {
    slug: "yablonevaya",
    name: "Яблоневая",
    tagline: "Сад · качели · уют",
    description: "Уютный коттедж с яблоневым садом и верандой с качелями — идеально для небольшой компании.",
    longDescription: "Коттедж «Яблоневая» — камерный и душевный. Собственный яблоневый сад, веранда с деревянными качелями, тихий участок. Отличный выбор для пар или небольшой семьи, которые хотят просто отдохнуть без лишнего шума.",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    priceWeekday: 6500,
    priceWeekend: 8000,
    rating: 4.6,
    reviewCount: 42,
    badge: undefined,
    urgency: undefined,
    amenities: ["Яблоневый сад", "Качели", "Мангал", "Wi-Fi", "Парковка", "Терраса"],
    highlights: ["Яблоневый сад", "Веранда с качелями", "Уединение", "2 спальни"],
    included: ["Постельное бельё и полотенца", "Посуда и кухонные принадлежности", "Wi-Fi", "Парковка", "Дрова для мангала", "Уборка перед заездом"],
    notIncluded: ["Баня (не предусмотрена)", "Питание", "Трансфер (по запросу)"],
    color: "from-rose-900 to-rose-700",
    featured: false,
  },
];

export function getCottage(slug: string): CottageData | undefined {
  return COTTAGES.find((c) => c.slug === slug);
}

export const REVIEWS = [
  { author: "Анна С.", date: "Май 2024", rating: 5, stayType: "Семья", cottage: "sosnovaya", body: "Провели 5 дней с семьёй. Баня шикарная, дети в восторге. Уже бронируем на следующее лето.", initials: "АС" },
  { author: "Дмитрий К.", date: "Апрель 2024", rating: 5, stayType: "Корпоратив", cottage: "dubovaya", body: "Корпоратив на 15 человек прошёл идеально. Всё есть, персонал внимательный. Рекомендую.", initials: "ДК" },
  { author: "Маша и Лёша", date: "Март 2024", rating: 5, stayType: "Романтика", cottage: "lipovaya", body: "Годовщина свадьбы — камин, лес, джакузи. Персонал украсил комнату. Лучший выезд за несколько лет.", initials: "МА" },
  { author: "Игорь П.", date: "Февраль 2024", rating: 4, stayType: "Зима", cottage: "berezovaya", body: "Зимой здесь сказочно. Снег, тишина, протопленная баня — всё что нужно.", initials: "ИП" },
  { author: "Светлана М.", date: "Январь 2024", rating: 5, stayType: "Новый год", cottage: "kedrovaya", body: "Встречали Новый год в Кедровой. Бассейн, сауна, компания — незабываемо. Уже взяли на следующий год.", initials: "СМ" },
  { author: "Павел О.", date: "Декабрь 2023", rating: 5, stayType: "Семья", cottage: "yablonevaya", body: "Яблоневый сад — что-то невероятное осенью. Спокойно, чисто, уютно. Вернёмся обязательно.", initials: "ПО" },
];
