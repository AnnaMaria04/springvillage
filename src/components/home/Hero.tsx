"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { SITE } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[--forest-dark]">
      {/* Background mesh gradient — designed for a real photo to sit behind this */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(45,80,22,0.55) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 60%, rgba(30,58,16,0.4) 0%, transparent 65%),
            radial-gradient(ellipse 100% 80% at 50% 100%, rgba(13,26,8,0.9) 0%, transparent 60%),
            linear-gradient(170deg, #0d1a08 0%, #1e3a10 40%, #2d5016 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Content — left-aligned editorial layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 lg:pb-24 pt-32 lg:pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-white/60 text-sm tracking-wide">
              {SITE.rating} · {SITE.reviewCount}+ отзывов
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-white leading-[0.95] mb-6">
            <span className="block text-[clamp(3.5rem,9vw,8rem)]">Уйти</span>
            <span className="block text-[clamp(3.5rem,9vw,8rem)]">в природу.</span>
            <span className="block text-[clamp(2rem,5vw,4.5rem)] text-white/45 font-normal mt-2">
              50 км от Москвы.
            </span>
          </h1>

          <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-lg mb-10">
            {SITE.totalCottages} коттеджей в лесу, у пруда, в яблоневом саду.
            Баня, мангал, Wi-Fi — и тишина.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-[--primary] hover:bg-white/90 font-semibold h-12 px-7 text-base shadow-lg shadow-black/20"
            >
              <Link href="/cottages">
                Смотреть коттеджи
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-white border border-white/20 hover:bg-white/10 hover:text-white h-12 px-7 text-base"
            >
              <Link href="/booking">Забронировать</Link>
            </Button>
          </div>
        </div>

        {/* Stats row at bottom */}
        <div className="mt-16 lg:mt-20 grid grid-cols-3 sm:grid-cols-3 gap-0 max-w-md border border-white/10 rounded-2xl overflow-hidden">
          {[
            { value: `${SITE.totalCottages}`, label: "коттеджей" },
            { value: `${SITE.totalGuests}+`, label: "гостей" },
            { value: `${SITE.yearsOperating} лет`, label: "работаем" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`px-5 py-4 text-center ${i < 2 ? "border-r border-white/10" : ""} glass`}
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/45 mt-0.5 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint line */}
      <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 text-white/25 text-xs tracking-widest uppercase">
        <div className="w-12 h-px bg-white/20" />
        scroll
      </div>
    </section>
  );
}
