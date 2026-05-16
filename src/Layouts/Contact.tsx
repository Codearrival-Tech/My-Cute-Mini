import { TOKEN } from "../constants/Design";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import FadeIn from "../components/FadeIn";

export default function Contact() {
  const contacts = [
    {
      icon: <Phone size={20} />,
      title: "Phone / WhatsApp",
      val: "+91 1800 274 1500",
      sub: "Mon–Sat, 9am–6:30pm",
    },
    {
      icon: <Mail size={20} />,
      title: "Email",
      val: "hello@mycutemini.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: <MapPin size={20} />,
      title: "Visit Us",
      val: "64A, Arunachalam Main Rd",
      sub: "Porur, Chennai – 600116",
    },
    {
      icon: <Globe size={20} />,
      title: "Website",
      val: "www.mycutemini.com",
      sub: "Order & track online",
    },
  ];
  return (
    <section id="contact" className="py-20" style={{ background: TOKEN.rose }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: TOKEN.pink }}
          >
            Get in Touch
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: TOKEN.gray900,
            }}
          >
            Contact Us
          </h2>
          <p
            className="text-sm mb-10 max-w-lg"
            style={{ color: TOKEN.gray600 }}
          >
            Have questions? We're happy to help you choose the perfect figurine.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contacts.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="rounded-2xl p-5 border"
                style={{ background: "#fff", borderColor: TOKEN.pinkLight }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: TOKEN.pinkLight, color: TOKEN.pink }}
                >
                  {c.icon}
                </div>
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: TOKEN.gray400 }}
                >
                  {c.title}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: TOKEN.gray900 }}
                >
                  {c.val}
                </p>
                <p className="text-xs mt-0.5" style={{ color: TOKEN.gray400 }}>
                  {c.sub}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
