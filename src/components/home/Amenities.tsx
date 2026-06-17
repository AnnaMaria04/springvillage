import { CheckCircle, XCircle } from "lucide-react";
import { HOUSE } from "@/lib/data";

export function Amenities() {
  return (
    <section id="amenities" className="section-y bg-[--background]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">Оснащение</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground]">
            Всё необходимое
          </h2>
          <p className="text-[--muted-foreground] mt-3 max-w-lg mx-auto">
            Приезжайте с чемоданом одежды — всё остальное уже есть.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Equipment list */}
          <div>
            <h3 className="font-display text-xl font-bold text-[--foreground] mb-5">
              Что в доме
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {HOUSE.equipment.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-[--foreground]">
                  <CheckCircle className="w-4 h-4 text-[--primary] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Included / not included */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-[--foreground] mb-5">
                Включено в стоимость
              </h3>
              <div className="space-y-2.5">
                {HOUSE.included.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-[--foreground]">
                    <CheckCircle className="w-4 h-4 text-[--primary] shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-[--foreground] mb-4">
                Не включено
              </h3>
              <div className="space-y-2.5">
                {HOUSE.notIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-[--muted-foreground]">
                    <XCircle className="w-4 h-4 text-[--border] shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
