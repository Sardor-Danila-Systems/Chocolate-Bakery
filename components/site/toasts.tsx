"use client";

import Image from "next/image";
import { useStore } from "@/lib/store";

export function Toasts() {
  const { toasts } = useStore();
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex w-[92%] max-w-sm -translate-x-1/2 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="fade-up pointer-events-auto flex items-center gap-3 rounded-2xl bg-ink px-3.5 py-3 text-cream shadow-[0_18px_44px_rgba(28,19,16,0.35)]"
        >
          {t.image && (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white">
              <Image src={t.image} alt="" fill sizes="40px" className="object-cover" />
            </div>
          )}
          <div className="min-w-0">
            <div className="text-[13.5px] font-semibold">{t.title}</div>
            {t.detail && (
              <div className="truncate text-[12px] text-cream/60">{t.detail}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
