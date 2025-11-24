import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

export function ProjectsSection() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const rawBase = import.meta.env.BASE_URL ?? "/";
  const normalizedBase =
    rawBase === "/" ? "" : rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

  const resolveAsset = (path?: string | null) => {
    if (!path) return undefined;
    if (/^https?:\/\//.test(path)) {
      return path;
    }
    return `${normalizedBase}${path}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Ключевые проекты
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Загружаю проекты…
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Ключевые проекты
            </h2>
            <p className="text-base md:text-lg text-destructive max-w-2xl mx-auto">
              Не удалось загрузить проекты. Попробуйте позже.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" data-testid="text-projects-heading">
            Ключевые проекты
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-projects-description">
            Подборка проектов, которые лучше всего демонстрируют мой опыт в
            современной веб‑разработке и дизайне.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects?.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={index % 3 === 0 ? "md:col-span-2" : ""}
            >
              <Card className="overflow-hidden h-full hover-elevate active-elevate-2 transition-all duration-300 group">
                {project.imageUrl && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={resolveAsset(project.imageUrl)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid={`img-project-${project.id}`}
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <h3
                    className="text-2xl md:text-3xl font-semibold mb-3"
                    data-testid={`text-project-title-${project.id}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-base text-muted-foreground leading-relaxed mb-4"
                    data-testid={`text-project-description-${project.id}`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="font-mono text-xs"
                        data-testid={`badge-tech-${tech}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <Button
                        asChild
                        size="sm"
                        data-testid={`button-live-${project.id}`}
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Открыть сайт
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        data-testid={`button-github-${project.id}`}
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                          <Github className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {(!projects || projects.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Пока здесь пусто. Совсем скоро появятся новые проекты!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
