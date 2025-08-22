export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: "Electronics" | "Clothing" | "Home";
  brand: "Clothing" | "Other";
  rating?: number;
  description: string;
};

export const products: Product[] = [
  { id: "shoes", title: "Running Shoes", price: 99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop", category: "Clothing", brand: "Other", rating: 4.5, description: "Breathable running sneakers with cushioned sole." },
  { id: "headphones", title: "Wireless Headphones", price: 129, image: "https://images.unsplash.com/photo-1518449007433-7dbcd91759bf?q=80&w=1200&auto=format&fit=crop", category: "Electronics", brand: "Other", rating: 4.2, description: "Over-ear wireless headphones with noise isolation." },
  { id: "backpack", title: "Backpack", price: 79, image: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1200&auto=format&fit=crop", category: "Home", brand: "Other", rating: 4.1, description: "Durable everyday backpack with multiple compartments." },
  { id: "watch", title: "Smartwatch", price: 249, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop", category: "Electronics", brand: "Clothing", rating: 4.7, description: "Fitness tracking, notifications, and long battery." },
  { id: "sunglasses", title: "Sunglasses", price: 149, image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop", category: "Clothing", brand: "Other", rating: 4.0, description: "UV-protected classic shades with polarized lenses." },
  { id: "camera", title: "Digital Camera", price: 499, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop", category: "Electronics", brand: "Other", rating: 4.6, description: "Compact mirrorless camera great for travel." },
  { id: "tshirt", title: "T-shirt", price: 29, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop", category: "Clothing", brand: "Clothing", rating: 4.1, description: "Soft cotton tee with relaxed fit." },
  { id: "smartphone", title: "Smartphone", price: 699, image: "https://images.unsplash.com/photo-1678745969793-83b7dc0116a1?q=80&w=1200&auto=format&fit=crop", category: "Electronics", brand: "Clothing", rating: 4.8, description: "Edge-to-edge display and excellent camera performance." }
];
