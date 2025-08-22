'use client';
import { useState } from 'react';
import { useCart } from '@/components/cart/CartContext';

export function AddButton({ id }: { id:string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center gap-2">
      <input type="number" min={1} value={qty} onChange={e=>setQty(Number(e.target.value))} className="input w-24" />
      <button onClick={()=>add(id, qty)} className="btn-primary">Add to Cart</button>
    </div>
  );
}
