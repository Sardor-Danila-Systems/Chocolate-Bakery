"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Heart, Plus, Check } from "lucide-react";
import { useState } from "react";
import { BADGE_LABEL, formatPrice, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const BADGE_TONE = {
  hit: "bg-wine text-white",
  new: "bg-ink text-cream",
  season: "bg-sage text-white",
} as const;

export function ProductCard({
  product,
  size = "md",
  showDesc = false,
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
  showDesc?: boolean;
}) {
  const { add, isFav, toggleFav } = useStore();
  const [added, setAdded] = useState(false);
  const badge = product.badges[0];

  const onAdd = () => {
    add(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="group flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden rounded-2xl bg-white"
      >
        <div className={clsx("relative", size === "lg" ? "aspect-[4/5]" : "aspect-square")}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 260px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        </div>
        {badge && (
          <span
            className={clsx(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em]",
              BADGE_TONE[badge],
            )}
          >
            {BADGE_LABEL[badge]}
          </span>
        )}
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-[14px] font-medium leading-snug transition hover:text-wine"
        >
          {product.name}
        </Link>

        {showDesc && product.desc && (
          <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-ink-3">
            {product.desc}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div>
            <div className="tabular text-[15px] font-bold leading-none">
              {formatPrice(product.price)}
              <span className="ml-1 text-[11px] font-medium text-ink-3">сум</span>
            </div>
            {product.weight && (
              <div className="mt-1 text-[11.5px] text-ink-4">{product.weight}</div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleFav(product.slug)}
              aria-label="В избранное"
              className={clsx(
                "grid h-9 w-9 place-items-center rounded-full border transition",
                isFav(product.slug)
                  ? "border-wine bg-wine/10 text-wine"
                  : "border-line text-ink-4 hover:border-ink/30 hover:text-ink",
              )}
            >
              <Heart size={15} fill={isFav(product.slug) ? "currentColor" : "none"} />
            </button>
            <button
              onClick={onAdd}
              aria-label="Добавить в заказ"
              className={clsx(
                "grid h-9 w-9 place-items-center rounded-full transition",
                added ? "bg-sage text-white" : "bg-ink text-cream hover:bg-wine",
              )}
            >
              {added ? <Check size={16} /> : <Plus size={17} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Caption-led editorial presentation — used once per page as a brand moment. */
export function ProductFigure({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 420px"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-line pt-4">
        <span className="display min-w-0 text-[19px] leading-tight">{product.name}</span>
        <span className="tabular shrink-0 text-[13px] text-ink-3">
          {formatPrice(product.price)} сум
        </span>
      </div>
    </Link>
  );
}
