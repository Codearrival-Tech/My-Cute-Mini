import FadeIn from "../components/FadeIn";
import { TOKEN } from "../constants/Design";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const items = [
  {
    label: "Solo Selfie",
    sub: "Custom 3D figurine",
    price: "₹1,499",
    color: "#FDF0F7",
  },
  {
    label: "Couple Set",
    sub: "Anniversary special",
    price: "₹2,499",
    color: "#F0F7FD",
  },
  {
    label: "Family of 3",
    sub: "Family keepsake",
    price: "₹3,299",
    color: "#F0FDF4",
  },
  {
    label: "Wedding Duo",
    sub: "Bride & Groom",
    price: "₹3,999",
    color: "#FFF7F0",
  },
  {
    label: "Corporate Award",
    sub: "Branded figurine",
    price: "Custom",
    color: "#F5F0FD",
  },
  {
    label: "Birthday Topper",
    sub: "Cake topper set",
    price: "₹1,999",
    color: "#FDF0F7",
  },
];

export default function Gallery() {
  return (
    <section className="py-20" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: TOKEN.pink }}
          >
            Gallery
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: TOKEN.gray900,
            }}
          >
            Our Recent Work
          </h2>
          <p
            className="text-sm mb-10 max-w-lg"
            style={{ color: TOKEN.gray600 }}
          >
            Real orders. Real smiles. Every piece is one-of-a-kind.
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl overflow-hidden border cursor-pointer"
                style={{ borderColor: TOKEN.gray200, background: "#fff" }}
              >
                <div
                  className="h-44 flex items-center justify-center"
                  style={{ background: item.color }}
                >
                  <ImageIcon size={48} color={TOKEN.pinkMid} />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: TOKEN.gray900 }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: TOKEN.gray400 }}
                      >
                        {item.sub}
                      </p>
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: TOKEN.pink }}
                    >
                      {item.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
