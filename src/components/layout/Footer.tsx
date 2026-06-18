import Link from "next/link";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CONTACT, SITE } from "@/lib/data";

const footerLinks = {
  "Коттедж": [
    { href: "/dom",        label: "О доме" },
    { href: "/aktivnosti", label: "Активности" },
    { href: "/galereya",   label: "Галерея" },
  ],
  "Информация": [
    { href: "/doroga",   label: "Как добраться" },
    { href: "/faq",      label: "Вопросы и ответы" },
    { href: "/kontakty", label: "Контакты" },
    { href: "/privacy",  label: "Конфиденциальность" },
    { href: "/rules",    label: "Правила проживания" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-pine text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-5 block">
              <span className="font-display text-2xl font-bold block leading-none">{SITE.name}</span>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/45 block mt-0.5">{SITE.houseName}</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-6">
              {SITE.description}
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-white/55">
              <a href={`tel:${CONTACT.phoneDial}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 shrink-0" /> {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 shrink-0" /> {CONTACT.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {CONTACT.addressShort}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 shrink-0" /> Заезд 15:00 · Выезд 12:00 · Депозит 5 000 ₽
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
                aria-label="Instagram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35 mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/55 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mt-8 mb-6 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Конфиденциальность</Link>
            <Link href="/rules" className="hover:text-white/60 transition-colors">Правила</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
