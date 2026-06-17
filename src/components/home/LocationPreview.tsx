import Link from "next/link";
import { Navigation, ArrowRight, BedDouble } from "lucide-react";
import { CONTACT, SITE } from "@/content/site";

export function LocationPreview() {
  const { coords, yandexMapOid } = CONTACT;
  const { lat, lng: lon } = coords;
  // pt= ensures a visible pin; oid= loads the business card if available
  const mapWidget = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=15&lang=ru_RU&oid=${yandexMapOid}&pt=${lon}%2C${lat}%2Cpm2rdm`;

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: interactive Yandex Maps iframe */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-200">
            <iframe
              src={mapWidget}
              className="w-full h-full border-0"
              title="Карта: Spring Village на Михалёвском озере"
              allowFullScreen
            />
            {/* Business card overlay — mimics Yandex POI card */}
            <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                <BedDouble className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[13px] text-gray-900 leading-tight">
                  Spring Village{" "}
                  <span className="text-amber-500 font-bold">{SITE.rating}</span>
                  <span className="text-amber-400">★</span>
                </p>
                <p className="text-[11px] text-gray-500 leading-tight">Гостевой дом</p>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Как добраться
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-pine leading-tight mb-6">
              127 км от Петербурга
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Михалёвское озеро, Выборгский район Ленобласти. Два часа на машине по трассе «Скандинавия».
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/doroga"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-pine text-white text-sm font-semibold hover:bg-pine/85 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Маршрут и ориентиры
              </Link>
              <a
                href={CONTACT.yandexOrgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full border border-border text-foreground text-sm font-medium hover:bg-background transition-colors"
              >
                Открыть на Яндекс Картах <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
