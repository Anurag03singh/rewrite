import { Check } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
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
    <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-16 text-center reveal-on-scroll">
        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
          Simple Pricing
        </h2>
        <h3 className="text-4xl sm:text-5xl font-display font-semibold text-neutral-900 dark:text-white">
          Choose Your Plan
        </h3>
        <p className="text-neutral-600 dark:text-white/60 mt-4 max-w-2xl mx-auto">
          No hidden fees. Start free or unlock premium features.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black shadow-xl reveal-on-scroll">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              Free
            </h3>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-5xl font-display font-bold text-neutral-900 dark:text-white">
                ₹0
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-white/50 mt-2">
              Try it out
            </p>
          </div>

          <ul className="space-y-4 mb-8 text-neutral-600 dark:text-white/70 text-sm">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>1 Resume generation</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Basic templates</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>PDF export</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>ATS optimization</span>
            </li>
          </ul>

          <button
            onClick={() => navigate("/auth")}
            className="w-full h-12 rounded-xl border border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
          >
            Start Free
          </button>
        </div>

        {/* One-Time Plan */}
        <div className="p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black shadow-xl reveal-on-scroll delay-100">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              One-Time Use
            </h3>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-5xl font-display font-bold text-neutral-900 dark:text-white">
                ₹15
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-white/50 mt-2">
              Pay once, use once
            </p>
          </div>

          <ul className="space-y-4 mb-8 text-neutral-600 dark:text-white/70 text-sm">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>1 Premium resume generation</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>All premium templates</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>PDF & DOCX export</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Advanced ATS optimization</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Priority support</span>
            </li>
          </ul>

          <button
            onClick={() => navigate("/auth")}
            className="w-full h-12 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </div>

        {/* Lifetime Plan */}
        <div className="p-8 rounded-3xl border-2 border-primary bg-primary/5 dark:bg-primary/10 shadow-2xl shadow-primary/10 reveal-on-scroll delay-200 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Best Value
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              Lifetime Access
            </h3>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-5xl font-display font-bold text-neutral-900 dark:text-white">
                ₹199
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-white/50 mt-2">
              One-time payment, forever
            </p>
          </div>

          <ul className="space-y-4 mb-8 text-neutral-600 dark:text-white/70 text-sm">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="font-semibold">Unlimited resume generations</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>All premium templates</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>PDF & DOCX export</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Advanced ATS optimization</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="font-semibold">AI-powered cover letters</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="font-semibold">LinkedIn profile optimization</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="font-semibold">Interview preparation tips</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Priority support</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="font-semibold">Lifetime updates</span>
            </li>
          </ul>

          <button
            onClick={() => navigate("/auth")}
            className="w-full h-12 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Get Lifetime Access
          </button>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="mt-16 text-center reveal-on-scroll delay-300">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="text-sm font-medium text-neutral-700 dark:text-white/70">
            7-day money-back guarantee on all paid plans
          </span>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
