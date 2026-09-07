"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { MapPin, Phone, Clock, Navigation, Store, Truck } from "lucide-react";
import { branches } from "@/lib/catalog";
import { Button } from "@/components/ui/kit";

/** Simple schematic map: real GPS coordinates projected into the viewport. */
function BranchMap({
  activeSlug,
  onSelect,
}: {
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  const lats = branches.map((b) => b.lat);
  const lngs = branches.map((b) => b.lng);
  const minLat = Math.min(...lats) - 0.006;
  const maxLat = Math.max(...lats) + 0.006;
  const minLng = Math.min(...lngs) - 0.008;
  const maxLng = Math.max(...lngs) + 0.008;

  const x = (lng: number) => ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = (lat: number) => ((maxLat - lat) / (maxLat - minLat)) * 100;

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-line bg-[#efe7d8]">
      {/* schematic streets */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#e0d3c2" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path
          d="M0,58% L30%,52% L58%,64% L100%,56%"
          stroke="#dcc9ad"
          strokeWidth="14"
          fill="none"
        />
        <path d="M42%,0 L38%,42% L46%,100%" stroke="#dcc9ad" strokeWidth="11" fill="none" />
        <circle cx="44%" cy="46%" r="52" fill="#e6dbc6" />
      </svg>

      <div className="absolute left-4 top-4 rounded-full bg-cream/90 px-3.5 py-2 text-[11.5px] font-medium text-ink-3 backdrop-blur">
        Самарканд · {branches.length} филиалов
      </div>

      {branches.map((b) => {
        const active = b.slug === activeSlug;
        return (
          <button
            key={b.slug}
            onClick={() => onSelect(b.slug)}
            className="absolute -translate-x-1/2 -translate-y-full transition"
            style={{ left: `${x(b.lng)}%`, top: `${y(b.lat)}%` }}
            aria-label={b.name}
          >
            <span
              className={clsx(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold shadow-lg transition",
                active
                  ? "scale-110 bg-wine text-white"
                  : "bg-cream text-ink hover:bg-white",
              )}
            >
              <MapPin size={12} />
              {b.name}
            </span>
            <span
              className={clsx(
                "mx-auto block h-2.5 w-2.5 -translate-y-1 rotate-45",
                active ? "bg-wine" : "bg-cream",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function BranchesInner() {
  const params = useSearchParams();
  const initial = params.get("branch") ?? branches[0].slug;
  const [activeSlug, setActiveSlug] = useState(initial);
  const active = branches.find((b) => b.slug === activeSlug) ?? branches[0];

  return (
    <>
      <section className="mx-auto max-w-[1340px] px-4 pb-8 pt-10 sm:px-6">
        <div className="eyebrow text-caramel">Найти Chocolate</div>
        <h1 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">Наши филиалы</h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-3">
          Девять точек по Самарканду — от флагманского кафе на Беруни до пекарни у
          базара Сиаб. Всюду можно забрать заказ и получить баллы клуба.
        </p>
      </section>

      <section className="mx-auto max-w-[1340px] px-4 pb-16 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[420px_1fr]">
          {/* list */}
          <div className="order-2 max-h-[620px] space-y-2.5 overflow-y-auto pr-1 lg:order-1">
            {branches.map((b) => (
              <button
                key={b.slug}
                onClick={() => setActiveSlug(b.slug)}
                className={clsx(
                  "w-full rounded-2xl border p-5 text-left transition",
                  b.slug === activeSlug
                    ? "border-ink bg-white shadow-[0_10px_30px_rgba(28,19,16,0.07)]"
                    : "border-line bg-white/60 hover:border-ink/25",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[16px] font-semibold">{b.name}</span>
                      {b.flagship && (
                        <span className="rounded-full bg-caramel/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-caramel">
                          Флагман
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 text-[13px] text-ink-3">{b.address}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="tabular text-[12.5px] font-medium">{b.hours}</div>
                    <div className="text-[12px] text-sage">Открыт</div>
                  </div>
                </div>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {b.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-cream-2 px-2.5 py-1 text-[11px] text-ink-3"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* map + detail */}
          <div className="order-1 lg:order-2">
            <BranchMap activeSlug={activeSlug} onSelect={setActiveSlug} />

            <div className="mt-4 rounded-3xl border border-line bg-white p-7">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <div className="eyebrow text-caramel">Выбранный филиал</div>
                  <h2 className="display mt-2.5 text-[27px]">{active.name}</h2>
                  <p className="mt-2 text-[14px] text-ink-3">{active.address}</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Button
                    href={`https://yandex.ru/maps/?rtext=~${active.lat},${active.lng}`}
                    variant="dark"
                  >
                    <Navigation size={15} /> Маршрут
                  </Button>
                  <Button href="/catalog" variant="outline">
                    Заказать самовывоз
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="mt-0.5 shrink-0 text-ink-4" />
                  <div>
                    <div className="text-[12.5px] text-ink-3">Часы работы</div>
                    <div className="tabular text-[14px] font-medium">{active.hours}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone size={16} className="mt-0.5 shrink-0 text-ink-4" />
                  <div>
                    <div className="text-[12.5px] text-ink-3">Телефон</div>
                    <a href={`tel:${active.phone.replace(/\s/g, "")}`} className="text-[14px] font-medium">
                      {active.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-ink-4" />
                  <div>
                    <div className="text-[12.5px] text-ink-3">Район</div>
                    <div className="text-[14px] font-medium">{active.district}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
                {active.services.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 rounded-full bg-cream-2 px-3.5 py-2 text-[12.5px]"
                  >
                    {s === "Доставка" ? <Truck size={13} /> : <Store size={13} />}
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BranchesPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-ink-3">Загружаем карту…</div>}>
      <BranchesInner />
    </Suspense>
  );
}
