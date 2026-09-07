import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categoryBySlug, productBySlug, products, related } from "@/lib/catalog";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductCard } from "@/components/ui/product-card";
import { SectionHead } from "@/components/ui/kit";

export function generateStaticParams() {
  return products.slice(0, 60).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = productBySlug(slug);
  return {
    title: p ? `${p.name} — Chocolate` : "Chocolate",
    description: p?.desc,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  const cat = categoryBySlug(product.category);
  const similar = related(product, 5);

  return (
    <>
      <section className="mx-auto max-w-[1340px] px-4 pb-12 pt-6 sm:px-6">
        <nav className="mb-8 flex items-center gap-1.5 text-[12.5px] text-ink-4">
          <Link href="/" className="transition hover:text-ink">
            Главная
          </Link>
          <ChevronRight size={13} />
          <Link href="/catalog" className="transition hover:text-ink">
            Каталог
          </Link>
          <ChevronRight size={13} />
          <Link href={`/catalog/${product.category}`} className="transition hover:text-ink">
            {cat?.name}
          </Link>
          <ChevronRight size={13} />
          <span className="truncate text-ink-2">{product.name}</span>
        </nav>

        <ProductDetail product={product} />
      </section>

      {similar.length > 0 && (
        <section className="mx-auto max-w-[1340px] px-4 pb-16 sm:px-6">
          <SectionHead
            eyebrow="Похожее"
            title="К этому часто берут"
            action={`Вся категория «${cat?.name}»`}
            href={`/catalog/${product.category}`}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {similar.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
