"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/content/site";
import { useBooking } from "@/context/booking-context";

const navLinks = [
  { href: "/dom",        label: "Коттедж" },
  { href: "/aktivnosti", label: "Активности" },
  { href: "/tseny",      label: "Цены" },
  { href: "/galereya",   label: "Галерея" },
  { href: "/turbaza",    label: "Турбаза" },
  { href: "/kontakty",   label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openBooking } = useBooking();
  const pathname = usePathname();
  const transparent = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 header-transition",
        transparent
          ? "bg-transparent"
          : "bg-cream/95 backdrop-blur-md border-b border-border"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[68px] lg:h-[84px]">
          <Link href="/" className="group">
            <span className={cn(
              "font-display text-2xl font-bold transition-colors leading-none block",
              transparent ? "text-white" : "text-foreground"
            )}>
              Spring Village
            </span>
            <span className={cn(
              "text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors leading-none block mt-0.5",
              transparent ? "text-white/70" : "text-muted-foreground"
            )}>
              Коттедж WILD
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "mx-1.5 px-2 py-2 border-b text-sm font-medium transition-colors duration-200",
                  pathname === link.href ? "border-pine text-pine" : "border-transparent",
                  transparent
                    ? "text-white/85 hover:text-white hover:border-white/60"
                    : "text-muted-foreground hover:text-pine hover:border-pine/40"
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
                transparent ? "text-white/85 hover:text-white" : "text-foreground hover:text-primary"
              )}
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone}
            </a>
            <button
              onClick={() => openBooking()}
              className={cn("inline-flex items-center justify-center h-11 px-6 rounded-sm text-sm font-medium transition-colors cursor-pointer", transparent ? "bg-cream text-pine hover:bg-white" : "bg-pine text-white hover:bg-moss")}
            >
              Забронировать
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden p-3 rounded-lg transition-colors",
              transparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
            )}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="lg:hidden bg-white border-t border-border">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="px-3 py-3.5 text-sm font-medium text-foreground hover:text-primary border-b border-border last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <button
                onClick={() => { setOpen(false); openBooking(); }}
                className="flex items-center justify-center w-full h-12 rounded-full bg-wood text-white text-sm font-semibold hover:bg-wood/90 transition-colors cursor-pointer"
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
