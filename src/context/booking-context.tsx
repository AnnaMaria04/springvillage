"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { KorbiOverlay } from "@/components/booking/KorbiOverlay";
import { AFRAME_UID, TURBAZA_UID } from "@/content/booking";

export type BookingOpts = {
  uid?: string;
  nights?: number;
  dfrom?: string;
  dto?: string;
  adults?: number;
  children?: number;
  childrenAges?: number[];
};

type BookingCtx = {
  isOpen: boolean;
  uid: string;
  nights: number | undefined;
  dfrom: string | undefined;
  dto: string | undefined;
  adults: number | undefined;
  children: number | undefined;
  childrenAges: number[] | undefined;
  openBooking: (opts?: BookingOpts) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingCtx | null>(null);

export function useBooking(): BookingCtx {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be called inside BookingProvider");
  return ctx;
}

export function BookingProvider({ children: childrenProp }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isOpen,        setIsOpen]        = useState(false);
  const [uid,           setUid]           = useState<string>(AFRAME_UID);
  const [nights,        setNights]        = useState<number | undefined>();
  const [dfrom,         setDfrom]         = useState<string | undefined>();
  const [dto,           setDto]           = useState<string | undefined>();
  const [adults,        setAdults]        = useState<number | undefined>();
  const [children,      setChildren]      = useState<number | undefined>();
  const [childrenAges,  setChildrenAges]  = useState<number[] | undefined>();

  const openBooking = useCallback((opts?: BookingOpts) => {
    const resolved = opts?.uid ?? (pathname?.startsWith("/turbaza") ? TURBAZA_UID : AFRAME_UID);
    setUid(resolved);
    setNights(opts?.nights);
    setDfrom(opts?.dfrom);
    setDto(opts?.dto);
    setAdults(opts?.adults);
    setChildren(opts?.children);
    setChildrenAges(opts?.childrenAges);
    setIsOpen(true);
  }, [pathname]);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ isOpen, uid, nights, dfrom, dto, adults, children, childrenAges, openBooking, closeBooking }}>
      {childrenProp}
      <KorbiOverlay />
    </BookingContext.Provider>
  );
}
