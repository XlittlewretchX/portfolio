# ReactFolio

Портфолио фронтенд‑разработчика на React c собственным сервером на Express и общими моделями данных. Клиент и сервер собираются одним проектом, поэтому достаточно одного репозитория, чтобы показать проекты, навыки, образование и курсы.

## Технологии

- **Клиент**: React 18, Vite 5, TypeScript, TanStack Query, framer-motion, shadcn/ui + Radix UI, Tailwind CSS.
- **Сервер**: Express 4, Vite middleware для dev, статическая раздача в production.

## Быстрый старт

```bash
git clone <repo>
cd ReactFolio
npm install
npm run dev
```

Сервер стартует на `http://localhost:5001` (порт можно переопределить переменной `PORT`). Vite автоматически проксирует клиент, так что все API и фронтенд открываются по одному адресу.

### Основные скрипты

| Скрипт            | Описание                                                |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Запуск Express + Vite в dev-режиме                      |
| `npm run build`   | Сборка клиентского бандла и серверного файла (ESBuild)  |
| `npm start`       | Запуск production-сборки из `dist/`                     |
| `npm run check`   | Проверка типов TypeScript                               |

## Настройка окружения

Создайте `.env` на основе `.env.example`. Минимально необходимы:

```ini
PORT=5001
ALLOWED_ORIGINS=http://localhost:5001

VITE_CONTACT_EMAIL=you@example.com
VITE_GITHUB_USERNAME=nickname
VITE_GITHUB_URL=https://github.com/nickname
VITE_LINKEDIN_PROFILE=/in/you
VITE_LINKEDIN_URL=https://linkedin.com/in/you
```
