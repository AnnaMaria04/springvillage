import Image from "next/image";
import { Send, ExternalLink } from "lucide-react";

const TELEGRAM_URL = "https://t.me/mos1k";
const VK_URL = "https://vk.com/Maksim_TripFish";
const INSTAGRAM_URL = "https://www.instagram.com/maksim_tripfish?utm_source=qr";

const POINTS = [
  "Катер Finval 550 с мотором 150 л.с. — комфорт и безопасность на воде",
  "Сонар Garmin Panoptix LiveScope — рыбу видно в реальном времени",
  "Гостевые комплекты снастей топового уровня — своё брать не нужно",
  "Приманки и топливо включены в стоимость",
  "До 3 гостей в катере; для компаний — выезд на нескольких катерах",
];

const PHOTOS = [
  { src: "/images/partners/fishing-trophy-1.jpg", alt: "Трофейная щука — рыбалка с гидом на Михалёвском озере" },
  { src: "/images/partners/fishing-trophy-2.jpg", alt: "Гости с трофейной щукой на катере гида" },
  { src: "/images/partners/fishing-trophy-3.jpg", alt: "Корпоративный выезд на рыбалку — трофейная щука" },
];

export function FishingPartner({ id, tone = "white" }: { id?: string; tone?: "white" | "cream" }) {
  return (
    <section id={id} className={tone === "cream" ? "bg-cream" : "bg-background"}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 lg:pt-14 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Рыбалка с гидом · партнёр Spring Village
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              Трофейная щука с профессиональным гидом
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Главный трофей Михалёвского озера — крупная щука. Наш партнёр — опытный гид,
              который берёт на борт и новичков, и продвинутых рыболовов: от вас только хорошее
              настроение и одежда по погоде.
            </p>

            <ul className="space-y-4 mb-10">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-pine/10 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-pine" />
                  </span>
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-8">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-pine text-white text-sm font-semibold hover:bg-pine/90 transition-colors whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                Записаться в Telegram
              </a>
              <a
                href={VK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border border-pine text-pine text-sm font-semibold hover:bg-pine/5 transition-colors whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4" />
                ВКонтакте
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border border-pine text-pine text-sm font-semibold hover:bg-pine/5 transition-colors whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4" />
                Instagram*
              </a>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-wood pl-4 mb-4">
              Рыбалку организует независимый партнёр: программа, свободные даты и оплата —
              напрямую с гидом. При записи скажите, что вы от{" "}
              <span className="text-foreground font-medium">Spring Village</span>. Мы отвечаем
              за проживание — коттедж WILD и турбазу.
            </p>

            <p className="text-[11px] text-muted-foreground/60 leading-snug">
              * Instagram принадлежит Meta Platforms Inc., признанной экстремистской организацией;
              её деятельность запрещена на территории РФ.
            </p>
          </div>

          {/* Trophy photos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] rounded-3xl overflow-hidden">
              <Image
                src={PHOTOS[0].src}
                fill
                alt={PHOTOS[0].alt}
                style={{ objectFit: "cover", objectPosition: "center 35%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            {PHOTOS.slice(1).map((p) => (
              <div key={p.src} className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src={p.src}
                  fill
                  alt={p.alt}
                  style={{ objectFit: "cover", objectPosition: "center 35%" }}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
