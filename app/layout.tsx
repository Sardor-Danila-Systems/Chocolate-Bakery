import type { Metadata } from "next";
import { Playfair_Display, Onest } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chocolate — Праздник, когда ты захочешь",
  description:
    "Кондитерская Chocolate в Самарканде: торты, десерты, выпечка и кофе. Заказ онлайн, доставка и самовывоз, программа лояльности Chocolate Club.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${onest.variable}`}>
      <body className="antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
