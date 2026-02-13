import { Brain, Target, Zap, FileText, Globe, Shield } from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze job descriptions and optimize your resume for maximum ATS compatibility.",
    color: "blue",
  },
  {
    icon: Target,
    title: "Keyword Matching",
    description: "Automatically extracts and integrates relevant keywords from job postings into your resume.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Generate a perfectly tailored resume in under 30 seconds. No manual editing required.",
    color: "emerald",
  },
  {
    icon: Shield,
    title: "ATS-Optimized",
    description: "Every resume is validated against ATS systems to ensure it passes automated screening.",
    color: "orange",
  },
  {
    icon: Globe,
    title: "Multi-Region Support",
    description: "Templates customized for USA, Europe, Asia, and Middle East hiring standards.",
    color: "pink",
  },
  {
    icon: FileText,
    title: "Export Options",
    description: "Download in PDF or DOCX format, ready to submit to any job application platform.",
    color: "indigo",
  },
];

const colorClasses = {
  blue: "bg-blue-500/10 text-blue-500",
  purple: "bg-purple-500/10 text-purple-500",
  emerald: "bg-emerald-500/10 text-emerald-500",
  orange: "bg-orange-500/10 text-orange-500",
  pink: "bg-pink-500/10 text-pink-500",
  indigo: "bg-indigo-500/10 text-indigo-500",
};

const Features = () => {
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
    <section id="features" className="py-32 bg-neutral-50/50 dark:bg-white/5 border-t border-neutral-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-on-scroll">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
              Core Technology
            </h2>
            <h3 className="text-4xl sm:text-5xl font-display font-semibold text-neutral-900 dark:text-white">
              AI-Driven Resume Building
            </h3>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`p-8 rounded-3xl bg-white dark:bg-black border border-neutral-100 dark:border-white/10 shadow-xl shadow-neutral-200/50 dark:shadow-black/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 reveal-on-scroll delay-${(i % 3 + 1) * 100} group`}
            >
              <div
                className={`w-12 h-12 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-neutral-500 dark:text-white/60 text-sm mb-6">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
