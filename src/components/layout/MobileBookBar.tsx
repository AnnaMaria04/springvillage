"use client";

import { useState } from "react";
import { Calendar, Users, Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { BnovoModal } from "@/components/booking/BnovoModal";

export function MobileBookBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: full booking bar — hidden on small screens */}
      <div className="fixed top-20 left-0 right-0 z-40 hidden lg:block border-b border-white/10 bg-pine/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 flex items-center gap-3">
          <div className="hidden xl:block shrink-0 mr-4">
            <p className="text-white text-xs font-semibold uppercase tracking-wider">Бронирование</p>
            <p className="text-white/40 text-[11px] mt-0.5">Гарантированное заселение</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex-1 flex items-center gap-2.5 bg-white/10 hover:bg-white/15 transition-colors rounded-lg px-4 py-2.5 text-left cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-wider leading-none mb-0.5">Заезд</p>
              <p className="text-white text-sm font-medium">Выбрать дату</p>
            </div>
          </button>
          <div className="w-px h-7 bg-white/15 shrink-0" />
          <button
            onClick={() => setOpen(true)}
            className="flex-1 flex items-center gap-2.5 bg-white/10 hover:bg-white/15 transition-colors rounded-lg px-4 py-2.5 text-left cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-wider leading-none mb-0.5">Выезд</p>
              <p className="text-white text-sm font-medium">Выбрать дату</p>
            </div>
          </button>
          <div className="w-px h-7 bg-white/15 shrink-0" />
          <button
            onClick={() => setOpen(true)}
            className="flex-1 flex items-center gap-2.5 bg-white/10 hover:bg-white/15 transition-colors rounded-lg px-4 py-2.5 text-left cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-wider leading-none mb-0.5">Гости</p>
              <p className="text-white text-sm font-medium">до 5 гостей</p>
            </div>
          </button>
          <button
            onClick={() => setOpen(true)}
            className="shrink-0 h-10 px-6 rounded-lg bg-wood text-white text-sm font-semibold uppercase tracking-wider hover:bg-wood/85 transition-colors cursor-pointer"
          >
            Найти номер
          </button>
        </div>
      </div>

      {/* Mobile: simplified — phone + book */}
      <div className="fixed top-16 left-0 right-0 z-40 lg:hidden border-b border-white/10 bg-pine/95 backdrop-blur-sm">
        <div className="flex">
          <a
            href={`tel:${CONTACT.phoneDial}`}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white/80 hover:text-white text-sm font-medium border-r border-white/10 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Позвонить
          </a>
          <button
            onClick={() => setOpen(true)}
            className="flex-1 flex items-center justify-center py-3.5 bg-wood text-white text-sm font-semibold cursor-pointer"
          >
            Забронировать
          </button>
        </div>
      </div>

      <BnovoModal open={open} onOpenChange={setOpen} />
    </>
  );
}
