"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Defers a heavy map iframe until the user scrolls near it.
 * The Yandex widget is a full JS app — without this it competes with
 * images and fonts for bandwidth on initial page load.
 */
export function LazyMap({ src, title, className }: { src: string; title: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); io.disconnect(); } },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <iframe src={src} className="w-full h-full border-0" title={title} loading="lazy" allowFullScreen />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-cream" aria-hidden="true">
          <span className="text-muted-foreground text-sm">Карта загружается…</span>
        </div>
      )}
    </div>
  );
}
