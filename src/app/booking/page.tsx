import { BnovoWidget } from "@/components/booking/BnovoWidget";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function BookingPage() {
  return (
    <div className="pt-20 min-h-screen bg-[--background]">
      {/* Header */}
      <div className="bg-[--muted] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Бронирование
          </h1>
          <p className="text-[--muted-foreground] text-lg max-w-xl">
            Выберите коттедж и даты прямо здесь — мгновенное подтверждение и лучшие цены.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Bnovo booking widget — main column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[--border] shadow-sm p-4 sm:p-6 overflow-hidden">
              <BnovoWidget />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact options */}
            <div className="bg-white rounded-2xl border border-[--border] shadow-sm p-6">
              <h2 className="font-serif text-lg font-bold text-[--foreground] mb-4">
                Нужна помощь?
              </h2>
              <p className="text-sm text-[--muted-foreground] mb-5">
                Если возникли вопросы — мы на связи ежедневно с 9:00 до 21:00.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+74951234567"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[--border] hover:border-[--primary]/40 hover:bg-[--muted] transition-all text-sm font-medium text-[--foreground]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[--primary]" />
                  </div>
                  +7 (495) 123-45-67
                </a>
                <a
                  href="mailto:info@springvillage.ru"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[--border] hover:border-[--primary]/40 hover:bg-[--muted] transition-all text-sm font-medium text-[--foreground]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[--primary]" />
                  </div>
                  info@springvillage.ru
                </a>
                <a
                  href="https://t.me/springvillage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[--border] hover:border-[--primary]/40 hover:bg-[--muted] transition-all text-sm font-medium text-[--foreground]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-[--primary]" />
                  </div>
                  Telegram
                </a>
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-[--muted] rounded-2xl p-6">
              <h2 className="font-serif text-lg font-bold text-[--foreground] mb-4">
                Гарантии
              </h2>
              <ul className="space-y-2.5 text-sm text-[--foreground]">
                {[
                  "Лучшая цена при бронировании напрямую",
                  "Бесплатная отмена за 48 часов",
                  "Мгновенное подтверждение",
                  "Поддержка 7 дней в неделю",
                  "Безопасная оплата",
                ].map((g) => (
                  <li key={g} className="flex items-start gap-2">
                    <span className="text-[--primary] font-bold shrink-0">✓</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
