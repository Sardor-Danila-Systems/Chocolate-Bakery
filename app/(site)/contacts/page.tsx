import Link from "next/link";
import { Phone, Send, MapPin, Clock, Camera, Briefcase } from "lucide-react";
import { branches } from "@/lib/catalog";
import { Button } from "@/components/ui/kit";

export const metadata = {
  title: "Контакты — Chocolate",
  description: "Call-центр, филиалы и соцсети Chocolate в Самарканде.",
};

export default function ContactsPage() {
  const flagship = branches.find((b) => b.flagship)!;

  return (
    <section className="mx-auto max-w-[1340px] px-4 pb-20 pt-10 sm:px-6">
      <div className="eyebrow text-caramel">Связаться</div>
      <h1 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">Контакты</h1>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl bg-ink p-8 text-cream sm:p-10">
          <div className="eyebrow text-cream/45">Call-центр</div>
          <a
            href="tel:+998782100080"
            className="display mt-4 block text-[clamp(1.9rem,3.6vw,2.6rem)]"
          >
            +998 78 210 00 80
          </a>
          <p className="mt-4 text-[14.5px] text-cream/55">
            Принимаем заказы на торты, отвечаем по доставке и Chocolate Club.
          </p>
          <div className="mt-8 flex items-center gap-2 border-t border-cream/12 pt-6 text-[13.5px] text-cream/55">
            <Clock size={15} /> Ежедневно 08:00 – 23:00
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href="https://t.me/choco_sweet"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-[13.5px] font-medium transition hover:bg-cream/10"
            >
              <Send size={15} /> Telegram
            </a>
            <a
              href="https://www.instagram.com/chocolate_sweethome/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-[13.5px] font-medium transition hover:bg-cream/10"
            >
              <Camera size={15} /> Instagram
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-line bg-white p-7">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-2">
                <MapPin size={17} />
              </span>
              <span className="text-[15px] font-semibold">Флагман и производство</span>
            </div>
            <p className="mt-4 text-[15px]">{flagship.address}</p>
            <p className="mt-1 text-[13.5px] text-ink-3">
              Самарканд · {flagship.hours}
            </p>
            <Link
              href="/branches"
              className="mt-5 inline-block border-b border-ink/25 pb-0.5 text-[13.5px] font-medium transition hover:border-ink"
            >
              Все 9 филиалов
            </Link>
          </div>

          <div className="rounded-3xl border border-line bg-white p-7">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-2">
                <Briefcase size={17} />
              </span>
              <span className="text-[15px] font-semibold">Сотрудничество</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-3">
              Корпоративные заказы, кейтеринг и подарочные наборы для компаний —
              обсуждаем по телефону call-центра.
            </p>
            <p className="mt-4 text-[13px] text-ink-4">MChJ «AGRO PLUS»</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { icon: <Phone size={18} />, title: "Заказ по телефону", text: "Торты на заказ принимаем за 24 часа до даты" },
          { icon: <Send size={18} />, title: "Поддержка в Telegram", text: "Отвечаем по статусу заказа и баллам клуба" },
          { icon: <MapPin size={18} />, title: "Доставка", text: "По Самарканду, 45–60 минут, от 150 000 бесплатно" },
        ].map((c) => (
          <div key={c.title} className="rounded-3xl bg-white p-6">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-caramel/12 text-caramel">
              {c.icon}
            </span>
            <h3 className="mt-4 text-[15.5px] font-semibold">{c.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-3">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2.5">
        <Button href="/catalog" size="lg">
          Сделать заказ
        </Button>
        <Button href="/branches" variant="outline" size="lg">
          Найти ближайший филиал
        </Button>
      </div>
    </section>
  );
}
