import { CONTACT } from "@/lib/data";

const rules = [
  {
    section: "Время проживания",
    items: ["Заезд с 14:00", "Выезд до 12:00", "Ранний заезд / поздний выезд — по запросу, бесплатно при наличии"],
  },
  {
    section: "Тишина и порядок",
    items: ["Соблюдение тишины с 23:00 до 8:00", "Мусор — в специальные контейнеры на территории", "Запрещено портить имущество"],
  },
  {
    section: "Курение и алкоголь",
    items: ["Курение только в специально отведённых местах на улице", "Употребление алкоголя разрешено в рамках действующего законодательства", "Разжигание огня только в мангальной зоне"],
  },
  {
    section: "Домашние животные",
    items: ["Допускаются по предварительному согласованию", "Животных нельзя оставлять одних в коттедже", "Хозяин несёт ответственность за поведение питомца"],
  },
  {
    section: "Имущество",
    items: ["Гости несут ответственность за сохранность имущества", "При обнаружении неисправностей — немедленно сообщить персоналу", "Самостоятельный ремонт запрещён"],
  },
  {
    section: "Отмена бронирования",
    items: ["Бесплатная отмена за 48 часов до заезда", "При отмене менее чем за 48 часов — стоимость 1 ночи", "Форс-мажор рассматривается индивидуально"],
  },
];

export default function RulesPage() {
  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      <div className="bg-[--muted] border-b border-[--border] py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Правила проживания
          </h1>
          <p className="text-[--muted-foreground] text-lg">
            Просим ознакомиться перед заездом
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-8">
        {rules.map((section) => (
          <div key={section.section}>
            <h2 className="font-display text-xl font-bold text-[--foreground] mb-3">
              {section.section}
            </h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[--muted-foreground]">
                  <span className="text-[--primary] font-bold shrink-0 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="bg-[--muted] rounded-2xl p-6 mt-8">
          <p className="text-sm text-[--muted-foreground]">
            Вопросы по правилам:{" "}
            <a href={`tel:${CONTACT.phoneDial}`} className="text-[--primary] font-medium hover:underline">
              {CONTACT.phone}
            </a>{" "}
            или{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-[--primary] font-medium hover:underline">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
