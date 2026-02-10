import { motion } from "framer-motion";
import { UserPlus, ClipboardPaste, Cpu, Download } from "lucide-react";

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
    title: "Paste a Job Description",
    description: "Copy any JD from LinkedIn, Indeed, or anywhere. Our AI analyzes it instantly.",
  },
  {
    icon: Cpu,
    step: "03",
    title: "AI Tailors Your Resume",
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
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">Four steps to your perfect resume.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-xs font-mono text-primary mb-2">{step.step}</div>
              <h3 className="text-lg font-semibold font-display mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
