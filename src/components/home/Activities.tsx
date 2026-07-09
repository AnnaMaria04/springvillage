"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ACTIVITIES, type Season } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Activities() {
  const [season, setSeason] = useState<Season>("summer");

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
      {/* Season toggle */}
      <div className="flex justify-center mb-14">
        <div className="inline-flex rounded-full border border-border bg-cream p-1">
          {(["summer", "winter"] as Season[]).map((s) => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              className={cn(
                "px-7 py-2.5 text-sm font-medium rounded-full transition-all",
                season === s
                  ? s === "summer"
                    ? "bg-primary text-white"
                    : "bg-lake text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s === "summer" ? "Лето" : "Зима"}
            </button>
          ))}
        </div>
      </div>

      {season === "winter" ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Скоро — зима 2026
          </p>
          <p className="text-muted-foreground text-lg max-w-md">
            Зимний сезон открываем в декабре 2026. Коньки, лыжи, зимняя рыбалка и камин — следите за обновлениями.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACTIVITIES[season].map((activity) => (
            <Link key={activity.slug} href={`/aktivnosti/${activity.slug}`} className="group block">
              <div className="media relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-300 mb-5">
                <Image
                  src={activity.photo}
                  fill
                  alt={activity.title}
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-moss transition-colors">
                {activity.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
                {activity.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
