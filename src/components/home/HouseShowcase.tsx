import Link from "next/link";
import { Users, BedDouble, Bath, ArrowUpRight } from "lucide-react";
import { HOUSE } from "@/lib/data";

export function HouseShowcase() {
  return (
    <section id="house" className="section-y bg-[--muted]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">
              Дом
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground]">
              {HOUSE.name}
            </h2>
            <p className="text-[--muted-foreground] mt-2">{HOUSE.type}</p>
          </div>
          <Link
            href="/dom"
            className="inline-flex items-center gap-1.5 text-sm text-[--primary] font-medium hover:underline shrink-0"
          >
            Подробнее о доме <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Photo grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[380px] sm:h-[460px]">
            <div
              className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-stone-300 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/gallery-exterior.jpg')" }}
            >
              <div className="absolute inset-0 flex items-end p-5">
                <span className="text-xs font-medium text-white/80 bg-black/25 rounded-full px-3 py-1 backdrop-blur-sm">
                  Коттедж WILD — вид с озера
                </span>
              </div>
            </div>
            <div
              className="relative rounded-2xl overflow-hidden bg-stone-300 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/gallery-interior.jpg')" }}
            >
              <div className="absolute inset-0 flex items-end p-3">
                <span className="text-[10px] text-white/80 bg-black/25 rounded-full px-2 py-0.5 backdrop-blur-sm">Гостиная</span>
              </div>
            </div>
            <div
              className="relative rounded-2xl overflow-hidden bg-stone-300 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/gallery-sauna.jpg')" }}
            >
              <div className="absolute inset-0 flex items-end p-3">
                <span className="text-[10px] text-white/80 bg-black/25 rounded-full px-2 py-0.5 backdrop-blur-sm">Баня у воды</span>
              </div>
            </div>
          </div>

          {/* Specs + highlights */}
          <div className="space-y-6">
            {/* Key specs */}
            <div className="flex gap-6 pb-6 border-b border-[--border]">
              {[
                { icon: Users, value: `до ${HOUSE.capacity}`, label: "гостей" },
                { icon: BedDouble, value: `${HOUSE.bedrooms}`, label: "спальни" },
                { icon: Bath, value: `${HOUSE.bathrooms}`, label: "санузел" },
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[--muted-foreground]" />
                    <div>
                      <div className="font-semibold text-[--foreground] text-sm">{spec.value}</div>
                      <div className="text-xs text-[--muted-foreground]">{spec.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[--muted-foreground] leading-relaxed">{HOUSE.description}</p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {HOUSE.highlights.map((h) => (
                <div key={h.label} className="bg-white rounded-xl p-4 border border-[--border]">
                  <div className="text-xs text-[--muted-foreground] uppercase tracking-wider mb-1">{h.label}</div>
                  <div className="font-semibold text-[--foreground] text-sm">{h.detail}</div>
                </div>
              ))}
            </div>

            {/* Top amenities */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[--muted-foreground] mb-3">Включено</p>
              <div className="flex flex-wrap gap-2">
                {HOUSE.amenities.slice(0, 8).map((a) => (
                  <span key={a} className="text-xs bg-[--muted] border border-[--border] rounded-full px-3 py-1 text-[--foreground]">
                    {a}
                  </span>
                ))}
                <Link href="/dom" className="text-xs text-[--primary] font-medium rounded-full px-3 py-1 border border-[--primary]/30 hover:bg-[--primary]/5 transition-colors">
                  +{HOUSE.amenities.length - 8} ещё
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
