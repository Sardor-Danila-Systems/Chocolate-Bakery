"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trash2, ShoppingBag, Sparkles, Tag, ArrowRight } from "lucide-react";
import { formatPrice, pick } from "@/lib/catalog";
import { PROMO_CODES } from "@/lib/demo";
import { useStore } from "@/lib/store";
import { Button, Qty, SectionHead } from "@/components/ui/kit";
import { ProductCard } from "@/components/ui/product-card";

const UPSELL = ["kofe-kapuchino", "makarons-eksklyuziv", "pahlava-vishnevaya", "mohito-klassika"];

export default function CartPage() {
  const {
    lines,
    subtotal,
    discount,
    dispatch,
    state,
    earnPoints,
    pushToast,
  } = useStore();
  const [code, setCode] = useState("");
  const upsell = pick(UPSELL).filter((p) => !lines.some((l) => l.product.slug === p.slug));

  const applyCode = () => {
    const key = code.trim().toUpperCase();
    if (PROMO_CODES[key]) {
      dispatch({ type: "promo", code: key });
      pushToast({ title: "Промокод применён", detail: PROMO_CODES[key].label });
      setCode("");
    } else {
      pushToast({ title: "Промокод не найден", detail: "Проверьте написание" });
    }
  };

  if (lines.length === 0)
    return (
      <div className="mx-auto flex max-w-[600px] flex-col items-center px-5 py-28 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-white">
          <ShoppingBag size={30} className="text-ink-4" />
        </div>
        <h1 className="display mt-7 text-[28px]">В заказе пока пусто</h1>
        <p className="mt-3 text-[15px] text-ink-3">
          Загляните в каталог — 254 позиции из витрины Chocolate ждут вас.
        </p>
        <Button href="/catalog" size="lg" className="mt-7">
          Открыть каталог
        </Button>
      </div>
    );

  return (
    <>
      <section className="mx-auto max-w-[1340px] px-4 pb-12 pt-10 sm:px-6">
        <h1 className="display text-[clamp(2rem,4vw,2.8rem)]">Ваш заказ</h1>
        <p className="mt-2.5 text-[14px] text-ink-3">
          {lines.reduce((a, l) => a + l.qty, 0)} позиции
        </p>

        <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* items */}
          <div>
            <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
              {lines.map(({ product, qty }) => (
                <div key={product.slug} className="flex gap-4 p-4 sm:p-5">
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-cream-2 sm:h-28 sm:w-28"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${product.slug}`}
                          className="text-[15px] font-semibold leading-snug transition hover:text-wine"
                        >
                          {product.name}
                        </Link>
                        {product.weight && (
                          <div className="mt-1 text-[12.5px] text-ink-3">
                            {product.weight}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => dispatch({ type: "remove", slug: product.slug })}
                        className="shrink-0 text-ink-4 transition hover:text-wine"
                        aria-label="Удалить"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                      <Qty
                        size="sm"
                        value={qty}
                        onChange={(n) => dispatch({ type: "setQty", slug: product.slug, qty: n })}
                      />
                      <div className="text-right">
                        <div className="tabular text-[16px] font-bold">
                          {formatPrice(product.price * qty)} сум
                        </div>
                        {qty > 1 && (
                          <div className="tabular text-[12px] text-ink-3">
                            {formatPrice(product.price)} × {qty}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => dispatch({ type: "clear" })}
              className="mt-4 text-[13px] text-ink-3 underline-offset-4 transition hover:text-wine hover:underline"
            >
              Очистить заказ
            </button>
          </div>

          {/* summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-line bg-white p-6">
              <div className="text-[16px] font-semibold">Итого</div>

              <div className="mt-5 flex gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-full border border-line px-4">
                  <Tag size={15} className="shrink-0 text-ink-4" />
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyCode()}
                    placeholder="Промокод"
                    className="w-full bg-transparent py-3 text-[13.5px] outline-none placeholder:text-ink-4"
                  />
                </div>
                <Button onClick={applyCode} variant="outline" size="md">
                  Применить
                </Button>
              </div>

              {state.promoCode && (
                <div className="mt-3 flex items-center justify-between rounded-xl bg-sage/12 px-3.5 py-2.5 text-[13px]">
                  <span className="font-medium text-sage">
                    {PROMO_CODES[state.promoCode].label}
                  </span>
                  <button
                    onClick={() => dispatch({ type: "promo", code: null })}
                    className="text-ink-3 transition hover:text-wine"
                  >
                    Убрать
                  </button>
                </div>
              )}

              <div className="mt-6 space-y-3 border-t border-line pt-5 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-ink-3">Товары</span>
                  <span className="tabular font-medium">{formatPrice(subtotal)} сум</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sage">
                    <span>Скидка по промокоду</span>
                    <span className="tabular font-medium">−{formatPrice(discount)} сум</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-ink-3">Доставка</span>
                  <span className="text-[13px] text-ink-3">рассчитаем на следующем шаге</span>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between border-t border-line pt-5">
                <span className="text-[15px] font-semibold">К оплате</span>
                <span className="tabular display text-[27px]">
                  {formatPrice(subtotal - discount)}
                  <span className="ml-1 text-[14px] font-normal text-ink-3">сум</span>
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-wine/8 px-4 py-3 text-[12.5px] text-wine">
                <Sparkles size={14} className="shrink-0" />
                Начислим <span className="tabular font-bold">{earnPoints("delivery")}</span>{" "}
                баллов после получения
              </div>

              <Button href="/checkout" size="lg" full className="mt-5">
                Перейти к оформлению <ArrowRight size={17} />
              </Button>
              <Link
                href="/catalog"
                className="mt-3 block text-center text-[13px] text-ink-3 transition hover:text-ink"
              >
                Продолжить выбор
              </Link>
            </div>
          </div>
        </div>
      </section>

      {upsell.length > 0 && (
        <section className="mx-auto max-w-[1340px] px-4 pb-16 sm:px-6">
          <SectionHead eyebrow="Добавить к заказу" title="Хорошо сочетается" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {upsell.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
