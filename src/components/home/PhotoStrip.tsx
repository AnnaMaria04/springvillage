import Link from "next/link";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const photoSlots = [
  { label: "Коттедж Сосновая", color: "from-emerald-800 to-emerald-600", span: "col-span-2 row-span-2" },
  { label: "Баня", color: "from-stone-700 to-stone-500", span: "" },
  { label: "Интерьер", color: "from-amber-800 to-amber-600", span: "" },
  { label: "Природа", color: "from-green-700 to-teal-600", span: "" },
  { label: "Барбекю", color: "from-orange-800 to-red-700", span: "" },
];

export function PhotoStrip() {
  return (
    <section className="section-y bg-[--background]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[--primary] font-semibold text-sm uppercase tracking-widest mb-3">
              Фотографии
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[--foreground]">
              Атмосфера места
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/gallery">
              <Camera className="w-4 h-4" />
              Вся галерея
            </Link>
          </Button>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[420px] sm:h-[520px]">
          {photoSlots.map((slot, i) => (
            <div
              key={i}
              className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${slot.color} ${slot.span}`}
            >
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-xs font-medium text-white/70 bg-black/20 rounded-full px-3 py-1 backdrop-blur-sm">
                  {slot.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
