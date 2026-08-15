"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { track } from "@/lib/analytics";

/** Authentic cottage photography already in the repository. */
const FOCAL = {
  src: "/images/exterior/exterior-winter-snow.jpg",
  alt: "Коттедж WILD — A-frame зимой на берегу Михалёвского озера",
};

const SATELLITES = [
  {
    src: "/images/interior/interior-aframe-window.jpeg",
    alt: "Панорамные окна гостиной с видом на озеро",
    // position within the stage, and how far it drifts as you scroll
    className: "left-[5%] top-[15%] w-[24vw] max-w-[20rem] aspect-[4/3]",
    drift: { x: -26, y: -18 },
    scaleTo: 1.12,
  },
  {
    src: "/images/interior/hero-fireplace.jpg",
    alt: "Дровяной камин в гостиной коттеджа",
    className: "right-[5%] top-[14%] w-[22vw] max-w-[18rem] aspect-[16/10]",
    drift: { x: 28, y: -14 },
    scaleTo: 1.14,
  },
  {
    src: "/images/interior/interior-loft-bedroom-hq.jpeg",
    alt: "Спальня на мансарде с мансардным окном",
    className: "left-[6%] bottom-[9%] w-[23vw] max-w-[19rem] aspect-[4/3]",
    drift: { x: -22, y: 20 },
    scaleTo: 1.13,
  },
  {
    src: "/images/lake/dock-boat-dusk.jpeg",
    alt: "Частный пирс и лодка на озере в сумерках",
    className: "right-[6%] bottom-[10%] w-[23vw] max-w-[19rem] aspect-[16/10]",
    drift: { x: 24, y: 18 },
    scaleTo: 1.12,
  },
];

/* ─── one satellite ─── */
function Satellite({
  photo,
  progress,
  reduce,
}: {
  photo: (typeof SATELLITES)[number];
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const scale = useTransform(progress, [0, 1], [1, photo.scaleTo]);
  const x = useTransform(progress, [0, 1], [0, photo.drift.x]);
  const y = useTransform(progress, [0, 1], [0, photo.drift.y]);

  return (
    <motion.div
      style={reduce ? undefined : { scale, x, y }}
      className={`absolute rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(12,18,14,0.55)] ${photo.className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="27vw"
        style={{ objectFit: "cover" }}
        loading="lazy"
      />
    </motion.div>
  );
}

export function CottageStory() {
  const reduce = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const seenRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Focal image stays dominant and stable — a restrained 1 → 1.26.
  const focalScale = useTransform(scrollYProgress, [0, 1], [1, 1.26]);

  // cottage_story_viewed — once
  useEffect(() => {
    const el = container.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !seenRef.current) {
          seenRef.current = true;
          track("cottage_story_viewed");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-background pt-20 lg:pt-28 pb-12 lg:pb-16">
      {/* ── Editorial intro ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
            Коттедж WILD
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-[1.08] tracking-tight mb-6">
            60 м² для тех, кто хочет исчезнуть из города на несколько дней.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Два этажа, панорамные окна, дровяной камин и 200 метров частного берега.
            Всё пространство принадлежит только вашим гостям.
          </p>
        </div>
      </div>

      {/* ── Desktop: restrained sticky zoom sequence (~170vh) ── */}
      {!reduce && (
        <div ref={container} className="hidden lg:block relative h-[150vh] mt-16">
          <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center pt-[84px]">
            {/* Focal image — large and stable */}
            <motion.div
              style={{ scale: focalScale }}
              className="relative w-[44vw] max-w-[42rem] aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_40px_90px_-40px_rgba(12,18,14,0.6)]"
            >
              <Image
                src={FOCAL.src}
                alt={FOCAL.alt}
                fill
                sizes="44vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </motion.div>

            {SATELLITES.map((p) => (
              <Satellite key={p.src} photo={p} progress={scrollYProgress} reduce={reduce} />
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile + reduced motion: static editorial collage ── */}
      <div className={`${reduce ? "" : "lg:hidden"} max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12`}>
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
          <Image
            src={FOCAL.src}
            alt={FOCAL.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {SATELLITES.slice(0, 2).map((p) => (
            <div key={p.src} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
