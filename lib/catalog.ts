import raw from "./data/catalog.json";

export type Badge = "hit" | "new" | "season";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  price: number;
  image: string;
  category: string;
  weight?: string;
  serves?: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  rating: number;
  reviews: number;
  badges: Badge[];
};

export type Category = {
  slug: string;
  name: string;
  nameEn: string;
  tagline: string;
  count: number;
  image: string;
};

export type Branch = {
  id: string;
  slug: string;
  name: string;
  address: string;
  district: string;
  lat: number;
  lng: number;
  hours: string;
  phone: string;
  services: string[];
  flagship: boolean;
};

const data = raw as unknown as {
  products: Product[];
  categories: Category[];
  branches: Branch[];
};

export const products: Product[] = data.products;
export const categories: Category[] = data.categories;
export const branches: Branch[] = data.branches;

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productById = (id: string) => products.find((p) => p.id === id);

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const branchBySlug = (slug: string) =>
  branches.find((b) => b.slug === slug);

export const byCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const withBadge = (badge: Badge, limit?: number) => {
  const list = products.filter((p) => p.badges.includes(badge));
  return typeof limit === "number" ? list.slice(0, limit) : list;
};

/** Deterministic pick so server and client render the same thing. */
export const pick = (slugs: string[]) =>
  slugs.map((s) => productBySlug(s)).filter(Boolean) as Product[];

export const related = (product: Product, limit = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q),
    )
    .slice(0, 12);
};

/** 350000 -> "350 000" */
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(n));

export const formatSum = (n: number) => `${formatPrice(n)} сум`;

export const BADGE_LABEL: Record<Badge, string> = {
  hit: "Хит",
  new: "Новинка",
  season: "Сезон",
};
