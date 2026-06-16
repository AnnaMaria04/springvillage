import Link from "next/link";
import { TreePine, Heart, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const milestones = [
  { year: "2018", event: "Основание Spring Village — первые 3 коттеджа" },
  { year: "2019", event: "Расширение до 6 коттеджей, открытие банного комплекса" },
  { year: "2021", event: "Реновация всех коттеджей, запуск онлайн-бронирования" },
  { year: "2023", event: "12 коттеджей, более 500 гостей, рейтинг 4.9★" },
];

const team = [
  { name: "Анна Бережная", role: "Основатель и управляющий", initials: "АБ" },
  { name: "Сергей Комаров", role: "Главный по хозяйству", initials: "СК" },
  { name: "Ольга Никитина", role: "Менеджер по бронированию", initials: "ОН" },
];

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-[--background]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[--primary] to-[#3d6b20] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6">
            <TreePine className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5">
            О Spring Village
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Мы создали место, где городской ритм уступает место тишине леса, свежему воздуху
            и настоящему отдыху. С 2018 года принимаем гостей и делаем всё, чтобы каждый
            визит стал незабываемым.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Heart, title: "С душой", text: "Каждый коттедж — это наша забота о гостях. Мы продумали каждую деталь для вашего комфорта." },
            { icon: Users, title: "Для всех", text: "Пары, семьи с детьми, компании друзей, корпоративные группы — у нас найдётся место для каждого." },
            { icon: Award, title: "Качество", text: "4.9★ из 5 — не случайность, а результат ежедневной работы над качеством и сервисом." },
          ].map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="text-center p-6 rounded-2xl bg-white border border-[--border]">
                <div className="w-12 h-12 rounded-xl bg-[--primary]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[--primary]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[--foreground] mb-2">{v.title}</h3>
                <p className="text-sm text-[--muted-foreground] leading-relaxed">{v.text}</p>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-[--foreground] mb-8 text-center">
            Наша история
          </h2>
          <div className="max-w-2xl mx-auto space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[--primary] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 h-12 bg-[--border] my-1" />
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
          <h2 className="font-serif text-3xl font-bold text-[--foreground] mb-8 text-center">
            Наша команда
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center bg-white rounded-2xl border border-[--border] p-6">
                <div className="w-16 h-16 rounded-full bg-[--primary]/10 flex items-center justify-center mx-auto mb-3 text-[--primary] font-bold text-xl">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-[--foreground]">{member.name}</h3>
                <p className="text-sm text-[--muted-foreground]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[--muted] rounded-2xl p-10">
          <h2 className="font-serif text-2xl font-bold text-[--foreground] mb-3">
            Приезжайте в гости
          </h2>
          <p className="text-[--muted-foreground] mb-6">
            Лучший способ познакомиться с Spring Village — приехать и увидеть всё своими глазами.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/booking">Забронировать</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Написать нам</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
