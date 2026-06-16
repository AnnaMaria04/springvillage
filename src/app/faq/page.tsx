import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Phone, MessageCircle } from "lucide-react";

const faqs = [
  {
    section: "Бронирование",
    items: [
      { q: "Как забронировать коттедж?", a: "Выберите коттедж на сайте, укажите даты и количество гостей, нажмите «Забронировать» и заполните форму. Мы подтвердим бронирование в течение 15 минут по телефону или email." },
      { q: "Нужна ли предоплата?", a: "Нет. Мы не требуем предоплаты при бронировании. Оплата производится при заезде наличными или банковским переводом." },
      { q: "Можно ли отменить бронирование?", a: "Да. Бесплатная отмена возможна за 48 часов до даты заезда. При отмене менее чем за 48 часов взимается стоимость одной ночи." },
      { q: "Как узнать доступность дат?", a: "Используйте календарь на странице коттеджа или форму быстрого поиска на главной странице. Также можно уточнить по телефону или в WhatsApp." },
    ],
  },
  {
    section: "Проживание",
    items: [
      { q: "Во сколько заезд и выезд?", a: "Заезд с 14:00, выезд до 12:00. Ранний заезд (от 10:00) и поздний выезд (до 16:00) доступны по запросу при наличии свободных дат, бесплатно." },
      { q: "Можно ли приехать с домашними животными?", a: "Домашние животные принимаются в большинстве коттеджей по предварительному согласованию. Просим уточнить заранее при бронировании." },
      { q: "Есть ли Wi-Fi?", a: "Да, высокоскоростной Wi-Fi (100+ Мбит/с) доступен бесплатно во всех коттеджах и на территории." },
      { q: "Есть ли охрана на территории?", a: "Да. Территория Spring Village огорожена, оборудована видеонаблюдением и охраняется круглосуточно." },
    ],
  },
  {
    section: "Цены и оплата",
    items: [
      { q: "Как рассчитывается итоговая стоимость?", a: "Стоимость зависит от выбранного коттеджа, количества ночей и сезона (будни / выходные). Используйте калькулятор цены на странице коттеджа — итоговая сумма отображается мгновенно." },
      { q: "Есть ли скидки при длительном проживании?", a: "Да. При бронировании от 7 ночей — скидка 15%, от 30 ночей — скидка 30%. Скидки суммируются с сезонными акциями." },
      { q: "Какие способы оплаты принимаются?", a: "Наличными при заезде, банковским переводом на карту, или онлайн через систему бронирования Bnovo." },
      { q: "Включены ли коммунальные услуги в цену?", a: "Да. Электричество, вода, отопление, вывоз мусора — всё включено в стоимость." },
    ],
  },
  {
    section: "Услуги и удобства",
    items: [
      { q: "Есть ли баня?", a: "Баня (русская) есть в большинстве коттеджей, входит в стоимость проживания. В коттедже «Кедровая» — финская сауна." },
      { q: "Можно ли жарить шашлык?", a: "Да! У каждого коттеджа есть мангальная зона. Дрова и уголь предоставляются бесплатно." },
      { q: "Есть ли возможность заказать трансфер?", a: "Да, трансфер от Москвы организуем по запросу. Стоимость и расписание уточняйте при бронировании." },
      { q: "Что нужно взять с собой?", a: "Всё необходимое в коттедже есть: постельное бельё, полотенца, посуда, кухонные принадлежности. Возьмите только личные вещи и продукты питания." },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="pt-20 min-h-screen bg-[--background]">
      <div className="bg-[--muted] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Вопросы и ответы
          </h1>
          <p className="text-[--muted-foreground] text-lg">
            Ответы на самые частые вопросы наших гостей
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {faqs.map((section) => (
          <div key={section.section}>
            <h2 className="font-serif text-xl font-bold text-[--foreground] mb-3">
              {section.section}
            </h2>
            <div className="bg-white rounded-2xl border border-[--border] px-5">
              <Accordion>
                {section.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q} trigger={item.q}>
                    {item.a}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div className="bg-[--primary] rounded-2xl p-8 text-white text-center">
          <h2 className="font-serif text-2xl font-bold mb-2">Не нашли ответ?</h2>
          <p className="text-white/70 mb-6 text-sm">
            Напишите нам — ответим в течение 15 минут
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="secondary">
              <a href="tel:+74951234567">
                <Phone className="w-4 h-4" /> Позвонить
              </a>
            </Button>
            <Button asChild className="bg-[#25D366] hover:bg-[#1db954] text-white">
              <a href="https://wa.me/74951234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              <Link href="/contact">Написать нам</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
