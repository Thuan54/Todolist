# Work Management Web Application

## 1. Business Overview

- **Purpose**: Personal task management web app to organize daily work, track tasks, and reduce manual effort.
- **Problem Solved**: Manual tracking → missed deadlines, poor visibility, no task breakdown.
- **Goals**: Simple task + subtask system, clear visibility of pending/completed work, zero friction.

- **Scope**: Single-user, local-only (no auth, no multi-user, no cloud initially).
- **Target**: Desktop-first web app.

---

## 2. Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: Local MongoDB

---

## 3. Core Features
- Full CRUD for tasks
- Tasks support embedded subtasks
- Priority (green/yellow/red), due date, description
- Dashboard (today’s tasks) + To-Do List (all pending)
- Task Detail page with subtask management
## 4. MongoDB Task Schema
```js
{
  _id: ObjectId,
  title: String,
  description: String,
  dueDate: Date,
  priority: "green" | "yellow" | "red",
  isCompleted: Boolean,
  subtasks: [{ title: String, isCompleted: Boolean }],
  createdAt: Date
}
```

---

## 5. API Endpoints (Task Module)

```
POST   /tasks    
GET    /tasks    
GET    /tasks/:id
PUT    /tasks/:id
DELETE /tasks/:id
```
---

## 6. Business Rules

- Task completion is manual (`isCompleted = true`)
- Subtasks are independent (no cascading completion)

---

## 7. UI Pages

- Dashboard (Today’s tasks)
- To-Do List (All pending)
- Task Detail Page
- Add/Edit Task Page

---

## 8. Test Stategy
- Jest, ≥70% coverage
- Unit: services, DTOs, hooks
- Integration: route ↔ service, service ↔ repo

**Ready to build – Use this file as the single source of truth.**