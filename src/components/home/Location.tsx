import Link from "next/link";
import { MapPin, Car, Clock, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/data";

const directions = [
  { icon: Car, step: "01", text: "Трасса А-181 «Скандинавия» до Выборга (~80 км)" },
  { icon: Car, step: "02", text: "Поворот на Михалёво, местные дороги (~7 км)" },
  { icon: Car, step: "03", text: "Последние 2 км — грунтовая дорога, подходит любой авто" },
  { icon: MapPin, step: "04", text: "Прибытие: Песчаный проезд, 5а, пос. Михалёво" },
];

export function Location() {
  return (
    <section id="location" className="section-y bg-[--muted]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-4">
              Как добраться
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
              90 км от СПб
            </h2>
            <p className="text-[--muted-foreground] mb-8 leading-relaxed">
              Выборгский район, пос. Михалёво. На машине — около двух часов по трассе «Скандинавия».
              На электричке до Выборга + такси ~30 мин.
            </p>

            <div className="space-y-4 mb-8">
              {directions.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[--primary]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[--muted-foreground] uppercase tracking-wider">{d.step}</span>
                      <p className="text-sm text-[--foreground] mt-0.5">{d.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-[--muted-foreground]">
                <Clock className="w-4 h-4 text-[--primary]" />
                ~2 ч на авто из СПб
              </div>
              <div className="flex items-center gap-2 text-sm text-[--muted-foreground]">
                <MapPin className="w-4 h-4 text-[--primary]" />
                {CONTACT.addressShort}
              </div>
            </div>

            <Link
              href="/doroga"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[--primary] hover:underline"
            >
              Подробные инструкции и координаты <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-[--border] shadow-sm h-[380px] lg:h-[460px]">
            <iframe
              src={CONTACT.yandexMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Spring Village на карте"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
