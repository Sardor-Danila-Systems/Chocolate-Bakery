import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { byCategory, categories, categoryBySlug } from "@/lib/catalog";
import { CatalogView } from "@/components/catalog/catalog-view";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categoryBySlug(category);
  return {
    title: cat ? `${cat.name} — Chocolate` : "Каталог — Chocolate",
    description: cat?.tagline,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categoryBySlug(category);
  if (!cat) notFound();
  const items = byCategory(category);

  return (
    <>
      <section className="mx-auto max-w-[1340px] px-4 pb-8 pt-8 sm:px-6">
        <nav className="flex items-center gap-1.5 text-[12.5px] text-ink-4">
          <Link href="/" className="transition hover:text-ink">
            Главная
          </Link>
          <ChevronRight size={13} />
          <Link href="/catalog" className="transition hover:text-ink">
            Каталог
          </Link>
          <ChevronRight size={13} />
          <span className="text-ink-2">{cat.name}</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="display text-[clamp(1.9rem,3.6vw,2.7rem)]">{cat.name}</h1>
            <p className="mt-3 max-w-md text-[14.5px] text-ink-3">{cat.tagline}</p>
          </div>
          <div className="tabular text-[13px] text-ink-4">{items.length} позиций</div>
        </div>
      </section>

      <CatalogView items={items} activeCategory={cat.slug} />
    </>
  );
}
