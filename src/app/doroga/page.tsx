import type { Metadata } from "next";
import { Car, Train, MapPin, Clock, Wind } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { LOCATION } from "@/content/location";

export const metadata: Metadata = {
  title: "Как добраться до Spring Village — из Петербурга 127 км",
  description: "Маршрут на машине и электричке из Санкт-Петербурга до коттеджа Spring Village в пос. Михалёво, Выборгский район. Координаты и карта.",
  alternates: { canonical: "/doroga" },
};

export default function DorogaPage() {
  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-pine py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3">Навигация</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
            Как добраться
          </h1>
          <p className="text-white/60 text-lg">{CONTACT.addressFull}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-12">
        {/* Map */}
        <div className="rounded-3xl overflow-hidden border border-border shadow-sm h-[400px]">
          <iframe
            src={LOCATION.yandexMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Маршрут до Spring Village"
          />
        </div>

        {/* Coords + address */}
        <div className="bg-muted rounded-2xl p-6 border border-border">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground mb-1">{CONTACT.addressFull}</div>
              <div className="text-sm text-muted-foreground font-mono">
                {CONTACT.coords.lat}, {CONTACT.coords.lng}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Скопируйте координаты в Яндекс.Навигатор или Google Maps для точного маршрута.
              </p>
            </div>
          </div>
        </div>

        {/* By car */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">На автомобиле</h2>
              <div className="flex gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~2 часа</span>
                <span>· 127 км от СПб</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { step: "01", text: "По трассе А-181 «Скандинавия» в сторону Выборга — около 100 км." },
              { step: "02", text: "Съезд на Михалёво / Рощино, далее через посёлок по главной дороге." },
              { step: "03", text: "Последние 2 км — грунтовая дорога вдоль берега. Проедет обычный легковой авто." },
              { step: "04", text: "Координаты: 60.983791, 29.422227. Парковка у коттеджа." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="font-display text-2xl font-bold text-primary/20 w-10 shrink-0 leading-none pt-1">{s.step}</div>
                <p className="text-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

        </div>

        {/* By train */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-lake/10 flex items-center justify-center">
              <Train className="w-5 h-5 text-lake" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">На электричке</h2>
              <div className="flex gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~2.5–3 часа</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { step: "01", text: "Электричка с Финляндского вокзала до Выборга — около 2 часов." },
              { step: "02", text: "Из Выборга — такси ~30 мин. Трансфер организуем по запросу." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="font-display text-2xl font-bold text-lake/30 w-10 shrink-0 leading-none pt-1">{s.step}</div>
                <p className="text-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
        {/* By helicopter */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-wood/10 flex items-center justify-center">
              <Wind className="w-5 h-5 text-wood" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">На вертолёте</h2>
              <p className="text-sm text-muted-foreground">Посадочная площадка на территории</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { step: "01", text: "На территории коттеджа есть площадка для посадки вертолёта — договоритесь с пилотом заранее." },
              { step: "02", text: "По вопросам посадки и координации свяжитесь с нами по телефону, указанному на странице контактов." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="font-display text-2xl font-bold text-wood/30 w-10 shrink-0 leading-none pt-1">{s.step}</div>
                <p className="text-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
