import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, Users, BedDouble, Bath, ArrowLeft } from "lucide-react";
import { HOUSE, SITE } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `${HOUSE.name} — подробно`,
  description: `${HOUSE.type}. Вместимость до ${HOUSE.capacity} гостей. ${HOUSE.description}`,
};

export default function DomPage() {
  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      {/* Hero */}
      <div className="bg-[--forest-dark] py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/#house" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> На главную
          </Link>
          <p className="text-[--lake-light] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            {SITE.name}
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-4">
            {HOUSE.name}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            {HOUSE.longDescription}
          </p>
          <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/10">
            {[
              { icon: Users, value: `до ${HOUSE.capacity} гостей` },
              { icon: BedDouble, value: `${HOUSE.bedrooms} спальни` },
              { icon: Bath, value: `${HOUSE.bathrooms} санузел` },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.value} className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon className="w-4 h-4" /> {s.value}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-16">
        {/* Photo grid placeholder */}
        <div>
          <h2 className="font-display text-3xl font-bold text-[--foreground] mb-6">Фотографии</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[200px]">
            {[
              { label: "Фасад и озеро", color: "from-emerald-900 to-teal-800", col: 2, row: 2 },
              { label: "Гостиная / камин", color: "from-amber-900 to-amber-700", col: 1, row: 1 },
              { label: "Панорамное окно", color: "from-slate-700 to-slate-500", col: 1, row: 1 },
              { label: "Спальня 1", color: "from-stone-700 to-stone-500", col: 1, row: 1 },
              { label: "Баня у воды", color: "from-forest-dark to-forest", col: 1, row: 1 },
              { label: "Терраса", color: "from-lime-800 to-lime-600", col: 1, row: 1 },
            ].map((p, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${p.color}`}
                style={{
                  gridColumn: p.col > 1 ? `span ${p.col}` : undefined,
                  gridRow: p.row > 1 ? `span ${p.row}` : undefined,
                }}
              >
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-medium text-white/80 bg-black/20 rounded-full px-3 py-1 backdrop-blur-sm">
                    {p.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[--muted-foreground] mt-3">Профессиональная фотосъёмка запланирована — места замены актуальными фото.</p>
        </div>

        {/* Highlights */}
        <div>
          <h2 className="font-display text-3xl font-bold text-[--foreground] mb-6">Преимущества</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {HOUSE.highlights.map((h) => (
              <div key={h.label} className="bg-[--muted] rounded-2xl p-6 text-center border border-[--border]">
                <div className="font-display text-2xl font-bold text-[--primary] mb-1">{h.detail}</div>
                <div className="text-sm text-[--muted-foreground]">{h.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* All amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-[--foreground] mb-6">Удобства</h2>
            <div className="space-y-2.5">
              {HOUSE.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2.5 text-sm text-[--foreground]">
                  <CheckCircle className="w-4 h-4 text-[--primary] shrink-0" /> {a}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-[--foreground] mb-6">Оснащение дома</h2>
              <div className="space-y-2.5">
                {HOUSE.equipment.map((e) => (
                  <div key={e} className="flex items-center gap-2.5 text-sm text-[--foreground]">
                    <CheckCircle className="w-4 h-4 text-[--primary] shrink-0" /> {e}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-[--foreground] mb-4">Не включено</h3>
              <div className="space-y-2.5">
                {HOUSE.notIncluded.map((n) => (
                  <div key={n} className="flex items-start gap-2.5 text-sm text-[--muted-foreground]">
                    <XCircle className="w-4 h-4 text-[--border] shrink-0 mt-0.5" /> {n}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3D Tour placeholder */}
        <div className="bg-[--muted] rounded-2xl p-8 border border-[--border] text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--muted-foreground] mb-2">Скоро</p>
          <h2 className="font-display text-2xl font-bold text-[--foreground] mb-3">3D-тур по коттеджу</h2>
          <p className="text-[--muted-foreground] text-sm max-w-md mx-auto">
            Виртуальный тур в формате 360° — посмотрите на каждый уголок дома до приезда.
            Запланирован на ближайшее время.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <Button asChild size="lg">
            <Link href="/#pricing">Забронировать Коттедж WILD</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
