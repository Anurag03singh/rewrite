import { Star } from "lucide-react";
import { useEffect } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    text: "I was applying to 10+ companies a week. This tool cut my resume prep from 2 hours to 2 minutes. Got 3 interviews in my first week.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Product Manager at Stripe",
    text: "The ATS optimization is incredible. My application response rate went from 5% to over 40%. This is a game-changer.",
    rating: 5,
  },
  {
    name: "Fatima Al-Hassan",
    role: "Data Analyst at Deloitte",
    text: "The region-specific templates saved me. Applying to jobs in Dubai required a completely different format and this tool nailed it.",
    rating: 5,
  },
];

const SocialProof = () => {
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
          Testimonials
        </h2>
        <h3 className="text-4xl sm:text-5xl font-display font-semibold text-neutral-900 dark:text-white">
          Loved by Job Seekers
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className={`p-8 rounded-3xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-primary/50 transition-all duration-300 reveal-on-scroll delay-${(i + 1) * 100}`}
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-neutral-600 dark:text-white/70 leading-relaxed mb-6">
              "{t.text}"
            </p>
            <div>
              <div className="font-semibold font-display text-sm text-neutral-900 dark:text-white">
                {t.name}
              </div>
              <div className="text-xs text-neutral-500 dark:text-white/50">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
