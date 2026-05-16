import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { TOKEN } from "../constants/Design";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Gallery", "How It Works", "About", "Contact"];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100"
      style={{ borderColor: TOKEN.pinkLight }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: TOKEN.pink }}
          >
            <Sparkles size={16} color="white" />
          </div>
          <span
            className="font-bold text-lg tracking-tight"
            style={{
              color: TOKEN.gray900,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            My Cute <span style={{ color: TOKEN.pink }}>Mini</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: TOKEN.gray600 }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = TOKEN.pink)
              }
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = TOKEN.gray600)
              }
            >
              {l}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#order">
            <button
              className="text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: TOKEN.pink, color: "#fff" }}
            >
              Order Now
            </button>
          </a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? (
            <X size={22} color={TOKEN.gray900} />
          ) : (
            <Menu size={22} color={TOKEN.gray900} />
          )}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t px-6 pb-5 flex flex-col gap-4"
            style={{ borderColor: TOKEN.pinkLight }}
          >
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setOpen(false)}
                className="text-sm font-medium py-2"
                style={{ color: TOKEN.gray600 }}
              >
                {l}
              </a>
            ))}
            <a href="#order" onClick={() => setOpen(false)}>
              <button
                className="w-full text-sm font-semibold py-3 rounded-full"
                style={{ background: TOKEN.pink, color: "#fff" }}
              >
                Order Now
              </button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
