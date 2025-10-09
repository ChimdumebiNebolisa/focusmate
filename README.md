# FocusMate 🎯

A productivity assistant that helps users stay focused using accountability sessions, task management, and minimal distractions.

---

## 🧠 Overview

FocusMate pairs accountability, timers, and task tracking to help people maintain focus during work or study sessions. It creates a structured environment that encourages productive habits and measurable progress.

---

## YOUR PROJECT README:

- Problem: staying consistent with deep work is hard without structure or accountability.  
- Solution: a simple session‑based workflow (plan → focus → reflect) with tasks, timers, and progress logs.  
- Users: students, developers, and professionals who want fewer distractions and better output.  
- Outcome: increased session completion, clearer goals, and a repeatable focus ritual.

---

## 🚀 Features

- Task list with due dates and priorities  
- Session timer (Pomodoro or custom durations)  
- Focus mode (minimal UI; optional blocker integrations)  
- Start/End check-ins (goal + reflection)  
- Session history and simple analytics  
- Light/Dark theme

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS |
| Backend | Node.js/Express **or** Flask (choose one) |
| Database | PostgreSQL / Firebase |
| Auth | JWT or OAuth |
| Infra | Vercel / Render / Fly.io |
| Optional | Chrome AI APIs for on-device text features |

---

## 📂 Project Structure

```
├── frontend/            # React UI
├── backend/             # API / server logic
├── shared/              # Shared types/utilities
├── scripts/             # Build/deploy scripts
├── README.md
└── LICENSE
```

---

## 🔧 Setup & Installation

1) Clone and enter the repo  
```bash
git clone https://github.com/ChimdumebiNebolisa/focusmate.git
cd focusmate
```
2) Backend setup  
```bash
cd backend
npm install
# or: pip install -r requirements.txt
```
3) Frontend setup  
```bash
cd ../frontend
npm install
```
4) Create `.env` files (examples below)
```
# Backend
DATABASE_URL=...
JWT_SECRET=...

# Frontend
VITE_API_URL=http://localhost:5000
```
5) Run dev servers (separate terminals)
```bash
# backend
npm run dev   # or: flask run
# frontend
npm run dev
```
Open [here](https://focusmate-tau.vercel.app/)

---

## 📌 Usage Workflow

1) Log in or create an account  
2) Add tasks for the current session  
3) Start a timer (e.g., 25/50/custom)  
4) Focus; avoid context switching  
5) End session; reflect and log outcomes

---

## RECRUITEMENT GATHERING

- Identify primary user groups (students, junior devs, indie hackers) and their friction points.  
- Capture user stories and acceptance criteria to bound scope.  
- Validate minimal feature set via quick clickable prototype.


---

## ANALYSIS AND DESIGN

- Define system responsibilities (timer, tasks, sessions, analytics).  
- Draft component hierarchy and state model.  
- Design minimal, distraction-free UI with clear CTAs.  
- Map API endpoints and data model.

---

## IMPLEMENTATION

- Build React views and reusable components.  
- Implement REST endpoints for tasks/sessions.  
- Add auth guard and role-free permissions (MVP).  
- Persist sessions and expose summary aggregates.


---

## TESTING

- Unit tests for core utilities and reducers.  
- Integration tests for API endpoints.  
- E2E smoke tests for the core flow (login → start → finish).  
- Manual QA checklist for UX fit and accessibility.

---

## DEPLOYMENT

- CI/CD pipeline: lint, test, build, preview.  
- Deploy backend (Render/Fly.io) and frontend (Vercel).  
- Environment segregation: dev → preview → prod.  
- Post-deploy smoke test and health checks.

---

## MAINTENANCE

- Logging and monitoring with minimal overhead.  
- Error reporting pipeline (Sentry/OpenTelemetry).  
- Backups for DB; rotation policies.  
- Groom backlog; ship small improvements regularly.


---

## 📈 Roadmap (Next)

- Calendar sync (Google) for session planning  
- Weekly productivity insights & streaks  
- Team sessions (pair or group)  
- PWA & offline mode

---

## 🤝 Contributing

1) Fork the repo  
2) Create a feature branch (`git checkout -b feature/name`)  
3) Commit changes with context (`feat: add session analytics`)  
4) Open a PR with screenshots where relevant

---

## 📝 License

MIT — see `LICENSE`.
