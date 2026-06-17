"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_KEY = "sv_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление о cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="max-w-2xl mx-auto bg-[--ink] text-white rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/80 leading-relaxed flex-1">
          Мы используем cookies для аналитики и улучшения сайта. Продолжая использование, вы соглашаетесь с{" "}
          <Link href="/privacy" className="underline text-white hover:text-white/70 transition-colors">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 h-9 px-5 rounded-xl bg-[--moss] text-white text-sm font-semibold hover:bg-[--pine] transition-colors"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
