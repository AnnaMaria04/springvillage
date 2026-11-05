"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowUpRight, Images } from "lucide-react";
import { PONTOON } from "@/content/pontoon";
import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

const housePhotos = [
  // Exterior — wide hero card
  { src: "/images/exterior/exterior-couple-window.jpg", label: "Коттедж WILD снаружи", wide: true, position: "center 35%" },
  { src: "/images/exterior/exterior-autumn-yellow.jpeg", label: "Осенью", position: "center 60%" },
  // Loft bedroom — prominent
  { src: "/images/interior/interior-loft-bedroom-wide.jpeg", label: "Спальня лофт", position: "center 40%" },
  { src: "/images/interior/interior-loft-bedroom-hq.jpeg", label: "Лофт — вечерний свет", position: "center 40%" },
  { src: "/images/interior/interior-aframe-window.jpeg", label: "Панорамное окно", position: "center 50%" },
  // Living + kitchen
  { src: "/images/interior/interior-living-stairs.jpeg", label: "Гостиная", position: "center 50%" },
  { src: "/images/interior/interior-wood-stove.jpeg", label: "Камин", position: "center 50%" },
  { src: "/images/interior/interior-kitchen-stairs.jpeg", label: "Кухня", position: "center 50%" },
  // Ground floor
  { src: "/images/interior/interior-bedroom-ground-hq.jpeg", label: "Спальня 1 этаж", position: "center 50%" },
  { src: "/images/interior/interior-bathroom-hq.jpeg", label: "Санузел", position: "center 40%" },
  { src: "/images/interior/interior-sofa-colorful.jpeg", label: "Гостиная — диван", position: "center 50%" },
];

const photos = [...housePhotos, ...PONTOON.photos.map((photo) => ({ src: photo.src, label: photo.alt, position: "center 60%" }))];
// Five carefully chosen views on the page; the complete collection is one click away.
const preview = [0, 2, 5, 8, 7];

export function DomGallery() {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {preview.map((photoIndex, i) => {
          const photo = photos[photoIndex];
          return (
            <button key={photo.src} type="button" onClick={() => setIndex(photoIndex)} aria-label={`Открыть фото: ${photo.label}`}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${i === 0 ? "col-span-2 lg:row-span-2 min-h-[280px] sm:min-h-[400px]" : "aspect-[4/3]"}`}>
              <Image src={photo.src} alt={photo.label} fill sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"} style={{ objectFit: "cover", objectPosition: photo.position }} className="transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.03]" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pt-10 pb-3 text-left text-xs text-white">{photo.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">Две спальни · кухня · гостиная с камином · 1 санузел</p>
        <button type="button" onClick={() => setIndex(0)} className="inline-flex items-center gap-2 text-sm text-pine py-2 border-b border-pine/30 hover:border-pine cursor-pointer">
          <Images className="w-4 h-4" aria-hidden="true" /> Все {photos.length} фото <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      {index >= 0 && <Lightbox open index={index} close={() => setIndex(-1)} slides={photos.map((photo) => ({ src: photo.src, alt: photo.label }))}
        labels={{ Close: "Закрыть", Next: "Следующее фото", Previous: "Предыдущее фото" }}
        render={{ slideFooter: ({ slide }) => <p className="absolute bottom-4 left-4 right-4 text-center text-white text-sm">{slide.alt}</p> }} />}
    </>
  );
}
