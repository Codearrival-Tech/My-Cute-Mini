import { TOKEN } from "../constants/Design";
import FadeIn from "../components/FadeIn";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type stateType = {
  val: string;
  label: string;
};

const stats: stateType[] = [
  { val: "1000+", label: "Figurines Crafted" },
  { val: "4.9★", label: "Google Rating" },
  { val: "20+", label: "Countries Served" },
  { val: "5+", label: "Years Experience" },
];

export default function About() {
  return (
    <section id="about" className="py-20" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <FadeIn direction="right">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: TOKEN.pink }}
            >
              Our Story
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: TOKEN.gray900,
              }}
            >
              Crafted with Love in Chennai
            </h2>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: TOKEN.gray600 }}
            >
              My Cute Mini was born from a simple idea — what if you could hold
              a tiny version of yourself or your loved ones? Based in Porur,
              Chennai, we combine artistic craftsmanship with modern 3D
              techniques to create figurines that are truly one-of-a-kind.
            </p>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: TOKEN.gray600 }}
            >
              From selfie figurines to wedding keepsakes and corporate gifts,
              each piece is meticulously handmade by our skilled artisans. We
              ship across India and to over 20 countries worldwide.
            </p>
            <a href="#order">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: TOKEN.pink, color: "#fff" }}
              >
                Order Now <ChevronRight size={15} />
              </button>
            </a>
          </FadeIn>
          <FadeIn delay={0.15} direction="left">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl p-6 text-center border"
                  style={{
                    background: i % 2 === 0 ? TOKEN.rose : TOKEN.gray50,
                    borderColor: i % 2 === 0 ? TOKEN.pinkLight : TOKEN.gray200,
                  }}
                >
                  <div
                    className="text-3xl font-black mb-1"
                    style={{
                      color: TOKEN.pink,
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {s.val}
                  </div>
                  <p className="text-xs" style={{ color: TOKEN.gray600 }}>
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
