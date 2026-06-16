"use client";

import { useState } from "react";

const categories = ["Все", "Коттеджи", "Интерьеры", "Природа", "Баня", "Территория"];

const photos = [
  { category: "Коттеджи",   label: "Коттедж Сосновая",   color: "from-emerald-800 to-emerald-600", colSpan: 2, rowSpan: 2 },
  { category: "Интерьеры",  label: "Гостиная",            color: "from-amber-700 to-amber-500",     colSpan: 1, rowSpan: 1 },
  { category: "Природа",    label: "Сосновый бор",        color: "from-green-700 to-green-500",     colSpan: 1, rowSpan: 1 },
  { category: "Баня",       label: "Парная",              color: "from-stone-700 to-stone-500",     colSpan: 1, rowSpan: 1 },
  { category: "Территория", label: "Беседка",             color: "from-slate-600 to-slate-400",     colSpan: 1, rowSpan: 1 },
  { category: "Коттеджи",   label: "Коттедж Липовая",    color: "from-lime-800 to-lime-600",       colSpan: 2, rowSpan: 1 },
  { category: "Интерьеры",  label: "Спальня",             color: "from-rose-800 to-rose-600",       colSpan: 1, rowSpan: 1 },
  { category: "Природа",    label: "Пруд",                color: "from-teal-700 to-cyan-600",       colSpan: 1, rowSpan: 1 },
  { category: "Баня",       label: "Веник и берёза",     color: "from-orange-700 to-orange-500",   colSpan: 1, rowSpan: 1 },
  { category: "Территория", label: "Мангальная зона",    color: "from-red-800 to-red-600",         colSpan: 1, rowSpan: 1 },
  { category: "Коттеджи",   label: "Коттедж Дубовая",    color: "from-indigo-800 to-indigo-600",   colSpan: 1, rowSpan: 1 },
  { category: "Интерьеры",  label: "Камин",              color: "from-yellow-700 to-yellow-500",   colSpan: 1, rowSpan: 1 },
];

export default function GalleryPage() {
  const [active, setActive] = useState("Все");

  const filtered = active === "Все" ? photos : photos.filter((p) => p.category === active);

  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      <div className="bg-[--muted] border-b border-[--border] py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">Фото</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-2">
            Галерея
          </h1>
          <p className="text-[--muted-foreground] text-lg">
            Атмосфера Spring Village в фотографиях
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-[--primary] text-white shadow-sm"
                  : "bg-[--muted] text-[--foreground] hover:bg-[--border]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid — use inline styles for col/row spans so Tailwind purge doesn't drop them */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
          {filtered.map((photo, i) => (
            <div
              key={i}
              className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${photo.color} cursor-pointer group`}
              style={{
                gridColumn: photo.colSpan > 1 ? `span ${photo.colSpan}` : undefined,
                gridRow:    photo.rowSpan > 1 ? `span ${photo.rowSpan}` : undefined,
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-3 left-3">
                <span className="text-xs font-medium text-white/80 bg-black/20 rounded-full px-3 py-1 backdrop-blur-sm">
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
