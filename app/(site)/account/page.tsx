"use client";

import Link from "next/link";
import { ArrowRight, Package, Heart, Sparkles, Gift } from "lucide-react";
import { formatPrice, pick } from "@/lib/catalog";
import { RECOMMENDED_SLUGS, USER } from "@/lib/demo";
import { useStore } from "@/lib/store";
import { tierProgress } from "@/lib/loyalty";
import { OrderCard } from "@/components/account/order-card";
import { ProductCard } from "@/components/ui/product-card";
import { Progress, SectionHead } from "@/components/ui/kit";

export default function AccountPage() {
  const { state } = useStore();
  const { current, next, pct, remaining } = tierProgress(state.lifetimePoints);
  const active = state.orders.find((o) => o.status === "preparing");
  const recommended = pick(RECOMMENDED_SLUGS).slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow text-caramel">Личный кабинет</div>
        <h1 className="display mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)]">
          Добрый вечер, {USER.name}
        </h1>
      </div>

      {/* stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: <Sparkles size={17} />,
            label: "Баллов",
            value: formatPrice(state.points),
            note: `${formatPrice(state.points * 100)} сум`,
            href: "/account/loyalty",
          },
          {
            icon: <Package size={17} />,
            label: "Заказов",
            value: String(USER.ordersCount),
            note: "с марта 2024",
            href: "/account/orders",
          },
          {
            icon: <Heart size={17} />,
            label: "В избранном",
            value: String(state.favorites.length),
            note: "позиций",
            href: "/account/favorites",
          },
          {
            icon: <Gift size={17} />,
            label: "День рождения",
            value: `${USER.daysToBirthday} дн.`,
            note: "подарок ждёт",
            href: "/promotions/den-rozhdeniya",
          },
        ].map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-3xl border border-line bg-white p-5 transition hover:border-ink/25"
          >
            <div className="flex items-center gap-2 text-ink-3">
              {s.icon}
              <span className="text-[12.5px]">{s.label}</span>
            </div>
            <div className="tabular display mt-2.5 text-[28px]">{s.value}</div>
            <div className="mt-1 text-[12px] text-ink-4">{s.note}</div>
          </Link>
        ))}
      </div>

      {/* tier progress */}
      <div className="rounded-3xl bg-ink p-7 text-cream">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="eyebrow text-cream/45">Chocolate Club</div>
            <div className="display mt-2.5 text-[26px]">
              Уровень {current.name}
            </div>
            <p className="mt-1.5 text-[13px] text-cream/50">{current.story}</p>
          </div>
          <div className="text-right">
            <div className="tabular display text-[34px] text-caramel-light">
              {current.cashback}%
            </div>
            <div className="text-[12px] text-cream/45">возвращаем баллами</div>
          </div>
        </div>
        <div className="mt-7 text-cream">
          <Progress value={pct} tone="caramel" />
          <div className="mt-2.5 flex justify-between text-[12.5px] text-cream/50">
            <span>
              {next
                ? `${formatPrice(remaining)} баллов до уровня ${next.name}`
                : "Максимальный уровень достигнут"}
            </span>
            {next && <span className="tabular">{formatPrice(next.from)}</span>}
          </div>
        </div>
        <Link
          href="/account/loyalty"
          className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-caramel-light"
        >
          Награды и история <ArrowRight size={15} />
        </Link>
      </div>

      {/* active order */}
      {active && (
        <div>
          <SectionHead
            title="Текущий заказ"
            action="Все заказы"
            href="/account/orders"
            className="mb-5"
          />
          <OrderCard order={active} />
        </div>
      )}

      {/* recommendations */}
      <div>
        <SectionHead
          eyebrow="Для вас"
          title="На основе ваших заказов"
          action="В каталог"
          href="/catalog"
          className="mb-5"
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
          {recommended.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
