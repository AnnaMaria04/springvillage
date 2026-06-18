"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { KorbiOverlay } from "@/components/booking/KorbiOverlay";

export type BookingOpts = { nights?: number };

type BookingCtx = {
  isOpen: boolean;
  nights: number | undefined;
  openBooking: (opts?: BookingOpts) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingCtx | null>(null);

export function useBooking(): BookingCtx {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be called inside BookingProvider");
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [nights, setNights] = useState<number | undefined>();

  const openBooking = useCallback((opts?: BookingOpts) => {
    setNights(opts?.nights);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ isOpen, nights, openBooking, closeBooking }}>
      {children}
      <KorbiOverlay />
    </BookingContext.Provider>
  );
}
