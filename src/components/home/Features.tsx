import { TreePine, ShieldCheck, Wifi, Flame, MapPin, Clock } from "lucide-react";

const features = [
  {
    icon: TreePine,
    title: "Природа рядом",
    description: "Лес, река и чистый воздух — прямо у порога вашего коттеджа",
  },
  {
    icon: ShieldCheck,
    title: "Безопасность",
    description: "Охраняемая территория, видеонаблюдение, закрытый въезд",
  },
  {
    icon: Wifi,
    title: "Высокоскоростной Wi-Fi",
    description: "Быстрый интернет во всех коттеджах и на территории",
  },
  {
    icon: Flame,
    title: "Баня и барбекю",
    description: "Собственная баня и мангальная зона у каждого коттеджа",
  },
  {
    icon: MapPin,
    title: "50 км от Москвы",
    description: "Удобная транспортная доступность, есть трансфер",
  },
  {
    icon: Clock,
    title: "Гибкое бронирование",
    description: "Онлайн-бронирование 24/7, быстрое подтверждение",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-[--background]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[--primary] font-semibold text-sm uppercase tracking-widest mb-3">
            Почему Spring Village
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[--foreground]">
            Всё для вашего комфорта
          </h2>
          <p className="mt-4 text-[--muted-foreground] max-w-xl mx-auto text-lg">
            Мы создали место, где хочется возвращаться снова и снова
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex gap-4 p-6 rounded-xl bg-white border border-[--border] hover:border-[--primary]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-[--primary]/10 flex items-center justify-center group-hover:bg-[--primary] transition-colors duration-200">
                  <Icon className="w-5 h-5 text-[--primary] group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-[--foreground] mb-1">{feature.title}</h3>
                  <p className="text-sm text-[--muted-foreground] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
