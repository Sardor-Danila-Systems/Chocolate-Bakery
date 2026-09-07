"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { categories, formatPrice, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/ui/product-card";
import { Reveal } from "@/components/ui/kit";

type Sort = "popular" | "price-asc" | "price-desc" | "new";

const SORTS: Array<{ id: Sort; label: string }> = [
  { id: "popular", label: "Популярные" },
  { id: "price-asc", label: "Сначала дешевле" },
  { id: "price-desc", label: "Сначала дороже" },
  { id: "new", label: "Новинки" },
];

const BADGE_FILTERS = [
  { id: "hit", label: "Хиты" },
  { id: "new", label: "Новинки" },
  { id: "season", label: "Сезонное" },
] as const;

export function CatalogView({
  items,
  activeCategory,
}: {
  items: Product[];
  activeCategory?: string;
}) {
  const [sort, setSort] = useState<Sort>("popular");
  const [badges, setBadges] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const priceBounds = useMemo(() => {
    const prices = items.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [items]);

  const filtered = useMemo(() => {
    let list = items;
    if (badges.length)
      list = list.filter((p) => badges.some((b) => p.badges.includes(b as never)));
    if (maxPrice) list = list.filter((p) => p.price <= maxPrice);

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "new")
      sorted.sort(
        (a, b) => Number(b.badges.includes("new")) - Number(a.badges.includes("new")),
      );
    if (sort === "popular")
      sorted.sort(
        (a, b) => Number(b.badges.includes("hit")) - Number(a.badges.includes("hit")),
      );
    return sorted;
  }, [items, badges, maxPrice, sort]);

  const toggleBadge = (id: string) =>
    setBadges((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));

  const activeFilters = badges.length + (maxPrice ? 1 : 0);

  const priceSteps = [50000, 100000, 200000, 400000].filter(
    (v) => v > priceBounds.min && v < priceBounds.max,
  );

  return (
    <div className="mx-auto max-w-[1340px] px-4 sm:px-6">
      {/* category rail */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <Link
          href="/catalog"
          className={clsx(
            "shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium transition",
            !activeCategory
              ? "border-ink bg-ink text-cream"
              : "border-line bg-white text-ink-2 hover:border-ink/30",
          )}
        >
          Всё
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/catalog/${c.slug}`}
            className={clsx(
              "shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium transition",
              activeCategory === c.slug
                ? "border-ink bg-ink text-cream"
                : "border-line bg-white text-ink-2 hover:border-ink/30",
            )}
          >
            {c.name}
            <span className="tabular ml-1.5 text-[11.5px] opacity-50">{c.count}</span>
          </Link>
        ))}
      </div>

      {/* toolbar */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-line pb-5">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className={clsx(
            "flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition",
            activeFilters
              ? "border-wine bg-wine/8 text-wine"
              : "border-line bg-white hover:border-ink/30",
          )}
        >
          <SlidersHorizontal size={15} />
          Фильтры
          {activeFilters > 0 && (
            <span className="tabular grid h-5 w-5 place-items-center rounded-full bg-wine text-[11px] font-bold text-white">
              {activeFilters}
            </span>
          )}
        </button>

        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {BADGE_FILTERS.map((b) => (
            <button
              key={b.id}
              onClick={() => toggleBadge(b.id)}
              className={clsx(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2.5 text-[13.5px] transition",
                badges.includes(b.id)
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-white text-ink-2 hover:border-ink/30",
              )}
            >
              {badges.includes(b.id) && <Check size={13} />}
              {b.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="tabular hidden text-[13px] text-ink-3 sm:inline">
            {filtered.length} позиций
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-line bg-white px-4 py-2.5 text-[13.5px] font-medium outline-none transition hover:border-ink/30"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* filter panel */}
      {filtersOpen && (
        <div className="mt-5 rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold">Цена до</span>
            <button
              onClick={() => setFiltersOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full border border-line"
              aria-label="Закрыть фильтры"
            >
              <X size={15} />
            </button>
          </div>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {priceSteps.map((v) => (
              <button
                key={v}
                onClick={() => setMaxPrice(maxPrice === v ? null : v)}
                className={clsx(
                  "tabular rounded-full border px-4 py-2 text-[13px] transition",
                  maxPrice === v
                    ? "border-ink bg-ink text-cream"
                    : "border-line hover:border-ink/30",
                )}
              >
                до {formatPrice(v)} сум
              </button>
            ))}
            {activeFilters > 0 && (
              <button
                onClick={() => {
                  setBadges([]);
                  setMaxPrice(null);
                }}
                className="rounded-full px-4 py-2 text-[13px] text-wine underline-offset-4 hover:underline"
              >
                Сбросить всё
              </button>
            )}
          </div>
        </div>
      )}

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="display text-[22px]">Ничего не подошло</p>
          <p className="mt-2 text-[14px] text-ink-3">
            Попробуйте убрать часть фильтров.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 10) * 35}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

export function CategoryTiles() {
  return (
    <div className="mx-auto max-w-[1340px] px-4 pb-10 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/catalog/${c.slug}`}
            className="group overflow-hidden rounded-2xl bg-white transition hover:shadow-[0_14px_40px_rgba(28,19,16,0.08)]"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width:640px) 50vw, 200px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
              />
            </div>
            <div className="px-3.5 py-3">
              <div className="text-[13.5px] font-semibold leading-tight">{c.name}</div>
              <div className="tabular mt-0.5 text-[11.5px] text-ink-4">
                {c.count} позиций
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
