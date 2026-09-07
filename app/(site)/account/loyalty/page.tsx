"use client";

import clsx from "clsx";
import { useState } from "react";
import {
  Sparkles,
  Gift,
  Check,
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  QrCode,
} from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { PROMOTIONS, USER } from "@/lib/demo";
import {
  POINT_HISTORY,
  POINT_VALUE,
  REWARDS,
  TIERS,
  tierProgress,
} from "@/lib/loyalty";
import { useStore } from "@/lib/store";
import { Progress, SectionHead } from "@/components/ui/kit";

export default function AccountLoyaltyPage() {
  const { state, dispatch, pushToast } = useStore();
  const { current, next, pct, remaining } = tierProgress(state.lifetimePoints);
  const [tab, setTab] = useState<"rewards" | "history" | "offers">("rewards");
  const [redeemed, setRedeemed] = useState<string[]>([]);

  const personalOffers = PROMOTIONS.filter(
    (p) => p.personal || p.kind === "club" || p.kind === "birthday",
  );

  const redeem = (id: string, cost: number, title: string) => {
    if (state.points < cost) {
      pushToast({ title: "Недостаточно баллов", detail: `Нужно ещё ${cost - state.points}` });
      return;
    }
    dispatch({ type: "redeem", cost });
    setRedeemed((p) => [...p, id]);
    pushToast({ title: "Награда получена", detail: `${title} · −${cost} баллов` });
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    pushToast({ title: "Промокод скопирован", detail: code });
  };

  return (
    <div className="space-y-7">
      <div>
        <div className="eyebrow text-caramel">Программа лояльности</div>
        <h1 className="display mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)]">
          Chocolate Club
        </h1>
      </div>

      {/* member card */}
      <div className="overflow-hidden rounded-3xl bg-ink text-cream">
        <div className="p-7 sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="eyebrow text-cream/45">Баланс</div>
              <div className="tabular display mt-3 text-[clamp(2.8rem,6vw,3.8rem)] leading-none">
                {formatPrice(state.points)}
              </div>
              <div className="mt-2.5 text-[14px] text-cream/55">
                баллов · {formatPrice(state.points * POINT_VALUE)} сум к оплате
              </div>
            </div>
            <div className="text-right">
              <span
                className="inline-block rounded-full px-4 py-2 text-[12px] font-bold tracking-[0.1em]"
                style={{
                  background: current.id === "truffle" ? "#e0b076" : current.tone,
                  color: current.id === "truffle" ? "#1c1310" : "#fff",
                }}
              >
                {current.name}
              </span>
              <div className="mt-2.5 text-[12.5px] text-cream/45">
                {USER.fullName}
              </div>
              <div className="tabular text-[12px] text-cream/35">
                в клубе с {USER.memberSince}
              </div>
            </div>
          </div>

          <div className="mt-8 text-cream">
            <Progress value={pct} tone="caramel" />
            <div className="mt-3 flex flex-wrap justify-between gap-2 text-[12.5px] text-cream/55">
              <span>
                {next
                  ? `${formatPrice(remaining)} баллов до уровня ${next.name} · это примерно ${formatPrice(
                      Math.round((remaining * POINT_VALUE * 100) / current.cashback),
                    )} сум покупок`
                  : "Максимальный уровень достигнут"}
              </span>
              {next && <span className="tabular">{formatPrice(next.from)}</span>}
            </div>
          </div>
        </div>

        <div className="grid divide-cream/10 border-t border-cream/10 sm:grid-cols-3 sm:divide-x">
          {[
            ["Кэшбэк", `${current.cashback}%`],
            ["Всего начислено", formatPrice(state.lifetimePoints)],
            ["Заказов", String(USER.ordersCount)],
          ].map(([l, v]) => (
            <div key={l} className="px-7 py-5">
              <div className="text-[12px] text-cream/45">{l}</div>
              <div className="tabular display mt-1 text-[22px]">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QR strip */}
      <div className="flex flex-wrap items-center gap-5 rounded-3xl border border-line bg-white p-6">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-cream-2">
          <QrCode size={30} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold">Баллы на кассе филиала</div>
          <p className="mt-1 text-[13.5px] text-ink-3">
            Покажите QR-код кассиру — покупка в филиале попадёт в тот же профиль и
            начислит баллы.
          </p>
        </div>
        <div className="tabular rounded-2xl bg-cream-2 px-5 py-3 text-[15px] font-bold tracking-[0.15em]">
          {USER.phone.slice(-7).replace(" ", "")}
        </div>
      </div>

      {/* tabs */}
      <div className="inline-flex gap-1 rounded-full border border-line bg-white p-1">
        {(
          [
            { id: "rewards" as const, label: "Награды" },
            { id: "offers" as const, label: "Предложения" },
            { id: "history" as const, label: "История" },
          ]
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              "rounded-full px-5 py-2.5 text-[13.5px] font-medium transition",
              tab === t.id ? "bg-ink text-cream" : "text-ink-3 hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* rewards */}
      {tab === "rewards" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REWARDS.map((r) => {
            const locked =
              r.tier === "truffle"
                ? current.id !== "truffle"
                : r.tier === "praline"
                  ? current.id === "cocoa"
                  : false;
            const affordable = state.points >= r.cost;
            const done = redeemed.includes(r.id);
            return (
              <div
                key={r.id}
                className={clsx(
                  "flex flex-col rounded-3xl border p-6 transition",
                  done
                    ? "border-sage bg-sage/8"
                    : locked
                      ? "border-line bg-cream-2/50"
                      : "border-line bg-white",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[16px] font-semibold leading-snug">{r.title}</h3>
                  {locked && <Lock size={15} className="mt-1 shrink-0 text-ink-4" />}
                </div>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-3">
                  {r.desc}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="tabular text-[17px] font-bold text-wine">
                    {formatPrice(r.cost)}
                    <span className="ml-1 text-[11.5px] font-medium text-ink-3">
                      баллов
                    </span>
                  </span>
                  <button
                    disabled={locked || !affordable || done}
                    onClick={() => redeem(r.id, r.cost, r.title)}
                    className={clsx(
                      "rounded-full px-4 py-2 text-[12.5px] font-semibold transition",
                      done
                        ? "bg-sage text-white"
                        : locked
                          ? "cursor-not-allowed bg-cream-2 text-ink-4"
                          : affordable
                            ? "bg-ink text-cream hover:bg-wine"
                            : "cursor-not-allowed bg-cream-2 text-ink-4",
                    )}
                  >
                    {done ? (
                      <span className="flex items-center gap-1.5">
                        <Check size={13} /> Получено
                      </span>
                    ) : locked ? (
                      `Только ${r.tier === "truffle" ? "Truffle" : "Praline+"}`
                    ) : affordable ? (
                      "Обменять"
                    ) : (
                      `Ещё ${formatPrice(r.cost - state.points)}`
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* offers */}
      {tab === "offers" && (
        <div className="space-y-3">
          {personalOffers.map((o) => (
            <div
              key={o.id}
              className="flex flex-wrap items-center gap-5 rounded-3xl border border-line bg-white p-6"
            >
              <div
                className={clsx(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-full text-white",
                  o.accent === "wine" ? "bg-wine" : o.accent === "caramel" ? "bg-caramel" : "bg-ink",
                )}
              >
                {o.kind === "birthday" ? <Gift size={20} /> : <Sparkles size={20} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[15.5px] font-semibold">{o.title}</span>
                  {o.personal && (
                    <span className="rounded-full bg-wine/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-wine">
                      Персонально
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[13.5px] text-ink-3">{o.subtitle}</p>
                <p className="mt-1 text-[12px] text-ink-4">{o.until}</p>
              </div>
              {o.code ? (
                <button
                  onClick={() => copyCode(o.code!)}
                  className="tabular flex shrink-0 items-center gap-2 rounded-full border border-dashed border-wine px-5 py-2.5 text-[13px] font-bold text-wine transition hover:bg-wine/8"
                >
                  {o.code} <Copy size={13} />
                </button>
              ) : (
                <span className="shrink-0 rounded-full bg-cream-2 px-4 py-2 text-[12.5px] text-ink-3">
                  Активно
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* history */}
      {tab === "history" && (
        <div className="overflow-hidden rounded-3xl border border-line bg-white">
          {POINT_HISTORY.map((h) => (
            <div
              key={h.id}
              className="flex items-center gap-4 border-b border-line px-6 py-4 last:border-0"
            >
              <div
                className={clsx(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full",
                  h.points > 0 ? "bg-sage/12 text-sage" : "bg-wine/10 text-wine",
                )}
              >
                {h.points > 0 ? <ArrowUpRight size={17} /> : <ArrowDownRight size={17} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium">{h.title}</div>
                <div className="text-[12.5px] text-ink-3">{h.detail}</div>
              </div>
              <div className="text-right">
                <div
                  className={clsx(
                    "tabular text-[15px] font-bold",
                    h.points > 0 ? "text-sage" : "text-wine",
                  )}
                >
                  {h.points > 0 ? "+" : ""}
                  {h.points}
                </div>
                <div className="text-[12px] text-ink-4">{h.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* tier table */}
      <div>
        <SectionHead title="Уровни и привилегии" className="mb-5" />
        <div className="grid gap-3 sm:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.id}
              className={clsx(
                "rounded-3xl border p-6",
                t.id === current.id ? "border-wine bg-wine/6" : "border-line bg-white",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="display text-[22px]">{t.name}</span>
                {t.id === current.id && (
                  <span className="rounded-full bg-wine px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Ваш уровень
                  </span>
                )}
              </div>
              <div className="tabular mt-2 text-[13px] text-ink-3">
                {t.from === 0 ? "Сразу" : `от ${formatPrice(t.from)} баллов`} ·{" "}
                {t.cashback}% кэшбэк
              </div>
              <ul className="mt-4 space-y-2">
                {t.benefits.slice(0, 4).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[13px] text-ink-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-caramel" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
