"use client";

import { MapPin, CreditCard, Check, Plus, Star } from "lucide-react";
import { branches } from "@/lib/catalog";
import { ADDRESSES, PAYMENT_METHODS, USER } from "@/lib/demo";
import { SectionHead } from "@/components/ui/kit";

export default function AddressesPage() {
  const favBranch = branches.find((b) => b.slug === USER.favoriteBranch)!;

  return (
    <div className="space-y-9">
      <div>
        <div className="eyebrow text-caramel">Настройки заказа</div>
        <h1 className="display mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)]">
          Адреса и оплата
        </h1>
      </div>

      <div>
        <SectionHead title="Адреса доставки" className="mb-5" />
        <div className="grid gap-3 sm:grid-cols-2">
          {ADDRESSES.map((a) => (
            <div key={a.id} className="rounded-3xl border border-line bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-2">
                    <MapPin size={17} />
                  </span>
                  <span className="text-[15px] font-semibold">{a.label}</span>
                </div>
                {a.isDefault && (
                  <span className="rounded-full bg-sage/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sage">
                    Основной
                  </span>
                )}
              </div>
              <p className="mt-4 text-[14px] text-ink-2">{a.address}</p>
              <p className="mt-1 text-[12.5px] text-ink-4">{a.note}</p>
              <div className="mt-5 flex gap-3 border-t border-line pt-4 text-[13px]">
                <button className="font-medium text-ink-2 transition hover:text-wine">
                  Изменить
                </button>
                <button className="text-ink-4 transition hover:text-wine">Удалить</button>
              </div>
            </div>
          ))}

          <button className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-line text-ink-3 transition hover:border-ink/30 hover:text-ink">
            <Plus size={22} />
            <span className="text-[14px] font-medium">Добавить адрес</span>
          </button>
        </div>
      </div>

      <div>
        <SectionHead title="Способы оплаты" className="mb-5" />
        <div className="overflow-hidden rounded-3xl border border-line bg-white">
          {PAYMENT_METHODS.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 border-b border-line px-6 py-4 last:border-0"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream-2">
                <CreditCard size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-semibold">{p.label}</div>
                <div className="tabular text-[12.5px] text-ink-3">{p.mask}</div>
              </div>
              {p.isDefault && (
                <span className="flex items-center gap-1.5 text-[12.5px] text-sage">
                  <Check size={14} /> По умолчанию
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHead title="Любимый филиал" className="mb-5" />
        <div className="flex flex-wrap items-center gap-5 rounded-3xl border border-line bg-white p-6">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-caramel/12 text-caramel">
            <Star size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[15.5px] font-semibold">{favBranch.name}</div>
            <div className="mt-1 text-[13.5px] text-ink-3">{favBranch.address}</div>
            <div className="mt-1 text-[12.5px] text-sage">
              Открыт · {favBranch.hours}
            </div>
          </div>
          <div className="text-[13px] text-ink-3">
            Подставляем этот филиал при самовывозе
          </div>
        </div>
      </div>

      <div>
        <SectionHead title="Личные данные" className="mb-5" />
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Имя", USER.fullName],
            ["Телефон", USER.phone],
            ["Email", USER.email],
            ["День рождения", USER.birthday],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-line bg-white p-5">
              <div className="text-[12.5px] text-ink-3">{label}</div>
              <div className="mt-1.5 text-[15px] font-medium">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
