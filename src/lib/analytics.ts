/**
 * Thin wrapper over the Yandex Metrica counter already loaded in the root
 * layout. No new analytics package — if Metrica hasn't loaded (ad blocker,
 * SSR, dev), calls are silently ignored.
 */
import { SITE } from "@/content/site";

type YmFn = (id: string | number, action: string, ...rest: unknown[]) => void;

export function track(goal: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const ym = (window as unknown as { ym?: YmFn }).ym;
  if (typeof ym !== "function") return;
  try {
    ym(SITE.yandexMetricaId, "reachGoal", goal, params);
  } catch {
    /* analytics must never break the booking flow */
  }
}
