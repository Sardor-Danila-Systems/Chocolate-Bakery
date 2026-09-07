import Image from "next/image";
import Link from "next/link";
import { Clock, Sparkles, ArrowRight } from "lucide-react";
import { products } from "@/lib/catalog";
import { PROMOTIONS } from "@/lib/demo";
import { Reveal, SectionHead } from "@/components/ui/kit";

export const metadata = {
  title: "Акции — Chocolate",
  description: "Сезонные предложения, комбо, лимитированные позиции и бонусы клуба.",
};

const ACCENT: Record<string, string> = {
  wine: "bg-wine text-white",
  caramel: "bg-caramel text-white",
  sage: "bg-sage text-white",
  ink: "bg-ink text-cream",
};

export default function PromotionsPage() {
  const personal = PROMOTIONS.filter((p) => p.personal);
  const general = PROMOTIONS.filter((p) => !p.personal);
  const hero = general[0];
  const heroProduct = products.find((p) => p.slug === hero.productSlug)!;
  const rest = general.slice(1);

  return (
    <>
      <section className="mx-auto max-w-[1340px] px-4 pb-8 pt-10 sm:px-6">
        <div className="eyebrow text-caramel">Выгодно</div>
        <h1 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">Акции и предложения</h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-3">
          Сезонные коллекции, утренние комбо и привилегии Chocolate Club. Персональные
          предложения видны только вам.
        </p>
      </section>

      {/* personal */}
      {personal.length > 0 && (
        <section className="mx-auto max-w-[1340px] px-4 pb-10 sm:px-6">
          {personal.map((p) => {
            const prod = products.find((x) => x.slug === p.productSlug)!;
            return (
              <Link
                key={p.id}
                href={`/promotions/${p.slug}`}
                className="group grid overflow-hidden rounded-3xl bg-wine text-white sm:grid-cols-[1.4fr_1fr]"
              >
                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} />
                    <span className="eyebrow">Персонально для вас</span>
                  </div>
                  <h2 className="display mt-4 text-[clamp(1.8rem,3.6vw,2.6rem)]">
                    {p.title}
                  </h2>
                  <p className="mt-3 max-w-md text-[14.5px] text-white/75">{p.subtitle}</p>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <span className="tabular rounded-full border border-dashed border-white/50 px-5 py-2.5 text-[14px] font-bold tracking-wider">
                      {p.code}
                    </span>
                    <span className="flex items-center gap-2 text-[13px] font-semibold">
                      Смотреть <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
                <div className="relative min-h-[220px]">
                  <Image
                    src={prod.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:640px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
              </Link>
            );
          })}
        </section>
      )}

      {/* hero promo */}
      <section className="mx-auto max-w-[1340px] px-4 pb-4 sm:px-6">
        <Link
          href={`/promotions/${hero.slug}`}
          className="group grid overflow-hidden rounded-3xl bg-white lg:grid-cols-2"
        >
          <div className="relative min-h-[300px] lg:min-h-[440px]">
            <Image
              src={heroProduct.image}
              alt={hero.title}
              fill
              sizes="(max-width:1024px) 100vw, 660px"
              className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
              priority
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span
              className={`w-fit rounded-full px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] ${ACCENT[hero.accent]}`}
            >
              {hero.kindLabel}
            </span>
            <h2 className="display mt-5 text-[clamp(1.9rem,3.8vw,2.8rem)]">
              {hero.title}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-3">
              {hero.detail}
            </p>
            <div className="mt-7 flex items-center gap-2 text-[13px] text-ink-4">
              <Clock size={14} /> {hero.until}
            </div>
          </div>
        </Link>
      </section>

      {/* grid */}
      <section className="mx-auto max-w-[1340px] px-4 py-10 sm:px-6">
        <SectionHead title="Все предложения" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => {
            const prod = products.find((x) => x.slug === p.productSlug)!;
            return (
              <Reveal key={p.id} delay={i * 70}>
                <Link
                  href={`/promotions/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={prod.image}
                      alt={p.title}
                      fill
                      sizes="(max-width:768px) 100vw, 420px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] ${ACCENT[p.accent]}`}
                    >
                      {p.kindLabel}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display text-[21px] leading-tight">{p.title}</h3>
                    <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-ink-3">
                      {p.subtitle}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[12.5px] text-ink-4">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} /> {p.until}
                      </span>
                      <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
