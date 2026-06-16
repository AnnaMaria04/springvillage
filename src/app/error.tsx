"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[--background] flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-md">
        <div className="font-display text-6xl font-bold text-[--border] mb-4 leading-none">Упс</div>
        <h1 className="font-display text-2xl font-bold text-[--foreground] mb-3">
          Что-то пошло не так
        </h1>
        <p className="text-[--muted-foreground] mb-8">
          Произошла ошибка при загрузке страницы. Попробуйте ещё раз.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={() => reset()}>Попробовать снова</Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
