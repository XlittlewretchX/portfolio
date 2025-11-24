import {
  type Project,
  type InsertProject,
  type Education,
  type InsertEducation,
  type Course,
  type InsertCourse,
  type Skill,
  type InsertSkill,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Education
  getEducation(): Promise<Education[]>;
  getEducationById(id: string): Promise<Education | undefined>;
  createEducation(education: InsertEducation): Promise<Education>;
  
  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  getSkill(id: string): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private education: Map<string, Education>;
  private courses: Map<string, Course>;
  private skills: Map<string, Skill>;

  constructor() {
    this.projects = new Map();
    this.education = new Map();
    this.courses = new Map();
    this.skills = new Map();
    
    this.seedData();
  }

  private seedData() {
    const sampleProjects: InsertProject[] = [
      {
        title: "Car assistant",
        description:
          "Приложение, позволяющее пользователям отслеживать расходы на топливо и обслуживание автомобиля.",
        technologies: ["React", "React Native", "TypeScript", "Node.js", "Express", "SQLite"],
        liveUrl: "https://t.me/Car_Ass_bot/CarAss",
        imageUrl: "/images/car-ass.png",
        featured: 3,
      },
      {
        title: "eBilet",
        description:
          "Веб-сервис для бронирования билетов на различные мероприятия",
        technologies: ["React", "TypeScript", "Redux", "Node.js", "Express", "SQLite"],
        liveUrl: "https://xlittlewretchx.github.io/ebilet/",
        githubUrl: "https://github.com/XlittlewretchX/ebilet",
        imageUrl: "/images/eBilet.png",
        featured: 2,
      },
      {
        title: "Mesto",
        description:
          "Интерактивная веб-страница, которая позволяет пользователям делиться фотографиями.",
        technologies: ["JavaScript"],
        liveUrl: "https://xlittlewretchx.github.io/mesto-project/",
        githubUrl: "https://github.com/XlittlewretchX/mesto-project",
        imageUrl: "/images/mesto.png",
        featured: 0,
      },
    ];

    const sampleEducation: InsertEducation[] = [
      {
        institution: "РТУ МИРЭА",
        degree: "Бакалавр",
        field: "Программная инженерия",
        startYear: "2023",
        endYear: "2027",
        description: "Разработка программных продуктов и проектирование информационных систем",
      },
    ];

    const sampleCourses: InsertCourse[] = [
      {
        name: "Frontend-разработчик",
        platform: "Яндекс Практикум",
        completionDate: "Июль 2025",
        certificateUrl: "https://education.yandex.ru/profile/docs?id=c227a7e4-340f-4eff-b9be-b006b0a77b65",
        description: "HTML, CSS, JavaScript, React, TypeScript, Redux, Git, Figma",
      },
    ];

    const sampleSkills: InsertSkill[] = [
      { name: "React", category: "Фронтенд", icon: "react" },
      { name: "TypeScript", category: "Фронтенд", icon: "typescript" },
      { name: "JavaScript", category: "Фронтенд", icon: "javascript" },
      { name: "HTML5", category: "Фронтенд", icon: "html5" },
      { name: "CSS3", category: "Фронтенд", icon: "css3" },
      { name: "React Native", category: "Фронтенд", icon: "react-native" },
      { name: "Node.js", category: "Бэкенд", icon: "nodejs" },
      { name: "Git", category: "Инструменты", icon: "git" },
      { name: "Figma", category: "Инструменты", icon: "figma" },
    ];

    sampleProjects.forEach(p => this.createProject(p));
    sampleEducation.forEach(e => this.createEducation(e));
    sampleCourses.forEach(c => this.createCourse(c));
    sampleSkills.forEach(s => this.createSkill(s));
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => b.featured - a.featured);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getEducation(): Promise<Education[]> {
    return Array.from(this.education.values()).sort((a, b) => {
      const yearA = parseInt(a.startYear) || 0;
      const yearB = parseInt(b.startYear) || 0;
      return yearB - yearA;
    });
  }

  async getEducationById(id: string): Promise<Education | undefined> {
    return this.education.get(id);
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const id = randomUUID();
    const education: Education = { ...insertEducation, id };
    this.education.set(id, education);
    return education;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getSkill(id: string): Promise<Skill | undefined> {
    return this.skills.get(id);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = randomUUID();
    const skill: Skill = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }
}

export const storage = new MemStorage();
