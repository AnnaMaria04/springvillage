import { CONTACT } from "@/lib/data";

export default function TermsPage() {
  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      <div className="bg-[--muted] border-b border-[--border] py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Условия использования
          </h1>
          <p className="text-[--muted-foreground]">Последнее обновление: январь 2024</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-6 text-sm text-[--muted-foreground] leading-relaxed">
        <p>
          Используя сайт springvillage.ru, вы принимаете настоящие условия.
          Если вы не согласны с условиями — пожалуйста, не используйте сайт.
        </p>

        <h2 className="font-display text-xl font-bold text-[--foreground]">Использование сайта</h2>
        <p>
          Сайт предназначен для информирования гостей и приёма заявок на бронирование.
          Запрещено использование сайта в незаконных целях или нанесение вреда его работе.
        </p>

        <h2 className="font-display text-xl font-bold text-[--foreground]">Бронирование</h2>
        <p>
          Бронирование считается подтверждённым после получения письменного подтверждения от администрации.
          Администрация вправе отказать в бронировании без объяснения причин.
        </p>

        <h2 className="font-display text-xl font-bold text-[--foreground]">Ответственность</h2>
        <p>
          Мы не несём ответственности за ущерб, возникший в результате обстоятельств непреодолимой силы.
          Гость несёт материальную ответственность за ущерб, причинённый имуществу.
        </p>

        <h2 className="font-display text-xl font-bold text-[--foreground]">Изменение условий</h2>
        <p>
          Мы оставляем за собой право изменять условия в любое время.
          Продолжение использования сайта означает согласие с новыми условиями.
        </p>

        <div className="bg-[--muted] rounded-2xl p-6 mt-8">
          <p>
            Вопросы:{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-[--primary] font-medium hover:underline">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
