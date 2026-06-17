export function Concept() {
  return (
    <section className="py-28 lg:py-40 bg-cream">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-8">
          Spring Village
        </p>
        <p
          className="font-display text-foreground leading-[1.25] tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
        >
          Один дом у воды, лес за порогом и пирс прямо у вашего берега.
          Здесь не нужно ничего планировать — только приехать и остаться в тишине.
        </p>
      </div>
    </section>
  );
}
