"use client";

import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "./cart/CartContext"; // ✅ import your cart context

export default function Header() {
  const { state } = useCart(); // ✅ get cart state
  const cartQty = state.items.reduce((a, b) => a + b.qty, 0); // ✅ dynamic qty

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const sp = new URLSearchParams(params.toString());
    if (q) sp.set("q", q);
    else sp.delete("q");
    router.push(`${pathname}?${sp.toString()}`);
  };

  return (
    <header className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-3">
        {/* Left side: Logo */}
        <Link href="/" className="font-bold text-xl whitespace-nowrap">
          Logo
        </Link>

        {/* Right side: Search + Cart */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {/* Search bar (desktop) */}
          <form onSubmit={submit} className="hidden md:block flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for products..."
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-md bg-blue-900 px-4 py-2 text-white hover:bg-blue-800"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {cartQty > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartQty}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden max-w-7xl mx-auto px-4 pb-3">
        <form onSubmit={submit}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for products..."
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
