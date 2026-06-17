import Link from "next/link";
import { MapPin, Navigation, ArrowRight } from "lucide-react";

export function LocationPreview() {
  const lat = 60.983791;
  const lon = 29.422227;
  // Yandex Maps widget iframe — interactive, no API key required
  const mapWidget = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=14&pt=${lon}%2C${lat}%2Cpm2rdm&l=map&lang=ru_RU`;

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
            {/* Coordinates overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2.5 pointer-events-none">
              <MapPin className="w-4 h-4 text-pine shrink-0" />
              <div>
                <p className="text-xs font-semibold text-pine">Координаты</p>
                <p className="text-xs text-muted-foreground font-mono">{lat.toFixed(6)}, {lon.toFixed(6)}</p>
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
              Ближайший населённый пункт — Михалёво. Асфальт до ворот.
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
                href={`https://yandex.ru/maps/?ll=${lon},${lat}&z=15&pt=${lon},${lat},pm2rdm`}
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
