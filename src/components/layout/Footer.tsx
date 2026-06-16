import Link from "next/link";
import { TreePine, Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "./NewsletterForm";

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
    <footer className="bg-[--primary] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-xl font-bold">Spring Village</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Уютные коттеджи в окружении природы. Идеальное место для отдыха всей семьёй,
              романтических выходных и корпоративных мероприятий.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-white/70">
              <a href="tel:+74951234567" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +7 (495) 123-45-67
              </a>
              <a href="mailto:info@springvillage.ru" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@springvillage.ru
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                Московская область, 50 км от МКАД
              </div>
            </div>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="mt-10 border border-white/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-white mb-0.5">Специальные предложения на email</p>
            <p className="text-sm text-white/60">Скидки и новости — не чаще раза в месяц</p>
          </div>
          <NewsletterForm />
        </div>

        <Separator className="mt-8 mb-6 bg-white/15" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Spring Village. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/80 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-white/80 transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
