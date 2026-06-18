"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const firstMount = useRef(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    // Route changed: instant to invisible, then fade in over two rAFs
    setFading(true);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFading(false));
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      style={{
        opacity:    fading ? 0 : 1,
        // No transition when fading=true (instant to 0); fade-in when fading=false
        transition: fading ? "none" : "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
