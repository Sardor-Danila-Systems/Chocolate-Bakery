"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw, Gift, Sparkles } from "lucide-react";
import { formatPrice, products } from "@/lib/catalog";
import { ORDERS, USER, branchName } from "@/lib/demo";
import { tierProgress } from "@/lib/loyalty";
import { useStore } from "@/lib/store";
import { Progress } from "@/components/ui/kit";

/** Loyalty + personalisation, promoted above the fold (variant C's move). */
export function PersonalStrip() {
  const { state, add, pushToast } = useStore();
  const { current, next, pct, remaining } = tierProgress(state.lifetimePoints);
  const last = ORDERS.find((o) => o.status === "done") ?? ORDERS[0];
  const lastItems = last.items
    .map((i) => products.find((p) => p.slug === i.slug)!)
    .filter(Boolean);

  const repeat = () => {
    last.items.forEach((i) => add(i.slug, i.qty));
    pushToast({
      title: "Заказ собран заново",
      detail: `${last.items.length} позиции из заказа №${last.number}`,
    });
  };

  return (
    <section className="mx-auto max-w-[1340px] px-4 pt-3 sm:px-6">
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.95fr]">
        {/* greeting + repeat */}
        <div className="min-w-0 rounded-3xl bg-white p-6">
          <div className="text-[13px] text-ink-3">Добрый вечер, {USER.name}</div>
          <div className="display mt-1.5 text-[21px]">Повторим прошлый заказ?</div>

          <div className="mt-4 flex min-w-0 items-center gap-2">
            <div className="flex -space-x-3">
              {lastItems.slice(0, 3).map((p) => (
                <div
                  key={p.slug}
                  className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white bg-cream-2"
                >
                  <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="min-w-0 flex-1 text-[12.5px] text-ink-3">
              <div className="truncate">{lastItems.map((p) => p.name).join(" · ")}</div>
              <div className="tabular">
                {formatPrice(last.total)} сум · {branchName(last.branch)}
              </div>
            </div>
          </div>

          <button
            onClick={repeat}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-[13.5px] font-semibold text-cream transition hover:bg-wine"
          >
            <RotateCcw size={15} /> Повторить заказ
          </button>
        </div>

        {/* loyalty progress */}
        <Link href="/account/loyalty" className="group min-w-0 rounded-3xl bg-ink p-6 text-cream">
          <div className="flex items-start justify-between">
            <div>
              <div className="eyebrow text-cream/45">Chocolate Club</div>
              <div className="tabular display mt-2 text-[34px] leading-none">
                {formatPrice(state.points)}
              </div>
              <div className="mt-1.5 text-[12.5px] text-cream/50">
                баллов · {formatPrice(state.points * 100)} сум
              </div>
            </div>
            <span
              className="rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wider"
              style={{
                background: current.id === "truffle" ? "#e0b076" : current.tone,
                color: current.id === "truffle" ? "#1c1310" : "#fff",
              }}
            >
              {current.name}
            </span>
          </div>

          <div className="mt-6 text-cream">
            <Progress value={pct} tone="caramel" />
            <div className="mt-2.5 flex items-center justify-between text-[12px] text-cream/50">
              <span>
                {next
                  ? `${formatPrice(remaining)} баллов до ${next.name}`
                  : "Максимальный уровень"}
              </span>
              <span className="tabular">{next ? formatPrice(next.from) : ""}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-caramel-light">
            Мои награды
            <ArrowRight size={14} className="transition group-hover:translate-x-1" />
          </div>
        </Link>

        {/* birthday / personal offer */}
        <div className="flex min-w-0 flex-col gap-3">
          <Link
            href="/promotions/den-rozhdeniya"
            className="group flex flex-1 items-center gap-4 rounded-3xl bg-wine/10 p-5 transition hover:bg-wine/15"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wine text-white">
              <Gift size={19} />
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold">
                День рождения через {USER.daysToBirthday} дней
              </div>
              <div className="mt-0.5 text-[12.5px] text-ink-3">
                Подарок уже ждёт в приложении
              </div>
            </div>
          </Link>

          <Link
            href="/promotions/vash-lyubimyy-tort"
            className="group flex flex-1 items-center gap-4 rounded-3xl bg-caramel/12 p-5 transition hover:bg-caramel/20"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel text-white">
              <Sparkles size={19} />
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold">−20% на Дольче вита</div>
              <div className="mt-0.5 text-[12.5px] text-ink-3">
                Персонально для вас · до 14 сентября
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
