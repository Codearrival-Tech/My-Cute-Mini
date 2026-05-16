import FadeIn from "../components/FadeIn";
import { TOKEN } from "../constants/Design";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya S.",
    loc: "Chennai",
    text: "The figurine was exactly like me! Gifted it to my mom on her birthday — she was in tears. Absolutely magical.",
  },
  {
    name: "Rahul M.",
    loc: "Malaysia",
    text: "Ordered from Malaysia and they delivered to my doorstep! The quality is stunning. Truly a unique gift idea.",
  },
  {
    name: "Ananya K.",
    loc: "Bangalore",
    text: "Wedding couple figurine was beyond our expectations. Every detail was perfect. Highly recommend!",
  },
  {
    name: "Karthik R.",
    loc: "Hyderabad",
    text: "Corporate gifting done right. Our team loved the miniature trophies. Will definitely order again.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20" style={{ background: TOKEN.gray50 }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: TOKEN.pink }}
          >
            Reviews
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: TOKEN.gray900,
            }}
          >
            What Customers Say
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="rounded-2xl p-5 border h-full flex flex-col"
                style={{ background: "#fff", borderColor: TOKEN.gray200 }}
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      fill={TOKEN.pink}
                      color={TOKEN.pink}
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed flex-1 mb-4"
                  style={{ color: TOKEN.gray600 }}
                >
                  "{r.text}"
                </p>
                <div
                  className="flex items-center gap-2.5 pt-3 border-t"
                  style={{ borderColor: TOKEN.gray100 }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: TOKEN.pinkLight,
                      color: TOKEN.pinkDark,
                    }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: TOKEN.gray900 }}
                    >
                      {r.name}
                    </p>
                    <p className="text-xs" style={{ color: TOKEN.gray400 }}>
                      {r.loc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
