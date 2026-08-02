import Image from "next/image";
import { Send, ExternalLink } from "lucide-react";

const TELEGRAM_URL = "https://t.me/mos1k";
const INSTAGRAM_URL = "https://www.instagram.com/maksim_tripfish?utm_source=qr";

const CHIPS = [
  "Катер Finval 550 · 150 л.с.",
  "Сонар Garmin Panoptix LiveScope",
  "До 3 гостей в катере",
  "Снасти, приманки и ГСМ включены",
  "Корпоративные выезды — несколько катеров",
];

const PHOTOS = [
  { src: "/images/partners/fishing-trophy-1.jpg", alt: "Трофейная щука — рыбалка с гидом на Михалёвском озере" },
  { src: "/images/partners/fishing-trophy-2.jpg", alt: "Гости с трофейной щукой на катере гида" },
  { src: "/images/partners/fishing-trophy-3.jpg", alt: "Корпоративный выезд на рыбалку — трофейная щука" },
];

export function FishingPartner({ id, tone = "white" }: { id?: string; tone?: "white" | "cream" }) {
  return (
    <section id={id} className={tone === "cream" ? "bg-cream" : "bg-background"}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wood mb-4">
              Партнёр Spring Village · рыбалка с гидом
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              Трофейная щука с профессиональным гидом
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Выход на воду за трофейной рыбой с опытным гидом — на катере Finval 550 с мотором
              150 л.с. и сонаром Garmin Panoptix LiveScope. Главный трофей Михалёвского озера —
              крупная щука. Формат подойдёт и новичкам, и опытным рыболовам.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              О снастях можно не думать: гостевые комплекты топового уровня, приманки и топливо
              уже включены в стоимость. От вас — хорошее настроение и одежда по погоде.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {CHIPS.map((c) => (
                <span key={c} className="text-xs font-medium text-foreground bg-pine/5 border border-pine/15 rounded-full px-3 py-1.5">
                  {c}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-pine text-white text-sm font-semibold hover:bg-pine/90 transition-colors"
              >
                <Send className="w-4 h-4" />
                Записаться в Telegram — @mos1k
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Instagram*
              </a>
            </div>

            <div className={`rounded-2xl border border-border p-5 text-sm text-muted-foreground leading-relaxed ${tone === "cream" ? "bg-white" : "bg-cream"}`}>
              Рыбалку организует независимый партнёр: программа, свободные даты и оплата — напрямую
              с гидом. При записи скажите, что вы от <span className="text-foreground font-medium">Spring Village</span>.
              Мы отвечаем за проживание — коттедж WILD и турбазу.
            </div>

            <p className="text-[11px] text-muted-foreground/60 leading-snug mt-4">
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
