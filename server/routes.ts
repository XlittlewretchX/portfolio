import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertProjectSchema,
  insertEducationSchema,
  insertCourseSchema,
  insertSkillSchema,
} from "@shared/schema";
import { z } from "zod";
import { log } from "./vite";

// Helper function to handle route errors
function handleRouteError(error: unknown, res: Response, defaultMessage: string, statusCode = 500) {
  console.error(`Route error: ${defaultMessage}`, error);
  
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      error: "Ошибка валидации",
      details: process.env.NODE_ENV === "development" ? error.errors : undefined,
    });
  }
  
  const errorMessage = process.env.NODE_ENV === "production" && statusCode >= 500
    ? "Internal Server Error"
    : defaultMessage;
  
  res.status(statusCode).json({ error: errorMessage });
}

// Helper function to handle GET requests
function handleGet<T>(
  handler: (req: Request) => Promise<T | undefined>,
  notFoundMessage: string,
  errorMessage: string,
) {
  return async (req: Request, res: Response) => {
    try {
      const result = await handler(req);
      if (result === undefined) {
        return res.status(404).json({ error: notFoundMessage });
      }
      res.json(result);
    } catch (error) {
      handleRouteError(error, res, errorMessage);
    }
  };
}

// Helper function to handle GET list requests
function handleGetList<T>(handler: () => Promise<T[]>, errorMessage: string) {
  return async (_req: Request, res: Response) => {
    try {
      const result = await handler();
      res.json(result);
    } catch (error) {
      handleRouteError(error, res, errorMessage);
    }
  };
}

// Helper function to handle POST requests with validation
function handlePost<TData, TResult>(
  schema: z.ZodSchema<TData>,
  handler: (data: TData) => Promise<TResult>,
  errorMessage: string,
) {
  return async (req: Request, res: Response) => {
    try {
      const validatedData = schema.parse(req.body);
      const result = await handler(validatedData);
      res.status(201).json(result);
    } catch (error) {
      handleRouteError(error, res, errorMessage, 400);
    }
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects endpoints
  app.get("/api/projects", handleGetList(
    () => storage.getProjects(),
    "Не удалось получить список проектов",
  ));

  app.get("/api/projects/:id", handleGet(
    (req: Request) => storage.getProject(req.params.id),
    "Проект не найден",
    "Не удалось загрузить проект",
  ));

  app.post("/api/projects", handlePost(
    insertProjectSchema,
    (data) => storage.createProject(data),
    "Некорректные данные проекта",
  ));

  // Education endpoints
  app.get("/api/education", handleGetList(
    () => storage.getEducation(),
    "Не удалось загрузить список образования",
  ));

  app.get("/api/education/:id", handleGet(
    (req: Request) => storage.getEducationById(req.params.id),
    "Запись об образовании не найдена",
    "Не удалось загрузить запись об образовании",
  ));

  app.post("/api/education", handlePost(
    insertEducationSchema,
    (data) => storage.createEducation(data),
    "Некорректные данные об образовании",
  ));

  // Courses endpoints
  app.get("/api/courses", handleGetList(
    () => storage.getCourses(),
    "Не удалось получить список курсов",
  ));

  app.get("/api/courses/:id", handleGet(
    (req: Request) => storage.getCourse(req.params.id),
    "Курс не найден",
    "Не удалось загрузить курс",
  ));

  app.post("/api/courses", handlePost(
    insertCourseSchema,
    (data) => storage.createCourse(data),
    "Некорректные данные курса",
  ));

  // Skills endpoints
  app.get("/api/skills", handleGetList(
    () => storage.getSkills(),
    "Не удалось получить навыки",
  ));

  app.get("/api/skills/:id", handleGet(
    (req: Request) => storage.getSkill(req.params.id),
    "Навык не найден",
    "Не удалось загрузить навык",
  ));

  app.post("/api/skills", handlePost(
    insertSkillSchema,
    (data) => storage.createSkill(data),
    "Некорректные данные навыка",
  ));

  const httpServer = createServer(app);
  return httpServer;
}
