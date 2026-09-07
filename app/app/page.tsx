import Link from "next/link";
import { ArrowLeft, Sparkles, RotateCcw, Bell, QrCode, MapPin } from "lucide-react";
import { MobileApp } from "@/components/app/mobile-app";

export const metadata = {
  title: "Приложение Chocolate — демо",
  description:
    "Интерактивная демонстрация мобильного приложения Chocolate: заказ, Chocolate Club, награды и статус заказа.",
};

const FEATURES = [
  {
    icon: <Sparkles size={18} />,
    title: "Клуб всегда под рукой",
    text: "Баланс баллов, уровень и прогресс до следующего статуса — на главном экране.",
  },
  {
    icon: <RotateCcw size={18} />,
    title: "Повтор заказа в один тап",
    text: "Приложение помнит, что вы брали, и собирает корзину заново мгновенно.",
  },
  {
    icon: <Bell size={18} />,
    title: "Push вместо баннеров",
    text: "Персональные предложения и статус заказа приходят адресно, а не всем подряд.",
  },
  {
    icon: <QrCode size={18} />,
    title: "Баллы в филиале",
    text: "QR-код на кассе связывает офлайн-покупку с тем же профилем клиента.",
  },
];

export default function AppDemoPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-[1340px] px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13.5px] font-medium text-ink-3 transition hover:text-ink"
        >
          <ArrowLeft size={16} /> На сайт Chocolate
        </Link>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1fr_420px]">
          <div className="lg:sticky lg:top-10">
            <div className="eyebrow text-caramel">Мобильное приложение</div>
            <h1 className="display mt-4 text-[clamp(2.2rem,4.6vw,3.4rem)]">
              Сайт приводит клиента.
              <br />
              <span className="display-italic">Приложение возвращает его</span>
            </h1>
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-ink-3">
              Полностью кликабельный прототип: пройдите путь от главной до оплаты,
              загляните в Chocolate Club и обменяйте баллы на награду.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-2xl border border-line bg-white p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-wine/10 text-wine">
                    {f.icon}
                  </span>
                  <h3 className="mt-3.5 text-[14.5px] font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-3">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-ink p-6 text-cream">
              <div className="eyebrow text-cream/45">Экраны в демо</div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-cream/70">
                Welcome · Главная · Каталог · Категория · Товар · Корзина · Оформление ·
                Успешный заказ · Заказы · Chocolate Club · Награды · Избранное · Филиалы ·
                Профиль
              </p>
              <div className="mt-4 flex items-center gap-2 text-[12.5px] text-caramel-light">
                <MapPin size={14} /> Все экраны работают на реальных данных Chocolate
              </div>
            </div>
          </div>

          {/* phone */}
          <div className="mx-auto w-full max-w-[400px]">
            <div className="relative rounded-[42px] border-[10px] border-ink bg-ink shadow-[0_30px_80px_rgba(28,19,16,0.28)]">
              <div className="absolute left-1/2 top-0 z-40 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink" />
              <div className="h-[760px] overflow-hidden rounded-[32px] bg-cream">
                <MobileApp />
              </div>
            </div>
            <p className="mt-5 text-center text-[12.5px] text-ink-4">
              Прототип интерактивен — нажимайте на товары, вкладки и кнопки
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
