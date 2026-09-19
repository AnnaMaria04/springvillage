/** Выбор пользователя в уведомлении о cookie. */
export type ConsentValue = "accepted" | "essential";

export const CONSENT_KEY = "sv_cookie_consent";
export const CONSENT_EVENT = "sv:consent-change";

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw === "essential" || raw === "accepted" ? raw : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* приватный режим — просто не запоминаем выбор */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/**
 * Аналитика подключается, пока пользователь явно от неё не отказался.
 * Отказ («Только необходимые») уважается на всех последующих визитах.
 */
export function analyticsAllowed(): boolean {
  return readConsent() !== "essential";
}
