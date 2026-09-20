"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { readConsent, writeConsent, type ConsentValue } from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (readConsent()) return;
    setVisible(true);
    // Небольшая задержка: баннер не должен «прыгать» поверх первого экрана
    const t = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, []);

  function decide(value: ConsentValue) {
    writeConsent(value);
    setShown(false);
    setTimeout(() => setVisible(false), 350);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление о файлах cookie"
      className={[
        "fixed inset-x-0 bottom-[58px] md:bottom-0 z-[60] px-3 pb-3 sm:px-5 sm:pb-5",
        "transition-all duration-500 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      ].join(" ")}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div
        className="mx-auto max-w-5xl rounded-xl border border-white/10 px-4 py-3 sm:px-5 flex flex-col sm:flex-row sm:items-center gap-3"
        style={{
          background: "rgba(23,36,32,.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 12px 40px rgba(0,0,0,.28)",
        }}
      >
        <p className="text-[12.5px] leading-snug text-white/65 flex-1">
          Мы используем cookie, включая аналитические. Продолжая пользоваться сайтом, вы
          соглашаетесь с ними.{" "}
          <Link href="/cookies" className="underline underline-offset-2 text-white/85 hover:text-white transition-colors">
            Подробнее
          </Link>
          {" · "}
          <Link href="/privacy" className="underline underline-offset-2 text-white/85 hover:text-white transition-colors">
            Политика
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => decide("essential")}
            className="h-9 px-3.5 rounded-lg text-[12.5px] font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Только необходимые
          </button>
          <button
            onClick={() => decide("accepted")}
            className="h-9 px-4 rounded-lg bg-white/92 text-[12.5px] font-semibold text-[#1E231F] hover:bg-white transition-colors whitespace-nowrap"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
