import Link from "next/link";
import { Navigation, ArrowRight } from "lucide-react";
import { CONTACT } from "@/content/site";

export function LocationPreview() {
  // Landing page: the official Yandex widget you provided, verbatim (its sctx
  // search-context blob resolves to the org and shows a collapsed labeled pin).
  // Other pages keep LOCATION.yandexMapUrl.
  const mapWidget =
    "https://yandex.com/map-widget/v1/?display-text=%D1%81%D0%BF%D1%80%D0%B8%D0%BD%D0%B3%20%D0%B2%D0%B8%D0%BB%D0%BB%D0%B0%D0%B4%D0%B6&ll=29.477317%2C60.978670&mode=search&oid=193725846598&ol=biz&sctx=ZAAAAAgBEAAaKAoSCd7oYz4gbD1AERLZB1kWfk5AEhIJJ7wEpz6QjD8R%2BnspPGh2fT8iBgABAgMEBSgKOABAvoIGSAFqAnJ1nQHNzMw9oAEAqAEAvQFIXW1twgEGxqjX19EFggIb0YHQv9GA0LjQvdCzINCy0LjQu9C70LDQtNC2igIAkgIAmgIMZGVza3RvcC1tYXBz&sll=29.477317%2C60.978670&sspn=0.199386%2C0.070367&tab=related&text=%D1%81%D0%BF%D1%80%D0%B8%D0%BD%D0%B3%20%D0%B2%D0%B8%D0%BB%D0%BB%D0%B0%D0%B4%D0%B6&z=12.71";

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: interactive map */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-200">
            <iframe
              src={mapWidget}
              className="w-full h-full border-0"
              title="Spring Village на Михалёвском озере"
              loading="lazy"
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
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ближайший населённый пункт — Михалёво. Последние 2 км по лесной дороге.
            </p>
            <Link
              href="/ozero"
              className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-pine hover:gap-3 transition-all"
            >
              Подробнее о Михалёвском озере
              <ArrowRight className="w-4 h-4" />
            </Link>

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
