export type Season = "summer" | "winter";

export type ActivityItem = {
  title: string;
  slug: string;
  description: string;
  photo: string;
  secondaryPhoto?: string;
  emoji: string;
};

export const ACTIVITIES: Record<Season, ActivityItem[]> = {
  summer: [
    {
      title: "SUP-доски",
      slug: "bajdarki",
      description: "Выход с оборудованного пирса. Михалёвское озеро — спокойное, без моторных лодок. SUP-доски включены в стоимость проживания. Можно выходить на воду в любое время дня.",
      photo: "/images/activity-sup-dog.jpeg",
      emoji: "",
    },
    {
      title: "Рыбалка",
      slug: "rybalka",
      description: "Михалёвское озеро — глубокое (до 21 м), без бензиновых лодок. Рыбачить можно с пирса или с лодки с электромотором — снасти в наличии. Тишина гарантирована.",
      photo: "/images/activity-boat-lake.jpeg",
      emoji: "",
    },
    {
      title: "Лес и природа",
      slug: "priroda",
      description: "Карельский сосновый лес начинается прямо за территорией. Грибы, ягоды, свежий воздух, лесные тропы — полное погружение в природу.",
      photo: "/images/activity-forest-walk.jpg",
      emoji: "",
    },
    {
      title: "Мангальная зона",
      slug: "mangal",
      description: "Дрова, решётка и шампуры уже готовы. Ужин у огня на берегу — лучший способ закончить день. Всё необходимое включено в стоимость.",
      photo: "/images/territory-firewood-shed.jpeg",
      emoji: "",
    },
    {
      title: "Пространство для игр",
      slug: "igry",
      description: "Петанк, метание ножей, баскетбол, настольные игры. Площадка на территории — детям и взрослым одинаково. Инвентарь на месте.",
      photo: "/images/activity-petanque.jpg",
      emoji: "",
    },
    {
      title: "Финский родник",
      slug: "rodnik",
      description: "На территории есть обустроенный финский родник с чистой ключевой водой. Каменные ступени, бамбуковый желоб, живая вода — отдельное удовольствие.",
      photo: "/images/territory-spring-water.jpeg",
      emoji: "",
    },
  ],
  winter: [
    {
      title: "Лыжи",
      slug: "lyzhi",
      description: "Подготовленные трассы рядом с домом. Лыжи можно взять в аренду у нас или в посёлке. Карельский лес зимой — отдельный опыт.",
      photo: "/images/activity-ski.jpg",
      emoji: "",
    },
    {
      title: "Коньки",
      slug: "konki",
      description: "Михалёвское озеро замерзает — получается каток с видом на лес прямо у дома. Коньки можно привезти с собой или взять в аренду.",
      photo: "/images/activity-skate.jpg",
      emoji: "",
    },
    {
      title: "Зимняя рыбалка",
      slug: "zimnyaya-rybalka",
      description: "Лёд, тишина, термос с чаем. Снаряжение для зимней рыбалки есть на месте. Щука, окунь, плотва — всё то же самое, только зимой.",
      photo: "/images/activity-icefish.jpg",
      emoji: "",
    },
    {
      title: "Прогулки по лесу",
      slug: "les",
      description: "Карельский лес зимой — отдельный опыт. Снег, сосны, следы зверей. Тропы начинаются прямо за территорией дома.",
      photo: "/images/activity-forest.jpg",
      emoji: "",
    },
    {
      title: "Камин",
      slug: "kamin",
      description: "Никуда не выходить, читать книгу у дровяного камина. Тоже допустимо. Дрова для камина включены в стоимость проживания.",
      photo: "/images/activity-fireplace.jpg",
      emoji: "",
    },
  ],
};
