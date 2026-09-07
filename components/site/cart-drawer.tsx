"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { formatPrice, pick } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Button, Qty } from "@/components/ui/kit";

const UPSELL = ["kofe-kapuchino", "makarons-eksklyuziv", "pahlava-vishnevaya"];

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, dispatch, add, earnPoints } = useStore();
  const upsell = pick(UPSELL).filter((p) => !lines.some((l) => l.product.slug === p.slug));

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} />
            <span className="text-[16px] font-semibold">Ваш заказ</span>
            <span className="tabular text-[13px] text-ink-3">
              {lines.reduce((a, l) => a + l.qty, 0)}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line"
            aria-label="Закрыть"
          >
            <X size={17} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-cream-2">
              <ShoppingBag size={24} className="text-ink-4" />
            </div>
            <div>
              <p className="text-[16px] font-semibold">Заказ пока пуст</p>
              <p className="mt-1.5 text-[13.5px] text-ink-3">
                Загляните в каталог — там 254 позиции из витрины Chocolate.
              </p>
            </div>
            <Button href="/catalog" onClick={() => setCartOpen(false)}>
              Открыть каталог
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-4">
                {lines.map(({ product, qty }) => (
                  <div key={product.slug} className="flex gap-3.5">
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white"
                    >
                      <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="line-clamp-2 text-[13.5px] font-medium leading-snug"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => dispatch({ type: "remove", slug: product.slug })}
                          className="shrink-0 text-ink-4 transition hover:text-wine"
                          aria-label="Удалить"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <Qty
                          size="sm"
                          value={qty}
                          onChange={(n) => dispatch({ type: "setQty", slug: product.slug, qty: n })}
                        />
                        <span className="tabular text-[14px] font-semibold">
                          {formatPrice(product.price * qty)} сум
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {upsell.length > 0 && (
                <div className="mt-7 border-t border-line pt-5">
                  <div className="eyebrow mb-3 text-ink-4">Добавить к заказу</div>
                  <div className="space-y-2">
                    {upsell.slice(0, 2).map((p) => (
                      <div
                        key={p.slug}
                        className="flex items-center gap-3 rounded-xl border border-line bg-white p-2.5"
                      >
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                          <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13px] font-medium">{p.name}</div>
                          <div className="tabular text-[12px] text-ink-3">
                            {formatPrice(p.price)} сум
                          </div>
                        </div>
                        <button
                          onClick={() => add(p.slug)}
                          className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-[12px] font-semibold transition hover:border-ink"
                        >
                          + Добавить
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-line bg-cream-2 px-5 py-4">
              <div className="mb-3 flex items-center gap-2 rounded-xl bg-wine/8 px-3.5 py-2.5 text-[12.5px] text-wine">
                <Sparkles size={14} className="shrink-0" />
                За этот заказ начислим{" "}
                <span className="tabular font-bold">{earnPoints("delivery")}</span> баллов
              </div>
              <div className="mb-3.5 flex items-center justify-between">
                <span className="text-[14px] text-ink-3">Сумма</span>
                <span className="tabular text-[19px] font-bold">
                  {formatPrice(subtotal)} сум
                </span>
              </div>
              <Button href="/checkout" full size="lg" onClick={() => setCartOpen(false)}>
                Оформить заказ
              </Button>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-2.5 w-full py-2 text-[13px] text-ink-3 transition hover:text-ink"
              >
                Продолжить выбор
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
