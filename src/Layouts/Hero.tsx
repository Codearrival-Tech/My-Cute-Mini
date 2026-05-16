import {
  Star,
  ArrowRight,
  Users,
  Award,
  Globe,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { TOKEN } from "../constants/Design";
import FadeIn from "../components/FadeIn";

interface Stat {
  icon: React.ReactNode;
  val: string;
  label: string;
}

const stats: Stat[] = [
  { icon: <Users size={18} />, val: "1,000+", label: "Happy Customers" },
  { icon: <Star size={18} />, val: "4.9★", label: "Google Rating" },
  {
    icon: <Globe size={18} />,
    val: "20+ Countries",
    label: "Worldwide Delivery",
  },
  { icon: <Award size={18} />, val: "100%", label: "Handmade" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-20 pb-16 md:pt-24 md:pb-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #FDF0F7 0%, #FAFAFA 55%, #FDF0F7 100%)`,
      }}
    >
      {/* Background blobs — clipped so they don't overflow on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${TOKEN.pinkMid}, transparent 70%)`,
            transform: "translate(30%, 0)",
          }}
        />
        <div
          className="absolute bottom-0 left-10 w-52 h-52 md:w-72 md:h-72 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${TOKEN.pink}, transparent 70%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Hero copy */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <FadeIn delay={0}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 md:mb-6 border"
              style={{
                background: TOKEN.pinkLight,
                color: TOKEN.pinkDark,
                borderColor: TOKEN.pinkMid,
              }}
            >
              <Sparkles size={12} /> Handcrafted in Chennai · Ships Worldwide
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 md:mb-5"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: TOKEN.gray900,
              }}
            >
              Turn Your Moments
              <br />
              Into <span style={{ color: TOKEN.pink }}>3D Miniatures</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="text-sm sm:text-base leading-relaxed mb-7 md:mb-8 max-w-lg mx-auto"
              style={{ color: TOKEN.gray600 }}
            >
              Handmade replica figurines crafted from your photos. Selfie dolls,
              couple sets, wedding keepsakes &amp; corporate gifts — each one a
              unique piece of art.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            {/* Buttons: full-width on mobile, auto on sm+ */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#order" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                  style={{ background: TOKEN.pink, color: "#fff" }}
                >
                  <ShoppingBag size={16} /> Order Your Miniature
                </button>
              </a>
              <a href="#gallery" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: TOKEN.pinkMid,
                    color: TOKEN.pinkDark,
                    background: "#fff",
                  }}
                >
                  View Gallery <ArrowRight size={15} />
                </button>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Stats grid */}
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-3 md:p-4 text-center border"
                style={{ background: "#fff", borderColor: TOKEN.pinkLight }}
              >
                <div
                  className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full mb-1.5 md:mb-2"
                  style={{ background: TOKEN.pinkLight, color: TOKEN.pink }}
                >
                  {s.icon}
                </div>
                <div
                  className="text-base md:text-lg font-bold"
                  style={{ color: TOKEN.gray900 }}
                >
                  {s.val}
                </div>
                <div
                  className="text-[11px] md:text-xs leading-tight"
                  style={{ color: TOKEN.gray400 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
