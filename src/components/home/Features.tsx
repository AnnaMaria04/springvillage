// Editorial "why us" section — 3 large panels, no icon grids

const panels = [
  {
    number: "01",
    title: "Природа\nу порога",
    body: "Лес, пруд, берёзовая роща — не в 20 минутах езды, а прямо за окном. Просыпаетесь — и вы уже там.",
    accent: "Сосновый бор, 50 км от МКАД",
  },
  {
    number: "02",
    title: "Всё\nвключено",
    body: "Баня, мангал, дрова, постельное бельё, Wi-Fi, парковка. Приезжаете с вещами — остальное есть.",
    accent: "Без скрытых платежей",
  },
  {
    number: "03",
    title: "Ответим\nза 15 минут",
    body: "Телефон, WhatsApp, Telegram — выбирайте как удобно. Работаем каждый день с 9 до 21.",
    accent: "Ежедневно, без выходных",
  },
];

export function Features() {
  return (
    <section className="section-y bg-[--background]" id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Label */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-10">
          Почему Spring Village
        </p>

        {/* 3-panel editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[--border] rounded-2xl overflow-hidden">
          {panels.map((panel) => (
            <div
              key={panel.number}
              className="bg-[--background] p-8 lg:p-10 group hover:bg-[--forest-dark] transition-colors duration-300"
            >
              {/* Number */}
              <div className="font-display text-7xl font-bold text-[--border] group-hover:text-[--primary-light] transition-colors duration-300 leading-none mb-6 select-none">
                {panel.number}
              </div>

              {/* Title */}
              <h3
                className="font-display text-2xl lg:text-3xl font-bold text-[--foreground] group-hover:text-white transition-colors duration-300 mb-4 whitespace-pre-line"
              >
                {panel.title}
              </h3>

              {/* Body */}
              <p className="text-[--muted-foreground] group-hover:text-white/65 transition-colors duration-300 leading-relaxed text-sm lg:text-base mb-6">
                {panel.body}
              </p>

              {/* Accent chip */}
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[--primary] group-hover:text-emerald-400 transition-colors duration-300 border border-[--border] group-hover:border-emerald-400/30 rounded-full px-3 py-1">
                {panel.accent}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
