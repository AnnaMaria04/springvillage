"use client";

import { useState } from "react";
import { ACTIVITIES, type Season } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Activities() {
  const [season, setSeason] = useState<Season>("summer");

  return (
    <section id="activities" className="section-y bg-[--muted]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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
          <div className="flex rounded-xl border border-[--border] overflow-hidden bg-white shrink-0 self-start sm:self-auto">
            {(["summer", "winter"] as Season[]).map((s) => (
              <button
                key={s}
                onClick={() => setSeason(s)}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium transition-all",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTIVITIES[season].map((activity, i) => (
            <div
              key={activity.title}
              className="bg-white rounded-2xl border border-[--border] p-6 hover-lift"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="text-3xl mb-4">{activity.emoji}</div>
              <h3 className="font-display text-lg font-bold text-[--foreground] mb-2">
                {activity.title}
              </h3>
              <p className="text-sm text-[--muted-foreground] leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
