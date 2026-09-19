"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { readConsent, writeConsent, type ConsentValue } from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
  }, []);

  function decide(value: ConsentValue) {
    writeConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление о файлах cookie"
      className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="max-w-2xl mx-auto bg-ink text-white rounded-2xl shadow-2xl p-5 flex flex-col lg:flex-row items-start lg:items-center gap-4">
        <p className="text-sm text-white/80 leading-relaxed flex-1">
          Мы используем файлы cookie: технически необходимые — для работы сайта и формы
          бронирования, аналитические — для обезличенной статистики посещаемости. Подробнее в{" "}
          <Link href="/cookies" className="underline text-white hover:text-white/70 transition-colors">
            разделе о cookie
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className="underline text-white hover:text-white/70 transition-colors">
            политике обработки персональных данных
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0 w-full lg:w-auto">
          <button
            onClick={() => decide("essential")}
            className="flex-1 lg:flex-none h-11 px-4 rounded-xl border border-white/25 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
          >
            Только необходимые
          </button>
          <button
            onClick={() => decide("accepted")}
            className="flex-1 lg:flex-none h-11 px-5 rounded-xl bg-moss text-white text-sm font-semibold hover:bg-pine transition-colors whitespace-nowrap"
          >
            Принять все
          </button>
        </div>
      </div>
    </div>
  );
}
