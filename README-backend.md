# Study Session Planner — Backend

REST API for the Study Session Planner application, built with Express.js, TypeScript, Prisma, and PostgreSQL.

## 🚀 Live Demo

- **API:** [https://study-session-backend-vhhw.onrender.com](https://study-session-backend-vhhw.onrender.com)
- **Frontend:** [https://study-session-project.netlify.app](https://study-session-project.netlify.app)

## 📋 About

Study Session Planner is a full-stack application that allows users to track and manage their study sessions. Users can create subjects, log study sessions with duration and notes, and view statistics about their study habits.

This repository contains the backend REST API that powers the application.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Deployment:** Render

## 📁 Project Structure

```
study-session-backend/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/           # Database migrations
├── src/
│   ├── controllers/
│   │   ├── subject.controller.ts
│   │   └── session.controller.ts
│   ├── routes/
│   │   ├── subject.routes.ts
│   │   └── session.routes.ts
│   ├── types.ts              # TypeScript interfaces
│   ├── prisma.ts             # Prisma client instance
│   └── app.ts                # Express app setup
├── prisma.config.ts
├── tsconfig.json
└── package.json
```

## 📊 Database Models

### Subject

| Field       | Type     | Description              |
|-------------|----------|--------------------------|
| id          | Int      | Primary key              |
| name        | String   | Subject name             |
| description | String?  | Optional description     |
| color       | String   | Hex color for UI display |
| createdAt   | DateTime | Creation timestamp       |
| updatedAt   | DateTime | Last update timestamp    |

### StudySession

| Field     | Type     | Description              |
|-----------|----------|--------------------------|
| id        | Int      | Primary key              |
| date      | DateTime | Session date             |
| duration  | Int      | Duration in minutes      |
| notes     | String?  | Optional notes           |
| subjectId | Int      | Foreign key to Subject   |
| createdAt | DateTime | Creation timestamp       |
| updatedAt | DateTime | Last update timestamp    |

**Relationship:** One Subject has many StudySessions (1:N). Deleting a subject cascades to its sessions.

## 🔗 API Endpoints

### Subjects — `/api/subjects`

| Method | Route              | Description                          |
|--------|--------------------|--------------------------------------|
| GET    | `/api/subjects`    | Get all subjects (with sessions)     |
| GET    | `/api/subjects/:id`| Get subject by ID (with sessions)    |
| POST   | `/api/subjects`    | Create a new subject                 |
| PUT    | `/api/subjects/:id`| Update a subject                     |
| DELETE | `/api/subjects/:id`| Delete a subject (cascades sessions) |

### Study Sessions — `/api/sessions`

| Method | Route               | Description                      |
|--------|----------------------|----------------------------------|
| GET    | `/api/sessions`     | Get all sessions (with subject)  |
| GET    | `/api/sessions/:id` | Get session by ID (with subject) |
| POST   | `/api/sessions`     | Create a new session             |
| PUT    | `/api/sessions/:id` | Update a session                 |
| DELETE | `/api/sessions/:id` | Delete a session                 |

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone https://github.com/ArthurSJz/study-session-backend.git
cd study-session-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Run database migrations
npx prisma migrate dev --name init

# Start the development server
npm run dev
```

### Environment Variables

| Variable      | Description                    |
|---------------|--------------------------------|
| DATABASE_URL  | PostgreSQL connection string   |
| PORT          | Server port (default: 3000)    |
| FRONTEND_URL  | Frontend URL for CORS          |

## 📜 Scripts

| Script              | Description                    |
|---------------------|--------------------------------|
| `npm run dev`       | Start development server       |
| `npm run build`     | Compile TypeScript             |
| `npm start`         | Start production server        |
| `npm run prisma:migrate` | Run Prisma migrations    |
| `npm run prisma:generate` | Generate Prisma Client  |

## 🔗 Related

- [Frontend Repository](https://github.com/ArthurSJz/study-session-frontend)
