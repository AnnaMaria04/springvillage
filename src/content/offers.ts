export type PriceTier = {
  label: string;
  nights: string;
  nightsCount: number;
  totalPrice: number;
  perNight: number;
  discount: string | null;
  highlighted: boolean;
};

// All prices in ₽, totals confirmed from Bnovo promo
export const PRICE_TIERS: PriceTier[] = [
  {
    label: "Мини-отдых",
    nights: "3 ночи",
    nightsCount: 3,
    totalPrice: 50_000,
    perNight: 16_667,
    discount: "−17%",
    highlighted: false,
  },
  {
    label: "Длинные выходные",
    nights: "4 ночи",
    nightsCount: 4,
    totalPrice: 60_000,
    perNight: 15_000,
    discount: "−25%",
    highlighted: false,
  },
  {
    label: "Неделя",
    nights: "7 ночей",
    nightsCount: 7,
    totalPrice: 85_000,
    perNight: 12_143,
    discount: "−39%",
    highlighted: true,
  },
  {
    label: "9 дней",
    nights: "9 ночей",
    nightsCount: 9,
    totalPrice: 100_000,
    perNight: 11_111,
    discount: "−44%",
    highlighted: false,
  },
  {
    label: "Длительно",
    nights: "30 ночей",
    nightsCount: 30,
    totalPrice: 300_000,
    perNight: 10_000,
    discount: "−50%",
    highlighted: false,
  },
];

export const GIFT_CERT = {
  title: "Подарочный сертификат",
  subtitle: "Подарите отдых у озера",
  description:
    "Сертификат на любую сумму — от 3 000 ₽. Действует 12 месяцев. Оформим красивый PDF и пришлём на почту в течение часа.",
  cta: "Оформить сертификат",
} as const;
