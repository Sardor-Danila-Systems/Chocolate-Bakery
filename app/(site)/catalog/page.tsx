import type { Metadata } from "next";
import { products } from "@/lib/catalog";
import { CatalogView, CategoryTiles } from "@/components/catalog/catalog-view";

export const metadata: Metadata = {
  title: "Каталог — Chocolate",
  description: "254 позиции: торты, пирожные, чизкейки, выпечка, кофе и напитки.",
};

export default function CatalogPage() {
  return (
    <>
      <section className="mx-auto max-w-[1340px] px-4 pb-8 pt-10 sm:px-6">
        <div className="eyebrow text-caramel">Витрина Chocolate</div>
        <h1 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">Каталог</h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-3">
          {products.length} позиций в 13 категориях — от тортов на заказ до кофе с
          собой. Всё печём и готовим сами, каждый день.
        </p>
      </section>

      <CategoryTiles />
      <CatalogView items={products} />
    </>
  );
}
