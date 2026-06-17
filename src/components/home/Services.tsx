import { ServiceCard, type Service } from "./ServiceCard";

const services: Service[] = [
  {
    image: "/images/service-cottage.jpg",
    title: "Коттедж WILD целиком",
    description:
      "Двухэтажный A-frame у воды: камин, панорамные окна, две спальни, тёплые полы. Вся территория только для вас.",
    detail: "До 5 взрослых · 2 спальни · 2 этажа",
    price: "от 50 000 ₽",
    priceNote: "/ 3 ночи",
    source: "service_cottage",
  },
  {
    image: "/images/service-sauna.jpg",
    title: "Финская баня у воды",
    description:
      "Настоящая финская сауна на берегу. Протопим к вашему приезду — выход прямо к озеру или снегу.",
    detail: "Включена в проживание · доп. топка 500 ₽",
    price: "включено",
    source: "service_sauna",
  },
  {
    image: "/images/service-kayak.jpg",
    title: "Байдарки, SUP, велосипеды",
    description:
      "Выход на воду прямо с берега. Велосипеды для лесных троп. Лодка и снасти для рыбалки.",
    detail: "Включено в стоимость · спокойное озеро без моторов",
    price: "включено",
    source: "service_rental",
  },
];

export function Services() {
  return (
    <section id="services" className="section-y bg-[--cream]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">
            Что входит
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-4">
            Дом, баня и всё для отдыха
          </h2>
          <p className="text-[--muted-foreground] leading-relaxed">
            Приезжаете с чемоданом и продуктами — остальное уже здесь. Без скрытых доплат за инвентарь.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
