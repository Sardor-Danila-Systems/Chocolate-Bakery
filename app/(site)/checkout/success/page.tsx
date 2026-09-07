"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Sparkles, Clock, Smartphone, ArrowRight } from "lucide-react";
import { formatPrice, pick } from "@/lib/catalog";
import { RECOMMENDED_SLUGS } from "@/lib/demo";
import { useStore } from "@/lib/store";
import { tierProgress } from "@/lib/loyalty";
import { Button, Progress } from "@/components/ui/kit";
import { ProductCard } from "@/components/ui/product-card";

function SuccessInner() {
  const params = useSearchParams();
  const { state } = useStore();
  const number = params.get("order") ?? "10483";
  const points = Number(params.get("points") ?? 0);
  const method = params.get("method") ?? "delivery";
  const { current, next, pct, remaining } = tierProgress(state.lifetimePoints);
  const suggestions = pick(RECOMMENDED_SLUGS).slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-[820px] px-4 pb-14 pt-16 text-center sm:px-6">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage text-white">
          <Check size={30} />
        </div>
        <h1 className="display mt-7 text-[clamp(2rem,4.4vw,3rem)]">
          Заказ №{number} принят
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-ink-3">
          {method === "delivery"
            ? "Курьер заберёт заказ из филиала Беруни и привезёт за 45–60 минут."
            : "Соберём заказ за 25 минут — покажите номер на кассе."}
        </p>

        <div className="mt-9 grid gap-3 sm:grid-cols-3">
          {[
            { icon: <Clock size={18} />, label: "Готовим", value: method === "delivery" ? "45–60 мин" : "25 мин" },
            { icon: <Sparkles size={18} />, label: "Начислено баллов", value: `+${points}` },
            { icon: <Smartphone size={18} />, label: "Статус заказа", value: "в приложении" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-white p-5">
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-cream-2 text-ink-2">
                {s.icon}
              </div>
              <div className="mt-3 text-[12.5px] text-ink-3">{s.label}</div>
              <div className="tabular mt-1 text-[17px] font-semibold">{s.value}</div>
            </div>
          ))}
        </div>

        {/* loyalty progress after purchase */}
        <div className="mt-4 rounded-3xl bg-ink p-7 text-cream">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="eyebrow text-cream/45">Chocolate Club</div>
              <div className="tabular display mt-2 text-[32px] leading-none">
                {formatPrice(state.points)}
              </div>
              <div className="mt-1 text-[12.5px] text-cream/50">
                баллов · {formatPrice(state.points * 100)} сум
              </div>
            </div>
            <span
              className="rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wider"
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
            <div className="mt-2.5 flex justify-between text-[12px] text-cream/50">
              <span>
                {next
                  ? `${formatPrice(remaining)} баллов до ${next.name}`
                  : "Максимальный уровень"}
              </span>
              {next && <span className="tabular">{formatPrice(next.from)}</span>}
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <Button href="/account/orders" size="lg">
            Отследить заказ <ArrowRight size={16} />
          </Button>
          <Button href="/catalog" variant="outline" size="lg">
            Продолжить покупки
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-4 pb-16 sm:px-6">
        <h2 className="display mb-7 text-center text-[24px]">
          В следующий раз попробуйте
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
          {suggestions.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-[15px] text-ink-3">Оформляем заказ…</div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
