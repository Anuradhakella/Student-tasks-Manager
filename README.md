# 📚 Student Task Manager

A clean, responsive web app that helps students manage daily tasks, assignments, exams and deadlines. Built with plain **HTML, CSS and JavaScript** — no frameworks, no backend.

**Live demo:** `https://<your-username>.github.io/student-task-manager/`

## ✨ Features
- Add tasks with a name, due date and priority (High / Medium / Low)
- Mark tasks as completed or pending
- Delete tasks (with confirmation)
- Filter by All, Pending and Completed
- Live statistics: total, completed and pending tasks
- Overdue tasks are highlighted
- Tasks saved in browser Local Storage (survive page refresh)
- Input validation — empty task names are blocked
- Friendly empty-state message
- Responsive design for phones, tablets and desktops

## 🛠 Technologies
- HTML5
- CSS3 (Flexbox, Grid, media queries, CSS variables)
- Vanilla JavaScript (ES6, DOM API, Local Storage)

## 📁 Folder Structure
```
student-task-manager/
├── index.html      # Page structure
├── style.css       # Styling and responsive layout
├── script.js       # App logic and Local Storage
├── README.md       # Project documentation
├── .gitignore
└── screenshots/    # Add your screenshots here
```

## 🚀 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/student-task-manager.git
   ```
2. Open the folder and double-click `index.html` — or use the VS Code **Live Server** extension.

No installation or internet connection is required (except to load the Google Font).

## 📖 Usage
1. Type a task name, choose a due date and priority, then click **Add Task**.
2. Tick the checkbox or click **✓ Done** to complete a task; click **↺ Pending** to undo.
3. Click **🗑 Delete** to remove a task.
4. Use the **All / Pending / Completed** buttons to filter.
5. Refresh the page — your tasks are still there.

## 🖼 Screenshots
| Desktop | Mobile |
|---------|--------|
| ![Desktop](screenshots/desktop.png) | ![Mobile](screenshots/mobile.png) |

## 🔮 Future Improvements
- Edit existing tasks
- Sort by due date or priority
- Dark mode
- Categories (Assignment, Exam, Project)

## 👤 Author
**Your Name** — [GitHub](https://github.com/<your-username>)

## 📄 License
This project is open source under the MIT License.
