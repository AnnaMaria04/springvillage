"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Star, Users, Calendar } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient (placeholder until real photo) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1a3009] via-[#2d5016] to-[#3d6b20]"
        aria-hidden="true"
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Light rays effect */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-800/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-8">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span>Более 500 довольных гостей</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6">
          Ваш отдых
          <br />
          <span className="text-emerald-300">в природе</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
          Уютные коттеджи в окружении леса. Тишина, свежий воздух и всё необходимое
          для незабываемого отдыха — всего в 50 км от Москвы.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="xl" className="bg-white text-[--primary] hover:bg-white/90 shadow-xl">
            <Link href="/booking">
              <Calendar className="w-5 h-5" />
              Забронировать
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/60">
            <Link href="/cottages">
              <Users className="w-5 h-5" />
              Смотреть коттеджи
            </Link>
          </Button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "12", label: "коттеджей" },
            { value: "500+", label: "гостей" },
            { value: "4.9", label: "рейтинг" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white">{stat.value}</div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce"
        aria-label="Прокрутить вниз"
      >
        <ChevronDown className="w-7 h-7" />
      </button>
    </section>
  );
}
