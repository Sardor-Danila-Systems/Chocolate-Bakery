"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import {
  Heart,
  Truck,
  Store,
  Clock,
  Star,
  Check,
  Sparkles,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { categoryBySlug, formatPrice, type Product } from "@/lib/catalog";
import { branches } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { tierForPoints, pointsFor } from "@/lib/loyalty";
import { Button, Qty } from "@/components/ui/kit";

const CAKE_SIZES = [
  { id: "1", label: "1 кг", note: "6–8 порций", mult: 1 },
  { id: "1.5", label: "1,5 кг", note: "8–10 порций", mult: 1.45 },
  { id: "2", label: "2 кг", note: "12–14 порций", mult: 1.9 },
];

export function ProductDetail({ product }: { product: Product }) {
  const { add, isFav, toggleFav, state } = useStore();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(CAKE_SIZES[0].id);
  const [method, setMethod] = useState<"delivery" | "pickup">("delivery");
  const [added, setAdded] = useState(false);

  const isCake = product.category === "cakes" || product.category === "mini-cakes";
  const sizeMult = isCake ? (CAKE_SIZES.find((s) => s.id === size)?.mult ?? 1) : 1;
  const price = Math.round(product.price * sizeMult);
  const tier = tierForPoints(state.lifetimePoints);
  const willEarn = pointsFor(price * qty, tier);
  const cat = categoryBySlug(product.category);
  const nearest = branches[0];

  const onAdd = () => {
    add(product.slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      {/* gallery */}
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:1024px) 100vw, 620px"
            className="object-cover"
            priority
          />
          {product.badges[0] && (
            <span
              className={clsx(
                "absolute left-5 top-5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em]",
                product.badges[0] === "hit"
                  ? "bg-wine text-white"
                  : product.badges[0] === "new"
                    ? "bg-ink text-cream"
                    : "bg-sage text-white",
              )}
            >
              {product.badges[0] === "hit"
                ? "Хит продаж"
                : product.badges[0] === "new"
                  ? "Новинка"
                  : "Сезонное"}
            </span>
          )}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={clsx(
                "relative aspect-square overflow-hidden rounded-xl bg-white",
                i === 0 ? "ring-2 ring-ink" : "opacity-60",
              )}
            >
              <Image
                src={product.image}
                alt=""
                fill
                sizes="140px"
                className={clsx("object-cover", i === 1 && "scale-125", i === 2 && "scale-150 rotate-3", i === 3 && "scale-110 -rotate-2")}
              />
            </div>
          ))}
        </div>
      </div>

      {/* info */}
      <div>
        <Link
          href={`/catalog/${product.category}`}
          className="eyebrow inline-flex items-center gap-1 text-caramel transition hover:text-ink"
        >
          {cat?.name} <ChevronRight size={12} />
        </Link>

        <h1 className="display mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)]">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-4 text-[13px] text-ink-3">
          <span className="flex items-center gap-1.5">
            <Star size={14} className="fill-caramel text-caramel" />
            <span className="tabular font-semibold text-ink">{product.rating}</span>
            <span>({product.reviews} оценок)</span>
          </span>
          {product.weight && <span>{product.weight}</span>}
        </div>

        {product.desc && (
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
            {product.desc}
          </p>
        )}

        {/* size variants for cakes */}
        {isCake && (
          <div className="mt-7">
            <div className="eyebrow mb-3 text-ink-4">Размер</div>
            <div className="flex flex-wrap gap-2.5">
              {CAKE_SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={clsx(
                    "rounded-2xl border px-4 py-3 text-left transition",
                    size === s.id
                      ? "border-ink bg-ink text-cream"
                      : "border-line bg-white hover:border-ink/30",
                  )}
                >
                  <div className="text-[14px] font-semibold">{s.label}</div>
                  <div
                    className={clsx(
                      "mt-0.5 text-[11.5px]",
                      size === s.id ? "text-cream/60" : "text-ink-4",
                    )}
                  >
                    {s.note}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* price + add */}
        <div className="mt-8 rounded-3xl border border-line bg-white p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="tabular display text-[34px] leading-none">
                {formatPrice(price)}
                <span className="ml-1.5 text-[15px] font-medium text-ink-3">сум</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[12.5px] text-wine">
                <Sparkles size={13} />
                <span className="tabular font-semibold">+{willEarn}</span> баллов в
                Chocolate Club
              </div>
            </div>
            <Qty value={qty} onChange={(n) => setQty(Math.max(1, n))} />
          </div>

          <div className="mt-5 flex gap-2.5">
            <Button
              onClick={onAdd}
              size="lg"
              full
              variant={added ? "dark" : "primary"}
              className="flex-1"
            >
              {added ? (
                <>
                  <Check size={17} /> Добавлено в заказ
                </>
              ) : (
                <>Добавить в заказ · {formatPrice(price * qty)}</>
              )}
            </Button>
            <button
              onClick={() => toggleFav(product.slug)}
              aria-label="В избранное"
              className={clsx(
                "grid h-13 w-13 shrink-0 place-items-center rounded-full border transition",
                isFav(product.slug)
                  ? "border-wine bg-wine/10 text-wine"
                  : "border-line hover:border-ink/30",
              )}
            >
              <Heart size={19} fill={isFav(product.slug) ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* delivery / pickup */}
        <div className="mt-5 overflow-hidden rounded-3xl border border-line bg-white">
          <div className="flex border-b border-line">
            {(
              [
                { id: "delivery", label: "Доставка", icon: <Truck size={15} /> },
                { id: "pickup", label: "Самовывоз", icon: <Store size={15} /> },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={clsx(
                  "flex flex-1 items-center justify-center gap-2 py-3.5 text-[13.5px] font-medium transition",
                  method === m.id
                    ? "bg-cream-2 text-ink"
                    : "text-ink-3 hover:text-ink",
                )}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          <div className="p-5 text-[13.5px]">
            {method === "delivery" ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-ink-3">
                    <Clock size={14} /> Ближайшая доставка
                  </span>
                  <span className="font-semibold">сегодня, 45–60 минут</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-3">Стоимость</span>
                  <span className="font-semibold">
                    {tier.id === "truffle"
                      ? "Бесплатно · ваш уровень"
                      : "15 000 сум, от 150 000 — бесплатно"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex items-center gap-2 text-ink-3">
                    <MapPin size={14} /> Ближайший филиал
                  </span>
                  <span className="text-right font-semibold">
                    {nearest.name}
                    <span className="block text-[12px] font-normal text-ink-3">
                      {nearest.address}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-3">Будет готов</span>
                  <span className="font-semibold">через 25 минут</span>
                </div>
                <Link
                  href="/branches"
                  className="inline-block pt-1 text-[13px] font-semibold text-wine"
                >
                  Выбрать другой филиал →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* composition */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="eyebrow mb-3 text-ink-4">Состав и хранение</div>
            <p className="text-[13px] leading-relaxed text-ink-2">
              {product.desc || "Натуральные ингредиенты без консервантов."}
            </p>
            <p className="mt-3 text-[12.5px] text-ink-3">
              Хранить при +2…+6 °C. Срок годности — 72 часа.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="eyebrow mb-3 text-ink-4">Пищевая ценность на 100 г</div>
            <div className="space-y-2 text-[13px]">
              {[
                ["Калорийность", `${product.calories} ккал`],
                ["Белки", `${product.proteins} г`],
                ["Жиры", `${product.fats} г`],
                ["Углеводы", `${product.carbs} г`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-line pb-2 last:border-0">
                  <span className="text-ink-3">{k}</span>
                  <span className="tabular font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
