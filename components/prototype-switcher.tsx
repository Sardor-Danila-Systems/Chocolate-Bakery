"use client";

/* THROWAWAY — UI prototype switcher. Not part of the product. */

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PrototypeSwitcher({
  variants,
  names,
  current,
}: {
  variants: string[];
  names: Record<string, string>;
  current: string;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const go = (dir: number) => {
    const i = variants.indexOf(current);
    const next = variants[(i + dir + variants.length) % variants.length];
    const p = new URLSearchParams(params.toString());
    p.set("variant", next);
    router.replace(`?${p.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement | null)?.isContentEditable
      )
        return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[999] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#141010] p-1.5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <button
          onClick={() => go(-1)}
          className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/10"
          aria-label="Предыдущий вариант"
        >
          <ChevronLeft size={17} />
        </button>
        <div className="px-3 text-center">
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
            Прототип · вариант
          </div>
          <div className="text-[13px] font-semibold">
            {current} — {names[current]}
          </div>
        </div>
        <button
          onClick={() => go(1)}
          className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/10"
          aria-label="Следующий вариант"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
