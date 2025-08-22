import FiltersSidebar from "@/components/FiltersSidebar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { currency } from "@/lib/format";

export default function Home({ searchParams }: { searchParams: Record<string,string|undefined> }) {
  const q = (searchParams.q ?? "").toLowerCase();
  const priceMax = Number(searchParams.priceMax ?? 1000);
  const category = searchParams.category ?? "All";
  const brand = searchParams.brand ?? "All";

  const list = products.filter(p => {
    const matchesQ = q ? (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : true;
    const matchesCategory = category === "All" ? true : p.category === category;
    const matchesBrand = brand === "All" ? true : p.brand === brand;
    const matchesPrice = p.price <= priceMax;
    return matchesQ && matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <div className="grid md:grid-cols-[260px,1fr] gap-6">
      <FiltersSidebar />
      <div>
        <h2 className="text-xl font-semibold mb-4">Product Listing</h2>
        {list.length === 0 ? (
          <div className="card">No products found. Try adjusting filters.</div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {list.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
