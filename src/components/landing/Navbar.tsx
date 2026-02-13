import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Menu } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm border-b border-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group z-50"
          >
            <span className="text-xl font-bold tracking-tight font-display text-neutral-900 dark:text-white transition-colors">
              Resume<span className="text-primary">AI</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1 shadow-sm">
            <a
              href="#features"
              className="px-5 py-2 text-sm font-medium text-neutral-600 dark:text-white/70 hover:text-primary dark:hover:text-primary transition-all rounded-full"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="px-5 py-2 text-sm font-medium text-neutral-600 dark:text-white/70 hover:text-primary dark:hover:text-primary transition-all rounded-full"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="px-5 py-2 text-sm font-medium text-neutral-600 dark:text-white/70 hover:text-primary dark:hover:text-primary transition-all rounded-full"
            >
              Pricing
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 z-50">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-white/60 dark:hover:text-white bg-white/50 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 transition-all focus:outline-none ring-1 ring-neutral-200 dark:ring-white/10"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button
              onClick={() => navigate("/auth")}
              className="hidden md:inline-flex bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-105 transition-transform"
            >
              Get Started
            </Button>
            <button
              className="md:hidden p-2 text-neutral-600 dark:text-white/80"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-b border-neutral-200 dark:border-white/10 py-6 px-6 shadow-xl z-40">
          <div className="flex flex-col gap-6">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-neutral-600 dark:text-white/70"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-neutral-600 dark:text-white/70"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-neutral-600 dark:text-white/70"
            >
              Pricing
            </a>
            <Button onClick={() => navigate("/auth")} className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
