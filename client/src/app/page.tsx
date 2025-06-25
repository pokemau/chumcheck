import AboutUs from "@/components/landing/AboutUs";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <HowItWorks />
      <AboutUs />
      <Footer />
    </div>
  );
}
