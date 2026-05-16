import Navbar from "./components/Navbar";
import Hero from "./Layouts/Hero";
import Categories from "./components/CategoryCard";
import HowItWorks from "./Layouts/HowItWorks";
import Gallery from "./Layouts/Gallary";
import OrderForm from "./Layouts/OrderForm";
import Testimonials from "./Layouts/Testimonial";
import About from "./Layouts/About";
import Contact from "./Layouts/Contact";
import Footer from "./Layouts/Footer";

export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />
      <Hero />
      <Categories />
      <Gallery />
      <HowItWorks />
      <OrderForm />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
