import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
  return (
    <section className="py-24 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Loved by <span className="text-gradient">Job Seekers</span>
          </h2>
          <p className="text-muted-foreground text-lg">Real people, real results.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-gradient-card border border-border/50"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-secondary-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <div className="font-semibold font-display text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
