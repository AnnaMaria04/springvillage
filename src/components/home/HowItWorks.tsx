import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Выберите даты",
    body: "В форме на сайте или напишите нам в WhatsApp — уточним, свободны ли нужные даты.",
  },
  {
    num: "02",
    title: "Подтвердите бронирование",
    body: "Ответим в течение часа, расскажем детали и пришлём договор.",
  },
  {
    num: "03",
    title: "Оплатите",
    body: "Картой через Bnovo или банковским переводом. Предоплата фиксирует бронь.",
  },
  {
    num: "04",
    title: "Приезжайте и отдыхайте",
    body: "Заезд с 14:00. Встретим, покажем дом и баню. Дрова и всё необходимое уже есть.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-y bg-[--cream]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">
              Бронирование
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground]">
              Как это работает
            </h2>
          </div>
          <Link
            href="#pricing"
            className="shrink-0 h-11 px-7 rounded-2xl bg-[--primary] text-white text-sm font-semibold hover:bg-[--primary-light] transition-colors inline-flex items-center"
          >
            Забронировать →
          </Link>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%_+_12px)] right-[-12px] h-px bg-[--border]" />
              )}
              <div className="font-display text-5xl font-bold text-[--border] leading-none mb-5">
                {step.num}
              </div>
              <h3 className="font-display text-lg font-bold text-[--foreground] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[--muted-foreground] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
