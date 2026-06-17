import { HERITAGE } from "@/content/heritage";
import { FadeIn } from "@/components/ui/FadeIn";

export function Heritage() {
  return (
    <section id="heritage" className="section-y bg-[--pine] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[--moss] mb-4">
              {HERITAGE.sectionLabel}
            </p>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", whiteSpace: "pre-line" }}
            >
              {HERITAGE.title}
            </h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto text-base leading-relaxed">
              {HERITAGE.intro}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {HERITAGE.items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/8 transition-colors h-full">
                <div className="text-xs font-semibold uppercase tracking-widest text-[--wood] mb-3">
                  {item.period}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <blockquote className="max-w-2xl mx-auto text-center">
            <p className="font-display text-xl sm:text-2xl text-white/80 italic leading-relaxed mb-4">
              &ldquo;{HERITAGE.quote.text}&rdquo;
            </p>
            <footer className="text-xs text-white/40 uppercase tracking-widest">
              — {HERITAGE.quote.attribution}
            </footer>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}
