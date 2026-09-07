/* THROWAWAY PROTOTYPE — Variant B: "Editorial / fashion bakery" */

import Image from "next/image";
import { categories, formatSum, pick, products } from "@/lib/catalog";
import { POPULAR_SLUGS, SEASONAL_SLUGS } from "@/lib/demo";

export const NAME = "Editorial house";

export default function VariantB() {
  const hero = products.find((p) => p.slug === "tort-klassik-kvadratnyy-mini")!;
  const collection = pick(SEASONAL_SLUGS).slice(0, 3);
  const popular = pick(POPULAR_SLUGS).slice(0, 4);
  const editorial = products.find((p) => p.slug === "desert-dubay")!;

  return (
    <div className="min-h-screen bg-[#f4efe7] text-ink">
      {/* thin editorial header */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-[#f4efe7]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center px-8 py-5">
          <div className="flex-1 text-[11px] uppercase tracking-[0.2em] text-ink-3">
            Самарканд · с 2018
          </div>
          <div
            className="text-center text-[22px] tracking-[0.28em] uppercase"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Chocolate
          </div>
          <div className="flex flex-1 items-center justify-end gap-7 text-[11px] uppercase tracking-[0.18em]">
            <span>Меню</span>
            <span>Клуб</span>
            <span>Корзина (2)</span>
          </div>
        </div>
      </header>

      {/* editorial hero: type over a single full-bleed image, asymmetric */}
      <section className="relative">
        <div className="relative h-[76vh] min-h-[560px] w-full">
          <Image
            src={hero.image}
            alt={hero.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1500px] px-8 pb-16">
              <div className="max-w-2xl">
                <span className="text-[11px] uppercase tracking-[0.26em] text-white/70">
                  Осенняя коллекция · 2026
                </span>
                <h1
                  className="mt-6 text-[clamp(3rem,7vw,6.2rem)] leading-[0.92] text-white"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Праздник,
                  <br />
                  <span className="italic">когда ты захочешь</span>
                </h1>
                <div className="mt-10 flex items-center gap-8">
                  <button className="border-b border-white pb-1 text-[12px] uppercase tracking-[0.2em] text-white">
                    Смотреть коллекцию
                  </button>
                  <button className="border-b border-white/30 pb-1 text-[12px] uppercase tracking-[0.2em] text-white/70">
                    Торты на заказ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* typographic index instead of tiles */}
      <section className="mx-auto max-w-[1500px] px-8 py-24">
        <div className="grid gap-16 md:grid-cols-[280px_1fr]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
              Указатель
            </span>
          </div>
          <div className="grid gap-y-1 sm:grid-cols-2">
            {categories.slice(0, 12).map((c, i) => (
              <div
                key={c.slug}
                className="group flex items-baseline gap-5 border-b border-ink/10 py-4 transition hover:border-ink/40"
              >
                <span className="tabular text-[11px] text-ink-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[26px] leading-none transition group-hover:italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {c.name}
                </span>
                <span className="tabular ml-auto text-[11px] text-ink-4">
                  {c.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* editorial collection: asymmetric, caption-led, no cards */}
      <section className="mx-auto max-w-[1500px] px-8 pb-24">
        <div className="mb-14 max-w-xl">
          <span className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
            Коллекция
          </span>
          <h2
            className="mt-4 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Ягодный сезон, снятый <span className="italic">на исходе лета</span>
          </h2>
        </div>
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
          {collection.map((p, i) => (
            <figure
              key={p.slug}
              className={
                i === 0
                  ? "md:col-span-7"
                  : i === 1
                    ? "md:col-span-5 md:pt-24"
                    : "md:col-span-6 md:col-start-4"
              }
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-2">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between border-t border-ink/15 pt-4">
                <span
                  className="text-[20px]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {p.name}
                </span>
                <span className="tabular text-[13px] text-ink-3">
                  {formatSum(p.price)}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* membership spread */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1500px] items-center gap-16 px-8 py-28 md:grid-cols-2">
          <div>
            <span className="text-[11px] uppercase tracking-[0.26em] text-caramel-light">
              Членство
            </span>
            <h2
              className="mt-6 text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.98]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Chocolate <span className="italic">Club</span>
            </h2>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-cream/60">
              Три уровня — от сырого какао-боба до тёмного трюфеля. Чем дольше
              вы с нами, тем насыщеннее становится вкус привилегий.
            </p>
            <div className="mt-12 space-y-0">
              {[
                ["Cocoa", "5% баллами · подарок в день рождения"],
                ["Praline", "7% баллами · ранний доступ к новинкам"],
                ["Truffle", "10% баллами · персональный кондитер"],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="flex items-baseline justify-between border-b border-cream/15 py-5"
                >
                  <span
                    className="text-[24px] italic"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {t}
                  </span>
                  <span className="text-[13px] text-cream/55">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5]">
            <Image
              src={editorial.image}
              alt={editorial.name}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* quiet product row */}
      <section className="mx-auto max-w-[1500px] px-8 py-24">
        <span className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
          Чаще всего заказывают
        </span>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((p) => (
            <figure key={p.slug} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-cream-2">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="300px"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-4">
                <div
                  className="text-[17px] leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {p.name}
                </div>
                <div className="tabular mt-1 text-[13px] text-ink-3">
                  {formatSum(p.price)}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
