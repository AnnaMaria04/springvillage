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
      aria-label="Уведомление о cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="max-w-2xl mx-auto bg-ink text-white rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/80 leading-relaxed flex-1">
          Мы используем cookies, включая аналитические. Продолжая использование, вы
          соглашаетесь с{" "}
          <Link href="/cookies" className="underline text-white hover:text-white/70 transition-colors">
            использованием cookies
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className="underline text-white hover:text-white/70 transition-colors">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          {/* Кнопка отказа — не оформление, а требование: без неё отказаться от
              аналитики нельзя, и переключатель Метрики в Metrica.tsx не работает. */}
          <button
            onClick={() => decide("essential")}
            className="h-11 px-4 rounded-xl border border-white/25 text-white/75 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
          >
            Только необходимые
          </button>
          <button
            onClick={() => decide("accepted")}
            className="h-11 px-5 rounded-xl bg-moss text-white text-sm font-semibold hover:bg-pine transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}
