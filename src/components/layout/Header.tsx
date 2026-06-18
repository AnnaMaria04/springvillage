"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/content/site";
import { useBooking } from "@/context/booking-context";

const navLinks = [
  { href: "/dom",        label: "Коттедж" },
  { href: "/aktivnosti", label: "Активности" },
  { href: "/galereya",   label: "Галерея" },
  { href: "/kontakty",   label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[68px] lg:h-[84px]">
          <Link href="/" className="group">
            <span className={cn(
              "font-display text-2xl font-bold transition-colors leading-none block",
              scrolled ? "text-foreground" : "text-white"
            )}>
              Spring Village
            </span>
            <span className={cn(
              "text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors leading-none block mt-0.5",
              scrolled ? "text-muted-foreground" : "text-white/55"
            )}>
              Коттедж WILD
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-[15px] font-medium transition-all duration-150",
                  scrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className={cn(
                "flex items-center gap-2 text-[15px] font-medium transition-colors",
                scrolled ? "text-foreground hover:text-primary" : "text-white/85 hover:text-white"
              )}
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone}
            </a>
            <button
              onClick={openBooking}
              className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Забронировать
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            )}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-border">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3.5 text-sm font-medium text-foreground hover:text-primary border-b border-border last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <button
                onClick={() => { setOpen(false); openBooking(); }}
                className="flex items-center justify-center w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Забронировать
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
