import { Camera, Sparkles, Package, Truck } from "lucide-react";
import { TOKEN } from "../constants/Design";
import FadeIn from "../components/FadeIn";

const steps = [
  {
    icon: <Camera size={22} />,
    title: "Upload Your Photo",
    desc: "Send us a clear front-facing photo. The better the photo, the more accurate the figurine.",
  },
  {
    icon: <Package size={22} />,
    title: "Customize & Confirm",
    desc: "Choose your figurine type, size, and pose. We'll send a preview for your approval.",
  },
  {
    icon: <Sparkles size={22} />,
    title: "We Craft It",
    desc: "Our artisans handcraft your miniature with precision and care. Takes 7–10 business days.",
  },
  {
    icon: <Truck size={22} />,
    title: "Delivered to You",
    desc: "Carefully packed and shipped to your doorstep — anywhere in India or worldwide.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20"
      style={{ background: TOKEN.rose }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: TOKEN.pink }}
          >
            Process
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: TOKEN.gray900,
            }}
          >
            How It Works
          </h2>
          <p
            className="text-sm mb-12 max-w-lg"
            style={{ color: TOKEN.gray600 }}
          >
            From your photo to your doorstep in four simple steps.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} direction="up">
              <div className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 left-full w-full h-px z-0"
                    style={{
                      background: `linear-gradient(to right, ${TOKEN.pinkMid}, transparent)`,
                    }}
                  />
                )}
                <div
                  className="relative z-10 rounded-2xl p-6 border h-full"
                  style={{ background: "#fff", borderColor: TOKEN.pinkLight }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: TOKEN.pink, color: "#fff" }}
                    >
                      {s.icon}
                    </div>
                    <span
                      className="text-3xl font-black opacity-10"
                      style={{ color: TOKEN.gray900 }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-sm mb-2"
                    style={{ color: TOKEN.gray900 }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: TOKEN.gray400 }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
