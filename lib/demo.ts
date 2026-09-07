import { branches, products, type Product } from "./catalog";

/* ============================================================
   DEMO DATA — everything here is mock, wired to the real catalog.
   ============================================================ */

export const USER = {
  name: "Сардор",
  fullName: "Сардор Джамолов",
  phone: "+998 90 123 45 67",
  email: "sardor@example.com",
  birthday: "16 сентября",
  daysToBirthday: 9,
  memberSince: "март 2024",
  points: 1240,
  lifetimePoints: 1240,
  ordersCount: 27,
  favoriteBranch: "beruni",
  avatarInitials: "СД",
};

export const ADDRESSES = [
  {
    id: "a1",
    label: "Дом",
    address: "Университетский бульвар, 14, кв. 32",
    note: "Домофон 32, 4 этаж",
    isDefault: true,
  },
  {
    id: "a2",
    label: "Работа",
    address: "улица Мирзо Улугбека, 71, офис 305",
    note: "Бизнес-центр, ресепшн",
    isDefault: false,
  },
];

export const PAYMENT_METHODS = [
  { id: "p1", type: "uzcard", label: "UZCARD", mask: "•••• 4419", isDefault: true },
  { id: "p2", type: "humo", label: "HUMO", mask: "•••• 8827", isDefault: false },
  { id: "p3", type: "cash", label: "Наличными", mask: "при получении", isDefault: false },
];

export type DemoOrderItem = { slug: string; qty: number };
export type DemoOrder = {
  id: string;
  number: string;
  date: string;
  dateFull: string;
  status: "preparing" | "ontheway" | "ready" | "done" | "cancelled";
  statusLabel: string;
  method: "delivery" | "pickup";
  branch: string;
  total: number;
  points: number;
  items: DemoOrderItem[];
  eta?: string;
  progress?: number;
};

const priceOf = (slug: string) =>
  products.find((p) => p.slug === slug)?.price ?? 0;

const sum = (items: DemoOrderItem[]) =>
  items.reduce((acc, i) => acc + priceOf(i.slug) * i.qty, 0);

const mkOrder = (o: Omit<DemoOrder, "total" | "points">): DemoOrder => {
  const total = sum(o.items);
  return { ...o, total, points: Math.round((total * 0.07) / 100) };
};

export const ORDERS: DemoOrder[] = [
  mkOrder({
    id: "o1",
    number: "10482",
    date: "сегодня, 14:20",
    dateFull: "7 сентября 2026, 14:20",
    status: "preparing",
    statusLabel: "Готовится",
    method: "delivery",
    branch: "beruni",
    eta: "15:10 – 15:40",
    progress: 45,
    items: [
      { slug: "tort-dolche-vita-2", qty: 1 },
      { slug: "kofe-raf", qty: 2 },
    ],
  }),
  mkOrder({
    id: "o2",
    number: "10376",
    date: "28 августа",
    dateFull: "28 августа 2026, 18:05",
    status: "done",
    statusLabel: "Получен",
    method: "pickup",
    branch: "festival",
    items: [
      { slug: "chizkeyk-san-sebastyan", qty: 2 },
      { slug: "kapuchino-dvoynoy", qty: 2 },
      { slug: "makarons-eksklyuziv", qty: 1 },
    ],
  }),
  mkOrder({
    id: "o3",
    number: "10218",
    date: "11 августа",
    dateFull: "11 августа 2026, 12:40",
    status: "done",
    statusLabel: "Получен",
    method: "delivery",
    branch: "uzbekistanskaya",
    items: [
      { slug: "tort-chocolate-fruits-1", qty: 1 },
      { slug: "pahlava-havuch-dilim", qty: 1 },
    ],
  }),
  mkOrder({
    id: "o4",
    number: "10094",
    date: "27 июля",
    dateFull: "27 июля 2026, 16:15",
    status: "done",
    statusLabel: "Получен",
    method: "pickup",
    branch: "beruni",
    items: [
      { slug: "tort-klassik-kvadratnyy-mini", qty: 1 },
      { slug: "mohito-klassika", qty: 3 },
    ],
  }),
  mkOrder({
    id: "o5",
    number: "9968",
    date: "14 июля",
    dateFull: "14 июля 2026, 09:30",
    status: "done",
    statusLabel: "Получен",
    method: "pickup",
    branch: "beruni-cafe",
    items: [
      { slug: "sinnabon-s-malinoy", qty: 2 },
      { slug: "kofe-kapuchino", qty: 1 },
    ],
  }),
];

export const FAVORITE_SLUGS = [
  "tort-dolche-vita-2",
  "chizkeyk-san-sebastyan",
  "kofe-raf",
  "pahlava-havuch-dilim",
  "makarons-eksklyuziv",
  "bento",
];

export const RECOMMENDED_SLUGS = [
  "trayfl-sredniy",
  "desert-dubay",
  "chizkeyk-lotus",
  "pirozhnoe-klubnika-v-shokolade",
  "mini-tort-malinovyy",
  "bambl-ays-kofe",
];

