"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { RotateCcw, Truck, Store, Sparkles, ChevronRight } from "lucide-react";
import { formatPrice, products } from "@/lib/catalog";
import { branchName, type DemoOrder } from "@/lib/demo";
import { useStore } from "@/lib/store";
import { Progress } from "@/components/ui/kit";

const STATUS_TONE: Record<string, string> = {
  preparing: "bg-caramel/15 text-caramel",
  ontheway: "bg-wine/12 text-wine",
  ready: "bg-sage/15 text-sage",
  done: "bg-cream-2 text-ink-3",
  cancelled: "bg-cream-2 text-ink-4",
};

const STEPS = ["Принят", "Готовится", "В пути", "Получен"];

export function OrderCard({ order, detailed }: { order: DemoOrder; detailed?: boolean }) {
  const { add, pushToast, setCartOpen } = useStore();
  const items = order.items
    .map((i) => ({ product: products.find((p) => p.slug === i.slug)!, qty: i.qty }))
    .filter((i) => i.product);

  const repeat = () => {
    order.items.forEach((i) => add(i.slug, i.qty));
    pushToast({
      title: "Заказ добавлен в корзину",
      detail: `${items.length} позиции из заказа №${order.number}`,
    });
    setCartOpen(true);
  };

  const activeStep =
    order.status === "preparing" ? 1 : order.status === "ontheway" ? 2 : 3;

  return (
    <div className="rounded-3xl border border-line bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-[16px] font-semibold">Заказ №{order.number}</span>
            <span
              className={clsx(
                "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
                STATUS_TONE[order.status],
              )}
            >
              {order.statusLabel}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-3">
            <span>{order.dateFull}</span>
            <span className="flex items-center gap-1.5">
              {order.method === "delivery" ? <Truck size={13} /> : <Store size={13} />}
              {order.method === "delivery" ? "Доставка" : "Самовывоз"} ·{" "}
              {branchName(order.branch)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="tabular text-[18px] font-bold">
            {formatPrice(order.total)} сум
          </div>
          <div className="tabular mt-0.5 flex items-center justify-end gap-1 text-[12px] text-wine">
            <Sparkles size={12} /> +{order.points} баллов
          </div>
        </div>
      </div>

      {/* live status */}
      {order.status === "preparing" && (
        <div className="mt-5 rounded-2xl bg-cream-2 p-4">
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold">Готовим ваш заказ</span>
            <span className="tabular text-ink-3">{order.eta}</span>
          </div>
          <div className="mt-3 text-ink">
            <Progress value={order.progress ?? 40} tone="wine" />
          </div>
          <div className="mt-2.5 flex justify-between text-[11.5px] text-ink-3">
            {STEPS.map((s, i) => (
              <span key={s} className={i <= activeStep ? "font-semibold text-ink" : ""}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* items */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex -space-x-3">
          {items.slice(0, 4).map(({ product }) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-cream-2"
            >
              <Image src={product.image} alt={product.name} fill sizes="48px" className="object-cover" />
            </Link>
          ))}
        </div>
        <div className="min-w-0 flex-1 text-[13px] text-ink-3">
          {items.map((i) => `${i.product.name}${i.qty > 1 ? ` × ${i.qty}` : ""}`).join(" · ")}
        </div>
      </div>

      {detailed && (
        <div className="mt-5 space-y-2 border-t border-line pt-4">
          {items.map(({ product, qty }) => (
            <div key={product.slug} className="flex justify-between text-[13.5px]">
              <span className="text-ink-2">
                {product.name}
                {qty > 1 && <span className="text-ink-4"> × {qty}</span>}
              </span>
              <span className="tabular font-medium">
                {formatPrice(product.price * qty)} сум
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2.5 border-t border-line pt-4">
        <button
          onClick={repeat}
          className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-cream transition hover:bg-wine"
        >
          <RotateCcw size={14} /> Повторить заказ
        </button>
        {order.status === "preparing" ? (
          <Link
            href="/app"
            className="flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-[13px] font-medium transition hover:border-ink/30"
          >
            Отследить в приложении <ChevronRight size={14} />
          </Link>
        ) : (
          <button className="rounded-full border border-line px-5 py-2.5 text-[13px] font-medium transition hover:border-ink/30">
            Чек и детали
          </button>
        )}
      </div>
    </div>
  );
}
