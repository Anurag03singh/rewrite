import { motion } from "framer-motion";
import { Brain, Target, Zap, FileText, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Rewriting",
    description: "Transforms raw experience into quantified, action-driven bullet points that recruiters love.",
  },
  {
    icon: Target,
    title: "JD Keyword Matching",
    description: "Analyzes job descriptions and aligns your resume with the exact skills and keywords needed.",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Go from job description to tailored resume in under 30 seconds. No manual editing required.",
  },
  {
    icon: Shield,
    title: "ATS-Optimized",
    description: "Every resume passes through ATS validation with a match score to maximize your chances.",
  },
  {
    icon: Globe,
    title: "Region-Specific Formats",
    description: "Templates customized for USA, India, Japan, Middle East — respecting local hiring norms.",
  },
  {
    icon: FileText,
    title: "PDF & DOCX Export",
    description: "Download your tailored resume instantly in the format you need. Ready to submit.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Built for <span className="text-gradient">Results</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every feature is designed to get you past the ATS and into the interview room.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