export const POPULAR_SLUGS = [
  "tort-klassik-kvadratnyy-mini",
  "trayfl-sredniy",
  "desert-dubay",
  "chizkeyk-san-sebastyan",
  "bento",
  "profitroli-v-up",
  "kofe-raf",
  "pahlava-havuch-dilim",
];

export const SEASONAL_SLUGS = [
  "desert-s-klubnikoy",
  "pirog-syrnyy-yagodnyy-s-mindalem",
  "mini-tort-malinovyy",
  "pirozhnoe-mango-muss",
  "mohito-klubnichnyy",
  "chizkeyk-yagodnyy-tvorozhnyy",
];

export type Promotion = {
  id: string;
  slug: string;
  kind: "season" | "club" | "combo" | "birthday" | "limited" | "personal" | "weekend";
  kindLabel: string;
  title: string;
  subtitle: string;
  detail: string;
  terms: string[];
  until: string;
  productSlug: string;
  accent: "wine" | "caramel" | "sage" | "ink";
  personal?: boolean;
  code?: string;
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "pr1",
    slug: "yagodnyy-sentyabr",
    kind: "season",
    kindLabel: "Сезон",
    title: "Ягодный сентябрь",
    subtitle: "Сырный пирог с ягодами и миндалём — на последнем урожае",
    detail:
      "Пока сезон не закончился — печём ягодные пироги каждое утро малыми партиями. В сентябре ко второму кусочку дарим кофе.",
    terms: [
      "Действует во всех филиалах до 30 сентября",
      "Второй кофе — тот же или дешевле",
      "Суммируется с баллами Chocolate Club",
    ],
    until: "до 30 сентября",
    productSlug: "pirog-syrnyy-yagodnyy-s-mindalem",
    accent: "caramel",
  },
  {
    id: "pr2",
    slug: "dvoynye-bally",
    kind: "club",
    kindLabel: "Chocolate Club",
    title: "Двойные баллы по выходным",
    subtitle: "Суббота и воскресенье — ×2 к начислению",
    detail:
      "Каждые выходные участники клуба получают вдвое больше баллов за любой заказ — на сайте, в приложении и в филиале.",
    terms: [
      "Только для участников Chocolate Club",
      "Начисление удваивается автоматически",
      "Каждую субботу и воскресенье",
    ],
    until: "постоянно",
    productSlug: "trayfl-sredniy",
    accent: "wine",
  },
  {
    id: "pr3",
    slug: "kofe-desert",
    kind: "combo",
    kindLabel: "Комбо",
    title: "Кофе + десерт",
    subtitle: "Утренний сет до 11:00 за 45 000 сум",
    detail:
      "Капучино из собственной обжарки и любой мини-десерт из витрины. Работает только на завтраках — до 11 утра.",
    terms: ["Ежедневно с 07:00 до 11:00", "В кафе Беруни и Фестиваль", "Экономия до 22 000 сум"],
    until: "постоянно",
    productSlug: "kofe-kapuchino",
    accent: "ink",
  },
  {
    id: "pr4",
    slug: "den-rozhdeniya",
    kind: "birthday",
    kindLabel: "День рождения",
    title: "Подарок в ваш день",
    subtitle: "Десерт за наш счёт всю неделю рождения",
    detail:
      "Участникам клуба дарим десерт, а уровню Трюфель — целый торт. Ничего активировать не нужно: подарок появится в приложении сам.",
    terms: [
      "Неделя до и после даты рождения",
      "Cocoa — мини-десерт, Praline — десерт, Truffle — мини-торт",
      "Автоматически в разделе «Мои награды»",
    ],
    until: "круглый год",
    productSlug: "mini-tort-vishnevyy",
    accent: "wine",
  },
  {
    id: "pr5",
    slug: "dubay-limited",
    kind: "limited",
    kindLabel: "Лимитированное",
    title: "Дубайский шоколад",
    subtitle: "Ограниченная партия — 40 плиток в день",
    detail:
      "Фисташка, кадаиф и молочный шоколад. Участники клуба уровня Praline и выше видят позицию на 24 часа раньше остальных.",
    terms: ["40 плиток в день", "Ранний доступ для Praline и Truffle", "Только филиал Беруни"],
    until: "пока есть в наличии",
    productSlug: "shokoladnaya-plitka-dubay-big",
    accent: "ink",
  },
  {
    id: "pr6",
    slug: "vash-lyubimyy-tort",
    kind: "personal",
    kindLabel: "Персонально для вас",
    title: "−20% на ваш любимый торт",
    subtitle: "Вы заказывали Дольче вита 3 раза — держите скидку",
    detail:
      "Мы заметили, что вы чаще всего берёте этот торт. Скидка действует до конца недели, промокод уже привязан к аккаунту.",
    terms: ["Только для вашего аккаунта", "До 14 сентября", "Промокод применяется автоматически"],
    until: "до 14 сентября",
    productSlug: "tort-dolche-vita-2",
    accent: "wine",
    personal: true,
    code: "SARDOR20",
  },
  {
    id: "pr7",
    slug: "vecherniy-chas",
    kind: "weekend",
    kindLabel: "Счастливые часы",
    title: "Вечерний час",
    subtitle: "−30% на выпечку после 21:00",
    detail:
      "Всё, что испекли утром, вечером уходит со скидкой. Свежесть та же, цена ниже — приезжайте после девяти.",
    terms: ["Ежедневно с 21:00 до закрытия", "На сдобную и слоёную выпечку", "Только самовывоз"],
    until: "постоянно",
    productSlug: "sinnabon-iz-sloennogo-testa",
    accent: "sage",
  },
];

