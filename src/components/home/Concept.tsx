import { FadeIn } from "@/components/ui/FadeIn";

export function Concept() {
  return (
    <section className="section-y bg-[--background]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="right">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-4">
                Место силы
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] leading-tight mb-6">
                Карелия<br />у порога
              </h2>
              <div className="space-y-4 text-[--muted-foreground] leading-relaxed">
                <p>
                  Михалёвское озеро — тихая вода в сосновом бору Выборгского района.
                  Финская история этих мест читается в каждом камне и тёмном ельнике.
                  Здесь никогда не бывает шумно.
                </p>
                <p>
                  Коттедж WILD стоит прямо у воды. Утром — озеро в панорамном окне.
                  Вечером — баня и закат над лесом. Ничего лишнего.
                </p>
                <p>
                  127 км по трассе «Скандинавия» — два часа, и города как не бывало.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "127 км", label: "от Петербурга\nпо трассе А-181" },
                { value: "2 ч", label: "до коттеджа\nна машине" },
                { value: "XII в.", label: "финская история\nэтих мест" },
                { value: "100 м", label: "от коттеджа\nдо озера" },
              ].map((stat) => (
                <div key={stat.value} className="bg-[--muted] rounded-2xl p-6">
                  <div className="font-display text-3xl font-bold text-[--foreground] mb-2 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[--muted-foreground] whitespace-pre-line leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
