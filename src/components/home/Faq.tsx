import { FAQ } from "@/lib/data";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="section-y bg-[--muted]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">FAQ</p>
          <h2 className="font-display text-4xl font-bold text-[--foreground]">
            Частые вопросы
          </h2>
        </div>
        <div className="bg-white rounded-2xl border border-[--border] px-6 divide-y divide-[--border]">
          <Accordion>
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={String(i)} trigger={item.q}>
                {item.a}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
