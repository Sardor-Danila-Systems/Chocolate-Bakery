"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  MapPin,
  Phone,
  Smartphone,
  Sparkles,
} from "lucide-react";
import {
  categories,
  formatPrice,
  searchProducts,
  type Product,
} from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { tierForPoints } from "@/lib/loyalty";

const NAV = [
  { href: "/catalog", label: "Каталог" },
  { href: "/promotions", label: "Акции" },
  { href: "/loyalty", label: "Chocolate Club" },
  { href: "/branches", label: "Филиалы" },
  { href: "/about", label: "О нас" },
];

export function Header() {
  const pathname = usePathname();
  const { count, setCartOpen, state } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const tier = tierForPoints(state.lifetimePoints);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, searchOpen]);

  const results: Product[] = searchProducts(q);

  return (
    <>
      {/* utility strip */}
      <div className="hidden border-b border-line bg-cream-2 text-[12px] text-ink-3 lg:block">
        <div className="mx-auto flex max-w-[1340px] items-center justify-between px-6 py-2">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-wine" /> Самарканд · 9 филиалов
            </span>
            <span>Доставка ежедневно 08:00 – 23:00</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/app" className="flex items-center gap-1.5 transition hover:text-ink">
              <Smartphone size={13} /> Приложение
            </Link>
            <Link href="/contacts" className="transition hover:text-ink">
              Контакты
            </Link>
            <a
              href="tel:+998782100080"
              className="flex items-center gap-1.5 font-semibold text-ink"
            >
              <Phone size={13} /> +998 78 210 00 80
            </a>
          </div>
        </div>
      </div>

      {/* main header */}
      <header className="sticky top-0 z-50 border-b border-line bg-cream/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1340px] items-center gap-2.5 px-3.5 py-3.5 sm:gap-4 sm:px-6 lg:gap-4 xl:gap-7">
          <button
            onClick={() => setMenuOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line lg:hidden"
            aria-label="Меню"
          >
            <Menu size={18} />
          </button>

          <Link href="/" className="display shrink-0 text-[21px] tracking-tight sm:text-[25px] lg:text-[27px]">
            Chocolate
          </Link>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "text-[14px] font-medium transition",
                  pathname.startsWith(n.href) ? "text-wine" : "text-ink-2 hover:text-ink",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2.5 text-[13px] text-ink-4 transition hover:border-ink/25 md:flex lg:w-40 xl:w-60"
            >
              <Search size={15} />
              <span>Найти десерт…</span>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line md:hidden"
              aria-label="Поиск"
            >
              <Search size={17} />
            </button>

            {/* Club balance — visible on every page */}
            <Link
              href="/account/loyalty"
              className="flex items-center gap-1.5 rounded-full border border-wine/25 bg-wine/8 px-3 py-2.5 text-[13px] font-semibold text-wine transition hover:bg-wine/15 sm:gap-2 sm:px-3.5"
            >
              <Sparkles size={14} />
              <span className="tabular">{formatPrice(state.points)}</span>
              <span className="hidden font-medium text-wine/70 lg:inline">
                {tier.name}
              </span>
            </Link>

            <Link
              href="/account"
              className="hidden h-10 w-10 place-items-center rounded-full border border-line transition hover:border-ink/30 sm:grid"
              aria-label="Профиль"
            >
              <User size={17} />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 text-[13px] font-semibold text-cream transition hover:bg-wine sm:gap-2 sm:px-4"
            >
              <ShoppingBag size={16} />
              <span className="tabular">{count}</span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-cream">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="display text-[22px]">Chocolate</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line"
                aria-label="Закрыть"
              >
                <X size={17} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <Link
                href="/account/loyalty"
                className="mb-5 flex items-center justify-between rounded-2xl bg-ink p-4 text-cream"
              >
                <div>
                  <div className="eyebrow text-cream/50">Chocolate Club</div>
                  <div className="tabular display mt-1 text-[26px]">
                    {formatPrice(state.points)}
                  </div>
                </div>
                <span className="rounded-full bg-wine px-3 py-1.5 text-[11px] font-bold">
                  {tier.name}
                </span>
              </Link>

              <div className="space-y-1">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="block border-b border-line py-3.5 text-[17px] font-medium"
                  >
                    {n.label}
                  </Link>
                ))}
                <Link href="/app" className="block border-b border-line py-3.5 text-[17px] font-medium">
                  Мобильное приложение
                </Link>
                <Link href="/admin" className="block border-b border-line py-3.5 text-[17px] font-medium">
                  Панель управления
                </Link>
              </div>

              <div className="eyebrow mt-7 mb-3 text-ink-4">Категории</div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/catalog/${c.slug}`}
                    className="rounded-xl border border-line bg-white px-3 py-2.5 text-[13px] font-medium"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <a
              href="tel:+998782100080"
              className="border-t border-line px-5 py-4 text-[14px] font-semibold"
            >
              +998 78 210 00 80
            </a>
          </div>
        </div>
      )}

      {/* search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70]">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 bg-cream pb-6 shadow-xl">
            <div className="mx-auto max-w-[900px] px-5 pt-6">
              <div className="flex items-center gap-3 border-b border-ink/20 pb-3">
                <Search size={20} className="text-ink-3" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Торт, чизкейк, кофе…"
                  className="w-full bg-transparent text-[19px] outline-none placeholder:text-ink-4"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line"
                  aria-label="Закрыть поиск"
                >
                  <X size={17} />
                </button>
              </div>

              {!q && (
                <div className="mt-5">
                  <div className="eyebrow mb-3 text-ink-4">Популярные запросы</div>
                  <div className="flex flex-wrap gap-2">
                    {["Торт", "Чизкейк", "Пахлава", "Раф", "Бенто", "Эклер"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQ(s)}
                        className="rounded-full border border-line bg-white px-4 py-2 text-[13px]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {q && (
                <div className="mt-5 max-h-[60vh] overflow-y-auto">
                  {results.length === 0 && (
                    <p className="py-8 text-center text-[14px] text-ink-3">
                      Ничего не нашли. Попробуйте другое название.
                    </p>
                  )}
                  <div className="space-y-1">
                    {results.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/product/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 rounded-xl px-2 py-2 transition hover:bg-white"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                          <Image src={p.image} alt={p.name} fill sizes="56px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[14px] font-medium">{p.name}</div>
                          <div className="text-[12px] text-ink-3">
                            {categories.find((c) => c.slug === p.category)?.name}
                          </div>
                        </div>
                        <div className="tabular shrink-0 text-[14px] font-semibold">
                          {formatPrice(p.price)} сум
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
