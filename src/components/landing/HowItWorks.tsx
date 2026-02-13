import { UserPlus, ClipboardPaste, Cpu, Download } from "lucide-react";
import { useEffect } from "react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Enter your experience, skills, projects, and education once. We store it securely.",
  },
  {
    icon: ClipboardPaste,
    step: "02",
    title: "Paste Job Description",
    description: "Copy any JD from LinkedIn, Indeed, or anywhere. Our AI analyzes it instantly.",
  },
  {
    icon: Cpu,
    step: "03",
    title: "AI Tailors Resume",
    description: "Keywords matched, bullets rewritten, sections prioritized — all optimized for ATS.",
  },
  {
    icon: Download,
    step: "04",
    title: "Download & Apply",
    description: "Get your polished resume in PDF or DOCX. Apply with confidence in seconds.",
  },
];

const HowItWorks = () => {
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
    <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-16 text-center reveal-on-scroll">
        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
          Simple Process
        </h2>
        <h3 className="text-4xl sm:text-5xl font-display font-semibold text-neutral-900 dark:text-white">
          How It Works
        </h3>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <div
            key={step.step}
            className={`text-center relative reveal-on-scroll delay-${(i + 1) * 100}`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 hover:bg-primary/20 transition-colors">
              <step.icon className="w-7 h-7 text-primary" />
            </div>
            <div className="text-xs font-mono text-primary mb-2 font-bold">{step.step}</div>
            <h3 className="text-lg font-semibold font-display mb-2 text-neutral-900 dark:text-white">
              {step.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-white/60 leading-relaxed">
              {step.description}
            </p>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-neutral-200 dark:bg-white/10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
