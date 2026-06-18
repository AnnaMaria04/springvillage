const UID = "12e2e2c5-b04f-4f43-ab36-3eff3f10dc16";
const BASE = `https://reservationsteps.ru/rooms/index/${UID}`;

export function buildBookingUrl(opts?: { dfrom?: string; dto?: string; adults?: number; children?: number }): string {
  const params = new URLSearchParams({
    lang: "ru",
    insidePopup: "1",
    adults: String(opts?.adults ?? 2),
  });
  if (opts?.dfrom) params.set("dfrom", opts.dfrom);
  if (opts?.dto) params.set("dto", opts.dto);
  if (opts?.children && opts.children > 0) params.set("children", String(opts.children));
  return `${BASE}?${params}`;
}

export const BOOKING = {
  uid: UID,
  moduleUrl: buildBookingUrl(),
} as const;
