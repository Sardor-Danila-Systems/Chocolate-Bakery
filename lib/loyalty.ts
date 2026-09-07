/* ============================================================
   CHOCOLATE CLUB — loyalty mechanics
   Own mechanic, built on the brand's own language (cocoa craft),
   not a copy of a competitor programme.

   Currency:  Chocolate Points.  1 балл = 100 сум при оплате.
   Earning:   cashback in points, rate depends on tier.
   Tier:      by lifetime earned points, so status is earned, not bought.
   ============================================================ */

export type TierId = "cocoa" | "praline" | "truffle";

export type Tier = {
  id: TierId;
  name: string;
  nameRu: string;
  from: number;
  cashback: number;
  tone: string;
  story: string;
  benefits: string[];
};

export const POINT_VALUE = 100; // 1 балл = 100 сум

export const TIERS: Tier[] = [
  {
    id: "cocoa",
    name: "COCOA",
    nameRu: "Какао",
    from: 0,
    cashback: 5,
    tone: "#b8813f",
    story: "Начало пути — сырой какао-боб.",
    benefits: [
      "5% кэшбэка баллами с каждой покупки",
      "Подарок в день рождения",
      "Доступ к закрытым акциям клуба",
      "История заказов и повтор в один тап",
    ],
  },
  {
    id: "praline",
    name: "PRALINE",
    nameRu: "Пралине",
    from: 500,
    cashback: 7,
    tone: "#a8233e",
    story: "Средний обжиг — вкус, который уже узнают.",
    benefits: [
      "7% кэшбэка баллами",
      "Бесплатная доставка от 150 000 сум",
      "Ранний доступ к новинкам за 24 часа",
      "Десерт в подарок в день рождения",
      "Двойные баллы в день рождения",
    ],
  },
  {
    id: "truffle",
    name: "TRUFFLE",
    nameRu: "Трюфель",
    from: 2000,
    cashback: 10,
    tone: "#1c1310",
    story: "Самый тёмный и насыщенный уровень.",
    benefits: [
      "10% кэшбэка баллами",
      "Бесплатная доставка всегда",
      "Персональный кондитер для тортов на заказ",
      "Приглашения на закрытые дегустации",
      "Торт в подарок в день рождения",
      "Приоритетная сборка заказа в филиале",
    ],
  },
];

export const tierById = (id: TierId) => TIERS.find((t) => t.id === id)!;

export function tierForPoints(lifetime: number): Tier {
  let current = TIERS[0];
  for (const t of TIERS) if (lifetime >= t.from) current = t;
  return current;
}

export function nextTier(lifetime: number): Tier | null {
  return TIERS.find((t) => t.from > lifetime) ?? null;
}

export function tierProgress(lifetime: number) {
  const current = tierForPoints(lifetime);
  const next = nextTier(lifetime);
  if (!next) return { current, next: null, pct: 100, remaining: 0 };
  const span = next.from - current.from;
  const done = lifetime - current.from;
  return {
    current,
    next,
    pct: Math.max(4, Math.min(100, Math.round((done / span) * 100))),
    remaining: next.from - lifetime,
  };
}

/** Points earned for an order total, at a given tier. */
export function pointsFor(total: number, tier: Tier) {
  return Math.round((total * tier.cashback) / 100 / POINT_VALUE);
}

export type Reward = {
  id: string;
  title: string;
  desc: string;
  cost: number;
  image: string;
  tier?: TierId;
};

export const REWARDS: Reward[] = [
  {
    id: "r-coffee",
    title: "Фирменный капучино",
    desc: "Любой напиток на основе эспрессо из собственной обжарки",
    cost: 150,
    image: "/products/",
  },
  {
    id: "r-mini",
    title: "Мини-десерт на выбор",
    desc: "Один десерт из витрины мини-форматов",
    cost: 250,
    image: "/products/",
  },
  {
    id: "r-delivery",
    title: "Бесплатная доставка",
    desc: "На один заказ по Самарканду",
    cost: 300,
    image: "/products/",
  },
  {
    id: "r-baklava",
    title: "Пахлава 300 г",
    desc: "Коробка ассорти из восточных сладостей",
    cost: 450,
    image: "/products/",
  },
  {
    id: "r-cheesecake",
    title: "Чизкейк целиком",
    desc: "Классический чизкейк на компанию",
    cost: 700,
    image: "/products/",
    tier: "praline",
  },
  {
    id: "r-cake",
    title: "Мини-торт в подарок",
    desc: "Любой мини-торт из витрины",
    cost: 1200,
    image: "/products/",
    tier: "praline",
  },
  {
    id: "r-tasting",
    title: "Дегустация для двоих",
    desc: "Закрытая дегустация новой коллекции на Беруни",
    cost: 1800,
    image: "/products/",
    tier: "truffle",
  },
];

export type PointEvent = {
  id: string;
  date: string;
  title: string;
  detail: string;
  points: number; // + earned, − redeemed
  kind: "earn" | "redeem" | "bonus";
};

export const POINT_HISTORY: PointEvent[] = [
  {
    id: "h1",
    date: "2 сентября",
    title: "Заказ №10482",
    detail: "Доставка · Беруни",
    points: 128,
    kind: "earn",
  },
  {
    id: "h2",
    date: "28 августа",
    title: "Списание баллов",
    detail: "Фирменный капучино",
    points: -150,
    kind: "redeem",
  },
  {
    id: "h3",
    date: "24 августа",
    title: "Заказ №10376",
    detail: "Самовывоз · Фестиваль",
    points: 96,
    kind: "earn",
  },
  {
    id: "h4",
    date: "19 августа",
    title: "Двойные баллы",
    detail: "Акция клуба: выходные ×2",
    points: 84,
    kind: "bonus",
  },
  {
    id: "h5",
    date: "11 августа",
    title: "Заказ №10218",
    detail: "Доставка · Узбекистанская",
    points: 212,
    kind: "earn",
  },
  {
    id: "h6",
    date: "3 августа",
    title: "Приглашённый друг",
    detail: "Камола оформила первый заказ",
    points: 100,
    kind: "bonus",
  },
  {
    id: "h7",
    date: "27 июля",
    title: "Заказ №10094",
    detail: "Торт на заказ · Беруни",
    points: 350,
    kind: "earn",
  },
];
