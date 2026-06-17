import type { Metadata } from "next";
import { Car, Train, MapPin, AlertTriangle, Clock } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { LOCATION } from "@/content/location";

export const metadata: Metadata = {
  title: "Как добраться до Spring Village",
  description: `Маршрут до Коттеджа WILD, пос. Михалёво, Выборгский район. На машине 127 км от Петербурга, координаты: ${CONTACT.coords.lat}, ${CONTACT.coords.lng}.`,
};

export default function DorogaPage() {
  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      <div className="bg-[--muted] border-b border-[--border] py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">Навигация</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-2">
            Как добраться
          </h1>
          <p className="text-[--muted-foreground] text-lg">{CONTACT.addressFull}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-12">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-[--border] shadow-sm h-[360px]">
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
        <div className="bg-[--muted] rounded-2xl p-6 border border-[--border]">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[--primary] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[--foreground] mb-1">{CONTACT.addressFull}</div>
              <div className="text-sm text-[--muted-foreground] font-mono">
                {CONTACT.coords.lat}, {CONTACT.coords.lng}
              </div>
              <p className="text-xs text-[--muted-foreground] mt-2">
                Скопируйте координаты в Яндекс.Навигатор или Google Maps для точного маршрута.
              </p>
            </div>
          </div>
        </div>

        {/* By car */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[--primary]/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-[--primary]" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[--foreground]">На автомобиле</h2>
              <div className="flex gap-3 text-sm text-[--muted-foreground]">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~2 часа</span>
                <span>· 127 км от СПб</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { step: "01", text: "Выезд из Петербурга на трассу А-181 «Скандинавия» (Приморское шоссе → Выборгское направление)." },
              { step: "02", text: "Едете около 70 км до Выборга. На объездной Выборга не въезжайте в город — держитесь основной трассы." },
              { step: "03", text: "Поворот на Михалёво / Советский — примерно на 82–85 км от КАД. Следите за указателями." },
              { step: "04", text: "По местным дорогам ~7 км до посёлка Михалёво." },
              { step: "05", text: "Последние 2 км — грунтовая дорога. Проезжаема на обычном легковом авто, но после дождей лучше на кроссовере." },
              { step: "06", text: "Песчаный проезд, 5а. Парковка на 2 авто прямо у коттеджа." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="font-display text-2xl font-bold text-[--primary]/20 w-10 shrink-0 leading-none pt-1">{s.step}</div>
                <p className="text-[--foreground] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Важно:</strong> некоторые навигаторы могут предлагать альтернативный маршрут через просёлочные дороги — он длиннее и сложнее. Рекомендуем ехать через Выборг по трассе А-181.
            </p>
          </div>
        </div>

        {/* By train */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[--lake]/10 flex items-center justify-center">
              <Train className="w-5 h-5 text-[--lake]" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[--foreground]">На электричке</h2>
              <div className="flex gap-3 text-sm text-[--muted-foreground]">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~2.5–3 часа</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { step: "01", text: "Электричка с Финляндского вокзала (СПб) до Выборга — примерно 2 часа, рейсы каждые 1–2 часа." },
              { step: "02", text: "Из Выборга — такси или заказной трансфер до Михалёво (около 20–30 мин, ~600–900 ₽)." },
              { step: "03", text: "Трансфер от вокзала можно организовать заранее — напишите нам при бронировании." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="font-display text-2xl font-bold text-[--lake]/30 w-10 shrink-0 leading-none pt-1">{s.step}</div>
                <p className="text-[--foreground] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
