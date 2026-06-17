import { CONTACT, SITE } from "@/lib/data";

export default function PrivacyPage() {
  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-muted border-b border-border py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Политика конфиденциальности
          </h1>
          <p className="text-muted-foreground">Последнее обновление: январь 2024</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 prose prose-sm max-w-none">
        <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
          <p>
            {SITE.name} («мы», «наш») уважает вашу конфиденциальность. Настоящая политика описывает,
            как мы собираем, используем и защищаем ваши персональные данные.
          </p>

          <h2 className="font-display text-xl font-bold text-foreground mt-8">Какие данные мы собираем</h2>
          <ul className="space-y-1.5">
            <li>Имя, адрес электронной почты, телефон — при бронировании или заполнении формы</li>
            <li>Даты заезда и выезда, количество гостей</li>
            <li>Технические данные (IP, браузер) — автоматически при посещении сайта</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-foreground mt-8">Как мы используем данные</h2>
          <ul className="space-y-1.5">
            <li>Подтверждение и управление бронированием</li>
            <li>Ответы на ваши обращения</li>
            <li>Рассылка специальных предложений (только с вашего согласия)</li>
            <li>Улучшение работы сайта</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-foreground mt-8">Хранение и защита</h2>
          <p>
            Данные хранятся на защищённых серверах. Мы не передаём ваши данные третьим лицам
            без вашего согласия, за исключением случаев, предусмотренных законодательством РФ.
          </p>

          <h2 className="font-display text-xl font-bold text-foreground mt-8">Ваши права</h2>
          <p>
            Вы вправе запросить доступ к своим данным, их исправление или удаление.
            Для этого напишите нам на{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">
              {CONTACT.email}
            </a>
          </p>

          <h2 className="font-display text-xl font-bold text-foreground mt-8">Cookies</h2>
          <p>
            Сайт использует файлы cookies для корректной работы и аналитики.
            Продолжая использовать сайт, вы соглашаетесь с использованием cookies.
          </p>

          <h2 className="font-display text-xl font-bold text-foreground mt-8">Контакты</h2>
          <p>
            Вопросы по конфиденциальности:{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
