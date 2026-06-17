const photos = [
  { src: "/images/gallery-exterior.jpg", label: "Коттедж снаружи", wide: true },
  { src: "/images/gallery-interior.jpg", label: "Гостиная" },
  { src: "/images/gallery-sauna.jpg", label: "Баня у воды" },
  { src: "/images/gallery-lake.jpg", label: "Вид на озеро" },
  { src: "/images/gallery-sunset.jpg", label: "Закат с террасы", wide: true },
  { src: "/images/gallery-winter.jpg", label: "Зима" },
];

export function Gallery() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[220px] lg:auto-rows-[280px]">
        {photos.map((p, i) => (
          <div
            key={i}
            className="media group relative rounded-3xl"
            style={{ gridColumn: p.wide ? "span 2" : undefined }}
          >
            <div
              className="media-img absolute inset-0 bg-stone-300 bg-cover bg-center"
              style={{ backgroundImage: `url('${p.src}')` }}
            />
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white/85 bg-black/30 rounded-full px-2.5 py-1 backdrop-blur-sm">
              {p.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
