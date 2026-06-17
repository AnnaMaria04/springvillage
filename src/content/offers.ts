export type PriceTier = {
  label: string;
  nights: string;
  description: string;
  discount: string | null;
  features: string[];
  highlighted: boolean;
};

export const PRICE_TIERS: PriceTier[] = [
  {
    label: "Выходные",
    nights: "2 ночи",
    description: "Пятница–воскресенье. Перезагрузка без длительного отпуска.",
    discount: null,
    features: [
      "Заезд пятница с 14:00",
      "Выезд воскресенье до 12:00",
      "Байдарки и велосипеды",
      "Мангал и дрова",
    ],
    highlighted: false,
  },
  {
    label: "Неделя",
    nights: "7 ночей",
    description: "Настоящий отпуск у воды по специальной цене.",
    discount: "−15%",
    features: [
      "7 ночей по сниженной цене",
      "Неограниченное пользование баней",
      "Поздний выезд до 15:00",
      "Корзина с продуктами при заезде",
      "Байдарки и велосипеды",
    ],
    highlighted: true,
  },
  {
    label: "Длительно",
    nights: "30+ ночей",
    description: "Переехать за город на месяц — реальный вариант.",
    discount: "−30%",
    features: [
      "Аренда по договору",
      "Все коммунальные услуги включены",
      "Уборка 2 раза в неделю",
      "Персональный менеджер",
    ],
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
