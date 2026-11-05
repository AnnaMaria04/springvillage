/**
 * Panel data for the "Озеро и лес" activity accordion.
 * Titles, images and links all come from real Spring Village content —
 * every photograph already lives in the repository.
 */
export type ActivityPanel = {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  href: string;
  eyebrow?: string;
  includedInStay?: boolean;
};

export const ACTIVITY_PANELS: ActivityPanel[] = [
  {
    id: "pier",
    title: "Новый понтон",
    shortDescription:
      "У коттеджа WILD теперь более просторный понтон. Больше места для отдыха у воды, рыбалки и выхода на SUP.",
    image: "/images/lake/cottage-pontoon-lake-960.webp",
    imageAlt: "Новый просторный понтон коттеджа WILD с лодкой и SUP",
    href: "/dom#pontoon",
    eyebrow: "У коттеджа WILD",
    includedInStay: true,
  },
  {
    id: "sup",
    title: "SUP-доски",
    shortDescription:
      "Выход с оборудованного пирса на спокойную воду — доски ждут вас на берегу.",
    image: "/images/activities/activity-sup-dog.jpeg",
    imageAlt: "SUP-доска на воде Михалёвского озера",
    href: "/aktivnosti/bajdarki",
    eyebrow: "У воды",
    includedInStay: true,
  },
  {
    id: "fishing",
    title: "Рыбалка",
    shortDescription:
      "Рыбачьте самостоятельно с частного берега или отправьтесь за крупной щукой с профессиональным гидом.",
    image: "/images/activities/activity-boat-lake.jpeg",
    imageAlt: "Лодка на Михалёвском озере — рыбалка с воды",
    href: "/aktivnosti/rybalka",
    eyebrow: "У воды",
  },
  {
    id: "spring",
    title: "Финский родник",
    shortDescription: "Лесная прогулка к природному источнику рядом с коттеджем.",
    image: "/images/territory/territory-spring-water.jpeg",
    imageAlt: "Финский родник с ключевой водой на территории",
    href: "/aktivnosti/rodnik",
    eyebrow: "На территории",
  },
  {
    id: "forest",
    title: "Лес и природа",
    shortDescription:
      "Карельский сосновый лес начинается сразу за территорией — грибы, ягоды и тихие тропы.",
    image: "/images/activities/activity-forest-walk.jpg",
    imageAlt: "Тропа в карельском сосновом лесу",
    href: "/aktivnosti/priroda",
    eyebrow: "Вокруг",
  },
  {
    id: "grill",
    title: "Мангальная зона",
    shortDescription: "Отдельное место для ужина у огня среди сосен.",
    image: "/images/territory/territory-firewood-shed.jpeg",
    imageAlt: "Мангальная зона и дровяник среди сосен",
    href: "/aktivnosti/mangal",
    eyebrow: "На территории",
    includedInStay: true,
  },
];
