import { Github, Linkedin, Mail } from "lucide-react";
import { SiReact, SiTelegram } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Проекты", id: "projects" },
    { label: "Навыки", id: "skills" },
    { label: "Образование", id: "education" },
    { label: "Контакты", id: "contact" },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4" data-testid="text-footer-title">Портфолио</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md" data-testid="text-footer-description">
              Фронтенд‑разработчик, который создаёт красивые и удобные цифровые продукты.
            </p>
          </div>

          <div className="md:text-right">
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4" data-testid="text-footer-links-heading">
              Навигация
            </h4>
            <nav className="flex flex-wrap md:justify-end gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate active-elevate-2 px-2 py-1 rounded-md"
                  data-testid={`link-footer-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover-elevate active-elevate-2 rounded-md"
              aria-label="GitHub"
              data-testid="link-footer-github"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
            <a
              href="https://t.me/x_little_wretch_x"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover-elevate active-elevate-2 rounded-md"
              aria-label="Telegram"
              data-testid="link-footer-telegram"
            >
              <SiTelegram className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="p-2 hover-elevate active-elevate-2 rounded-md"
              aria-label="Email"
              data-testid="link-footer-email"
            >
              <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
