'use client';
import Image from "next/image";
import Link from "next/link";
import { currency } from "@/lib/format";
import { useCart } from "./cart/CartContext";
import type { Product } from "@/data/products";

function Stars({ rating=0 }: { rating?: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex gap-0.5 text-brand-600">
      {Array.from({length:5}).map((_,i)=>(
        <span key={i}>{i<full ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="card">
      <Link href={`/product/${p.id}`} className="block">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg mb-3">
          <Image src={p.image} alt={p.title} fill className="object-cover" />
        </div>
        <div className="font-semibold leading-tight">{p.title}</div>
      </Link>
      <div className="text-sm opacity-80">{currency(p.price)}</div>
      <div className="mt-1"><Stars rating={p.rating} /></div>
      <button onClick={()=>add(p.id)} className="btn-primary w-full mt-2">Add to Cart</button>
    </div>
  );
}
