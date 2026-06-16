import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, BedDouble, Bath, Star, CheckCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PriceCalculator } from "@/components/cottages/PriceCalculator";
import { MobileStickyBar } from "@/components/cottages/MobileStickyBar";
import { CottageReviews } from "@/components/cottages/CottageReviews";
import { RelatedCottages } from "@/components/cottages/RelatedCottages";
import { COTTAGES, getCottage } from "@/lib/data";

export function generateStaticParams() {
  return COTTAGES.map((c) => ({ slug: c.slug }));
}

export default async function CottagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cottage = getCottage(slug);
  if (!cottage) notFound();

  return (
    <div className="pt-16 min-h-screen bg-[--background] pb-24 lg:pb-0">
      {/* Nav */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 pb-2">
        <Link
          href="/cottages"
          className="inline-flex items-center gap-1.5 text-sm text-[--muted-foreground] hover:text-[--primary] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Все коттеджи
        </Link>
      </div>

      {/* Hero */}
      <div
        className={`relative h-64 sm:h-96 lg:h-[480px] bg-gradient-to-br ${cottage.color} flex items-end overflow-hidden`}
      >
        {/* Big initial watermark */}
        <span className="absolute inset-0 flex items-center justify-center font-display text-[20vw] text-white/8 font-bold select-none leading-none">
          {cottage.name[0]}
        </span>
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              {cottage.badge && (
                <Badge className="mb-3">{cottage.badge}</Badge>
              )}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
                «{cottage.name}»
              </h1>
              <p className="text-white/65">{cottage.tagline}</p>
            </div>
            <div className="shrink-0 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-sm font-semibold">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {cottage.rating}
              <span className="text-white/50 font-normal">({cottage.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Specs */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[--muted-foreground] pb-6 border-b border-[--border]">
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> До {cottage.capacity} гостей</span>
              <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {cottage.bedrooms} спальни</span>
              <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {cottage.bathrooms} санузла</span>
            </div>

            {/* Highlights pills */}
            <div className="flex flex-wrap gap-2">
              {cottage.highlights.map((h) => (
                <span
                  key={h}
                  className="bg-[--muted] text-[--foreground] text-sm font-medium rounded-full px-4 py-2"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display text-xl font-bold text-[--foreground] mb-3">Описание</h2>
              <p className="text-[--muted-foreground] leading-relaxed">{cottage.longDescription}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-display text-xl font-bold text-[--foreground] mb-4">Удобства</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cottage.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 text-sm text-[--foreground]">
                    <CheckCircle className="w-4 h-4 text-[--primary] shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Included / not */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[--muted] rounded-2xl p-5">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-[--muted-foreground] mb-3">Включено</h3>
                <ul className="space-y-2">
                  {cottage.included.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[--foreground]">
                      <span className="text-[--primary] font-bold shrink-0 mt-0.5">✓</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[--muted] rounded-2xl p-5">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-[--muted-foreground] mb-3">Не включено</h3>
                <ul className="space-y-2">
                  {cottage.notIncluded.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[--muted-foreground]">
                      <span className="shrink-0 mt-0.5 opacity-50">✕</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rules */}
            <div className="border border-[--border] rounded-2xl p-5">
              <h2 className="font-display text-xl font-bold text-[--foreground] mb-4">Правила проживания</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-[--muted-foreground]">
                {[
                  "Заезд с 14:00, выезд до 12:00",
                  "Курение только на улице",
                  "Домашние животные по согласованию",
                  "Тишина после 23:00",
                  "Уборка включена",
                  "Самостоятельный заезд",
                ].map((r) => (
                  <div key={r} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[--border] shrink-0" />
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <CottageReviews slug={slug} />

            {/* Related */}
            <RelatedCottages currentSlug={slug} />
          </div>

          {/* Sidebar — desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl border border-[--border] shadow-md p-6">
              <PriceCalculator
                slug={slug}
                priceWeekday={cottage.priceWeekday}
                priceWeekend={cottage.priceWeekend}
                maxGuests={cottage.capacity}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileStickyBar slug={slug} price={cottage.priceWeekday} />
    </div>
  );
}
