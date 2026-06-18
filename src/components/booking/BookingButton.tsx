"use client";

import { useBooking, type BookingOpts } from "@/context/booking-context";

type Props = {
  className?: string;
  opts?: BookingOpts;
  children: React.ReactNode;
};

export function BookingButton({ className, opts, children }: Props) {
  const { openBooking } = useBooking();
  return (
    <button onClick={() => openBooking(opts)} className={className}>
      {children}
    </button>
  );
}
