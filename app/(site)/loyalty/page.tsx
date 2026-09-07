import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Gift,
  Zap,
  Users,
  Cake,
  ArrowRight,
  Check,
  QrCode,
} from "lucide-react";
import { formatPrice, products } from "@/lib/catalog";
import { REWARDS, TIERS, POINT_VALUE } from "@/lib/loyalty";
import { USER } from "@/lib/demo";
import { Button, Reveal, SectionHead } from "@/components/ui/kit";
import { ClubBalanceCard } from "@/components/loyalty/club-balance-card";

export const metadata = {
  title: "Chocolate Club — программа лояльности",
  description:
    "Возвращаем до 10% баллами, дарим десерт в день рождения и открываем ранний доступ к новинкам.",
};

const HOW = [
  {
    icon: <Sparkles size={20} />,
    title: "Покупайте где удобно",
    text: "На сайте, в приложении или на кассе филиала — баллы начисляются одинаково.",
  },
  {
    icon: <Zap size={20} />,
    title: "Копите баллы",
    text: `Возвращаем от 5 до 10% от суммы. 1 балл = ${POINT_VALUE} сум при оплате следующего заказа.`,
  },
  {
    icon: <Gift size={20} />,
    title: "Меняйте на награды",
    text: "Кофе, десерт, бесплатная доставка или целый торт — на выбор в личном кабинете.",
  },
];

const EXTRAS = [
  {
    icon: <Cake size={19} />,
    title: "Подарок в день рождения",
    text: "Неделю до и после даты — десерт за наш счёт. Уровню Truffle дарим мини-торт.",
  },
  {
    icon: <Users size={19} />,
    title: "Приведи друга",
    text: "Другу — скидка на первый заказ, вам обоим — по 100 баллов после его покупки.",
  },
  {
    icon: <QrCode size={19} />,
    title: "Баллы на кассе",
    text: "Покажите QR-код из приложения в филиале — покупка попадёт в тот же профиль.",
  },
  {
    icon: <Zap size={19} />,
    title: "Двойные баллы",
    text: "Каждые выходные начисление удваивается для всех участников клуба.",
  },
];

