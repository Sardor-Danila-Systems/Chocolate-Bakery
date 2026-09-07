import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  LayoutDashboard,
  Package,
  Users,
  Sparkles,
  Tag,
  Store,
  BarChart3,
  Settings,
  Search,
  Bell,
} from "lucide-react";
import { formatPrice, products } from "@/lib/catalog";
import { ADMIN } from "@/lib/demo";

export const metadata = {
  title: "Панель управления Chocolate — демо",
  description:
    "Единая система за витриной: заказы, товары, клиенты, лояльность, акции, филиалы и аналитика.",
};

const NAV = [
  { icon: LayoutDashboard, label: "Дашборд", active: true },
  { icon: Package, label: "Заказы", badge: "12" },
  { icon: Store, label: "Товары" },
  { icon: Users, label: "Клиенты" },
  { icon: Sparkles, label: "Chocolate Club" },
  { icon: Tag, label: "Акции" },
  { icon: BarChart3, label: "Аналитика" },
  { icon: Settings, label: "Настройки" },
];

const STATUS_TONE: Record<string, string> = {
  Готовится: "bg-[#b8813f]/15 text-[#8a6129]",
  Собран: "bg-[#7c8a6b]/15 text-[#5b684c]",
  "В пути": "bg-[#a8233e]/12 text-[#a8233e]",
  Получен: "bg-[#e6dacb] text-[#6d5b51]",
};

