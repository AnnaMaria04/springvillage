"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextType = { value: string | null; toggle: (v: string) => void };
const AccordionContext = React.createContext<AccordionContextType>({ value: null, toggle: () => {} });

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  const [value, setValue] = React.useState<string | null>(null);
  const toggle = (v: string) => setValue((prev) => (prev === v ? null : v));
  return (
    <AccordionContext.Provider value={{ value, toggle }}>
      <div className={cn("space-y-0 divide-y divide-[--border]", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, trigger, children }: { value: string; trigger: string; children: React.ReactNode }) {
  const ctx = React.useContext(AccordionContext);
  const open = ctx.value === value;
  return (
    <div>
      <button
        type="button"
        onClick={() => ctx.toggle(value)}
        className="flex w-full items-center justify-between py-4 text-left font-medium text-[--foreground] hover:text-[--primary] transition-colors"
      >
        <span>{trigger}</span>
        <ChevronDown className={cn("w-4 h-4 shrink-0 text-[--muted-foreground] transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-200", open ? "max-h-[600px] pb-4" : "max-h-0")}>
        <div className="text-sm text-[--muted-foreground] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
