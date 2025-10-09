# FocusMate 🎯  

A productivity assistant that helps users stay focused using accountability sessions, task management, and minimal distractions.

---

## 🧠 Overview  

FocusMate pairs together accountability, timers, and task tracking to help people maintain focus during work or study sessions. It creates structured environments that encourage productive habits.  

---

## 🚀 Features  

- Task List / To-Do items with deadlines  
- Session Timer (e.g. Pomodoro-style, adjustable durations)  
- Distraction-limiting mode (blocks or dims certain UI elements)  
- Session check-ins: begin and end with short status updates  
- Theme support (light / dark mode)  
- Optional session history & statistics dashboard  

---

## 🛠️ Tech Stack  

| Layer       | Technologies                |
|--------------|-----------------------------|
| Frontend     | React, Tailwind CSS         |
| Backend      | Node.js / Express / Flask (or your chosen stack) |
| Database     | PostgreSQL / MongoDB / Firebase |
| Auth & API   | JWT, OAuth, REST or GraphQL |
| Hosting / Infra | Vercel / Netlify / Heroku / AWS |

---

## 📂 Project Structure  

```
├── frontend/            # UI code, React or equivalent  
├── backend/             # API / server logic  
├── shared/              # Shared models, types, utilities  
├── scripts/             # Build, deployment, migration scripts  
├── README.md  
└── LICENSE  
```

---

## 🔧 Setup & Installation  

1. Clone the repository  
   ```bash
   git clone https://github.com/ChimdumebiNebolisa/focusmate.git
   cd focusmate
   ```  
2. Setup backend  
   ```bash
   cd backend  
   npm install  
   # or `pip install -r requirements.txt` if Python  
   ```  
3. Setup frontend  
   ```bash
   cd ../frontend  
   npm install  
   ```  
4. Create a `.env` file with required environment variables (e.g. `DATABASE_URL`, `JWT_SECRET`)  
5. Run migrations (if needed)  
6. Start backend and frontend (in separate terminals)  
   ```bash
   npm run dev   # or `flask run`  
   npm start     # or `react-scripts start`  
   ```  

Visit `http://localhost:3000` (or your configured port) to see the app.

---

## 📌 Usage & Workflow  

1. Register / log in  
2. Add tasks to your session  
3. Start a focus session (e.g. 25, 50, or custom minutes)  
4. At session start: state your goal  
5. Work without distractions  
6. At session end: reflect and log your progress  

---

## 📈 Roadmap & Future Enhancements  

- Add analytics: weekly/monthly productivity charts  
- Integrate calendar syncing (Google Calendar, iCal)  
- Collaboration mode (pair or group sessions)  
- Mobile app version  
- Offline support & PWA capabilities  

---

## 🤝 Contributing  

Contributions are welcome! To get started:

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature/name`)  
3. Make your changes & tests  
4. Commit & push (`git commit -m "Add feature X"`)  
5. Open a Pull Request  

Please adhere to the coding standards and include tests where possible.

---

## 📝 License  

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

---

## 🙏 Acknowledgments  

- Inspiration from productivity tools & Pomodoro techniques  
- Open-source libraries and community contributions  
