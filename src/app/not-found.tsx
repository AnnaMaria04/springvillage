import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TreePine } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[--background] flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-[--primary]/10 flex items-center justify-center mx-auto mb-6">
          <TreePine className="w-8 h-8 text-[--primary]" />
        </div>
        <div className="font-display text-8xl font-bold text-[--border] mb-4 leading-none">404</div>
        <h1 className="font-display text-2xl font-bold text-[--foreground] mb-3">
          Страница не найдена
        </h1>
        <p className="text-[--muted-foreground] mb-8">
          Похоже, страница была перемещена или не существует.
          Попробуйте перейти на главную.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/">На главную</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/cottages">Смотреть коттеджи</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
