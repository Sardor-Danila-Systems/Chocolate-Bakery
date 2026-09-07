"use client";

import { useState } from "react";
import clsx from "clsx";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { OrderCard } from "@/components/account/order-card";
import { Button } from "@/components/ui/kit";

export default function OrdersPage() {
  const { state } = useStore();
  const [tab, setTab] = useState<"current" | "history">("current");

  const current = state.orders.filter((o) =>
    ["preparing", "ontheway", "ready"].includes(o.status),
  );
  const history = state.orders.filter((o) => o.status === "done");
  const list = tab === "current" ? current : history;
  const spent = history.reduce((a, o) => a + o.total, 0);

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-caramel">История</div>
          <h1 className="display mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)]">Мои заказы</h1>
        </div>
        <div className="text-right">
          <div className="tabular display text-[24px]">{formatPrice(spent)}</div>
          <div className="text-[12.5px] text-ink-3">потрачено за всё время</div>
        </div>
      </div>

      <div className="inline-flex gap-1 rounded-full border border-line bg-white p-1">
        {(
          [
            { id: "current" as const, label: `Текущие (${current.length})` },
            { id: "history" as const, label: `История (${history.length})` },
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

      {list.length === 0 ? (
        <div className="rounded-3xl border border-line bg-white py-20 text-center">
          <p className="display text-[22px]">
            {tab === "current" ? "Активных заказов нет" : "История пока пуста"}
          </p>
          <p className="mt-2.5 text-[14px] text-ink-3">
            Самое время выбрать что-нибудь к чаю.
          </p>
          <Button href="/catalog" className="mt-6">
            В каталог
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((o) => (
            <OrderCard key={o.id} order={o} detailed={tab === "history"} />
          ))}
        </div>
      )}
    </div>
  );
}
