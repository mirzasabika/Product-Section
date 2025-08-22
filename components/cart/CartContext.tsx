'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/data/products';

export type CartItem = { id: string; qty: number };
type CartState = { items: CartItem[] };
type CartCtx = {
  state: CartState;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

const KEY = 'wb_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const add = (id: string, qty = 1) => {
    setState(prev => {
      const ex = prev.items.find(i => i.id === id);
      if (ex) return { items: prev.items.map(i => i.id === id ? { ...i, qty: i.qty + qty } : i) };
      return { items: [...prev.items, { id, qty }] };
    });
  };

  const remove = (id: string) => setState(prev => ({ items: prev.items.filter(i => i.id !== id) }));
  const setQty = (id: string, qty: number) => setState(prev => ({ items: prev.items.map(i => i.id === id ? { ...i, qty } : i) }));
  const clear = () => setState({ items: [] });

  const value = useMemo(() => ({ state, add, remove, setQty, clear }), [state]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
