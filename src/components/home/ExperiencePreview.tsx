import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ActivityAccordion } from "@/components/home/ActivityAccordion";

export function ExperiencePreview() {
  return (
    <section className="pt-24 lg:pt-32 pb-12 lg:pb-16 bg-background overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Развлечения
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Озеро и лес
            </h2>
          </div>
          <Link
            href="/aktivnosti"
            className="shrink-0 inline-flex items-center gap-2 text-foreground font-medium link-underline"
          >
            Все активности <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ActivityAccordion />
      </div>
    </section>
  );
}
