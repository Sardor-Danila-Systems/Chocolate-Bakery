"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import {
  Home,
  LayoutGrid,
  Package,
  Sparkles,
  User,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Minus,
  Heart,
  MapPin,
  Clock,
  Check,
  Truck,
  Store,
  Gift,
  QrCode,
  Bell,
  Settings,
  RotateCcw,
  Star,
  ArrowRight,
} from "lucide-react";
import {
  branches,
  categories,
  formatPrice,
  pick,
  products,
  type Product,
} from "@/lib/catalog";
import {
  FAVORITE_SLUGS,
  ORDERS,
  POPULAR_SLUGS,
  RECOMMENDED_SLUGS,
  USER,
  branchName,
} from "@/lib/demo";
import { REWARDS, TIERS, tierProgress } from "@/lib/loyalty";

type Screen =
  | "welcome"
  | "home"
  | "catalog"
  | "category"
  | "product"
  | "cart"
  | "checkout"
  | "success"
  | "orders"
  | "loyalty"
  | "rewards"
  | "profile"
  | "favorites"
  | "branches";

type Line = { slug: string; qty: number };

const TAB_SCREENS: Screen[] = ["home", "catalog", "orders", "loyalty", "profile"];

export function MobileApp() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [history, setHistory] = useState<Screen[]>([]);
  const [category, setCategory] = useState(categories[0].slug);
  const [productSlug, setProductSlug] = useState(POPULAR_SLUGS[0]);
  const [cart, setCart] = useState<Line[]>([
    { slug: "chizkeyk-san-sebastyan", qty: 1 },
    { slug: "kofe-raf", qty: 2 },
  ]);
  const [favorites, setFavorites] = useState<string[]>(FAVORITE_SLUGS);
  const [points, setPoints] = useState(USER.points);
  const [method, setMethod] = useState<"delivery" | "pickup">("delivery");
  const [branchSlug, setBranchSlug] = useState(branches[0].slug);
  const [toast, setToast] = useState<string | null>(null);

  const go = (s: Screen) => {
    setHistory((h) => [...h, screen]);
    setScreen(s);
  };
  const back = () => {
    setHistory((h) => {
      const prev = h[h.length - 1] ?? "home";
      setScreen(prev);
      return h.slice(0, -1);
    });
  };
  const tab = (s: Screen) => {
    setHistory([]);
    setScreen(s);
  };

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const lines = cart
    .map((l) => ({ product: products.find((p) => p.slug === l.slug)!, qty: l.qty }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((a, l) => a + l.product.price * l.qty, 0);
  const cartCount = lines.reduce((a, l) => a + l.qty, 0);
  const tierInfo = tierProgress(points);
  const product = products.find((p) => p.slug === productSlug)!;

  const addToCart = (slug: string, qty = 1) => {
    setCart((c) => {
      const found = c.find((l) => l.slug === slug);
      return found
        ? c.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
        : [...c, { slug, qty }];
    });
    flash("Добавлено в заказ");
  };

  const toggleFav = (slug: string) =>
    setFavorites((f) => (f.includes(slug) ? f.filter((s) => s !== slug) : [slug, ...f]));

  const openProduct = (slug: string) => {
    setProductSlug(slug);
    go("product");
  };

  /* ---------- shared bits ---------- */

  const TopBar = ({ title, action }: { title: string; action?: React.ReactNode }) => (
    <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-cream/95 px-4 py-3 backdrop-blur">
      <button
        onClick={back}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white"
        aria-label="Назад"
      >
        <ChevronLeft size={17} />
      </button>
      <span className="truncate text-[15px] font-semibold">{title}</span>
      <div className="ml-auto">{action}</div>
    </div>
  );

  const Tile = ({ p }: { p: Product }) => (
    <div className="min-w-0">
      <button
        onClick={() => openProduct(p.slug)}
        className="relative block aspect-square w-full overflow-hidden rounded-2xl bg-white"
      >
        <Image src={p.image} alt={p.name} fill sizes="160px" className="object-cover" />
      </button>
      <div className="mt-2 line-clamp-2 text-[12px] font-medium leading-snug">{p.name}</div>
      <div className="mt-1 flex items-center justify-between gap-1">
        <span className="tabular text-[12.5px] font-bold">{formatPrice(p.price)}</span>
        <button
          onClick={() => addToCart(p.slug)}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-cream"
          aria-label="Добавить"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );

  /* ---------- screens ---------- */

  const screens: Record<Screen, React.ReactNode> = {
    welcome: (
      <div className="relative h-full">
        <Image
          src={products.find((p) => p.slug === "tort-dolche-vita-2")!.image}
          alt=""
          fill
          sizes="420px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 p-7 text-cream">
          <div className="display text-[30px]">Chocolate</div>
          <p className="mt-3 text-[14px] leading-relaxed text-cream/70">
            Праздник, когда ты захочешь. Заказывайте десерты, копите баллы и
            получайте подарки.
          </p>
          <button
            onClick={() => tab("home")}
            className="mt-7 w-full rounded-full bg-wine py-3.5 text-[14px] font-semibold text-white"
          >
            Войти по номеру телефона
          </button>
          <button
            onClick={() => tab("home")}
            className="mt-2.5 w-full rounded-full border border-cream/25 py-3.5 text-[14px] font-medium"
          >
            Продолжить как гость
          </button>
          <p className="mt-5 text-center text-[11.5px] text-cream/40">
            Новым участникам — 100 баллов за первый заказ
          </p>
        </div>
      </div>
    ),

    home: (
      <div className="pb-4">
        <div className="px-4 pt-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[12.5px] text-ink-3">Добрый вечер</div>
              <div className="display text-[22px]">{USER.name}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go("branches")}
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white"
              >
                <MapPin size={16} />
              </button>
              <button className="relative grid h-9 w-9 place-items-center rounded-full border border-line bg-white">
                <Bell size={16} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-wine" />
              </button>
            </div>
          </div>

          <button
            onClick={() => go("catalog")}
            className="mt-4 flex w-full items-center gap-2.5 rounded-full border border-line bg-white px-4 py-3 text-[13px] text-ink-4"
          >
            <Search size={15} /> Торты, десерты, кофе…
          </button>

          {/* loyalty card */}
          <button
            onClick={() => tab("loyalty")}
            className="mt-3 w-full rounded-3xl bg-ink p-5 text-left text-cream"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="eyebrow text-cream/45">Chocolate Club</div>
                <div className="tabular display mt-1.5 text-[30px] leading-none">
                  {formatPrice(points)}
                </div>
                <div className="mt-1 text-[11.5px] text-cream/50">
                  баллов · {formatPrice(points * 100)} сум
                </div>
              </div>
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider"
                style={{
                  background: tierInfo.current.id === "truffle" ? "#e0b076" : tierInfo.current.tone,
                  color: tierInfo.current.id === "truffle" ? "#1c1310" : "#fff",
                }}
              >
                {tierInfo.current.name}
              </span>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream/15">
              <div
                className="h-full rounded-full bg-caramel"
                style={{ width: `${tierInfo.pct}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-cream/50">
              {tierInfo.next
                ? `${formatPrice(tierInfo.remaining)} баллов до ${tierInfo.next.name}`
                : "Максимальный уровень"}
            </div>
          </button>

          {/* quick reorder */}
          <button
            onClick={() => {
              ORDERS[1].items.forEach((i) => addToCart(i.slug, i.qty));
              go("cart");
            }}
            className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream-2">
              <RotateCcw size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-semibold">Повторить заказ</span>
              <span className="block truncate text-[12px] text-ink-3">
                Чизкейк, капучино · {formatPrice(ORDERS[1].total)} сум
              </span>
            </span>
            <ChevronRight size={16} className="shrink-0 text-ink-4" />
          </button>
        </div>

        {/* categories rail */}
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-4">
          {categories.slice(0, 8).map((c) => (
            <button
              key={c.slug}
              onClick={() => {
                setCategory(c.slug);
                go("category");
              }}
              className="shrink-0 rounded-full border border-line bg-white px-3.5 py-2 text-[12.5px] font-medium"
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="px-4">
          <div className="mt-6 flex items-baseline justify-between">
            <h2 className="display text-[18px]">Для вас</h2>
            <button onClick={() => go("catalog")} className="text-[12px] text-wine">
              Все
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {pick(RECOMMENDED_SLUGS).slice(0, 4).map((p) => (
              <Tile key={p.slug} p={p} />
            ))}
          </div>

          {/* offer */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-wine p-4 text-white">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
              <Gift size={18} />
            </span>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold">
                День рождения через {USER.daysToBirthday} дней
              </div>
              <div className="text-[11.5px] text-white/70">Десерт в подарок</div>
            </div>
          </div>

          <div className="mt-6 flex items-baseline justify-between">
            <h2 className="display text-[18px]">Популярное</h2>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {pick(POPULAR_SLUGS).slice(0, 4).map((p) => (
              <Tile key={p.slug} p={p} />
            ))}
          </div>

          {/* nearest branch */}
          <button
            onClick={() => go("branches")}
            className="mt-6 flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream-2">
              <MapPin size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-semibold">
                {branchName(branchSlug)}
              </span>
              <span className="block text-[12px] text-sage">Открыт до 00:00</span>
            </span>
            <ChevronRight size={16} className="shrink-0 text-ink-4" />
          </button>
        </div>
      </div>
    ),

    catalog: (
      <div>
        <div className="sticky top-0 z-20 border-b border-line bg-cream/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2.5 text-[13px] text-ink-4">
            <Search size={15} /> Поиск по каталогу
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => {
                setCategory(c.slug);
                go("category");
              }}
              className="overflow-hidden rounded-2xl bg-white text-left"
            >
              <div className="relative aspect-[4/3]">
                <Image src={c.image} alt={c.name} fill sizes="180px" className="object-cover" />
              </div>
              <div className="px-3 py-2.5">
                <div className="text-[12.5px] font-semibold leading-tight">{c.name}</div>
                <div className="tabular text-[11px] text-ink-4">{c.count} позиций</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    ),

    category: (
      <div>
        <TopBar title={categories.find((c) => c.slug === category)?.name ?? "Каталог"} />
        <div className="grid grid-cols-2 gap-3 p-4">
          {products
            .filter((p) => p.category === category)
            .slice(0, 12)
            .map((p) => (
              <Tile key={p.slug} p={p} />
            ))}
        </div>
      </div>
    ),

    product: (
      <div className="pb-24">
        <div className="relative aspect-square">
          <Image src={product.image} alt={product.name} fill sizes="420px" className="object-cover" />
          <button
            onClick={back}
            className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream/90 backdrop-blur"
            aria-label="Назад"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            onClick={() => toggleFav(product.slug)}
            className={clsx(
              "absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full backdrop-blur",
              favorites.includes(product.slug) ? "bg-wine text-white" : "bg-cream/90",
            )}
          >
            <Heart size={16} fill={favorites.includes(product.slug) ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-[11.5px] text-ink-3">
            <Star size={12} className="fill-caramel text-caramel" />
            <span className="tabular font-semibold text-ink">{product.rating}</span>
            <span>· {product.reviews} оценок</span>
            {product.weight && <span>· {product.weight}</span>}
          </div>
          <h1 className="display mt-2 text-[22px] leading-tight">{product.name}</h1>
          {product.desc && (
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink-3">{product.desc}</p>
          )}

          <div className="mt-4 flex gap-2">
            {["1 кг", "1,5 кг", "2 кг"].map((s, i) => (
              <span
                key={s}
                className={clsx(
                  "rounded-xl border px-3.5 py-2 text-[12px]",
                  i === 0 ? "border-ink bg-ink text-cream" : "border-line bg-white",
                )}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="flex items-center gap-1.5 text-ink-3">
                <Clock size={13} /> Доставка
              </span>
              <span className="font-semibold">45–60 минут</span>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[12.5px]">
              <span className="flex items-center gap-1.5 text-ink-3">
                <Store size={13} /> Самовывоз
              </span>
              <span className="font-semibold">{branchName(branchSlug)} · 25 мин</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 rounded-2xl bg-white p-4 text-center">
            {[
              [product.calories, "ккал"],
              [product.proteins, "белки"],
              [product.fats, "жиры"],
              [product.carbs, "углев."],
            ].map(([v, l]) => (
              <div key={String(l)}>
                <div className="tabular text-[14px] font-bold">{v}</div>
                <div className="text-[10.5px] text-ink-4">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-[62px] border-t border-line bg-cream/95 p-3 backdrop-blur">
          <button
            onClick={() => addToCart(product.slug)}
            className="flex w-full items-center justify-between rounded-full bg-wine px-6 py-3.5 text-[14px] font-semibold text-white"
          >
            <span>Добавить в заказ</span>
            <span className="tabular">{formatPrice(product.price)} сум</span>
          </button>
        </div>
      </div>
    ),

    cart: (
      <div className="pb-28">
        <TopBar title={`Заказ · ${cartCount}`} />
        <div className="space-y-3 p-4">
          {lines.length === 0 && (
            <p className="py-16 text-center text-[13.5px] text-ink-3">
              Заказ пуст — загляните в каталог
            </p>
          )}
          {lines.map(({ product: p, qty }) => (
            <div key={p.slug} className="flex gap-3 rounded-2xl bg-white p-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="line-clamp-2 text-[12.5px] font-medium leading-snug">
                  {p.name}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-line">
                    <button
                      onClick={() =>
                        setCart((c) =>
                          qty <= 1
                            ? c.filter((l) => l.slug !== p.slug)
                            : c.map((l) => (l.slug === p.slug ? { ...l, qty: l.qty - 1 } : l)),
                        )
                      }
                      className="grid h-7 w-7 place-items-center"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="tabular w-4 text-center text-[12.5px] font-semibold">
                      {qty}
                    </span>
                    <button
                      onClick={() =>
                        setCart((c) =>
                          c.map((l) => (l.slug === p.slug ? { ...l, qty: l.qty + 1 } : l)),
                        )
                      }
                      className="grid h-7 w-7 place-items-center"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="tabular text-[13px] font-bold">
                    {formatPrice(p.price * qty)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {lines.length > 0 && (
            <div className="rounded-2xl bg-wine/8 p-4 text-[12px] text-wine">
              <div className="flex items-center gap-2">
                <Sparkles size={13} />
                Начислим {Math.round((subtotal * tierInfo.current.cashback) / 100 / 100)} баллов
              </div>
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="absolute inset-x-0 bottom-[62px] border-t border-line bg-cream/95 p-3 backdrop-blur">
            <button
              onClick={() => go("checkout")}
              className="flex w-full items-center justify-between rounded-full bg-ink px-6 py-3.5 text-[14px] font-semibold text-cream"
            >
              <span>Оформить</span>
              <span className="tabular">{formatPrice(subtotal)} сум</span>
            </button>
          </div>
        )}
      </div>
    ),

    checkout: (
      <div className="pb-28">
        <TopBar title="Оформление" />
        <div className="space-y-3 p-4">
          <div className="rounded-2xl bg-white p-4">
            <div className="eyebrow mb-3 text-ink-4">Способ получения</div>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: "delivery" as const, label: "Доставка", icon: <Truck size={15} /> },
                  { id: "pickup" as const, label: "Самовывоз", icon: <Store size={15} /> },
                ]
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={clsx(
                    "flex items-center justify-center gap-2 rounded-xl border py-3 text-[12.5px] font-medium",
                    method === m.id ? "border-ink bg-ink text-cream" : "border-line",
                  )}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => go("branches")}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left"
          >
            <MapPin size={17} className="shrink-0 text-ink-3" />
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] text-ink-3">
                {method === "delivery" ? "Адрес доставки" : "Филиал"}
              </span>
              <span className="block truncate text-[13px] font-medium">
                {method === "delivery"
                  ? "Университетский бульвар, 14"
                  : branchName(branchSlug)}
              </span>
            </span>
            <ChevronRight size={16} className="shrink-0 text-ink-4" />
          </button>

          <div className="rounded-2xl bg-white p-4">
            <div className="eyebrow mb-3 text-ink-4">Время</div>
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {["Как можно скорее", "18:00", "19:00", "20:00"].map((t, i) => (
                <span
                  key={t}
                  className={clsx(
                    "shrink-0 rounded-full border px-3.5 py-2 text-[12px]",
                    i === 0 ? "border-ink bg-ink text-cream" : "border-line",
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4">
            <div className="eyebrow mb-3 text-ink-4">Оплата</div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium">UZCARD •••• 4419</span>
              <ChevronRight size={15} className="text-ink-4" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 text-[13px]">
            <div className="flex justify-between py-1">
              <span className="text-ink-3">Товары</span>
              <span className="tabular">{formatPrice(subtotal)} сум</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-ink-3">Доставка</span>
              <span className="tabular text-sage">
                {method === "pickup" || subtotal >= 150000 ? "бесплатно" : "15 000 сум"}
              </span>
            </div>
            <div className="mt-2 flex justify-between border-t border-line pt-3">
              <span className="font-semibold">Итого</span>
              <span className="tabular text-[16px] font-bold">
                {formatPrice(
                  subtotal + (method === "delivery" && subtotal < 150000 ? 15000 : 0),
                )}{" "}
                сум
              </span>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-[62px] border-t border-line bg-cream/95 p-3 backdrop-blur">
          <button
            onClick={() => {
              const earned = Math.round(
                (subtotal * tierInfo.current.cashback) / 100 / 100,
              );
              setPoints((p) => p + earned);
              setCart([]);
              go("success");
            }}
            className="w-full rounded-full bg-wine py-3.5 text-[14px] font-semibold text-white"
          >
            Оплатить
          </button>
        </div>
      </div>
    ),

    success: (
      <div className="flex h-full flex-col items-center justify-center px-7 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-sage text-white">
          <Check size={30} />
        </div>
        <h2 className="display mt-6 text-[24px]">Заказ принят</h2>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-3">
          {method === "delivery"
            ? "Курьер привезёт заказ за 45–60 минут"
            : `Заберите в филиале ${branchName(branchSlug)} через 25 минут`}
        </p>

        <div className="mt-7 w-full rounded-2xl bg-ink p-5 text-cream">
          <div className="eyebrow text-cream/45">Chocolate Club</div>
          <div className="tabular display mt-2 text-[30px]">{formatPrice(points)}</div>
          <div className="mt-1 text-[11.5px] text-cream/50">баллов на счету</div>
        </div>

        <button
          onClick={() => tab("orders")}
          className="mt-5 w-full rounded-full bg-wine py-3.5 text-[14px] font-semibold text-white"
        >
          Отследить заказ
        </button>
        <button
          onClick={() => tab("home")}
          className="mt-2.5 w-full rounded-full border border-line py-3.5 text-[14px] font-medium"
        >
          На главную
        </button>
      </div>
    ),

    orders: (
      <div className="pb-4">
        <div className="px-4 pt-5">
          <h1 className="display text-[22px]">Мои заказы</h1>
        </div>
        <div className="space-y-3 p-4">
          {ORDERS.slice(0, 4).map((o) => {
            const items = o.items
              .map((i) => products.find((p) => p.slug === i.slug)!)
              .filter(Boolean);
            return (
              <div key={o.id} className="rounded-2xl bg-white p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[13.5px] font-semibold">№{o.number}</div>
                    <div className="text-[11.5px] text-ink-3">{o.date}</div>
                  </div>
                  <span
                    className={clsx(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase",
                      o.status === "preparing"
                        ? "bg-caramel/15 text-caramel"
                        : "bg-cream-2 text-ink-3",
                    )}
                  >
                    {o.statusLabel}
                  </span>
                </div>

                {o.status === "preparing" && (
                  <div className="mt-3 rounded-xl bg-cream-2 p-3">
                    <div className="flex justify-between text-[11.5px]">
                      <span className="font-medium">Готовим заказ</span>
                      <span className="tabular text-ink-3">{o.eta}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                      <div className="h-full rounded-full bg-wine" style={{ width: "45%" }} />
                    </div>
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex -space-x-2.5">
                    {items.slice(0, 3).map((p) => (
                      <div
                        key={p.slug}
                        className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white"
                      >
                        <Image src={p.image} alt="" fill sizes="36px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="tabular ml-auto text-[13px] font-bold">
                    {formatPrice(o.total)} сум
                  </span>
                </div>

                <button
                  onClick={() => {
                    o.items.forEach((i) => addToCart(i.slug, i.qty));
                    go("cart");
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-line py-2.5 text-[12.5px] font-semibold"
                >
                  <RotateCcw size={13} /> Повторить
                </button>
              </div>
            );
          })}
        </div>
      </div>
    ),

    loyalty: (
      <div className="pb-4">
        <div className="bg-ink px-5 pb-6 pt-6 text-cream">
          <div className="flex items-start justify-between">
            <div>
              <div className="eyebrow text-cream/45">Chocolate Club</div>
              <div className="tabular display mt-2 text-[42px] leading-none">
                {formatPrice(points)}
              </div>
              <div className="mt-1.5 text-[12px] text-cream/50">
                баллов · {formatPrice(points * 100)} сум
              </div>
            </div>
            <span
              className="rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wider"
              style={{
                background: tierInfo.current.id === "truffle" ? "#e0b076" : tierInfo.current.tone,
                color: tierInfo.current.id === "truffle" ? "#1c1310" : "#fff",
              }}
            >
              {tierInfo.current.name}
            </span>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-cream/15">
            <div
              className="h-full rounded-full bg-caramel transition-[width] duration-1000"
              style={{ width: `${tierInfo.pct}%` }}
            />
          </div>
          <div className="mt-2.5 flex justify-between text-[11.5px] text-cream/55">
            <span>
              {tierInfo.next
                ? `${formatPrice(tierInfo.remaining)} баллов до ${tierInfo.next.name}`
                : "Максимальный уровень"}
            </span>
            {tierInfo.next && (
              <span className="tabular">{formatPrice(tierInfo.next.from)}</span>
            )}
          </div>

          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-cream/10 py-3 text-[13px] font-semibold">
            <QrCode size={15} /> Показать QR на кассе
          </button>
        </div>

        <div className="p-4">
          <div className="eyebrow mb-3 text-ink-4">Ваши привилегии</div>
          <div className="space-y-2">
            {tierInfo.current.benefits.slice(0, 4).map((b) => (
              <div key={b} className="flex items-start gap-2.5 rounded-2xl bg-white p-3.5">
                <Check size={15} className="mt-0.5 shrink-0 text-sage" />
                <span className="text-[12.5px] leading-snug">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-baseline justify-between">
            <h2 className="display text-[18px]">Награды</h2>
            <button onClick={() => go("rewards")} className="text-[12px] text-wine">
              Все {REWARDS.length}
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {REWARDS.slice(0, 3).map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  if (points >= r.cost) {
                    setPoints((p) => p - r.cost);
                    flash(`${r.title} — награда получена`);
                  } else flash("Недостаточно баллов");
                }}
                className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-caramel/12 text-caramel">
                  <Gift size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold">{r.title}</span>
                  <span className="block truncate text-[11.5px] text-ink-3">{r.desc}</span>
                </span>
                <span
                  className={clsx(
                    "tabular shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-bold",
                    points >= r.cost ? "bg-ink text-cream" : "bg-cream-2 text-ink-4",
                  )}
                >
                  {formatPrice(r.cost)}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-wine p-4 text-white">
            <div className="flex items-center gap-2 text-[13px] font-semibold">
              <Sparkles size={15} /> Двойные баллы по выходным
            </div>
            <p className="mt-1.5 text-[11.5px] text-white/70">
              Суббота и воскресенье — ×2 к начислению за любой заказ
            </p>
          </div>
        </div>
      </div>
    ),

    rewards: (
      <div className="pb-4">
        <TopBar title="Каталог наград" />
        <div className="space-y-2.5 p-4">
          {REWARDS.map((r) => {
            const can = points >= r.cost;
            return (
              <div key={r.id} className="rounded-2xl bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold">{r.title}</div>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-ink-3">{r.desc}</p>
                  </div>
                  {r.tier && (
                    <span className="shrink-0 rounded-full bg-cream-2 px-2 py-0.5 text-[9.5px] font-bold uppercase text-ink-3">
                      {r.tier === "truffle" ? "Truffle" : "Praline+"}
                    </span>
                  )}
                </div>
                <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3">
                  <span className="tabular text-[14px] font-bold text-wine">
                    {formatPrice(r.cost)} баллов
                  </span>
                  <button
                    disabled={!can}
                    onClick={() => {
                      setPoints((p) => p - r.cost);
                      flash(`${r.title} — награда получена`);
                    }}
                    className={clsx(
                      "rounded-full px-4 py-1.5 text-[12px] font-semibold",
                      can ? "bg-ink text-cream" : "bg-cream-2 text-ink-4",
                    )}
                  >
                    {can ? "Обменять" : `Ещё ${formatPrice(r.cost - points)}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),

    favorites: (
      <div className="pb-4">
        <TopBar title={`Избранное · ${favorites.length}`} />
        <div className="grid grid-cols-2 gap-3 p-4">
          {favorites
            .map((s) => products.find((p) => p.slug === s))
            .filter(Boolean)
            .map((p) => (
              <Tile key={p!.slug} p={p!} />
            ))}
        </div>
      </div>
    ),

    branches: (
      <div className="pb-4">
        <TopBar title="Выбрать филиал" />
        <div className="space-y-2.5 p-4">
          {branches.map((b) => (
            <button
              key={b.slug}
              onClick={() => {
                setBranchSlug(b.slug);
                flash(`Выбран филиал ${b.name}`);
                back();
              }}
              className={clsx(
                "w-full rounded-2xl border p-4 text-left",
                b.slug === branchSlug ? "border-ink bg-white" : "border-line bg-white/60",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[13.5px] font-semibold">{b.name}</div>
                  <div className="mt-1 truncate text-[11.5px] text-ink-3">{b.address}</div>
                  <div className="mt-1 text-[11px] text-sage">Открыт · {b.hours}</div>
                </div>
                {b.slug === branchSlug && (
                  <Check size={17} className="mt-1 shrink-0 text-wine" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    ),

    profile: (
      <div className="pb-4">
        <div className="px-4 pt-5">
          <h1 className="display text-[22px]">Профиль</h1>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4">
            <div className="display grid h-13 w-13 shrink-0 place-items-center rounded-full bg-ink text-[16px] text-cream">
              {USER.avatarInitials}
            </div>
            <div className="min-w-0">
              <div className="text-[14.5px] font-semibold">{USER.fullName}</div>
              <div className="tabular text-[12px] text-ink-3">{USER.phone}</div>
            </div>
          </div>

          <button
            onClick={() => tab("loyalty")}
            className="mt-3 flex w-full items-center justify-between rounded-2xl bg-ink p-4 text-cream"
          >
            <div className="text-left">
              <div className="eyebrow text-cream/45">Chocolate Club</div>
              <div className="tabular display mt-1 text-[24px]">{formatPrice(points)}</div>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold"
              style={{
                background: tierInfo.current.id === "truffle" ? "#e0b076" : tierInfo.current.tone,
                color: tierInfo.current.id === "truffle" ? "#1c1310" : "#fff",
              }}
            >
              {tierInfo.current.name}
            </span>
          </button>

          <div className="mt-3 divide-y divide-line overflow-hidden rounded-2xl bg-white">
            {[
              { icon: <Package size={16} />, label: "Мои заказы", to: "orders" as Screen },
              { icon: <Heart size={16} />, label: "Избранное", to: "favorites" as Screen },
              { icon: <MapPin size={16} />, label: "Адреса и филиалы", to: "branches" as Screen },
              { icon: <Gift size={16} />, label: "Награды", to: "rewards" as Screen },
            ].map((it) => (
              <button
                key={it.label}
                onClick={() => go(it.to)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
              >
                <span className="text-ink-3">{it.icon}</span>
                <span className="flex-1 text-[13.5px] font-medium">{it.label}</span>
                <ChevronRight size={16} className="text-ink-4" />
              </button>
            ))}
          </div>

          <div className="mt-3 divide-y divide-line overflow-hidden rounded-2xl bg-white">
            {[
              { icon: <Bell size={16} />, label: "Уведомления" },
              { icon: <Settings size={16} />, label: "Настройки" },
            ].map((it) => (
              <div key={it.label} className="flex items-center gap-3 px-4 py-3.5">
                <span className="text-ink-3">{it.icon}</span>
                <span className="flex-1 text-[13.5px] font-medium">{it.label}</span>
                <ChevronRight size={16} className="text-ink-4" />
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-[11px] text-ink-4">
            Chocolate · версия 2.0 · демо
          </div>
        </div>
      </div>
    ),
  };

  const showTabs = screen !== "welcome" && screen !== "success";

  const TABS = [
    { id: "home" as Screen, label: "Главная", icon: Home },
    { id: "catalog" as Screen, label: "Каталог", icon: LayoutGrid },
    { id: "orders" as Screen, label: "Заказы", icon: Package },
    { id: "loyalty" as Screen, label: "Клуб", icon: Sparkles },
    { id: "profile" as Screen, label: "Профиль", icon: User },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-cream">
      {/* status bar */}
      {screen !== "welcome" && (
        <div className="tabular flex shrink-0 items-center justify-between px-5 pt-2.5 text-[11px] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-1 text-ink-3">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Chocolate
          </span>
        </div>
      )}

      {/* screen */}
      <div className="thin-scroll relative flex-1 overflow-y-auto">
        {screens[screen]}
      </div>

      {/* cart bubble */}
      {showTabs && cartCount > 0 && screen !== "cart" && screen !== "checkout" && (
        <button
          onClick={() => go("cart")}
          className="absolute bottom-[74px] right-4 z-30 flex items-center gap-2 rounded-full bg-wine px-4 py-3 text-[13px] font-semibold text-white shadow-lg"
        >
          <Package size={15} />
          <span className="tabular">{cartCount}</span>
          <span className="tabular">· {formatPrice(subtotal)}</span>
        </button>
      )}

      {/* toast */}
      {toast && (
        <div className="fade-up absolute bottom-[74px] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-[12px] font-medium text-cream shadow-lg">
          {toast}
        </div>
      )}

      {/* bottom nav */}
      {showTabs && (
        <nav className="flex shrink-0 items-center justify-around border-t border-line bg-cream/95 px-2 pb-2 pt-2 backdrop-blur">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = screen === t.id || (t.id === "catalog" && screen === "category");
            return (
              <button
                key={t.id}
                onClick={() => tab(t.id)}
                className={clsx(
                  "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition",
                  active ? "text-wine" : "text-ink-4",
                )}
              >
                <Icon size={19} />
                <span className="text-[9.5px] font-medium">{t.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
