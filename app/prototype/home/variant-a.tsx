/* THROWAWAY PROTOTYPE — Variant A: "Premium bakery chain" (Safia-like) */

import Image from "next/image";
import {
  categories,
  formatSum,
  pick,
  products,
} from "@/lib/catalog";
import { POPULAR_SLUGS, SEASONAL_SLUGS } from "@/lib/demo";
import { Search, ShoppingBag, User, MapPin, Phone, Plus, Heart } from "lucide-react";

export const NAME = "Premium bakery chain";

function Card({ slug }: { slug: string }) {
  const p = products.find((x) => x.slug === slug)!;
  return (
    <div className="group overflow-hidden rounded-xl border border-line bg-paper">
      <div className="relative aspect-square overflow-hidden bg-cream-2">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="240px"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        {p.badges[0] && (
          <span className="absolute left-3 top-3 rounded-full bg-wine px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {p.badges[0] === "hit" ? "Хит" : p.badges[0] === "new" ? "Новинка" : "Сезон"}
          </span>
        )}
        <button className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink-3 opacity-0 transition group-hover:opacity-100">
          <Heart size={15} />
        </button>
      </div>
      <div className="p-3.5">
        <div className="line-clamp-2 min-h-[2.6rem] text-[13.5px] font-medium leading-snug">
          {p.name}
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="tabular text-[15px] font-bold">{formatSum(p.price)}</span>
          <button className="grid h-8 w-8 place-items-center rounded-full bg-wine text-white transition hover:bg-wine-dark">
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VariantA() {
  const popular = pick(POPULAR_SLUGS);
  const seasonal = pick(SEASONAL_SLUGS);
  const hero = products.find((p) => p.slug === "tort-dolche-vita-2")!;

  return (
    <div className="min-h-screen bg-cream">
      {/* utility bar */}
      <div className="hidden border-b border-line bg-cream-2 text-[12px] text-ink-3 md:block">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-2">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> Самарканд
            </span>
            <span>Ежедневно 08:00 – 23:00</span>
          </div>
          <div className="flex items-center gap-5">
            <span>Филиалы</span>
            <span>О нас</span>
            <span className="flex items-center gap-1.5 font-semibold text-ink">
              <Phone size={13} /> +998 78 210 00 80
            </span>
          </div>
        </div>
      </div>

      {/* main header */}
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-6 py-4">
          <div className="display text-[26px] tracking-tight">Chocolate</div>
          <nav className="hidden items-center gap-6 text-[14px] font-medium lg:flex">
            <span className="text-wine">Каталог</span>
            <span>Акции</span>
            <span>Chocolate Club</span>
            <span>Торты на заказ</span>
            <span>Филиалы</span>
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden items-center gap-2 rounded-full border border-line bg-cream px-4 py-2.5 text-[13px] text-ink-4 md:flex">
              <Search size={15} /> Поиск по каталогу
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-line">
              <User size={17} />
            </button>
            <button className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[13px] font-semibold text-white">
              <ShoppingBag size={16} /> 2
            </button>
          </div>
        </div>
      </header>

      {/* hero banner */}
      <section className="mx-auto max-w-[1320px] px-6 pt-6">
        <div className="relative overflow-hidden rounded-2xl bg-ink">
          <div className="grid md:grid-cols-2">
            <div className="relative z-10 p-10 md:p-14">
              <span className="eyebrow text-caramel-light">Коллекция сентября</span>
              <h1 className="display mt-4 text-[44px] leading-[1.05] text-white md:text-[54px]">
                Праздник,
                <br /> когда ты захочешь
              </h1>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
                Торты, десерты и выпечка из собственной кондитерской в
                Самарканде. Доставка за 60 минут или самовывоз из 9 филиалов.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="rounded-full bg-wine px-7 py-3.5 text-[14px] font-semibold text-white">
                  Смотреть каталог
                </button>
                <button className="rounded-full border border-white/25 px-7 py-3.5 text-[14px] font-semibold text-white">
                  Собрать торт на заказ
                </button>
              </div>
            </div>
            <div className="relative min-h-[320px]">
              <Image
                src={hero.image}
                alt={hero.name}
                fill
                sizes="660px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* category tiles — the defining move of this direction */}
      <section className="mx-auto max-w-[1320px] px-6 py-12">
        <h2 className="display mb-6 text-[28px]">Каталог</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 12).map((c) => (
            <div
              key={c.slug}
              className="group overflow-hidden rounded-xl border border-line bg-paper"
            >
              <div className="relative aspect-[4/3] bg-cream-2">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="200px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-2.5 text-[13px] font-semibold">
                {c.name}
                <span className="ml-1.5 text-[11px] font-normal text-ink-4">
                  {c.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* product rails */}
      <section className="mx-auto max-w-[1320px] px-6 pb-12">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="display text-[28px]">Популярное сегодня</h2>
          <span className="text-[13px] font-semibold text-wine">Все товары →</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {popular.slice(0, 8).map((p) => (
            <Card key={p.slug} slug={p.slug} />
          ))}
        </div>
      </section>

      {/* loyalty banner strip */}
      <section className="mx-auto max-w-[1320px] px-6 pb-12">
        <div className="grid items-center gap-8 rounded-2xl bg-wine px-10 py-10 text-white md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow text-white/60">Chocolate Club</span>
            <h2 className="display mt-3 text-[34px]">
              Возвращайте до 10% баллами
            </h2>
            <p className="mt-3 max-w-md text-[14px] text-white/75">
              Копите баллы с каждой покупки, получайте подарок в день рождения и
              ранний доступ к новинкам.
            </p>
            <button className="mt-6 rounded-full bg-white px-7 py-3 text-[14px] font-semibold text-wine">
              Вступить в клуб
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["COCOA 5%", "PRALINE 7%", "TRUFFLE 10%"].map((t) => (
              <div
                key={t}
                className="rounded-xl border border-white/20 bg-white/10 px-3 py-4 text-center text-[12px] font-bold tracking-wide"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pb-20">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="display text-[28px]">Сезонная коллекция</h2>
          <span className="text-[13px] font-semibold text-wine">Смотреть все →</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {seasonal.map((p) => (
            <Card key={p.slug} slug={p.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
