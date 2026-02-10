const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-bold text-xl">
            <span className="text-gradient">ResumeAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 ResumeAI. Build better resumes, land better jobs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