export const promotionBySlug = (slug: string) =>
  PROMOTIONS.find((p) => p.slug === slug);

export const PROMO_CODES: Record<string, { off: number; label: string }> = {
  SARDOR20: { off: 20, label: "Персональная скидка −20%" },
  CLUB10: { off: 10, label: "Скидка клуба −10%" },
  SWEET15: { off: 15, label: "Сезонная скидка −15%" },
};

export const DELIVERY_FEE = 15000;
export const FREE_DELIVERY_FROM = 150000;

export const TIME_SLOTS = [
  "Как можно скорее",
  "15:00 – 15:30",
  "15:30 – 16:00",
  "16:00 – 16:30",
  "17:00 – 17:30",
  "18:00 – 18:30",
  "19:00 – 19:30",
  "20:00 – 20:30",
];

export const branchName = (slug: string) =>
  branches.find((b) => b.slug === slug)?.name ?? slug;

export const orderItems = (order: DemoOrder): Array<{ product: Product; qty: number }> =>
  order.items
    .map((i) => ({
      product: products.find((p) => p.slug === i.slug)!,
      qty: i.qty,
    }))
    .filter((i) => i.product);

/* ---------- admin demo numbers ---------- */

export const ADMIN = {
  today: {
    revenue: 14_240_000,
    revenueDelta: 12.4,
    orders: 128,
    ordersDelta: 8.1,
    newCustomers: 23,
    newCustomersDelta: 15.2,
    clubShare: 61,
    clubShareDelta: 4.3,
    avgCheck: 111_250,
    avgCheckDelta: 5.6,
  },
  revenueSeries: [
    { d: "Пн", v: 9.8 },
    { d: "Вт", v: 10.4 },
    { d: "Ср", v: 11.2 },
    { d: "Чт", v: 12.6 },
    { d: "Пт", v: 15.1 },
    { d: "Сб", v: 18.4 },
    { d: "Вс", v: 14.2 },
  ],
  channelSplit: [
    { label: "Приложение", value: 44, tone: "#a8233e" },
    { label: "Сайт", value: 31, tone: "#b8813f" },
    { label: "Филиалы", value: 25, tone: "#7c8a6b" },
  ],
  topProducts: [
    { slug: "tort-dolche-vita-2", sold: 42 },
    { slug: "trayfl-sredniy", sold: 38 },
    { slug: "chizkeyk-san-sebastyan", sold: 31 },
    { slug: "kofe-raf", sold: 28 },
    { slug: "pahlava-havuch-dilim", sold: 24 },
  ],
  recentOrders: [
    { id: "10482", name: "Сардор Д.", branch: "Беруни", total: 486_000, status: "Готовится", method: "Доставка" },
    { id: "10481", name: "Камола Т.", branch: "Фестиваль", total: 128_000, status: "Собран", method: "Самовывоз" },
    { id: "10480", name: "Азиз Р.", branch: "Саттепо", total: 92_000, status: "В пути", method: "Доставка" },
    { id: "10479", name: "Дилноза К.", branch: "Беруни", total: 390_000, status: "Получен", method: "Самовывоз" },
    { id: "10478", name: "Жасур М.", branch: "Узбекистанская", total: 64_000, status: "Получен", method: "Доставка" },
  ],
  loyaltyStats: {
    members: 8_420,
    membersDelta: 6.8,
    activeMonth: 3_180,
    pointsIssued: 1_284_000,
    pointsRedeemed: 612_000,
    tiers: [
      { name: "COCOA", share: 62, count: 5220 },
      { name: "PRALINE", share: 29, count: 2442 },
      { name: "TRUFFLE", share: 9, count: 758 },
    ],
    repeatRate: 47,
  },
  branchPerformance: [
    { name: "Беруни", revenue: 4.2, orders: 38, share: 100 },
    { name: "Фестиваль", revenue: 2.6, orders: 24, share: 62 },
    { name: "Узбекистанская", revenue: 2.1, orders: 19, share: 50 },
    { name: "Саттепо", revenue: 1.8, orders: 17, share: 43 },
    { name: "Family Park", revenue: 1.5, orders: 14, share: 36 },
    { name: "Кооперативный", revenue: 1.1, orders: 10, share: 26 },
  ],
};
