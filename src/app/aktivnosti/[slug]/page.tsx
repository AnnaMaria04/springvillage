import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ACTIVITIES } from "@/content/activities";
import { BookingButton } from "@/components/booking/BookingButton";

// Flatten all activities
const allActivities = [...ACTIVITIES.summer, ...ACTIVITIES.winter];

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

  // Find related activities (same season, different slug, up to 3)
  const season = ACTIVITIES.summer.find((a) => a.slug === slug) ? "summer" : "winter";
  const related = ACTIVITIES[season].filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex flex-col justify-end bg-pine overflow-hidden">
        <Image
          src={activity.photo}
          fill
          alt={activity.title}
          style={{ objectFit: "cover" }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,28,22,0.75),rgba(20,28,22,0.2))]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-14 text-center">
          {/* Breadcrumb */}
          <Link
            href="/aktivnosti"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Все активности
          </Link>
          <h1
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            {activity.title}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <p className="text-muted-foreground text-lg leading-relaxed">{activity.description}</p>

        {activity.secondaryPhoto && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mt-12">
            <Image
              src={activity.secondaryPhoto}
              fill
              alt={activity.title}
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 768px"
              loading="lazy"
            />
          </div>
        )}

        <div className="mt-10">
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
                  <div className="media relative aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                    <Image
                      src={r.photo}
                      fill
                      alt={r.title}
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(20,28,22,0.6),transparent)]" />
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
