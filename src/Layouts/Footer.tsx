import { Sparkles, CircleFadingPlus } from "lucide-react";
import { TOKEN } from "../constants/Design";

export default function Footer() {
  return (
    <footer style={{ background: TOKEN.gray900, color: "#9CA3AF" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: TOKEN.pink }}
              >
                <Sparkles size={15} color="white" />
              </div>
              <span
                className="font-bold text-lg"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#fff",
                }}
              >
                My Cute <span style={{ color: TOKEN.pinkMid }}>Mini</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "#6B7280" }}
            >
              Handmade 3D miniature figurines crafted from your photos. Based in
              Chennai, shipping worldwide.
            </p>
            <div className="flex gap-3 mt-5">
              {[CircleFadingPlus, CircleFadingPlus, CircleFadingPlus].map(
                (Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:border-pink-400"
                    style={{ borderColor: "#374151", color: "#6B7280" }}
                  >
                    <Icon size={15} />
                  </button>
                ),
              )}
            </div>
          </div>
          <div>
            <p
              className="text-sm font-semibold mb-4"
              style={{ color: "#F3F4F6" }}
            >
              Products
            </p>
            <ul className="space-y-2.5">
              {[
                "3D Selfie Figurines",
                "Couple Miniatures",
                "Family Figurines",
                "Wedding Keepsakes",
                "Corporate Gifts",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#gallery"
                    className="text-xs transition-colors hover:text-pink-300"
                    style={{ color: "#6B7280" }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              className="text-sm font-semibold mb-4"
              style={{ color: "#F3F4F6" }}
            >
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {[
                "How It Works",
                "Gallery",
                "About Us",
                "Contact",
                "Order Now",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-xs transition-colors hover:text-pink-300"
                    style={{ color: "#6B7280" }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "#1F2937" }}
        >
          <p className="text-xs" style={{ color: "#4B5563" }}>
            © 2025 My Cute Mini. All rights reserved. · Porur, Chennai, Tamil
            Nadu
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Shipping Policy"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs transition-colors hover:text-pink-300"
                  style={{ color: "#4B5563" }}
                >
                  {l}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
