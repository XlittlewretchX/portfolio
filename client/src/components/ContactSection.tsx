import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github } from "lucide-react";
import { contactConfig } from "@/config/contact";
import { SiTelegram } from "react-icons/si";

export function ContactSection() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Почта",
      type: "email",
      value: contactConfig.email,
      href: `mailto:${contactConfig.email}`,
      description: "Напишите мне письмо",
    },
    {
      icon: SiTelegram,
      label: "Telegram",
      type: "telegram",
      value: "@x_little_wretch_x",
      href: "https://t.me/x_little_wretch_x",
      description: "Напишите мне в Telegram",
    },
    {
      icon: Github,
      label: "GitHub",
      type: "github",
      value: `@${contactConfig.github.username}`,
      href: contactConfig.github.url,
      description: "Загляните в мои репозитории",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" data-testid="text-contact-heading">
            Давайте работать вместе
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-contact-description">
            Я открыт к новым проектам, интересным идеям и предложениям о сотрудничестве.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.type}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={method.href}
                  target={method.type !== "email" ? "_blank" : undefined}
                  rel={
                    method.type !== "email"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block h-full"
                  data-testid={`link-contact-${method.type}`}
                >
                  <Card className="p-8 text-center hover-elevate active-elevate-2 transition-all duration-300 h-full">
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" data-testid={`icon-contact-${method.type}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2" data-testid={`text-contact-label-${method.type}`}>
                      {method.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2" data-testid={`text-contact-description-${method.type}`}>
                      {method.description}
                    </p>
                    <p
                      className="text-sm font-medium text-primary"
                      data-testid={`text-contact-value-${method.type}`}
                    >
                      {method.value}
                    </p>
                  </Card>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
