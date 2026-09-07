"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./catalog";
import {
  FAVORITE_SLUGS,
  ORDERS,
  USER,
  type DemoOrder,
  DELIVERY_FEE,
  FREE_DELIVERY_FROM,
  PROMO_CODES,
} from "./demo";
import { pointsFor, tierForPoints } from "./loyalty";

export type CartLine = { slug: string; qty: number; variant?: string };

type State = {
  cart: CartLine[];
  favorites: string[];
  points: number;
  lifetimePoints: number;
  orders: DemoOrder[];
  promoCode: string | null;
  usePoints: boolean;
  hydrated: boolean;
};

type Action =
  | { type: "hydrate"; state: Partial<State> }
  | { type: "add"; slug: string; qty?: number; variant?: string }
  | { type: "setQty"; slug: string; qty: number }
  | { type: "remove"; slug: string }
  | { type: "clear" }
  | { type: "toggleFav"; slug: string }
  | { type: "promo"; code: string | null }
  | { type: "usePoints"; on: boolean }
  | { type: "placeOrder"; order: DemoOrder; spentPoints: number }
  | { type: "redeem"; cost: number };

const initial: State = {
  cart: [],
  favorites: FAVORITE_SLUGS,
  points: USER.points,
  lifetimePoints: USER.lifetimePoints,
  orders: ORDERS,
  promoCode: null,
  usePoints: false,
  hydrated: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { ...state, ...action.state, hydrated: true };
    case "add": {
      const qty = action.qty ?? 1;
      const found = state.cart.find(
        (l) => l.slug === action.slug && l.variant === action.variant,
      );
      return {
        ...state,
        cart: found
          ? state.cart.map((l) =>
              l === found ? { ...l, qty: l.qty + qty } : l,
            )
          : [...state.cart, { slug: action.slug, qty, variant: action.variant }],
      };
    }
    case "setQty":
      return {
        ...state,
        cart:
          action.qty <= 0
            ? state.cart.filter((l) => l.slug !== action.slug)
            : state.cart.map((l) =>
                l.slug === action.slug ? { ...l, qty: action.qty } : l,
              ),
      };
    case "remove":
      return { ...state, cart: state.cart.filter((l) => l.slug !== action.slug) };
    case "clear":
      return { ...state, cart: [], promoCode: null, usePoints: false };
    case "toggleFav":
      return {
        ...state,
        favorites: state.favorites.includes(action.slug)
          ? state.favorites.filter((s) => s !== action.slug)
          : [action.slug, ...state.favorites],
      };
    case "promo":
      return { ...state, promoCode: action.code };
    case "usePoints":
      return { ...state, usePoints: action.on };
    case "placeOrder":
      return {
        ...state,
        cart: [],
        promoCode: null,
        usePoints: false,
        orders: [action.order, ...state.orders],
        points: state.points - action.spentPoints + action.order.points,
        lifetimePoints: state.lifetimePoints + action.order.points,
      };
    case "redeem":
      return { ...state, points: Math.max(0, state.points - action.cost) };
    default:
      return state;
  }
}

type Toast = { id: number; title: string; detail?: string; image?: string };

type Ctx = {
  state: State;
  dispatch: React.Dispatch<Action>;
  lines: Array<{ product: Product; qty: number }>;
  count: number;
  subtotal: number;
  discount: number;
  pointsDiscount: number;
  deliveryFee: (method: "delivery" | "pickup") => number;
  total: (method: "delivery" | "pickup") => number;
  earnPoints: (method: "delivery" | "pickup") => number;
  add: (slug: string, qty?: number) => void;
  isFav: (slug: string) => boolean;
  toggleFav: (slug: string) => void;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

const StoreCtx = createContext<Ctx | null>(null);

const KEY = "chocolate-demo-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({
          type: "hydrate",
          state: {
            cart: parsed.cart ?? [],
            favorites: parsed.favorites ?? FAVORITE_SLUGS,
            points: parsed.points ?? USER.points,
            lifetimePoints: parsed.lifetimePoints ?? USER.lifetimePoints,
            orders: parsed.orders ?? ORDERS,
          },
        });
      } else {
        dispatch({ type: "hydrate", state: {} });
      }
    } catch {
      dispatch({ type: "hydrate", state: {} });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          cart: state.cart,
          favorites: state.favorites,
          points: state.points,
          lifetimePoints: state.lifetimePoints,
          orders: state.orders,
        }),
      );
    } catch {
      /* demo only */
    }
  }, [state]);

  const lines = useMemo(
    () =>
      state.cart
        .map((l) => ({
          product: products.find((p) => p.slug === l.slug)!,
          qty: l.qty,
        }))
        .filter((l) => l.product),
    [state.cart],
  );

  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + l.product.price * l.qty, 0);

  const discount = useMemo(() => {
    if (!state.promoCode) return 0;
    const promo = PROMO_CODES[state.promoCode];
    if (!promo) return 0;
    return Math.round((subtotal * promo.off) / 100);
  }, [state.promoCode, subtotal]);

  const pointsDiscount = useMemo(() => {
    if (!state.usePoints) return 0;
    const maxByPoints = state.points * 100;
    const maxByOrder = Math.round((subtotal - discount) * 0.5);
    return Math.min(maxByPoints, maxByOrder);
  }, [state.usePoints, state.points, subtotal, discount]);

  const tier = tierForPoints(state.lifetimePoints);

  const deliveryFee = (method: "delivery" | "pickup") => {
    if (method === "pickup") return 0;
    if (tier.id === "truffle") return 0;
    if (tier.id === "praline" && subtotal >= FREE_DELIVERY_FROM) return 0;
    if (subtotal >= 300000) return 0;
    return DELIVERY_FEE;
  };

  const total = (method: "delivery" | "pickup") =>
    Math.max(0, subtotal - discount - pointsDiscount + deliveryFee(method));

  const earnPoints = (method: "delivery" | "pickup") =>
    pointsFor(total(method), tier);

  const pushToast = (t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3200);
  };

  const value: Ctx = {
    state,
    dispatch,
    lines,
    count,
    subtotal,
    discount,
    pointsDiscount,
    deliveryFee,
    total,
    earnPoints,
    add: (slug, qty = 1) => {
      const p = products.find((x) => x.slug === slug);
      dispatch({ type: "add", slug, qty });
      if (p)
        pushToast({
          title: "Добавлено в заказ",
          detail: p.name,
          image: p.image,
        });
    },
    isFav: (slug) => state.favorites.includes(slug),
    toggleFav: (slug) => {
      const p = products.find((x) => x.slug === slug);
      const on = !state.favorites.includes(slug);
      dispatch({ type: "toggleFav", slug });
      if (p)
        pushToast({
          title: on ? "В избранном" : "Убрано из избранного",
          detail: p.name,
          image: p.image,
        });
    },
    toasts,
    pushToast,
    cartOpen,
    setCartOpen,
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
