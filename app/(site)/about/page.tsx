import Image from "next/image";
import { products } from "@/lib/catalog";
import { Button, Reveal } from "@/components/ui/kit";

export const metadata = {
  title: "О бренде — Chocolate",
  description:
    "Chocolate — кондитерская и пекарня в Самарканде. Праздник, когда ты захочешь.",
};

const CHAPTERS = [
  {
    year: "2018",
    title: "Одна витрина на Беруни",
    text: "Начали с небольшой кондитерской: медовик, наполеон и кофе навынос. Тесто замешивали ночью, чтобы к семи утра витрина была полной.",
  },
  {
    year: "2021",
    title: "Своя пекарня и обжарка",
    text: "Открыли собственное производство и начали обжаривать кофе. С этого момента всё, что стоит на витрине, сделано нашими руками.",
  },
  {
    year: "2024",
    title: "Девять точек по городу",
    text: "От Регистана до Family Park — Chocolate стал местом, куда заходят по дороге домой, а не только по праздникам.",
  },
  {
    year: "2026",
    title: "Chocolate Club",
    text: "Запускаем программу лояльности и приложение: теперь кондитерская помнит ваш любимый торт и возвращает часть покупки баллами.",
  },
];

const VALUES = [
  {
    title: "Печём каждый день",
    text: "Ничего вчерашнего. То, что не продали до вечера, уходит по «Вечернему часу» со скидкой — но не остаётся на завтра.",
  },
  {
    title: "Локальные продукты",
    text: "Ягоды и фрукты — с самаркандских рынков в сезон. Поэтому наше меню меняется вместе с городом.",
  },
  {
    title: "Без повода",
    text: "Чтобы порадовать себя сладким, не нужен особый повод. Это и есть вся философия Chocolate.",
  },
];

export default function AboutPage() {
  const hero = products.find((p) => p.slug === "tort-klassik-kvadratnyy-mini")!;
  const gallery = [
    products.find((p) => p.slug === "profitroli-v-up")!,
    products.find((p) => p.slug === "pahlava-havuch-dilim")!,
    products.find((p) => p.slug === "kofe-raf")!,
    products.find((p) => p.slug === "makarons-eksklyuziv")!,
  ];

  return (
    <>
      {/* hero */}
      <section className="mx-auto max-w-[1340px] px-4 pt-10 sm:px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="eyebrow text-caramel">О бренде</div>
            <h1 className="display mt-5 text-[clamp(2.4rem,5.6vw,4.2rem)] leading-[1.03]">
              Праздник,
              <br />
              <span className="display-italic">когда ты захочешь</span>
            </h1>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-ink-2">
              Chocolate — кондитерская и пекарня в Самарканде. Мы начали в 2018 году
              с одной витрины и простой мысли: чтобы порадовать себя сладким, не
              нужен особый повод.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white">
            <Image
              src={hero.image}
              alt="Chocolate"
              fill
              sizes="(max-width:1024px) 100vw, 600px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* numbers */}
      <section className="mx-auto max-w-[1340px] px-4 py-16 sm:px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
          {[
            ["2018", "год основания"],
            ["9", "филиалов в Самарканде"],
            ["254", "позиции в витрине"],
            ["8 420", "участников клуба"],
          ].map(([v, l]) => (
            <div key={l} className="bg-cream px-7 py-8">
              <div className="tabular display text-[clamp(1.9rem,3.4vw,2.6rem)]">{v}</div>
              <div className="mt-2 text-[13px] text-ink-3">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* story */}
      <section className="border-y border-line bg-cream-2/60 py-16">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[340px_1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="eyebrow text-caramel">История</div>
              <h2 className="display mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)]">
                Как Chocolate стал частью города
              </h2>
            </div>
            <div>
              {CHAPTERS.map((c, i) => (
                <Reveal key={c.year} delay={i * 80}>
                  <div className="grid gap-6 border-b border-line py-8 first:pt-0 sm:grid-cols-[110px_1fr]">
                    <div className="tabular display text-[26px] text-caramel">
                      {c.year}
                    </div>
                    <div>
                      <h3 className="display text-[21px]">{c.title}</h3>
                      <p className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-ink-3">
                        {c.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-[1340px] px-4 py-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-3xl bg-white p-8">
                <div className="tabular display text-[38px] text-line">
                  0{i + 1}
                </div>
                <h3 className="display mt-4 text-[21px]">{v.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-3">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* gallery */}
      <section className="mx-auto max-w-[1340px] px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {gallery.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60} className={i % 2 === 1 ? "lg:mt-10" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:1024px) 50vw, 320px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1340px] px-4 pb-20 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-16 text-center text-cream">
          <h2 className="display max-w-lg text-[clamp(1.9rem,4vw,2.9rem)]">
            Заходите за десертом — повод найдётся
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Button href="/catalog" variant="light" size="lg">
              Смотреть каталог
            </Button>
            <Button href="/branches" variant="onDark" size="lg">
              Найти филиал
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