export default function LoyaltyPage() {
  const heroImage = products.find((p) => p.slug === "desert-dubay")!;

  return (
    <>
      {/* hero */}
      <section className="mx-auto max-w-[1340px] px-4 pt-6 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-ink text-cream">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="eyebrow text-caramel-light">Программа лояльности</div>
              <h1 className="display mt-5 text-[clamp(2.4rem,5.4vw,4rem)] leading-[1.02]">
                Chocolate <span className="display-italic">Club</span>
              </h1>
              <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-cream/60">
                Чем дольше вы с нами, тем насыщеннее вкус привилегий. Три уровня —
                от сырого какао-боба до тёмного трюфеля.
              </p>

              <div className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-cream/12 pt-7">
                {[
                  ["до 10%", "баллами"],
                  ["8 420", "участников"],
                  ["7", "наград"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="tabular display text-[26px] text-caramel-light">{v}</div>
                    <div className="mt-1 text-[12px] text-cream/50">{l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-2.5">
                <Button href="/account/loyalty" variant="light" size="lg">
                  Мой баланс и награды
                </Button>
                <Button href="/app" variant="onDark" size="lg">
                  Скачать приложение
                </Button>
              </div>
            </div>

            <div className="relative min-h-[300px] lg:min-h-full">
              <Image
                src={heroImage.image}
                alt="Chocolate Club"
                fill
                sizes="(max-width:1024px) 100vw, 620px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* personal card */}
      <section className="mx-auto max-w-[1340px] px-4 pt-4 sm:px-6">
        <ClubBalanceCard />
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-[1340px] px-4 py-16 sm:px-6">
        <SectionHead eyebrow="Как это работает" title="Три шага, без условий мелким шрифтом" />
        <div className="grid gap-4 md:grid-cols-3">
          {HOW.map((h, i) => (
            <Reveal key={h.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-line bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-wine/10 text-wine">
                    {h.icon}
                  </span>
                  <span className="tabular display text-[30px] text-line">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-[17px] font-semibold">{h.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-3">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* tiers */}
      <section className="border-y border-line bg-cream-2/60 py-16">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6">
          <SectionHead
            eyebrow="Уровни"
            title="Путь какао-боба"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {TIERS.map((t, i) => {
              const isTruffle = t.id === "truffle";
              return (
                <Reveal key={t.id} delay={i * 90}>
                  <div
                    className={`flex h-full flex-col rounded-3xl border p-7 ${
                      isTruffle
                        ? "border-caramel bg-ink text-cream"
                        : "border-line bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div
                          className="eyebrow"
                          style={{ color: isTruffle ? "#e0b076" : t.tone }}
                        >
                          Уровень {i + 1}
                        </div>
                        <div className="display mt-2.5 text-[30px]">{t.name}</div>
                        <div
                          className={`mt-1 text-[13px] ${isTruffle ? "text-cream/50" : "text-ink-3"}`}
                        >
                          {t.story}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="tabular display text-[34px]"
                          style={{ color: isTruffle ? "#e0b076" : t.tone }}
                        >
                          {t.cashback}%
                        </div>
                        <div
                          className={`text-[11.5px] ${isTruffle ? "text-cream/45" : "text-ink-4"}`}
                        >
                          баллами
                        </div>
                      </div>
                    </div>

                    <div
                      className={`tabular mt-6 rounded-full px-4 py-2 text-center text-[12.5px] font-medium ${
                        isTruffle ? "bg-cream/10 text-cream/70" : "bg-cream-2 text-ink-3"
                      }`}
                    >
                      {t.from === 0
                        ? "Сразу при регистрации"
                        : `от ${formatPrice(t.from)} баллов за 12 месяцев`}
                    </div>

                    <ul className="mt-6 space-y-3">
                      {t.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[13.5px]">
                          <Check
                            size={15}
                            className="mt-0.5 shrink-0"
                            style={{ color: isTruffle ? "#e0b076" : t.tone }}
                          />
                          <span className={isTruffle ? "text-cream/75" : "text-ink-2"}>
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-center text-[13px] text-ink-4">
            Уровень считается по баллам, накопленным за последние 12 месяцев — статус
            остаётся с вами, пока вы возвращаетесь.
          </p>
        </div>
      </section>

      {/* rewards */}
      <section className="mx-auto max-w-[1340px] px-4 py-16 sm:px-6">
        <SectionHead
          eyebrow="Каталог наград"
          title="На что менять баллы"
          action="Мои награды"
          href="/account/loyalty"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REWARDS.map((r, i) => (
            <Reveal key={r.id} delay={i * 50}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold leading-snug">{r.title}</h3>
                  {r.tier && (
                    <span className="shrink-0 rounded-full bg-cream-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-3">
                      {r.tier === "praline" ? "Praline+" : "Truffle"}
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-3">
                  {r.desc}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="tabular text-[17px] font-bold text-wine">
                    {formatPrice(r.cost)}
                    <span className="ml-1 text-[12px] font-medium text-ink-3">баллов</span>
                  </span>
                  <span className="tabular text-[12px] text-ink-4">
                    {formatPrice(r.cost * POINT_VALUE)} сум
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* extras */}
      <section className="mx-auto max-w-[1340px] px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXTRAS.map((e, i) => (
            <Reveal key={e.title} delay={i * 60}>
              <div className="h-full rounded-3xl bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-caramel/12 text-caramel">
                  {e.icon}
                </span>
                <h3 className="mt-4 text-[15.5px] font-semibold">{e.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-3">{e.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1340px] px-4 pb-20 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-wine px-8 py-14 text-center text-white">
          <div className="eyebrow text-white/55">Присоединяйтесь</div>
          <h2 className="display max-w-lg text-[clamp(1.9rem,3.8vw,2.8rem)]">
            Первые баллы начислим уже за этот заказ
          </h2>
          <p className="max-w-md text-[15px] text-white/70">
            Регистрация занимает минуту, а подарок в день рождения работает сразу —
            без условий и активаций.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Button href="/catalog" variant="light" size="lg">
              Сделать заказ <ArrowRight size={16} />
            </Button>
            <Link
              href="/account/loyalty"
              className="rounded-full border border-white/30 px-8 py-3.5 text-[15px] font-semibold transition hover:bg-white/10"
            >
              Мой профиль
            </Link>
          </div>
          <p className="tabular text-[12.5px] text-white/50">
            Ваш текущий баланс — {formatPrice(USER.points)} баллов
          </p>
        </div>
      </section>
    </>
  );
}
