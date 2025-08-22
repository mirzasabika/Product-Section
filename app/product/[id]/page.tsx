"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { currency } from "@/lib/format";
import { AddButton } from "./parts";
import { Suspense } from "react";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const p = products.find((x) => x.id === params.id);
  if (!p) return <div className="card">Product not found</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card">
        <div className="relative w-full aspect-square overflow-hidden rounded-lg">
          <Image src={p.image} alt={p.title} fill className="object-cover" />
        </div>
      </div>
      <div className="card">
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <div className="text-brand-800 text-xl mt-2">{currency(p.price)}</div>
        <p className="mt-4 text-sm opacity-80">{p.description}</p>
        <div className="mt-4 text-sm ">
          <div><span className="font-medium">Category:</span> {p.category}</div>
          <div><span className="font-medium">Brand:</span> {p.brand}</div>
        </div>
        <div className="mt-6 flex gap-3">
          {/*  Wrap AddButton with Suspense in case it uses useSearchParams */}
          <Suspense fallback={<div>Loading...</div>}>
            <AddButton id={p.id} />
          </Suspense>
          <Link href="/" className="btn-outline">Back to Listing</Link>
        </div>
      </div>
    </div>
  );
}
