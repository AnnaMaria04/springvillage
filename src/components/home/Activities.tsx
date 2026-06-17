"use client";

import { useState } from "react";
import { ACTIVITIES, type Season } from "@/lib/data";
import { cn } from "@/lib/utils";

// Photo slot mapping per activity index (replace with real photos)
const photoBySeason: Record<Season, string[]> = {
  summer: [
    "/images/activity-kayak.jpg",
    "/images/activity-fishing.jpg",
    "/images/activity-swim.jpg",
    "/images/activity-bike.jpg",
    "/images/activity-bbq.jpg",
    "/images/activity-games.jpg",
  ],
  winter: [
    "/images/activity-banya.jpg",
    "/images/activity-ski.jpg",
    "/images/activity-skate.jpg",
    "/images/activity-icefish.jpg",
    "/images/activity-forest.jpg",
    "/images/activity-fireplace.jpg",
  ],
};

export function Activities() {
  const [season, setSeason] = useState<Season>("summer");

  return (
    <section id="activities" className="section-y bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">
              Активности
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground]">
              Чем заняться
            </h2>
          </div>

          {/* Season toggle */}
          <div className="flex rounded-2xl border border-[--border] overflow-hidden bg-[--cream] shrink-0 self-start sm:self-auto p-1">
            {(["summer", "winter"] as Season[]).map((s) => (
              <button
                key={s}
                onClick={() => setSeason(s)}
                className={cn(
                  "px-5 py-2 text-sm font-medium rounded-xl transition-all",
                  season === s
                    ? s === "summer"
                      ? "bg-[--primary] text-white"
                      : "bg-[--lake] text-white"
                    : "text-[--muted-foreground] hover:text-[--foreground]"
                )}
              >
                {s === "summer" ? "☀️ Лето" : "❄️ Зима"}
              </button>
            ))}
          </div>
        </div>

        {/* Photo cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACTIVITIES[season].map((activity, i) => (
            <div
              key={activity.title}
              className="group rounded-3xl overflow-hidden border border-[--border] bg-white hover:shadow-lg transition-all duration-300"
            >
              <div
                className="relative aspect-[3/2] bg-stone-300 bg-cover bg-center"
                style={{ backgroundImage: `url('${photoBySeason[season][i]}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="text-2xl">{activity.emoji}</span>
                  <h3 className="font-display text-lg font-bold text-white">{activity.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-[--muted-foreground] leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
