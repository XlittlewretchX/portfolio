import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Education, Course } from "@shared/schema";

export function EducationSection() {
  const { data: educationList, isLoading: educationLoading, error: educationError } = useQuery<
    Education[]
  >({
    queryKey: ["/api/education"],
  });

  const { data: courses, isLoading: coursesLoading, error: coursesError } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const courseVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const isLoading = educationLoading || coursesLoading;
  const hasError = educationError || coursesError;

  if (isLoading) {
    return (
      <section id="education" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Образование и сертификаты
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Загружаю информацию…
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section id="education" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Образование и сертификаты
            </h2>
            <p className="text-base md:text-lg text-destructive max-w-2xl mx-auto">
              Не удалось загрузить данные об образовании и курсах. Попробуйте позже.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" data-testid="text-education-heading">
            Образование и сертификаты
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-education-description">
            Постоянно учусь и развиваюсь профессионально.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary" data-testid="icon-education" />
              </div>
              <h3 className="text-2xl font-semibold" data-testid="text-education-section-title">Образование</h3>
            </div>

            {educationList && educationList.length > 0 ? (
              <motion.div
                className="space-y-6 relative pl-8 border-l-2 border-border"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {educationList.map((edu) => (
                  <motion.div
                    key={edu.id}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <Card className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="text-xs"
                          data-testid={`badge-edu-year-${edu.id}`}
                        >
                          {edu.startYear}
                          {edu.endYear ? ` - ${edu.endYear}` : " - настоящее время"}
                        </Badge>
                      </div>
                      <h4
                        className="text-xl font-semibold mb-1"
                        data-testid={`text-edu-institution-${edu.id}`}
                      >
                        {edu.institution}
                      </h4>
                      <p
                        className="text-base text-foreground/90 mb-1"
                        data-testid={`text-edu-degree-${edu.id}`}
                      >
                        {edu.degree}
                        {edu.field && ` · ${edu.field}`}
                      </p>
                      {edu.description && (
                        <p
                          className="text-sm text-muted-foreground leading-relaxed"
                          data-testid={`text-edu-description-${edu.id}`}
                        >
                          {edu.description}
                        </p>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-muted-foreground">Записей об образовании пока нет.</p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="w-6 h-6 text-primary" data-testid="icon-courses" />
              </div>
              <h3 className="text-2xl font-semibold" data-testid="text-courses-section-title">Курсы и сертификаты</h3>
            </div>

            {courses && courses.length > 0 ? (
              <motion.div
                className="grid gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {courses.map((course) => (
                  <motion.div key={course.id} variants={courseVariants}>
                    <Card className="p-6 hover-elevate active-elevate-2 transition-all duration-300">
                      <h4
                        className="text-lg font-semibold mb-2"
                        data-testid={`text-course-name-${course.id}`}
                      >
                        {course.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge
                          variant="secondary"
                          className="text-xs"
                          data-testid={`badge-course-platform-${course.id}`}
                        >
                          {course.platform}
                        </Badge>
                        <span
                          className="text-sm text-muted-foreground"
                          data-testid={`text-course-date-${course.id}`}
                        >
                          {course.completionDate}
                        </span>
                      </div>
                      {course.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {course.description}
                        </p>
                      )}
                      {course.certificateUrl && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          data-testid={`button-certificate-${course.id}`}
                        >
                          <a
                            href={course.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Посмотреть сертификат
                            <ExternalLink className="ml-2 w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-muted-foreground">
                Пока нет информации о курсах и сертификатах.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
