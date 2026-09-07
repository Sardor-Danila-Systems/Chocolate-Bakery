import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Clock } from "lucide-react";
import { byCategory, formatPrice, products } from "@/lib/catalog";
import { PROMOTIONS, promotionBySlug } from "@/lib/demo";
import { ProductCard } from "@/components/ui/product-card";
import { Button, SectionHead } from "@/components/ui/kit";

export function generateStaticParams() {
  return PROMOTIONS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = promotionBySlug(slug);
  return { title: p ? `${p.title} — Chocolate` : "Акции — Chocolate", description: p?.subtitle };
}

export default async function PromotionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const promo = promotionBySlug(slug);
  if (!promo) notFound();
  const product = products.find((p) => p.slug === promo.productSlug)!;
  const others = PROMOTIONS.filter((p) => p.slug !== promo.slug).slice(0, 3);
  const related = byCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-[1340px] px-4 pb-12 pt-6 sm:px-6">
        <nav className="mb-8 flex items-center gap-1.5 text-[12.5px] text-ink-4">
          <Link href="/" className="transition hover:text-ink">
            Главная
          </Link>
          <ChevronRight size={13} />
          <Link href="/promotions" className="transition hover:text-ink">
            Акции
          </Link>
          <ChevronRight size={13} />
          <span className="truncate text-ink-2">{promo.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white lg:aspect-square">
            <Image
              src={product.image}
              alt={promo.title}
              fill
              sizes="(max-width:1024px) 100vw, 620px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="eyebrow text-caramel">{promo.kindLabel}</div>
            <h1 className="display mt-4 text-[clamp(2rem,4.2vw,3.1rem)]">
              {promo.title}
            </h1>
            <p className="mt-4 text-[16px] font-medium text-ink-2">{promo.subtitle}</p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-3">
              {promo.detail}
            </p>

            <div className="mt-7 flex items-center gap-2 text-[13.5px] text-ink-3">
              <Clock size={15} /> Действует {promo.until}
            </div>

            {promo.code && (
              <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-wine/8 p-5">
                <span className="text-[13.5px] text-wine">Ваш промокод</span>
                <span className="tabular rounded-full border border-dashed border-wine px-5 py-2 text-[15px] font-bold tracking-[0.12em] text-wine">
                  {promo.code}
                </span>
              </div>
            )}

            <ul className="mt-7 space-y-3 border-t border-line pt-6">
              {promo.terms.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[14px] text-ink-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-sage" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <Button href={`/product/${product.slug}`} size="lg">
                {product.name} · {formatPrice(product.price)} сум
              </Button>
              <Button href="/catalog" variant="outline" size="lg">
                В каталог
              </Button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1340px] px-4 pb-14 sm:px-6">
          <SectionHead title="Участвует в акции" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1340px] px-4 pb-16 sm:px-6">
        <SectionHead title="Другие предложения" action="Все акции" href="/promotions" />
        <div className="grid gap-4 sm:grid-cols-3">
          {others.map((o) => {
            const prod = products.find((p) => p.slug === o.productSlug)!;
            return (
              <Link
                key={o.id}
                href={`/promotions/${o.slug}`}
                className="group flex items-center gap-4 rounded-3xl bg-white p-4 transition hover:shadow-[0_14px_40px_rgba(28,19,16,0.08)]"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={prod.image} alt={o.title} fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="eyebrow text-caramel">{o.kindLabel}</div>
                  <div className="mt-1.5 text-[15px] font-semibold leading-snug">
                    {o.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
