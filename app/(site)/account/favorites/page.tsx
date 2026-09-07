"use client";

import { Heart } from "lucide-react";
import { products } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/kit";

export default function FavoritesPage() {
  const { state, lines, add, pushToast, setCartOpen } = useStore();
  const favs = state.favorites
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean) as typeof products;

  const addAll = () => {
    favs.forEach((p) => add(p.slug));
    pushToast({ title: "Избранное в корзине", detail: `${favs.length} позиций` });
    setCartOpen(true);
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-caramel">Сохранённое</div>
          <h1 className="display mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)]">Избранное</h1>
          <p className="mt-2.5 text-[14px] text-ink-3">
            {favs.length} позиций, к которым вы возвращаетесь
          </p>
        </div>
        {favs.length > 0 && (
          <Button onClick={addAll} variant="dark">
            Добавить всё в заказ
          </Button>
        )}
      </div>

      {favs.length === 0 ? (
        <div className="rounded-3xl border border-line bg-white py-20 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream-2">
            <Heart size={24} className="text-ink-4" />
          </div>
          <p className="display mt-6 text-[22px]">Пока ничего не сохранено</p>
          <p className="mt-2.5 text-[14px] text-ink-3">
            Нажимайте на сердечко в каталоге — позиции появятся здесь.
          </p>
          <Button href="/catalog" className="mt-6">
            В каталог
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {favs.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
