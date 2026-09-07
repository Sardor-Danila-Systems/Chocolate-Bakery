import Link from "next/link";
import { Send, Phone, MapPin, Camera } from "lucide-react";
import { categories, branches } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-ink text-cream">
      <div className="mx-auto max-w-[1340px] px-5 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="display text-[30px]">Chocolate</div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-cream/55">
              Кондитерская и пекарня в Самарканде. Печём каждый день с 2018 года —
              торты, десерты, выпечка и кофе собственной обжарки.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href="https://www.instagram.com/chocolate_sweethome/"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:border-cream/60"
                aria-label="Instagram"
              >
                <Camera size={17} />
              </a>
              <a
                href="https://t.me/choco_sweet"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:border-cream/60"
                aria-label="Telegram"
              >
                <Send size={17} />
              </a>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-4 text-cream/40">Каталог</div>
            <ul className="space-y-2.5 text-[14px] text-cream/70">
              {categories.slice(0, 7).map((c) => (
                <li key={c.slug}>
                  <Link href={`/catalog/${c.slug}`} className="transition hover:text-cream">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4 text-cream/40">Компания</div>
            <ul className="space-y-2.5 text-[14px] text-cream/70">
              {[
                ["/about", "О бренде"],
                ["/loyalty", "Chocolate Club"],
                ["/promotions", "Акции"],
                ["/branches", "Филиалы"],
                ["/app", "Приложение"],
                ["/contacts", "Контакты"],
                ["/admin", "Панель управления"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-cream">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4 text-cream/40">Контакты</div>
            <a
              href="tel:+998782100080"
              className="flex items-center gap-2 text-[19px] font-semibold"
            >
              <Phone size={17} /> +998 78 210 00 80
            </a>
            <p className="mt-4 flex items-start gap-2 text-[13.5px] leading-relaxed text-cream/55">
              <MapPin size={15} className="mt-0.5 shrink-0" />
              Самарканд, улица Абу Рейхана Беруни, 27/1 — флагман
            </p>
            <p className="mt-3 text-[13.5px] text-cream/55">
              {branches.length} филиалов · доставка 08:00 – 23:00
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-cream/10 pt-6 text-[12.5px] text-cream/40 sm:flex-row">
          <span>© 2026 Chocolate · MChJ «AGRO PLUS»</span>
          <span>Демонстрационный концепт digital-экосистемы</span>
        </div>
      </div>
    </footer>
  );
}
