import Link from "next/link";
import { TreePine, Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "./NewsletterForm";
import { CONTACT, SITE } from "@/lib/data";

const footerLinks = {
  Гостям: [
    { href: "/cottages", label: "Коттеджи" },
    { href: "/pricing", label: "Цены и пакеты" },
    { href: "/booking", label: "Бронирование" },
    { href: "/gallery", label: "Галерея" },
    { href: "/reviews", label: "Отзывы" },
  ],
  Информация: [
    { href: "/about", label: "О нас" },
    { href: "/contact", label: "Контакты" },
    { href: "/faq", label: "Вопросы и ответы" },
    { href: "/rules", label: "Правила проживания" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[--forest-dark] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <TreePine className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold">{SITE.name}</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-6">
              {SITE.description} Баня, мангал, тишина — всё для настоящего отдыха.
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
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="w-3.5 h-3.5" />
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

        {/* Newsletter */}
        <div className="mt-10 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-1">
            <p className="font-semibold text-white mb-0.5">Специальные предложения</p>
            <p className="text-sm text-white/45">Скидки раз в месяц. Без спама.</p>
          </div>
          <NewsletterForm />
        </div>

        <Separator className="mt-8 mb-6 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Конфиденциальность</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Условия</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
