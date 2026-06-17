"use client";

import { useState } from "react";
import { Calendar, Users } from "lucide-react";
import { BnovoModal } from "@/components/booking/BnovoModal";

export function BookingBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-pine border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Label — desktop only */}
          <div className="hidden lg:block shrink-0 mr-4">
            <p className="text-white text-xs font-semibold uppercase tracking-wider">
              Бронирование
            </p>
            <p className="text-white/40 text-xs mt-0.5">Гарантированное заселение</p>
          </div>

          {/* Date: check-in */}
          <button
            onClick={() => setOpen(true)}
            className="flex-1 flex items-center gap-3 bg-white/10 hover:bg-white/16 transition-colors rounded-xl px-4 py-3 text-left cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-white/40 shrink-0" />
            <div>
              <p className="text-white/40 text-[11px] uppercase tracking-wider leading-none mb-1">
                Заезд
              </p>
              <p className="text-white text-sm font-medium">Выбрать дату</p>
            </div>
          </button>

          <div className="hidden sm:block w-px h-8 bg-white/15 shrink-0" />

          {/* Date: check-out */}
          <button
            onClick={() => setOpen(true)}
            className="flex-1 flex items-center gap-3 bg-white/10 hover:bg-white/16 transition-colors rounded-xl px-4 py-3 text-left cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-white/40 shrink-0" />
            <div>
              <p className="text-white/40 text-[11px] uppercase tracking-wider leading-none mb-1">
                Выезд
              </p>
              <p className="text-white text-sm font-medium">Выбрать дату</p>
            </div>
          </button>

          <div className="hidden sm:block w-px h-8 bg-white/15 shrink-0" />

          {/* Guests */}
          <button
            onClick={() => setOpen(true)}
            className="flex-1 flex items-center gap-3 bg-white/10 hover:bg-white/16 transition-colors rounded-xl px-4 py-3 text-left cursor-pointer"
          >
            <Users className="w-4 h-4 text-white/40 shrink-0" />
            <div>
              <p className="text-white/40 text-[11px] uppercase tracking-wider leading-none mb-1">
                Гости
              </p>
              <p className="text-white text-sm font-medium">до 5 гостей</p>
            </div>
          </button>

          {/* CTA */}
          <button
            onClick={() => setOpen(true)}
            className="btn-lux shrink-0 h-12 px-8 rounded-xl bg-wood text-white text-sm font-semibold uppercase tracking-wider cursor-pointer"
          >
            Найти номер
          </button>
        </div>
      </div>

      <BnovoModal open={open} onOpenChange={setOpen} />
    </>
  );
}
