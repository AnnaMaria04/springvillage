const items = [
  {
    emoji: "⏱",
    title: "2 часа от Петербурга",
    body: "Трасса А-181 «Скандинавия» без светофоров. В пятницу вечером — уже у озера.",
  },
  {
    emoji: "✅",
    title: "Всё готово к заезду",
    body: "Постельное, полотенца, посуда, дрова. Привезите только себя и продукты.",
  },
  {
    emoji: "🌲",
    title: "Территория только ваша",
    body: "Лес, берег озера, баня — без соседей по территории и посторонних.",
  },
  {
    emoji: "📲",
    title: "Просто забронировать",
    body: "Одно сообщение в WhatsApp — и мы всё согласуем в течение часа.",
  },
];

export function Benefits() {
  return (
    <section className="section-y bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.title} className="bg-[--cream] rounded-3xl p-7">
              <div className="text-4xl mb-5">{item.emoji}</div>
              <h3 className="font-display text-xl font-bold text-[--foreground] mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-[--muted-foreground] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
