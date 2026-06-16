import Link from "next/link";
import { TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/data";

export const metadata = {
  title: "О нас — Spring Village",
  description: `Загородный комплекс Spring Village — ${SITE.yearsOperating} лет принимаем гостей в Подмосковье. Узнайте нашу историю.`,
};

const milestones = [
  { year: "2018", event: "Основание Spring Village — первые 3 коттеджа" },
  { year: "2019", event: "Расширение до 6 коттеджей, открытие банного комплекса" },
  { year: "2021", event: "Реновация всех коттеджей, запуск онлайн-бронирования" },
  { year: "2023", event: `${SITE.totalCottages} коттеджей, более ${SITE.totalGuests} гостей, рейтинг ${SITE.rating}★` },
];

const team = [
  { name: "Анна Бережная", role: "Основатель и управляющий", initials: "АБ" },
  { name: "Сергей Комаров", role: "Главный по хозяйству", initials: "СК" },
  { name: "Ольга Никитина", role: "Менеджер по бронированию", initials: "ОН" },
];

const values = [
  {
    number: "01",
    title: "С душой",
    text: "Каждый коттедж — это наша забота о гостях. Мы продумали каждую деталь для вашего комфорта.",
  },
  {
    number: "02",
    title: "Для всех",
    text: "Пары, семьи с детьми, компании друзей, корпоративные группы — у нас найдётся место для каждого.",
  },
  {
    number: "03",
    title: "Качество",
    text: `${SITE.rating}★ из 5 — не случайность, а результат ежедневной работы над качеством и сервисом.`,
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      {/* Hero */}
      <div className="bg-[--forest-dark] py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-8">
            <TreePine className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">
            О Spring Village
          </h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Мы создали место, где городской ритм уступает тишине леса, свежему воздуху
            и настоящему отдыху. С 2018 года принимаем гостей и делаем всё, чтобы каждый
            визит стал незабываемым.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-20">
        {/* Values — editorial numbered layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[--border] border border-[--border] rounded-2xl overflow-hidden">
          {values.map((v) => (
            <div key={v.number} className="p-8">
              <div className="text-4xl font-display font-bold text-[--primary]/20 mb-4 leading-none">{v.number}</div>
              <h3 className="font-display text-xl font-bold text-[--foreground] mb-3">{v.title}</h3>
              <p className="text-sm text-[--muted-foreground] leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-display text-3xl font-bold text-[--foreground] mb-10 text-center">
            Наша история
          </h2>
          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[--primary] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px h-12 bg-[--border] my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="font-bold text-[--primary] mb-1">{m.year}</div>
                  <p className="text-[--foreground]">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="font-display text-3xl font-bold text-[--foreground] mb-10 text-center">
            Наша команда
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-[--border] p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[--primary]/10 flex items-center justify-center text-[--primary] font-bold shrink-0">
                  {member.initials}
                </div>
                <div>
                  <div className="font-semibold text-[--foreground] text-sm">{member.name}</div>
                  <div className="text-xs text-[--muted-foreground] mt-0.5">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[--muted] rounded-2xl p-10 border border-[--border]">
          <h2 className="font-display text-2xl font-bold text-[--foreground] mb-3">
            Приезжайте в гости
          </h2>
          <p className="text-[--muted-foreground] mb-6 max-w-md mx-auto">
            Лучший способ познакомиться с Spring Village — приехать и увидеть всё своими глазами.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/booking">Забронировать</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Написать нам</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