export default function AdminPage() {
  const max = Math.max(...ADMIN.revenueSeries.map((d) => d.v));

  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-line bg-cream lg:block">
          <div className="sticky top-0 flex h-screen flex-col p-5">
            <Link href="/" className="display text-[22px]">
              Chocolate
            </Link>
            <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-4">
              Панель управления
            </div>

            <nav className="mt-8 space-y-1">
              {NAV.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.label}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium ${
                      n.active ? "bg-ink text-cream" : "text-ink-3"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="flex-1">{n.label}</span>
                    {n.badge && (
                      <span className="tabular rounded-full bg-wine px-2 py-0.5 text-[10px] font-bold text-white">
                        {n.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>

            <Link
              href="/"
              className="mt-auto flex items-center gap-2 rounded-xl border border-line px-3.5 py-2.5 text-[13px] text-ink-3"
            >
              <ArrowLeft size={15} /> Вернуться на сайт
            </Link>
          </div>
        </aside>

        {/* main */}
        <main className="min-w-0 flex-1">
          {/* topbar */}
          <div className="flex items-center gap-4 border-b border-line bg-cream px-5 py-3.5 sm:px-8">
            <Link href="/" className="display text-[19px] lg:hidden">
              Chocolate
            </Link>
            <div className="hidden flex-1 items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2.5 text-[13px] text-ink-4 md:flex md:max-w-sm">
              <Search size={15} /> Заказ, клиент, товар…
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="rounded-full bg-sage/15 px-3 py-1.5 text-[12px] font-medium text-sage">
                Все филиалы работают
              </span>
              <button className="relative grid h-9 w-9 place-items-center rounded-full border border-line bg-white">
                <Bell size={16} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-wine" />
              </button>
              <div className="display grid h-9 w-9 place-items-center rounded-full bg-ink text-[13px] text-cream">
                АД
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="display text-[clamp(1.7rem,3vw,2.2rem)]">
                  Сегодня, 7 сентября
                </h1>
                <p className="mt-1.5 text-[13.5px] text-ink-3">
                  Данные обновлены минуту назад · 9 филиалов
                </p>
              </div>
              <div className="flex gap-2">
                {["День", "Неделя", "Месяц"].map((t, i) => (
                  <span
                    key={t}
                    className={`rounded-full px-4 py-2 text-[13px] font-medium ${
                      i === 0 ? "bg-ink text-cream" : "border border-line bg-white text-ink-3"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* KPI */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Выручка", value: `${formatPrice(ADMIN.today.revenue)}`, unit: "сум", delta: ADMIN.today.revenueDelta },
                { label: "Заказов", value: String(ADMIN.today.orders), unit: "шт", delta: ADMIN.today.ordersDelta },
                { label: "Средний чек", value: formatPrice(ADMIN.today.avgCheck), unit: "сум", delta: ADMIN.today.avgCheckDelta },
                { label: "Доля Chocolate Club", value: `${ADMIN.today.clubShare}`, unit: "%", delta: ADMIN.today.clubShareDelta },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl border border-line bg-cream p-5">
                  <div className="text-[12.5px] text-ink-3">{k.label}</div>
                  <div className="tabular display mt-2 text-[26px] leading-none">
                    {k.value}
                    <span className="ml-1.5 text-[13px] font-normal text-ink-3">{k.unit}</span>
                  </div>
                  <div className="tabular mt-2.5 flex items-center gap-1 text-[12px] font-semibold text-sage">
                    <ArrowUpRight size={13} /> +{k.delta}% к прошлой неделе
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
              {/* revenue chart */}
              <div className="rounded-2xl border border-line bg-cream p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-[15px] font-semibold">Выручка по дням</h2>
                    <p className="mt-1 text-[12.5px] text-ink-3">млн сум · последние 7 дней</p>
                  </div>
                  <div className="tabular display text-[22px]">
                    {ADMIN.revenueSeries.reduce((a, d) => a + d.v, 0).toFixed(1)}
                    <span className="ml-1 text-[12px] font-normal text-ink-3">млн</span>
                  </div>
                </div>

                <div className="mt-7 flex items-end gap-2.5">
                  {ADMIN.revenueSeries.map((d, i) => (
                    <div key={d.d} className="flex flex-1 flex-col items-center gap-2">
                      <span className="tabular text-[11px] font-semibold text-ink-3">
                        {d.v}
                      </span>
                      <div
                        className={`w-full rounded-t-lg ${
                          i === ADMIN.revenueSeries.length - 1 ? "bg-wine" : "bg-ink/15"
                        }`}
                        style={{ height: `${Math.round((d.v / max) * 150)}px` }}
                      />
                      <span className="text-[11px] text-ink-4">{d.d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* channels */}
              <div className="rounded-2xl border border-line bg-cream p-6">
                <h2 className="text-[15px] font-semibold">Откуда приходят заказы</h2>
                <div className="mt-6 space-y-5">
                  {ADMIN.channelSplit.map((c) => (
                    <div key={c.label}>
                      <div className="flex items-baseline justify-between text-[13px]">
                        <span className="font-medium">{c.label}</span>
                        <span className="tabular font-bold">{c.value}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/8">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${c.value}%`, background: c.tone }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 border-t border-line pt-4 text-[12.5px] leading-relaxed text-ink-3">
                  Приложение впервые обогнало сайт по числу заказов — участники клуба
                  заказывают чаще.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
              {/* orders */}
              <div className="overflow-hidden rounded-2xl border border-line bg-cream">
                <div className="flex items-center justify-between px-6 py-5">
                  <h2 className="text-[15px] font-semibold">Последние заказы</h2>
                  <span className="text-[12.5px] text-wine">Все заказы →</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-[13px]">
                    <thead>
                      <tr className="border-y border-line bg-cream-2/60 text-left text-[11.5px] uppercase tracking-wide text-ink-4">
                        <th className="px-6 py-2.5 font-semibold">Номер</th>
                        <th className="px-3 py-2.5 font-semibold">Клиент</th>
                        <th className="px-3 py-2.5 font-semibold">Филиал</th>
                        <th className="px-3 py-2.5 font-semibold">Способ</th>
                        <th className="px-3 py-2.5 text-right font-semibold">Сумма</th>
                        <th className="px-6 py-2.5 font-semibold">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ADMIN.recentOrders.map((o) => (
                        <tr key={o.id} className="border-b border-line last:border-0">
                          <td className="tabular px-6 py-3.5 font-semibold">№{o.id}</td>
                          <td className="px-3 py-3.5">{o.name}</td>
                          <td className="px-3 py-3.5 text-ink-3">{o.branch}</td>
                          <td className="px-3 py-3.5 text-ink-3">{o.method}</td>
                          <td className="tabular px-3 py-3.5 text-right font-semibold">
                            {formatPrice(o.total)}
                          </td>
                          <td className="px-6 py-3.5">
                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_TONE[o.status]}`}
                            >
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* loyalty */}
              <div className="rounded-2xl border border-line bg-cream p-6">
                <h2 className="text-[15px] font-semibold">Chocolate Club</h2>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {[
                    ["Участников", formatPrice(ADMIN.loyaltyStats.members)],
                    ["Активны за месяц", formatPrice(ADMIN.loyaltyStats.activeMonth)],
                    ["Баллов начислено", formatPrice(ADMIN.loyaltyStats.pointsIssued)],
                    ["Повторных покупок", `${ADMIN.loyaltyStats.repeatRate}%`],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <div className="tabular display text-[21px]">{v}</div>
                      <div className="mt-0.5 text-[11.5px] text-ink-3">{l}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t border-line pt-5">
                  {ADMIN.loyaltyStats.tiers.map((t) => (
                    <div key={t.name}>
                      <div className="flex items-baseline justify-between text-[12.5px]">
                        <span className="font-semibold">{t.name}</span>
                        <span className="tabular text-ink-3">
                          {formatPrice(t.count)} · {t.share}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/8">
                        <div
                          className="h-full rounded-full bg-caramel"
                          style={{ width: `${t.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
              {/* top products */}
              <div className="rounded-2xl border border-line bg-cream p-6">
                <h2 className="text-[15px] font-semibold">Топ продаж сегодня</h2>
                <div className="mt-5 space-y-3">
                  {ADMIN.topProducts.map((tp, i) => {
                    const p = products.find((x) => x.slug === tp.slug)!;
                    return (
                      <div key={tp.slug} className="flex items-center gap-3.5">
                        <span className="tabular w-4 shrink-0 text-[13px] font-bold text-ink-4">
                          {i + 1}
                        </span>
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white">
                          <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13px] font-medium">{p.name}</div>
                          <div className="tabular text-[11.5px] text-ink-3">
                            {formatPrice(p.price)} сум
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="tabular text-[14px] font-bold">{tp.sold}</div>
                          <div className="text-[11px] text-ink-4">продано</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* branches */}
              <div className="rounded-2xl border border-line bg-cream p-6">
                <h2 className="text-[15px] font-semibold">Филиалы сегодня</h2>
                <div className="mt-5 space-y-3.5">
                  {ADMIN.branchPerformance.map((b) => (
                    <div key={b.name}>
                      <div className="flex items-baseline justify-between text-[12.5px]">
                        <span className="font-medium">{b.name}</span>
                        <span className="tabular text-ink-3">
                          {b.revenue} млн · {b.orders} заказов
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/8">
                        <div
                          className="h-full rounded-full bg-wine"
                          style={{ width: `${b.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-[12px] text-ink-4">
              Демонстрационные данные · показывает, что за витриной работает единая
              система: товары, заказы, клиенты, лояльность, акции, филиалы и аналитика
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
