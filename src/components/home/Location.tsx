import Link from "next/link";
import { MapPin, Car, Clock, ArrowRight } from "lucide-react";
import { LOCATION } from "@/content/location";
import { FadeIn } from "@/components/ui/FadeIn";

export function Location() {
  return (
    <section id="location" className="section-y bg-[--muted]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <FadeIn direction="right">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-4">
                Как добраться
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
                {LOCATION.distanceFromSpb} от СПб
              </h2>
              <p className="text-[--muted-foreground] mb-8 leading-relaxed">
                Выборгский район, пос. Михалёво. На машине — около двух часов по трассе
                «Скандинавия». На электричке до Выборга + такси ~30 мин.
              </p>

              <div className="space-y-4 mb-8">
                {LOCATION.byCar.map((d) => (
                  <div key={d.step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                      <Car className="w-3.5 h-3.5 text-[--primary]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[--muted-foreground] uppercase tracking-wider">
                        0{d.step}
                      </span>
                      <p className="text-sm text-[--foreground] mt-0.5">{d.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {LOCATION.note && (
                <div className="mb-6 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                  <span className="text-amber-500 mt-0.5">⚠</span>
                  <p className="text-xs text-amber-800">{LOCATION.note}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-[--muted-foreground]">
                  <Clock className="w-4 h-4 text-[--primary]" />
                  {LOCATION.driveTime} на авто из СПб
                </div>
                <div className="flex items-center gap-2 text-sm text-[--muted-foreground]">
                  <MapPin className="w-4 h-4 text-[--primary]" />
                  {LOCATION.addressFull}
                </div>
              </div>

              <Link
                href="/doroga"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[--primary] hover:underline"
              >
                Подробные инструкции и координаты <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-[--border] shadow-sm h-[380px] lg:h-[460px]">
              <iframe
                src={LOCATION.yandexMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Spring Village на карте"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
