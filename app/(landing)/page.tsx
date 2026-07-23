import CTASection from "@/components/landing/CTASection";
import FAQSection from "@/components/landing/FAQSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Navbar from "@/components/landing/Navbar";
import TechStackSection from "@/components/landing/TechStackSection";
import TickerBanner from "@/components/landing/TickerBanner";

const Home = () => {
  return (
    <>
      <Navbar />
      <TickerBanner />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TechStackSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
