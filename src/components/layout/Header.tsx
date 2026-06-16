"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/cottages", label: "Коттеджи" },
  { href: "/pricing", label: "Цены" },
  { href: "/gallery", label: "Галерея" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[--border]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[--primary] flex items-center justify-center group-hover:bg-[--primary]/90 transition-colors">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <span
              className={cn(
                "font-serif text-xl font-bold transition-colors",
                scrolled ? "text-[--primary]" : "text-white"
              )}
            >
              Spring Village
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10",
                  scrolled
                    ? "text-[--foreground] hover:bg-[--muted] hover:text-[--primary]"
                    : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild size="default">
              <Link href="/booking">Забронировать</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-[--foreground] hover:bg-[--muted]" : "text-white hover:bg-white/10"
            )}
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[--border] shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-[--foreground] hover:bg-[--muted] hover:text-[--primary] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[--border] mt-2">
              <Button asChild className="w-full" size="lg">
                <Link href="/booking" onClick={() => setOpen(false)}>
                  Забронировать
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
