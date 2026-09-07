"use client";

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------------- Button ---------------- */

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "dark" | "outline" | "onDark" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  full?: boolean;
};

const VARIANTS = {
  primary: "bg-wine text-white hover:bg-wine-dark",
  dark: "bg-ink text-cream hover:bg-ink-2",
  outline: "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5",
  onDark: "border border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/10",
  ghost: "text-ink hover:bg-ink/5",
  light: "bg-white text-ink hover:bg-cream-2 border border-line",
};

const SIZES = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-[14px]",
  lg: "h-13 px-8 text-[15px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  disabled,
  type = "button",
  full,
}: ButtonProps) {
  const cls = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none",
    VARIANTS[variant],
    SIZES[size],
    full && "w-full",
    className,
  );
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

/* ---------------- Badge ---------------- */

export function Badge({
  children,
  tone = "wine",
  className,
}: {
  children: ReactNode;
  tone?: "wine" | "caramel" | "sage" | "ink" | "light";
  className?: string;
}) {
  const tones = {
    wine: "bg-wine text-white",
    caramel: "bg-caramel text-white",
    sage: "bg-sage text-white",
    ink: "bg-ink text-cream",
    light: "bg-white/90 text-ink border border-line",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- Section header ---------------- */

export function SectionHead({
  eyebrow,
  title,
  action,
  href,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  href?: string;
  className?: string;
}) {
  return (
    <div className={clsx("mb-7 flex items-end justify-between gap-4 sm:gap-6", className)}>
      <div className="min-w-0">
        {eyebrow && <div className="eyebrow mb-2.5 text-caramel">{eyebrow}</div>}
        <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)]">{title}</h2>
      </div>
      {action && href && (
        <Link
          href={href}
          className="shrink-0 whitespace-nowrap border-b border-ink/25 pb-0.5 text-[13px] font-medium text-ink-2 transition hover:border-ink"
        >
          {action}
        </Link>
      )}
    </div>
  );
}

/* ---------------- Quantity stepper ---------------- */

export function Qty({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-11";
  const w = size === "sm" ? "w-9" : "w-11";
  return (
    <div className={clsx("inline-flex items-center rounded-full border border-line bg-white", h)}>
      <button
        onClick={() => onChange(value - 1)}
        className={clsx("grid place-items-center rounded-full text-ink-3 transition hover:text-ink", h, w)}
        aria-label="Уменьшить"
      >
        −
      </button>
      <span className="tabular w-7 text-center text-[14px] font-semibold">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className={clsx("grid place-items-center rounded-full text-ink-3 transition hover:text-ink", h, w)}
        aria-label="Увеличить"
      >
        +
      </button>
    </div>
  );
}

/* ---------------- Scroll reveal ---------------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setShown(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-40px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx("transition-all duration-700 ease-out", className)}
      style={{
        opacity: shown ? 1 : 0.001,
        transform: shown ? "none" : "translateY(14px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Progress bar ---------------- */

export function Progress({
  value,
  tone = "caramel",
  className,
  animate = true,
}: {
  value: number;
  tone?: "caramel" | "wine" | "cream";
  className?: string;
  animate?: boolean;
}) {
  const [w, setW] = useState(animate ? 0 : value);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 120);
    return () => clearTimeout(t);
  }, [value]);
  const tones = { caramel: "bg-caramel", wine: "bg-wine", cream: "bg-cream" };
  return (
    <div className={clsx("h-1.5 w-full overflow-hidden rounded-full bg-current/15", className)}>
      <div
        className={clsx("h-full rounded-full transition-[width] duration-1000 ease-out", tones[tone])}
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

/* ---------------- Segmented control ---------------- */

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: Array<{ value: T; label: string; icon?: ReactNode }>;
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={clsx("inline-flex gap-1 rounded-full border border-line bg-cream-2 p-1", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={clsx(
            "flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-medium transition",
            value === o.value ? "bg-ink text-cream shadow-sm" : "text-ink-3 hover:text-ink",
          )}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}
