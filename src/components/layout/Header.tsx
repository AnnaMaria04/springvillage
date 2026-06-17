"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, TreePine, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/content/site";

const navLinks = [
  { href: "#services",   label: "Услуги" },
  { href: "#activities", label: "Активности" },
  { href: "#gallery",    label: "Галерея" },
  { href: "#pricing",    label: "Цены" },
  { href: "/doroga",     label: "Как добраться" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[--border]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              scrolled ? "bg-[--primary]" : "bg-white/15"
            )}>
              <TreePine className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className={cn(
                "font-display text-base font-bold transition-colors leading-none block",
                scrolled ? "text-[--foreground]" : "text-white"
              )}>
                Spring Village
              </span>
              <span className={cn(
                "text-[10px] font-medium tracking-wide transition-colors leading-none block mt-0.5",
                scrolled ? "text-[--muted-foreground]" : "text-white/55"
              )}>
                Коттедж WILD
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                  scrolled
                    ? "text-[--muted-foreground] hover:text-[--foreground] hover:bg-[--muted]"
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
                "flex items-center gap-2 text-sm font-medium transition-colors",
                scrolled ? "text-[--foreground] hover:text-[--primary]" : "text-white/85 hover:text-white"
              )}
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone}
            </a>
            <Button asChild size="sm">
              <Link href="#pricing">Забронировать</Link>
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-[--foreground] hover:bg-[--muted]" : "text-white hover:bg-white/10"
            )}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[--border]">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3.5 text-sm font-medium text-[--foreground] hover:text-[--primary] border-b border-[--border] last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Button asChild className="w-full" size="lg">
                <Link href="#pricing" onClick={() => setOpen(false)}>Забронировать</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
