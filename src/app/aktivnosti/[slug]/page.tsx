import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ACTIVITIES } from "@/content/activities";
import { BookingButton } from "@/components/booking/BookingButton";
import { BookingBar } from "@/components/home/BookingBar";

const allActivities = [...ACTIVITIES.summer, ...ACTIVITIES.winter];

type GalleryPhoto = { src: string; position?: string };

type ActivityGallery = {
  photos: GalleryPhoto[];
  fishInfo?: string[];
  fishText?: string;
  extraText?: string;
};

const ACTIVITY_GALLERIES: Record<string, ActivityGallery> = {
  bajdarki: {
    photos: [
      { src: "/images/activity-sup-dog.jpeg" },
      { src: "/images/activity-sup-dog-board.jpeg" },
      { src: "/images/activity-sup-gear.jpeg" },
    ],
  },
  rybalka: {
    photos: [
      { src: "/images/activity-fishing-catch.jpeg", position: "center 30%" },
      { src: "/images/activity-rental-boats.jpeg" },
      { src: "/images/lifestyle-dog-boat-lake.jpeg" },
    ],
    fishInfo: ["Щука", "Окунь", "Плотва", "Лещ", "Налим", "Судак", "Линь", "Ряпушка"],
    fishText: "Михалёвское озеро — 11,5 км в длину, глубина до 21 м. Чистая вода, без моторных лодок. Рыбачить можно с пирса или с лодки прямо с территории — снасти в наличии.",
  },
  kupanie: {
    photos: [
      { src: "/images/feature-lake-sunset.jpg" },
      { src: "/images/lake-panorama-autumn.jpeg" },
      { src: "/images/activity-boat-lake.jpeg" },
    ],
  },
  priroda: {
    photos: [
      { src: "/images/activity-forest-walk.jpg" },
      { src: "/images/lifestyle-couple-forest-walk.jpg" },
      { src: "/images/lifestyle-couple-stone-path.jpg" },
    ],
  },
  mangal: {
    photos: [
      { src: "/images/exterior-spring-back.jpg" },
      { src: "/images/territory-firewood-shed.jpeg" },
    ],
  },
  igry: {
    photos: [
      { src: "/images/activity-petanque.jpg" },
      { src: "/images/activity-basketball-court.jpeg" },
      { src: "/images/activity-knife-target.jpeg" },
    ],
    extraText: "Петанк, метание ножей, баскетбол, настольные игры. Всё оборудование предоставляется.",
  },
};

export function generateStaticParams() {
  return allActivities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activity = allActivities.find((a) => a.slug === slug);
  if (!activity) return {};
  return {
    title: activity.title,
    description: activity.description,
    alternates: { canonical: `/aktivnosti/${slug}` },
  };
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = allActivities.find((a) => a.slug === slug);
  if (!activity) notFound();

  const season = ACTIVITIES.summer.find((a) => a.slug === slug) ? "summer" : "winter";
  const related = ACTIVITIES[season].filter((a) => a.slug !== slug).slice(0, 3);
  const gallery = ACTIVITY_GALLERIES[slug] ?? { photos: [] };

  return (
    <article>
      {/* Hero — dark green, no background image */}
      <section className="relative bg-pine flex flex-col justify-end min-h-[50vh] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/aktivnosti" className="hover:text-white transition-colors">Активности</Link>
            <span>/</span>
            <span className="text-white/80">{activity!.title}</span>
          </nav>
          <h1
            className="font-display font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            {activity!.title}
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-xl">{activity!.description}</p>
        </div>
      </section>

      {/* Booking bar */}
      <BookingBar />

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        {/* Fish info for rybalka */}
        {gallery.fishInfo && (
          <div className="mb-12 p-6 rounded-2xl bg-cream border border-border">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Какая рыба водится в Михалёвском озере:
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {gallery.fishInfo.map((fish) => (
                <li key={fish} className="flex items-center gap-2 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-moss shrink-0" />
                  {fish}
                </li>
              ))}
            </ul>
            {gallery.fishText && (
              <p className="text-muted-foreground">{gallery.fishText}</p>
            )}
          </div>
        )}

        {/* Extra text for igry */}
        {gallery.extraText && (
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">{gallery.extraText}</p>
        )}

        {/* Image gallery */}
        {gallery.photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.photos.map((p, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src={p.src}
                  fill
                  alt={activity!.title}
                  style={{ objectFit: "cover", objectPosition: p.position ?? "center 50%" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <BookingButton className="btn-lux inline-flex items-center h-13 px-10 rounded-full bg-primary text-white text-base font-semibold cursor-pointer">
            Забронировать
          </BookingButton>
        </div>
      </section>

      {/* Related activities */}
      {related.length > 0 && (
        <section className="bg-cream py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Другие активности
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/aktivnosti/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                    <Image
                      src={r.photo}
                      fill
                      alt={r.title}
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(20,28,22,0.75),transparent)]" />
                    <h3 className="absolute bottom-4 left-4 right-4 z-10 font-display text-lg font-bold text-white">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
