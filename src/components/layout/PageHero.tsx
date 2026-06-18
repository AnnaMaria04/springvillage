import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
};

export function PageHero({ eyebrow, title, subtitle, image }: Props) {
  return (
    <header className="relative bg-pine">
      {image && (
        <>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-16 lg:pt-36 lg:pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>
        {eyebrow && (
          <p className="text-white/55 text-xs font-semibold uppercase tracking-[0.25em] mb-5">
            {eyebrow}
          </p>
        )}
        <h1
          className="font-display font-bold text-white leading-[1.02] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/65 text-lg leading-relaxed mt-6 max-w-xl">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
