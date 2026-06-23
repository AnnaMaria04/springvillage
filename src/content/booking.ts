const UID = "12e2e2c5-b04f-4f43-ab36-3eff3f10dc16";
const BASE = `https://reservationsteps.ru/rooms/index/${UID}`;

function offsetDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function buildBookingUrl(opts?: { dfrom?: string; dto?: string; adults?: number; children?: number; childrenAges?: number[] }): string {
  const params = new URLSearchParams({
    lang: "ru",
    insidePopup: "1",
    adults: String(opts?.adults ?? 2),
  });
  const dfrom = opts?.dfrom ?? offsetDate(1);
  const dto   = opts?.dto   ?? offsetDate(2);
  params.set("dfrom", dfrom);
  params.set("dto",   dto);
  // Bnovo requires children as a JSON array of ages — never a plain count
  if (opts?.childrenAges && opts.childrenAges.length > 0) {
    params.set("children", JSON.stringify(opts.childrenAges));
  } else if (opts?.children && opts.children > 0) {
    params.set("children", JSON.stringify(Array(opts.children).fill(0)));
  }
  return `${BASE}?${params}`;
}

export const BOOKING = {
  uid: UID,
} as const;
