import { TOKEN } from "../constants/Design";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";
import { Heart, User, UsersRound, Briefcase, BellRing } from "lucide-react";

const cats = [
  {
    icon: <User size={24} />,
    title: "3D Selfie Figurines",
    desc: "Your exact look recreated in stunning detail",
    tag: "Bestseller",
    price: "From ₹1,499",
  },
  {
    icon: <Heart size={24} />,
    title: "Couple Miniatures",
    desc: "Perfect anniversary & Valentine gift",
    tag: null,
    price: "From ₹2,499",
  },
  {
    icon: <UsersRound size={24} />,
    title: "Family Figurines",
    desc: "Recreate your whole family in 3D",
    tag: null,
    price: "From ₹3,299",
  },
  {
    icon: <BellRing size={24} />,
    title: "Wedding Keepsakes",
    desc: "Bride & Groom miniatures for the big day",
    tag: "Popular",
    price: "From ₹3,999",
  },
  {
    icon: <Briefcase size={24} />,
    title: "Corporate Gifts",
    desc: "Branded figurines for events & awards",
    tag: null,
    price: "Bulk pricing",
  },
];

export default function Categories() {
  return (
    <section
      id="gallery"
      className="py-20"
      style={{ background: TOKEN.gray50 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: TOKEN.pink }}
          >
            Our Products
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: TOKEN.gray900,
            }}
          >
            Choose Your Figurine
          </h2>
          <p
            className="text-sm mb-10 max-w-lg"
            style={{ color: TOKEN.gray600 }}
          >
            Every miniature is 100% handmade — send us a photo and we recreate
            you in 3D.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {cats.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: `0 16px 40px rgba(233,30,140,0.12)`,
                }}
                className="relative rounded-2xl p-6 border cursor-pointer h-full transition-all duration-200"
                style={{ background: "#fff", borderColor: TOKEN.gray200 }}
              >
                {c.tag && (
                  <span
                    className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: TOKEN.pinkLight,
                      color: TOKEN.pinkDark,
                    }}
                  >
                    {c.tag}
                  </span>
                )}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: TOKEN.pinkLight, color: TOKEN.pink }}
                >
                  {c.icon}
                </div>
                <h3
                  className="font-semibold text-sm mb-1.5"
                  style={{ color: TOKEN.gray900 }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-3"
                  style={{ color: TOKEN.gray400 }}
                >
                  {c.desc}
                </p>
                <p className="text-xs font-bold" style={{ color: TOKEN.pink }}>
                  {c.price}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
