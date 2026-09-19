import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CONTACT, SITE } from "@/lib/data";
import { LEGAL } from "@/content/legal";

const footerLinks = {
  "Коттедж": [
    { href: "/dom",        label: "О доме" },
    { href: "/aktivnosti", label: "Активности" },
    { href: "/tseny",      label: "Цены и бронирование" },
    { href: "/galereya",   label: "Галерея" },
  ],
  "Информация": [
    { href: "/doroga",   label: "Как добраться" },
    { href: "/faq",      label: "Вопросы и ответы" },
    { href: "/kontakty", label: "Контакты" },
    { href: "/rules",    label: "Правила проживания" },
  ],
  "Документы": [
    { href: "/oferta",                   label: "Публичная оферта" },
    { href: "/privacy",                  label: "Обработка персональных данных" },
    { href: "/soglasie",                 label: "Согласие на обработку ПД" },
    { href: "/soglasie-rasprostranenie", label: "Согласие на распространение ПД" },
    { href: "/cookies",                  label: "Cookie и аналитика" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-pine text-white pb-[58px] md:pb-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-5 block">
              <span className="font-display text-2xl font-bold block leading-none">{SITE.name}</span>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/45 block mt-0.5">{SITE.houseName}</span>
            </Link>
            <p className="text-white/65 text-sm leading-relaxed max-w-xs mb-6">
              {SITE.description}
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-white/65">
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
                <Clock className="w-3.5 h-3.5 shrink-0" /> Заезд 15:00 · Выезд 12:00
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55 mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/65 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mt-8 mb-6 bg-white/10" />

        <div className="space-y-3 text-xs text-white/35">
          <p className="leading-relaxed">
            {LEGAL.entityFull} · ИНН {LEGAL.inn} · ОГРНИП {LEGAL.ogrnip}
            {LEGAL.registrationAddress ? ` · ${LEGAL.registrationAddress}` : ""}
          </p>
          <p className="leading-relaxed">
            Информация на сайте не является публичной офертой, за исключением{" "}
            <Link href="/oferta" className="underline hover:text-white/60 transition-colors">
              публичной оферты
            </Link>
            . Бронирование означает согласие с её условиями и{" "}
            <Link href="/rules" className="underline hover:text-white/60 transition-colors">
              правилами проживания
            </Link>
            .
          </p>
          <p>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
