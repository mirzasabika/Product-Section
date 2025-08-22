import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import Header from "@/components/Header";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Shop",
  description: "Next.js ecommerce demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {/* 👇 Wrap in Suspense */}
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <Header />
          </Suspense>
          <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
