"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  User,
  Package,
  Heart,
  Sparkles,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { USER } from "@/lib/demo";
import { useStore } from "@/lib/store";
import { tierForPoints } from "@/lib/loyalty";

const ITEMS = [
  { href: "/account", label: "Профиль", icon: User, exact: true },
  { href: "/account/orders", label: "Заказы", icon: Package },
  { href: "/account/favorites", label: "Избранное", icon: Heart },
  { href: "/account/loyalty", label: "Chocolate Club", icon: Sparkles },
  { href: "/account/addresses", label: "Адреса", icon: MapPin },
];

export function AccountNav() {
  const pathname = usePathname();
  const { state } = useStore();
  const tier = tierForPoints(state.lifetimePoints);

  return (
    <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-3xl border border-line bg-white p-5">
        <div className="flex items-center gap-3.5">
          <div className="display grid h-13 w-13 shrink-0 place-items-center rounded-full bg-ink text-[17px] text-cream">
            {USER.avatarInitials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-[15px] font-semibold">{USER.fullName}</div>
            <div className="text-[12.5px] text-ink-3">В клубе с {USER.memberSince}</div>
          </div>
        </div>

        <Link
          href="/account/loyalty"
          className="mt-4 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-cream transition hover:bg-ink-2"
        >
          <div>
            <div className="eyebrow text-cream/45">Баллы</div>
            <div className="tabular display mt-0.5 text-[22px]">
              {formatPrice(state.points)}
            </div>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider"
            style={{
              background: tier.id === "truffle" ? "#e0b076" : tier.tone,
              color: tier.id === "truffle" ? "#1c1310" : "#fff",
            }}
          >
            {tier.name}
          </span>
        </Link>
      </div>

      <nav className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto rounded-3xl border border-line bg-white p-2 lg:flex-col lg:gap-0.5">
        {ITEMS.map((it) => {
          const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={clsx(
                "flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium transition",
                active ? "bg-cream-2 text-ink" : "text-ink-3 hover:bg-cream-2/60 hover:text-ink",
              )}
            >
              <Icon size={16} />
              {it.label}
            </Link>
          );
        })}
        <div className="hidden border-t border-line pt-1.5 lg:mt-1.5 lg:block">
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium text-ink-3 transition hover:bg-cream-2/60 hover:text-ink">
            <Settings size={16} /> Настройки
          </button>
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium text-ink-3 transition hover:bg-cream-2/60 hover:text-ink">
            <LogOut size={16} /> Выйти
          </button>
        </div>
      </nav>
    </aside>
  );
}
