"use client";

import { useEffect } from "react";
import { SITE } from "@/content/site";
import { analyticsAllowed, CONSENT_EVENT } from "@/lib/consent";

const SRC = "https://mc.yandex.ru/metrika/tag.js";

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };
  }
}

function inject() {
  if (document.querySelector(`script[src="${SRC}"]`)) return;

  window.ym =
    window.ym ||
    function (...args: unknown[]) {
      (window.ym!.a = window.ym!.a || []).push(args);
    };
  window.ym.l = Date.now();

  const script = document.createElement("script");
  script.src = SRC;
  script.async = true;
  document.head.appendChild(script);

  window.ym(Number(SITE.yandexMetricaId), "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

/**
 * Яндекс Метрика подключается только если пользователь не выбрал
 * «Только необходимые» в уведомлении о cookie.
 */
export function Metrica() {
  useEffect(() => {
    if (analyticsAllowed()) inject();

    function onConsentChange() {
      if (analyticsAllowed()) inject();
    }

    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
  }, []);

  return null;
}
