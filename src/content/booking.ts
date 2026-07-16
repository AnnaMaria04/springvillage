export const AFRAME_UID   = "12e2e2c5-b04f-4f43-ab36-3eff3f10dc16";
export const TURBAZA_UID  = "5c361e30-619d-4e12-85f0-f65c2e24b6d5";

function offsetDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function buildBookingUrl(opts?: {
  uid?: string;
  dfrom?: string;
  dto?: string;
  adults?: number;
  children?: number;
  childrenAges?: number[];
}): string {
  const uid  = opts?.uid ?? AFRAME_UID;
  const base = `https://reservationsteps.ru/rooms/index/${uid}`;
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
  return `${base}?${params}`;
}

export const BOOKING = {
  uid: AFRAME_UID,
} as const;
