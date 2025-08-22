import { Facebook, Twitter,Instagram  } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white mt-12">
      <div className="container-padded grid md:grid-cols-3 gap-6 py-10">
        <div>
          <h4 className="font-semibold mb-2">Filters</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>All</li><li>Electronics</li><li>Clothing</li><li>Home</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">About Us</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>About Us</li><li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-3 text-sm opacity-80">
            <span className=" rounded-full bg-blue-800 p-2 text-sm"><Facebook /></span><span className=" rounded-full bg-blue-800 p-2 text-sm"><Twitter /></span><span className=" rounded-full bg-blue-800 p-2 text-sm"><Instagram /></span>
          </div>
        </div>
      </div>
      <div className="container-padded border-t border-white/10 py-4 text-xs opacity-70">© 2024 American</div>
    </footer>
  );
}
