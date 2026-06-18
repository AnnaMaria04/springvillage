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

      {/* Photo cards — each links to its own page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACTIVITIES[season].map((activity) => (
          <Link key={activity.slug} href={`/aktivnosti/${activity.slug}`} className="group block">
            <div className="media relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-300 mb-5">
              <Image
                src={activity.photo}
                alt={activity.title}
                fill
                className="object-cover object-center media-img"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
    </section>
  );
}
