"use client";

import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { USER } from "@/lib/demo";
import { tierProgress, REWARDS } from "@/lib/loyalty";
import { useStore } from "@/lib/store";
import { Progress } from "@/components/ui/kit";

export function ClubBalanceCard() {
  const { state } = useStore();
  const { current, next, pct, remaining } = tierProgress(state.lifetimePoints);
  const nextReward = REWARDS.filter((r) => r.cost > state.points)[0] ?? REWARDS[0];
  const affordable = REWARDS.filter((r) => r.cost <= state.points).length;

  return (
    <div className="grid gap-3 lg:grid-cols-[1.15fr_1fr_1fr]">
      {/* balance */}
      <div className="rounded-3xl border border-line bg-white p-7">
        <div className="flex items-start justify-between">
          <div>
            <div className="eyebrow text-ink-4">Ваш баланс</div>
            <div className="tabular display mt-2.5 text-[46px] leading-none">
              {formatPrice(state.points)}
            </div>
            <div className="mt-2 text-[13.5px] text-ink-3">
              баллов · {formatPrice(state.points * 100)} сум
            </div>
          </div>
          <span
            className="rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-white"
            style={{
              background: current.id === "truffle" ? "#1c1310" : current.tone,
            }}
          >
            {current.name}
          </span>
        </div>

        <div className="mt-7">
          <Progress value={pct} tone="wine" className="text-ink" />
          <div className="mt-2.5 flex justify-between text-[12.5px] text-ink-3">
            <span>
              {next
                ? `${formatPrice(remaining)} баллов до ${next.name}`
                : "Максимальный уровень"}
            </span>
            {next && <span className="tabular">{formatPrice(next.from)}</span>}
          </div>
        </div>

        <Link
          href="/account/loyalty"
          className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-wine"
        >
          История начислений <ArrowRight size={15} />
        </Link>
      </div>

      {/* next reward */}
      <div className="flex flex-col justify-between rounded-3xl border border-line bg-white p-7">
        <div>
          <div className="eyebrow text-ink-4">Следующая награда</div>
          <div className="display mt-3 text-[22px] leading-tight">{nextReward.title}</div>
          <p className="mt-2 text-[13.5px] text-ink-3">{nextReward.desc}</p>
        </div>
        <div className="mt-6">
          <Progress
            value={Math.min(100, Math.round((state.points / nextReward.cost) * 100))}
            tone="caramel"
            className="text-ink"
          />
          <div className="tabular mt-2.5 text-[12.5px] text-ink-3">
            {formatPrice(Math.max(0, nextReward.cost - state.points))} баллов осталось ·
            цель {formatPrice(nextReward.cost)}
          </div>
        </div>
      </div>

      {/* birthday + available */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-1 items-center gap-4 rounded-3xl bg-wine p-6 text-white">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15">
            <Gift size={22} />
          </div>
          <div>
            <div className="text-[15px] font-semibold">
              День рождения через {USER.daysToBirthday} дней
            </div>
            <div className="mt-1 text-[12.5px] text-white/70">
              {USER.birthday} · десерт в подарок
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center rounded-3xl bg-cream-2 p-6">
          <div className="tabular display text-[32px]">{affordable}</div>
          <div className="mt-1 text-[13px] text-ink-3">
            наград доступно прямо сейчас
          </div>
          <Link
            href="/account/loyalty"
            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-wine"
          >
            Обменять баллы <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
