import { FAQ } from "@/lib/data";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

export function Faq() {
  return (
    <section className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
      <div className="bg-white rounded-3xl border border-[--border] px-6 divide-y divide-[--border]">
        <Accordion>
          {FAQ.map((item, i) => (
            <AccordionItem key={i} value={String(i)} trigger={item.q}>
              {item.a}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
