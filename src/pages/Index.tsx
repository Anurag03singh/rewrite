import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import SocialProof from "@/components/landing/SocialProof";
import Footer from "@/components/landing/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* 3D Background - Behind everything */}
      <ThreeBackground />

      {/* Grain Overlay */}
      <div className="bg-noise" style={{ zIndex: 50 }}></div>

      <Navbar />
      <main className="pt-24 min-h-screen relative" style={{ zIndex: 10 }}>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <SocialProof />

        {/* Call to Action */}
        <section className="py-32 px-6 max-w-3xl mx-auto text-center">
          <div className="reveal-on-scroll">
            <h2 className="text-4xl sm:text-6xl font-display font-semibold text-neutral-900 dark:text-white mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-neutral-600 dark:text-white/60 mb-10">
              Join thousands of job seekers using AI to create perfect resumes in seconds.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="group inline-flex items-center justify-center bg-primary text-white h-16 px-10 rounded-full text-lg font-semibold shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
