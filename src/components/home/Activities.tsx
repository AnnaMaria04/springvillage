"use client";

import { useState } from "react";
import { ACTIVITIES, type Season } from "@/lib/data";
import { cn } from "@/lib/utils";

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
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
      {/* Season toggle */}
      <div className="flex justify-center mb-14">
        <div className="inline-flex rounded-full border border-[--border] bg-[--cream] p-1">
          {(["summer", "winter"] as Season[]).map((s) => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              className={cn(
                "px-7 py-2.5 text-sm font-medium rounded-full transition-all",
                season === s
                  ? s === "summer"
                    ? "bg-[--primary] text-white"
                    : "bg-[--lake] text-white"
                  : "text-[--muted-foreground] hover:text-[--foreground]"
              )}
            >
              {s === "summer" ? "Лето" : "Зима"}
            </button>
          ))}
        </div>
      </div>

      {/* Photo cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACTIVITIES[season].map((activity, i) => (
          <div key={activity.title}>
            <div
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-300 bg-cover bg-center mb-5"
              style={{ backgroundImage: `url('${photoBySeason[season][i]}')` }}
            />
            <h3 className="font-display text-xl font-bold text-[--foreground] mb-2">
              {activity.title}
            </h3>
            <p className="text-[--muted-foreground] leading-relaxed">{activity.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
