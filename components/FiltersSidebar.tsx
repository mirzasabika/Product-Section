"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Filter, X } from "lucide-react";

const categories = ["All", "Electronics", "Clothing", "Home"] as const;
const brands = ["All", "Clothing", "Other"] as const;

export default function FiltersSidebar() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const [category, setCategory] = useState<string>(params.get("category") ?? "All");
  const [brand, setBrand] = useState<string>(params.get("brand") ?? "All");
  const [price, setPrice] = useState<number>(Number(params.get("priceMax") ?? 1000));

  // mobile drawer state
  const [open, setOpen] = useState(false);

  // sync from URL
  useEffect(() => {
    setCategory(params.get("category") ?? "All");
    setBrand(params.get("brand") ?? "All");
    setPrice(Number(params.get("priceMax") ?? 1000));
  }, [params]);

  // push to URL helper
  const update = useCallback(
    (next: Partial<{ category: string; brand: string; priceMax: number }>) => {
      const sp = new URLSearchParams(params.toString());
      if (next.category !== undefined) {
        next.category === "All" ? sp.delete("category") : sp.set("category", String(next.category));
        setCategory(next.category);
      }
      if (next.brand !== undefined) {
        next.brand === "All" ? sp.delete("brand") : sp.set("brand", String(next.brand));
        setBrand(next.brand);
      }
      if (next.priceMax !== undefined) {
        sp.set("priceMax", String(next.priceMax));
        setPrice(next.priceMax);
      }
      router.push(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [params, pathname, router]
  );

  // lock body scroll when drawer open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white shadow"
      >
        <Filter className="h-5 w-5" />
        Filters
      </button>

      {/* Sidebar container */}
      <div className="md:sticky md:top-4 md:w-64 md:self-start">
        {/* Drawer (mobile) / Static (desktop) */}
        <div
          className={[
            // base
            "fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto bg-transparent p-4 transition-transform duration-300 ease-in-out md:static md:z-auto md:h-auto md:w-auto md:translate-x-0 md:p-0",
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          ].join(" ")}
          role="dialog"
          aria-modal={open ? true : false}
        >
          {/* Header for mobile drawer */}
          <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-3 shadow md:hidden">
            <h3 className="text-base font-semibold">Filters</h3>
            <button
              aria-label="Close filters"
              onClick={() => setOpen(false)}
              className="rounded p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* STACKED CARDS */}
          <div className="space-y-4 md:space-y-4">
            {/* BLUE CARD */}
            <div className="rounded-xl bg-blue-700 p-4 text-white shadow-md">
              <h4 className="mb-3 text-base font-semibold">Filters</h4>

              {/* Category */}
              <div className="mb-5">
                <div className="mb-2 text-sm font-medium">Category</div>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <label key={c} className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        className="accent-white"
                        name="category"
                        checked={category === c}
                        onChange={() => update({ category: c })}
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <div>
                <div className="mb-2 text-sm font-medium">Price</div>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={price}
                  onChange={(e) => update({ priceMax: Number(e.target.value) })}
                  className="w-full accent-white"
                />
                <div className="mt-1 flex justify-between text-xs opacity-90">
                  <span>0</span>
                  <span>1000</span>
                </div>
              </div>
            </div>

            {/* WHITE CARD */}
            <div className="rounded-xl bg-white p-4 text-gray-900 shadow-md">
              {/* Brand */}
              <div className="mb-5">
                <div className="mb-2 text-sm font-medium">Category</div>
                <div className="space-y-2">
                  {brands.map((b) => (
                    <label key={b} className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        className="accent-blue-600"
                        name="brand"
                        checked={brand === b}
                        onChange={() => update({ brand: b })}
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price dropdown */}
              <div>
                <div className="mb-1 text-sm font-medium">Price</div>
                <select
                  value={price}
                  onChange={(e) => update({ priceMax: Number(e.target.value) })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  {[100, 200, 300, 400, 500, 1000].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay (mobile only) */}
        {open && (
          <button
            aria-label="Close filters overlay"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />
        )}
      </div>
    </>
  );
}
