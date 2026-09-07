/* THROWAWAY PROTOTYPE — Variant C: "Modern digital product / lifestyle" */

import Image from "next/image";
import { categories, formatPrice, formatSum, pick, products } from "@/lib/catalog";
import { POPULAR_SLUGS, RECOMMENDED_SLUGS, USER } from "@/lib/demo";
import {
  Search,
  ShoppingBag,
  MapPin,
  Plus,
  RotateCcw,
  Cake,
  Coffee,
  ChevronRight,
} from "lucide-react";

export const NAME = "Product-first app";

function Tile({ slug }: { slug: string }) {
  const p = products.find((x) => x.slug === slug)!;
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-2">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="220px"
          className="object-cover transition duration-500 group-hover:scale-[1.05]"
        />
        <button className="absolute bottom-2.5 right-2.5 grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-lg transition hover:bg-wine hover:text-white">
          <Plus size={17} />
        </button>
      </div>
      <div className="mt-2.5 line-clamp-1 text-[13.5px] font-medium">{p.name}</div>
      <div className="tabular text-[13px] text-ink-3">{formatSum(p.price)}</div>
    </div>
  );
}

export default function VariantC() {
  const recommended = pick(RECOMMENDED_SLUGS);
  const popular = pick(POPULAR_SLUGS);

  return (
    <div className="min-h-screen bg-cream">
      {/* compact app-like header: context + search + balance */}
      <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 py-3">
          <div className="display text-[21px]">Chocolate</div>

          <button className="flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-[13px]">
            <MapPin size={14} className="text-wine" />
            <span className="font-medium">Доставка</span>
            <span className="text-ink-4">· Беруни</span>
            <ChevronRight size={13} className="text-ink-4" />
          </button>

          <div className="ml-auto flex flex-1 items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[13px] text-ink-4 md:max-w-md">
            <Search size={15} />
            Торты, десерты, кофе…
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-wine/10 px-3.5 py-2 text-[13px] font-semibold text-wine sm:flex">
            <span className="tabular">{formatPrice(USER.points)}</span> баллов
          </div>
          <button className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[13px] font-semibold text-white">
            <ShoppingBag size={15} /> 2
          </button>
        </div>

        {/* category chips */}
        <div className="no-scrollbar mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-5 pb-3">
          {categories.slice(0, 10).map((c, i) => (
            <span
              key={c.slug}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-[13px] ${
                i === 0
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-paper text-ink-2"
              }`}
            >
              {c.name}
            </span>
          ))}
        </div>
      </header>

      {/* personalised start — no big hero, straight to utility */}
      <section className="mx-auto max-w-[1280px] px-5 pt-6">
        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          {/* greeting + quick actions */}
          <div className="rounded-3xl bg-paper p-7">
            <div className="text-[13px] text-ink-3">Добрый вечер, {USER.name}</div>
            <h1 className="display mt-1.5 text-[30px] leading-tight">
              Повторим прошлый заказ?
            </h1>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button className="flex items-center gap-2 rounded-full bg-wine px-5 py-3 text-[13.5px] font-semibold text-white">
                <RotateCcw size={15} /> Дольче вита + Раф · 486 000
              </button>
              <button className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[13.5px] font-medium">
                <Cake size={15} /> Торт на заказ
              </button>
              <button className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[13.5px] font-medium">
                <Coffee size={15} /> Кофе с собой
              </button>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-line pt-6">
              {[
                ["27", "заказов"],
                ["9", "филиалов рядом"],
                ["45 мин", "средняя доставка"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="tabular display text-[22px]">{v}</div>
                  <div className="text-[12px] text-ink-3">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* loyalty card, promoted to the top of the page */}
          <div className="rounded-3xl bg-ink p-7 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="eyebrow text-white/45">Chocolate Club</div>
                <div className="tabular display mt-2 text-[40px] leading-none">
                  {formatPrice(USER.points)}
                </div>
                <div className="mt-1 text-[13px] text-white/55">
                  баллов · {formatPrice(USER.points * 100)} сум
                </div>
              </div>
              <span className="rounded-full bg-wine px-3 py-1.5 text-[11px] font-bold tracking-wider">
                PRALINE
              </span>
            </div>
            <div className="mt-7">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[62%] rounded-full bg-caramel" />
              </div>
              <div className="mt-2.5 flex justify-between text-[12px] text-white/55">
                <span>760 баллов до TRUFFLE</span>
                <span className="tabular">2 000</span>
              </div>
            </div>
            <button className="mt-6 w-full rounded-full bg-white/10 py-3 text-[13px] font-semibold">
              Мои награды и предложения
            </button>
          </div>
        </div>
      </section>

      {/* personalised rail */}
      <section className="mx-auto max-w-[1280px] px-5 pt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="display text-[24px]">Для вас</h2>
          <span className="text-[13px] text-ink-3">
            на основе ваших заказов
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {recommended.map((p) => (
            <Tile key={p.slug} slug={p.slug} />
          ))}
        </div>
      </section>

      {/* dense product grid */}
      <section className="mx-auto max-w-[1280px] px-5 py-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="display text-[24px]">Популярное сегодня</h2>
          <span className="text-[13px] font-medium text-wine">Весь каталог →</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {popular.map((p) => (
            <Tile key={p.slug} slug={p.slug} />
          ))}
        </div>
      </section>

      {/* offers as compact utility cards */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20">
        <h2 className="display mb-4 text-[24px]">Акции</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Двойные баллы", "Суббота и воскресенье · ×2", "wine"],
            ["Кофе + десерт", "До 11:00 · 45 000 сум", "caramel"],
            ["Вечерний час", "После 21:00 · −30%", "sage"],
          ].map(([t, d, tone]) => (
            <div
              key={t}
              className="flex items-center justify-between rounded-2xl bg-paper p-6"
            >
              <div>
                <div className="text-[16px] font-semibold">{t}</div>
                <div className="mt-1 text-[13px] text-ink-3">{d}</div>
              </div>
              <span
                className="h-11 w-11 shrink-0 rounded-full"
                style={{
                  background:
                    tone === "wine"
                      ? "var(--color-wine)"
                      : tone === "caramel"
                        ? "var(--color-caramel)"
                        : "var(--color-sage)",
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
