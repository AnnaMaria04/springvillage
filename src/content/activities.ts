export type Season = "summer" | "winter";

export type ActivityItem = {
  title: string;
  slug: string;
  description: string;
  photo: string;
  emoji: string;
};

export const ACTIVITIES: Record<Season, ActivityItem[]> = {
  summer: [
    {
      title: "Байдарки и SUP",
      slug: "bajdarki",
      description: "Выход с оборудованного пирса. Михалёвское озеро — спокойное, без моторных лодок. Лодки и SUP-доски включены в стоимость проживания. Можно выходить на воду в любое время дня.",
      photo: "/images/IMG_DF41196D43C2-18.jpeg",
      emoji: "",
    },
    {
      title: "Рыбалка",
      slug: "rybalka",
      description: "Щука, окунь, плотва. Рыбачить можно с пирса или с лодки — снасти в наличии. Озеро без моторных лодок, тишина гарантирована.",
      photo: "/images/IMG_DF41196D43C2-16.jpeg",
      emoji: "",
    },
    {
      title: "Купание",
      slug: "kupanie",
      description: "Чистая вода Михалёвского озера и берег рядом с домом. Пирс — идеальная точка для прыжка в озеро. Вода прогревается с июня по сентябрь.",
      photo: "/images/IMG_DF41196D43C2-19.jpeg",
      emoji: "",
    },
    {
      title: "Велосипеды и тропы",
      slug: "velosipedy",
      description: "Сосновый лес сразу за территорией. Велосипеды включены в стоимость. По тропам — грибы, ягоды, свежий воздух. Маршруты разной сложности.",
      photo: "/images/IMG_DF41196D43C2-8.jpeg",
      emoji: "",
    },
    {
      title: "Мангальная зона",
      slug: "mangal",
      description: "Дрова, решётка и шампуры уже готовы. Ужин у огня на берегу — лучший способ закончить день. Всё необходимое включено в стоимость.",
      photo: "/images/IMG_DF41196D43C2-13.jpeg",
      emoji: "",
    },
    {
      title: "Пространство для игр",
      slug: "igry",
      description: "Бадминтон, петанк, велосипеды. Площадка на территории — детям и взрослым одинаково. Инвентарь на месте, ничего брать с собой не нужно.",
      photo: "/images/IMG_DF41196D43C2-14.jpeg",
      emoji: "",
    },
  ],
  winter: [
    {
      title: "Лыжи",
      slug: "lyzhi",
      description: "Подготовленные трассы рядом с домом. Лыжи можно взять в аренду у нас или в посёлке. Карельский лес зимой — отдельный опыт.",
      photo: "/images/7ebe738e-638e-4b81-87a5-2ed702b81da8.JPG",
      emoji: "",
    },
    {
      title: "Коньки",
      slug: "konki",
      description: "Михалёвское озеро замерзает — получается каток с видом на лес прямо у дома. Коньки можно привезти с собой или взять в аренду.",
      photo: "/images/7ebe738e-638e-4b81-87a5-2ed702b81da8.JPG",
      emoji: "",
    },
    {
      title: "Зимняя рыбалка",
      slug: "zimnyaya-rybalka",
      description: "Лёд, тишина, термос с чаем. Снаряжение для зимней рыбалки есть на месте. Щука, окунь, плотва — всё то же самое, только зимой.",
      photo: "/images/IMG_DF41196D43C2-7.jpeg",
      emoji: "",
    },
    {
      title: "Прогулки по лесу",
      slug: "les",
      description: "Карельский лес зимой — отдельный опыт. Снег, сосны, следы зверей. Тропы начинаются прямо за территорией дома.",
      photo: "/images/IMG_DF41196D43C2-23.jpeg",
      emoji: "",
    },
    {
      title: "Камин",
      slug: "kamin",
      description: "Никуда не выходить, читать книгу у дровяного камина. Тоже допустимо. Дрова для камина включены в стоимость проживания.",
      photo: "/images/IMG_DF41196D43C2-5.jpeg",
      emoji: "",
    },
  ],
};
