import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 sm:pt-24 sm:pb-32 px-6 text-center max-w-5xl mx-auto">
        <div className="reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-8 hover:bg-primary/20 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI-Powered Resume Builder
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl tracking-tighter font-display font-semibold text-neutral-900 dark:text-white mb-8 leading-[1.1]">
            Transform Your Career <br className="hidden sm:block" /> with AI Intelligence
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 dark:text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Enter your profile once, paste any job description, and get an ATS-optimized resume tailored in seconds. Land more interviews, effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center bg-neutral-900 dark:bg-white text-white dark:text-black h-14 px-8 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white h-14 px-8 rounded-full text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
            >
              View Features
            </button>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="border-y border-neutral-200/50 dark:border-white/5 py-12 overflow-hidden bg-neutral-50/50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-white/40">
            Trusted By Job Seekers Worldwide
          </p>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center justify-around gap-16 px-8">
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 font-bold text-lg">
              <Sparkles className="w-6 h-6 text-primary" /> AI POWERED
            </div>
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 font-bold text-lg">
              <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              ATS OPTIMIZED
            </div>
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 font-bold text-lg">
              <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              INSTANT RESULTS
            </div>
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 font-bold text-lg">
              <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              30 SECONDS
            </div>
          </div>
          <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center justify-around gap-16 px-8">
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 font-bold text-lg">
              <Sparkles className="w-6 h-6 text-primary" /> AI POWERED
            </div>
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 font-bold text-lg">
              <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              ATS OPTIMIZED
            </div>
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 font-bold text-lg">
              <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              INSTANT RESULTS
            </div>
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 font-bold text-lg">
              <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              30 SECONDS
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-10"></div>
        </div>
      </section>
    </>
  );
};

export default Hero;
