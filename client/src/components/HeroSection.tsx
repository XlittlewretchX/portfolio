import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { contactConfig } from "@/config/contact";
import { SiTelegram } from "react-icons/si";

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const codeSnippet = `const developer = {
  name: "Никита",
  role: "Фронтенд-разработчик",
  skills: ["React", "TypeScript", "UI/UX"],
  passion: "Создаю запоминающиеся интерфейсы"
};

export default developer;`;

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium mb-4" data-testid="text-hero-welcome">
                Добро пожаловать в моё портфолио
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" data-testid="text-hero-title">
                Фронтенд
                <br />
                <span className="text-primary">разработчик</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-base md:text-lg leading-relaxed text-foreground/80 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              data-testid="text-hero-description"
            >
              Создаю яркие цифровые продукты на современном веб‑стеке. Люблю чистый
              код, выразительные интерфейсы и дизайн, в центре которого находится
              пользователь.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                data-testid="button-view-projects"
              >
                Смотреть проекты
                <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                data-testid="button-download-resume"
              >
                <a href="/resume.pdf" download>
                  Скачать резюме
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href={contactConfig.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover-elevate active-elevate-2 rounded-md"
                aria-label="GitHub"
                data-testid="link-hero-github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
              href="https://t.me/x_little_wretch_x"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover-elevate active-elevate-2 rounded-md"
              aria-label="Telegram"
              data-testid="link-footer-telegram"
            >
              <SiTelegram className="w-5 h-5" />
            </a>
              <a
                href={`mailto:${contactConfig.email}`}
                className="p-2 hover-elevate active-elevate-2 rounded-md"
                aria-label="Email"
                data-testid="link-hero-email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:col-span-3 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative bg-card border border-card-border rounded-xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-chart-4" />
                <div className="w-3 h-3 rounded-full bg-chart-2" />
                <span className="ml-auto text-xs text-muted-foreground font-mono">
                  developer.ts
                </span>
              </div>
              <pre className="text-xs md:text-sm font-mono overflow-x-auto">
                <code className="text-foreground/90">{codeSnippet}</code>
              </pre>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl -z-10 opacity-50" />
            </div>

            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
