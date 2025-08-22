'use client';
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import { products } from "@/data/products";
import { currency } from "@/lib/format";

export default function CartPage() {
  const { state, setQty, remove, clear } = useCart();
  const rows = state.items.map(i => ({ ...i, product: products.find(p => p.id === i.id)! })).filter(r => r.product);

  const subtotal = rows.reduce((s,r) => s + r.product.price * r.qty, 0);
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  return (
    <div className="grid md:grid-cols-[1fr,320px] gap-6">
      <div className="card">
        <h2 className="font-semibold mb-4">Cart</h2>
        {rows.length === 0 ? (
          <div>No items yet. <Link className="text-brand-700 underline" href="/">Browse products</Link></div>
        ) : (
          <div className="space-y-4">
            {rows.map(({id, qty, product}) => (
              <div key={id} className="flex gap-4 items-center">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                  <Image src={product.image} alt={product.title} fill className="object-cover " />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{product.title}</div>
                  <div className="text-sm opacity-80">{currency(product.price)}</div>
                </div>
               <div className="flex md:flex-row flex-col gap-4">
                 <input type="number" min={1} value={qty} onChange={e=>setQty(id, Number(e.target.value))} className="input w-5 " style={{ width: "80px" }}/>
                <button onClick={()=>remove(id)} className="btn-outline">Remove</button>
               </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <button onClick={clear} className="btn-outline">Clear Cart</button>
            </div>
          </div>
        )}
      </div>

      <div className="card h-max">
        <h3 className="font-semibold mb-2">Summary</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{currency(shipping)}</span></div>
          <div className="flex justify-between font-semibold border-t pt-2"><span>Total</span><span>{currency(total)}</span></div>
        </div>
        <button className="btn-primary w-full mt-4">Checkout</button>
      </div>
    </div>
  );
}
