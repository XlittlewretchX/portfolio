import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@shared/schema";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiFigma,
  SiNextdotjs,
  SiVite,
  SiFramer,
} from "react-icons/si";

import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: SiCss3,
  tailwindcss: SiTailwindcss,
  nodejs: SiNodedotjs,
  git: SiGit,
  figma: SiFigma,
  nextjs: SiNextdotjs,
  vite: SiVite,
  framer: SiFramer,
};

export function SkillsSection() {
  const { data: skills, isLoading, error } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  if (isLoading) {
    return (
      <section id="skills" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Навыки и технологии
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Загружаю навыки…
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Навыки и технологии
            </h2>
            <p className="text-base md:text-lg text-destructive max-w-2xl mx-auto">
              Не удалось получить список навыков. Попробуйте позже.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" data-testid="text-skills-heading">
            Навыки и технологии
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-skills-description">
            Инструменты и технологии, с помощью которых я воплощаю идеи.
          </p>
        </motion.div>

        {groupedSkills &&
          Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="mb-12 last:mb-0">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 capitalize" data-testid={`text-category-${category}`}>
                {category}
              </h3>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {categorySkills.map((skill) => {
                  const Icon = iconMap[skill.icon] || SiReact;
                  return (
                    <motion.div key={skill.id} variants={itemVariants}>
                      <Card className="p-6 text-center hover-elevate active-elevate-2 transition-all duration-300 h-full">
                        <div
                          className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10"
                          data-testid={`icon-skill-${skill.id}`}
                        >
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <p
                          className="text-sm font-medium"
                          data-testid={`text-skill-${skill.id}`}
                        >
                          {skill.name}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}

        {(!skills || skills.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Список навыков пока пуст. Совсем скоро здесь появится информация!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
