import Link from "next/link";
import { Navigation, ArrowRight } from "lucide-react";
import { CONTACT } from "@/content/site";

export function LocationPreview() {
  const { yandexMapOid } = CONTACT;
  const mapWidget = `https://yandex.ru/map-widget/v1/?oid=${yandexMapOid}&z=15&lang=ru_RU`;

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: interactive Yandex Maps iframe */}
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-stone-200">
            <iframe
              src={mapWidget}
              className="w-full h-full border-0"
              title="Карта: Spring Village на Михалёвском озере"
              allowFullScreen
            />
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
              Ближайший населённый пункт — Михалёво. Последние 2 км по лесной дороге.
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
