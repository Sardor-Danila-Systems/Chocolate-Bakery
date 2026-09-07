import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MapPin,
  RotateCcw,
  Sparkles,
  Smartphone,
  Star,
  Truck,
} from "lucide-react";
import { branches, categories, formatPrice, pick, products } from "@/lib/catalog";
import { POPULAR_SLUGS, PROMOTIONS, RECOMMENDED_SLUGS, SEASONAL_SLUGS, USER } from "@/lib/demo";
import { TIERS } from "@/lib/loyalty";
import { ProductCard, ProductFigure } from "@/components/ui/product-card";
import { Button, Reveal, SectionHead } from "@/components/ui/kit";
import { PersonalStrip } from "@/components/home/personal-strip";

export default function HomePage() {
  const heroProduct = products.find((p) => p.slug === "tort-dolche-vita-2")!;
  const heroSecondary = products.find((p) => p.slug === "trayfl-sredniy")!;
  const popular = pick(POPULAR_SLUGS);
  const seasonal = pick(SEASONAL_SLUGS);
  const recommended = pick(RECOMMENDED_SLUGS);
  const featuredPromos = PROMOTIONS.filter((p) => !p.personal).slice(0, 3);
  const nearest = branches.slice(0, 3);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="mx-auto max-w-[1340px] px-4 pt-5 sm:px-6">
        <div className="grid gap-3 lg:grid-cols-[1.32fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl bg-ink">
            <div className="grid h-full sm:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <div className="eyebrow text-caramel-light">Коллекция сентября</div>
                <h1 className="display mt-4 text-[clamp(2.1rem,4.4vw,3.4rem)] text-cream">
                  Праздник,
                  <br />
                  <span className="display-italic">когда ты захочешь</span>
                </h1>
                <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-cream/60 sm:mt-5 sm:text-[14.5px]">
                  Чтобы порадовать себя сладким, не нужен особый повод. Печём
                  каждый день в Самарканде — с 2018 года.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8">
                  <Button href="/catalog" size="lg">
                    Смотреть каталог
                  </Button>
                  <Button href="/catalog/cakes" variant="onDark" size="lg">
                    Торты на заказ
                  </Button>
                </div>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-cream/12 pt-5 text-[12px] text-cream/50 sm:mt-10 sm:gap-x-7 sm:pt-6 sm:text-[12.5px]">
                  <span className="flex items-center gap-1.5">
                    <Truck size={14} /> Доставка от 45 минут
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {branches.length} филиалов
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star size={14} /> 254 позиции
                  </span>
                </div>
              </div>

              <div className="relative min-h-[280px] sm:min-h-[440px]">
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  sizes="(max-width:640px) 100vw, 620px"
                  className="object-cover"
                  priority
                />
                <Link
                  href={`/product/${heroProduct.slug}`}
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-cream/92 px-4 py-3 backdrop-blur transition hover:bg-cream"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[13.5px] font-semibold">
                      {heroProduct.name}
                    </div>
                    <div className="tabular text-[12.5px] text-ink-3">
                      {formatPrice(heroProduct.price)} сум · {heroProduct.weight}
                    </div>
                  </div>
                  <ArrowRight size={17} className="shrink-0" />
                </Link>
              </div>
            </div>
          </div>

          {/* side stack */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href="/loyalty"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-wine p-7 text-white"
            >
              <div>
                <div className="eyebrow text-white/55">Chocolate Club</div>
                <div className="display mt-3 text-[26px] leading-tight">
                  Возвращаем
                  <br />
                  до 10% баллами
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[13px] font-semibold">
                Как это работает
                <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </div>
              <Sparkles
                size={130}
                className="pointer-events-none absolute -bottom-6 -right-6 text-white/10"
              />
            </Link>

            <Link
              href={`/product/${heroSecondary.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-white"
            >
              <div className="relative aspect-[4/3] lg:aspect-[16/10]">
                <Image
                  src={heroSecondary.image}
                  alt={heroSecondary.name}
                  fill
                  sizes="(max-width:1024px) 50vw, 420px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <div className="eyebrow text-caramel">Хит недели</div>
                  <div className="mt-1.5 text-[15px] font-semibold">
                    {heroSecondary.name}
                  </div>
                </div>
                <div className="tabular shrink-0 text-[15px] font-bold">
                  {formatPrice(heroSecondary.price)}
                  <span className="ml-1 text-[11px] font-medium text-ink-3">сум</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- PERSONAL STRIP (loyalty above the fold) ---------------- */}
      <PersonalStrip />

      {/* ---------------- CATEGORIES ---------------- */}
      <section className="mx-auto max-w-[1340px] px-4 py-14 sm:px-6">
        <SectionHead
          eyebrow="Витрина"
          title="Что сегодня в кондитерской"
          action="Весь каталог"
          href="/catalog"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 12).map((c, i) => (
            <Reveal key={c.slug} delay={i * 40}>
              <Link
                href={`/catalog/${c.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white transition hover:shadow-[0_14px_40px_rgba(28,19,16,0.08)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width:640px) 50vw, 200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-2 px-3.5 py-3">
                  <span className="text-[13.5px] font-semibold leading-tight">
                    {c.name}
                  </span>
                  <span className="tabular text-[11.5px] text-ink-4">{c.count}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- POPULAR ---------------- */}
      <section className="mx-auto max-w-[1340px] px-4 pb-14 sm:px-6">
        <SectionHead
          eyebrow="Выбор гостей"
          title="Популярное сегодня"
          action="Смотреть все"
          href="/catalog"
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {popular.slice(0, 8).map((p, i) => (
            <Reveal key={p.slug} delay={i * 45}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SEASONAL — editorial moment ---------------- */}
      <section className="border-y border-line bg-cream-2/60 py-16">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="eyebrow text-caramel">Сезон</div>
              <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)]">
                Ягодная коллекция,
                <br />
                <span className="display-italic">пока не кончилось лето</span>
              </h2>
              <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-ink-3">
                Клубника, малина и персики с самаркандских рынков. Собираем
                небольшими партиями каждое утро — до конца сентября.
              </p>
              <Button href="/promotions/yagodnyy-sentyabr" variant="outline" className="mt-7">
                Сезонные предложения
              </Button>
            </div>

            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {seasonal.slice(0, 3).map((p, i) => (
                <Reveal key={p.slug} delay={i * 90} className={i === 1 ? "sm:mt-12" : ""}>
                  <ProductFigure product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CHOCOLATE CLUB spread ---------------- */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1340px] items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="eyebrow text-caramel-light">Программа лояльности</div>
            <h2 className="display mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)]">
              Chocolate <span className="display-italic">Club</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/60">
              Три уровня — от сырого какао-боба до тёмного трюфеля. Каждая покупка
              возвращается баллами, а статус растёт вместе с вами.
            </p>

            <div className="mt-10">
              {TIERS.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-6 border-b border-cream/12 py-5"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: t.tone === "#1c1310" ? "#e0b076" : t.tone }}
                    />
                    <div>
                      <div className="display text-[22px]">{t.name}</div>
                      <div className="mt-0.5 text-[12.5px] text-cream/45">
                        {t.story}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="tabular display text-[24px] text-caramel-light">
                      {t.cashback}%
                    </div>
                    <div className="text-[11.5px] text-cream/45">баллами</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5">
              <Button href="/loyalty" variant="light" size="lg">
                Подробнее о клубе
              </Button>
              <Button href="/account/loyalty" variant="onDark" size="lg">
                Мой баланс
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src={products.find((p) => p.slug === "desert-dubay")!.image}
                alt="Chocolate Club"
                fill
                sizes="(max-width:1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-cream p-5 text-ink shadow-xl sm:left-8 sm:right-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="eyebrow text-ink-4">Ваш баланс</div>
                  <div className="tabular display mt-1.5 text-[30px]">
                    {formatPrice(USER.points)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] text-ink-3">эквивалент</div>
                  <div className="tabular text-[15px] font-semibold">
                    {formatPrice(USER.points * 100)} сум
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- RECOMMENDED ---------------- */}
      <section className="mx-auto max-w-[1340px] px-4 py-20 sm:px-6">
        <SectionHead
          eyebrow="Для вас"
          title="Мы подобрали по вашим заказам"
          action="В личный кабинет"
          href="/account"
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {recommended.map((p, i) => (
            <Reveal key={p.slug} delay={i * 40}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- PROMOTIONS ---------------- */}
      <section className="mx-auto max-w-[1340px] px-4 pb-20 sm:px-6">
        <SectionHead eyebrow="Выгодно" title="Акции" action="Все акции" href="/promotions" />
        <div className="grid gap-4 md:grid-cols-3">
          {featuredPromos.map((promo, i) => {
            const p = products.find((x) => x.slug === promo.productSlug)!;
            return (
              <Reveal key={promo.id} delay={i * 70}>
                <Link
                  href={`/promotions/${promo.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={promo.title}
                      fill
                      sizes="(max-width:768px) 100vw, 420px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-cream backdrop-blur">
                      {promo.kindLabel}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display text-[21px] leading-tight">{promo.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-3">
                      {promo.subtitle}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-5 text-[12.5px] text-ink-4">
                      <Clock size={13} /> {promo.until}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- BRANCHES + APP ---------------- */}
      <section className="mx-auto max-w-[1340px] px-4 pb-20 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="min-w-0 rounded-3xl bg-white p-5 sm:p-9">
            <SectionHead
              eyebrow="Найти Chocolate"
              title="Ближайшие филиалы"
              action="Все филиалы"
              href="/branches"
              className="mb-6"
            />
            <div className="space-y-2.5">
              {nearest.map((b) => (
                <Link
                  key={b.slug}
                  href={`/branches?branch=${b.slug}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-line px-4 py-4 transition hover:border-ink/25 sm:px-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold">{b.name}</span>
                      {b.flagship && (
                        <span className="rounded-full bg-caramel/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-caramel">
                          Флагман
                        </span>
                      )}
                    </div>
                    <div className="mt-1 truncate text-[13px] text-ink-3">{b.address}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="tabular text-[13px] font-medium">{b.hours}</div>
                    <div className="text-[12px] text-sage">Открыто</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/app"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-caramel p-8 text-white"
          >
            <div>
              <div className="eyebrow text-white/60">Мобильное приложение</div>
              <h3 className="display mt-4 text-[28px] leading-tight">
                Весь Chocolate
                <br />в вашем телефоне
              </h3>
              <ul className="mt-6 space-y-2.5 text-[13.5px] text-white/80">
                <li className="flex items-center gap-2">
                  <RotateCcw size={14} /> Повтор заказа в один тап
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={14} /> Баллы и награды клуба
                </li>
                <li className="flex items-center gap-2">
                  <Smartphone size={14} /> Статус заказа в реальном времени
                </li>
              </ul>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[13px] font-semibold">
              Открыть демо приложения
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
