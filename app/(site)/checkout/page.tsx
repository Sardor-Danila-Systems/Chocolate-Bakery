"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import {
  Truck,
  Store,
  Check,
  Clock,
  MapPin,
  CreditCard,
  Banknote,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { branches, formatPrice } from "@/lib/catalog";
import { ADDRESSES, PAYMENT_METHODS, PROMO_CODES, TIME_SLOTS } from "@/lib/demo";
import { useStore } from "@/lib/store";
import { tierForPoints } from "@/lib/loyalty";
import { Button } from "@/components/ui/kit";

type Method = "delivery" | "pickup";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    lines,
    subtotal,
    discount,
    pointsDiscount,
    deliveryFee,
    total,
    earnPoints,
    state,
    dispatch,
    pushToast,
  } = useStore();

  const [method, setMethod] = useState<Method>("delivery");
  const [addressId, setAddressId] = useState(ADDRESSES[0].id);
  const [branchSlug, setBranchSlug] = useState(branches[0].slug);
  const [slot, setSlot] = useState(TIME_SLOTS[0]);
  const [payment, setPayment] = useState(PAYMENT_METHODS[0].id);
  const [comment, setComment] = useState("");
  const [placing, setPlacing] = useState(false);

  const tier = tierForPoints(state.lifetimePoints);
  const fee = deliveryFee(method);
  const grand = total(method);
  const willEarn = earnPoints(method);
  const branch = branches.find((b) => b.slug === branchSlug)!;

  if (lines.length === 0)
    return (
      <div className="mx-auto max-w-[600px] px-5 py-28 text-center">
        <h1 className="display text-[28px]">Заказ пуст</h1>
        <p className="mt-3 text-[15px] text-ink-3">
          Добавьте что-нибудь из каталога, и мы всё оформим.
        </p>
        <Button href="/catalog" size="lg" className="mt-7">
          В каталог
        </Button>
      </div>
    );

  const placeOrder = () => {
    setPlacing(true);
    const number = String(10483 + state.orders.length);
    const spent = state.usePoints ? Math.round(pointsDiscount / 100) : 0;
    const order = {
      id: `o-${number}`,
      number,
      date: "только что",
      dateFull: "7 сентября 2026",
      status: "preparing" as const,
      statusLabel: "Готовится",
      method,
      branch: method === "pickup" ? branchSlug : branches[0].slug,
      total: grand,
      points: willEarn,
      items: lines.map((l) => ({ slug: l.product.slug, qty: l.qty })),
      eta: method === "delivery" ? "через 45–60 минут" : "через 25 минут",
      progress: 15,
    };
    setTimeout(() => {
      dispatch({ type: "placeOrder", order, spentPoints: spent });
      router.push(`/checkout/success?order=${number}&points=${willEarn}&method=${method}`);
    }, 900);
  };

  const Step = ({ n, title }: { n: number; title: string }) => (
    <div className="mb-4 flex items-center gap-3">
      <span className="tabular grid h-7 w-7 place-items-center rounded-full bg-ink text-[12px] font-bold text-cream">
        {n}
      </span>
      <h2 className="text-[17px] font-semibold">{title}</h2>
    </div>
  );

  return (
    <section className="mx-auto max-w-[1340px] px-4 pb-16 pt-10 sm:px-6">
      <nav className="mb-6 flex items-center gap-1.5 text-[12.5px] text-ink-4">
        <Link href="/cart" className="transition hover:text-ink">
          Заказ
        </Link>
        <ChevronRight size={13} />
        <span className="text-ink-2">Оформление</span>
      </nav>

      <h1 className="display text-[clamp(2rem,4vw,2.8rem)]">Оформление заказа</h1>

      <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_390px]">
        <div className="space-y-4">
          {/* 1. method */}
          <div className="rounded-3xl border border-line bg-white p-6">
            <Step n={1} title="Как получить заказ" />
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  {
                    id: "delivery" as const,
                    label: "Доставка",
                    note: "45–60 минут по Самарканду",
                    icon: <Truck size={18} />,
                  },
                  {
                    id: "pickup" as const,
                    label: "Самовывоз",
                    note: "Готов через 25 минут · бесплатно",
                    icon: <Store size={18} />,
                  },
                ]
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={clsx(
                    "flex items-start gap-3 rounded-2xl border p-4 text-left transition",
                    method === m.id
                      ? "border-ink bg-cream-2"
                      : "border-line hover:border-ink/30",
                  )}
                >
                  <span
                    className={clsx(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full",
                      method === m.id ? "bg-ink text-cream" : "bg-cream-2 text-ink-3",
                    )}
                  >
                    {m.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14.5px] font-semibold">{m.label}</span>
                    <span className="mt-0.5 block text-[12.5px] text-ink-3">{m.note}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. where */}
          <div className="rounded-3xl border border-line bg-white p-6">
            <Step n={2} title={method === "delivery" ? "Адрес доставки" : "Филиал"} />

            {method === "delivery" ? (
              <div className="space-y-2.5">
                {ADDRESSES.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAddressId(a.id)}
                    className={clsx(
                      "flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition",
                      addressId === a.id
                        ? "border-ink bg-cream-2"
                        : "border-line hover:border-ink/30",
                    )}
                  >
                    <span>
                      <span className="block text-[14px] font-semibold">{a.label}</span>
                      <span className="mt-0.5 block text-[13px] text-ink-3">{a.address}</span>
                      <span className="mt-0.5 block text-[12px] text-ink-4">{a.note}</span>
                    </span>
                    {addressId === a.id && (
                      <Check size={17} className="mt-1 shrink-0 text-wine" />
                    )}
                  </button>
                ))}
                <button className="w-full rounded-2xl border border-dashed border-line py-3.5 text-[13.5px] text-ink-3 transition hover:border-ink/30 hover:text-ink">
                  + Добавить новый адрес
                </button>
              </div>
            ) : (
              <div className="max-h-[340px] space-y-2.5 overflow-y-auto pr-1">
                {branches.map((b) => (
                  <button
                    key={b.slug}
                    onClick={() => setBranchSlug(b.slug)}
                    className={clsx(
                      "flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition",
                      branchSlug === b.slug
                        ? "border-ink bg-cream-2"
                        : "border-line hover:border-ink/30",
                    )}
                  >
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-[14px] font-semibold">
                        {b.name}
                        {b.flagship && (
                          <span className="rounded-full bg-caramel/15 px-2 py-0.5 text-[10px] font-bold uppercase text-caramel">
                            Флагман
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-[13px] text-ink-3">
                        {b.address}
                      </span>
                      <span className="mt-0.5 block text-[12px] text-sage">
                        Открыт · {b.hours}
                      </span>
                    </span>
                    {branchSlug === b.slug && (
                      <Check size={17} className="mt-1 shrink-0 text-wine" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. time */}
          <div className="rounded-3xl border border-line bg-white p-6">
            <Step n={3} title="Время получения" />
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSlot(t)}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[13px] transition",
                    slot === t
                      ? "border-ink bg-ink text-cream"
                      : "border-line hover:border-ink/30",
                  )}
                >
                  {t === TIME_SLOTS[0] && <Clock size={13} />}
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 4. payment */}
          <div className="rounded-3xl border border-line bg-white p-6">
            <Step n={4} title="Оплата" />
            <div className="grid gap-2.5 sm:grid-cols-3">
              {PAYMENT_METHODS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPayment(p.id)}
                  className={clsx(
                    "flex items-center gap-3 rounded-2xl border p-4 text-left transition",
                    payment === p.id ? "border-ink bg-cream-2" : "border-line hover:border-ink/30",
                  )}
                >
                  <span
                    className={clsx(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full",
                      payment === p.id ? "bg-ink text-cream" : "bg-cream-2 text-ink-3",
                    )}
                  >
                    {p.type === "cash" ? <Banknote size={16} /> : <CreditCard size={16} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-semibold">{p.label}</span>
                    <span className="tabular block text-[12px] text-ink-3">{p.mask}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* points */}
            <label className="mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-wine/8 p-4">
              <span className="flex items-center gap-3">
                <Sparkles size={18} className="shrink-0 text-wine" />
                <span>
                  <span className="block text-[13.5px] font-semibold text-wine">
                    Списать баллы Chocolate Club
                  </span>
                  <span className="tabular block text-[12.5px] text-wine/70">
                    Доступно {formatPrice(state.points)} баллов ·{" "}
                    {formatPrice(state.points * 100)} сум · не более 50% заказа
                  </span>
                </span>
              </span>
              <input
                type="checkbox"
                checked={state.usePoints}
                onChange={(e) => dispatch({ type: "usePoints", on: e.target.checked })}
                className="h-5 w-5 shrink-0 accent-[#a8233e]"
              />
            </label>
          </div>

          {/* 5. comment */}
          <div className="rounded-3xl border border-line bg-white p-6">
            <Step n={5} title="Комментарий к заказу" />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Например: надпись на торте «С днём рождения, Камола», свечи, домофон не работает"
              className="w-full resize-none rounded-2xl border border-line bg-cream/40 p-4 text-[14px] outline-none transition focus:border-ink/40 placeholder:text-ink-4"
            />
          </div>
        </div>

        {/* summary */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-line bg-white p-6">
            <div className="text-[16px] font-semibold">Ваш заказ</div>

            <div className="mt-4 max-h-[220px] space-y-3 overflow-y-auto pr-1">
              {lines.map(({ product, qty }) => (
                <div key={product.slug} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-cream-2">
                    <Image src={product.image} alt={product.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium">{product.name}</div>
                    <div className="tabular text-[12px] text-ink-3">× {qty}</div>
                  </div>
                  <div className="tabular shrink-0 text-[13px] font-semibold">
                    {formatPrice(product.price * qty)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2.5 border-t border-line pt-5 text-[13.5px]">
              <div className="flex justify-between">
                <span className="text-ink-3">Товары</span>
                <span className="tabular">{formatPrice(subtotal)} сум</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sage">
                  <span>{PROMO_CODES[state.promoCode!]?.label}</span>
                  <span className="tabular">−{formatPrice(discount)} сум</span>
                </div>
              )}
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-wine">
                  <span>Списание баллов</span>
                  <span className="tabular">−{formatPrice(pointsDiscount)} сум</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-ink-3">
                  {method === "delivery" ? "Доставка" : "Самовывоз"}
                </span>
                <span className={clsx("tabular", fee === 0 && "text-sage")}>
                  {fee === 0 ? "бесплатно" : `${formatPrice(fee)} сум`}
                </span>
              </div>
              {method === "delivery" && fee === 0 && tier.id !== "cocoa" && (
                <div className="text-[12px] text-sage">
                  Бесплатная доставка — привилегия уровня {tier.name}
                </div>
              )}
            </div>

            <div className="mt-5 flex items-end justify-between border-t border-line pt-5">
              <span className="text-[15px] font-semibold">К оплате</span>
              <span className="tabular display text-[28px]">
                {formatPrice(grand)}
                <span className="ml-1 text-[14px] font-normal text-ink-3">сум</span>
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-wine/8 px-4 py-3 text-[12.5px] text-wine">
              <Sparkles size={14} className="shrink-0" />
              Начислим <span className="tabular font-bold">{willEarn}</span> баллов
              после получения
            </div>

            <div className="mt-4 rounded-2xl bg-cream-2 p-4 text-[12.5px] text-ink-3">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <div>
                  {method === "delivery"
                    ? ADDRESSES.find((a) => a.id === addressId)?.address
                    : `${branch.name} · ${branch.address}`}
                  <div className="mt-1">{slot}</div>
                </div>
              </div>
            </div>

            <Button
              onClick={placeOrder}
              size="lg"
              full
              className="mt-5"
              disabled={placing}
            >
              {placing ? "Оформляем…" : `Оплатить ${formatPrice(grand)} сум`}
            </Button>
            <p className="mt-3 text-center text-[11.5px] leading-relaxed text-ink-4">
              Это демонстрация — оплата не проводится
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
