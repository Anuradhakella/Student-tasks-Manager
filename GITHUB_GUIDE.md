# GitHub Upload & Deployment Guide

## Run locally & test
1. Open `index.html` in Chrome/Firefox/Edge.
2. Test: click Add Task with an empty name (error appears) • add 3 tasks with different priorities • complete one (stats update) • try each filter • delete one • refresh (tasks remain) • resize the window / use phone view in DevTools (F12 → device icon).

## Upload to GitHub
1. Create an account at https://github.com and install Git (https://git-scm.com).
2. On GitHub click **New repository** → name it `student-task-manager` → Public → **Create** (don't add a README).
3. In a terminal inside the project folder:
```bash
git init
git add .
git commit -m "Initial commit: Student Task Manager"
git branch -M main
git remote add origin https://github.com/<your-username>/student-task-manager.git
git push -u origin main
```
(No terminal? Use **Add file → Upload files** on the repository page and drag in all files.)

## Deploy with GitHub Pages
1. Open the repository → **Settings** → **Pages**.
2. Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → **Save**.
3. Wait 1–2 minutes; your site is live at `https://<your-username>.github.io/student-task-manager/`.
4. Paste that link into the README and the repository's "About" → Website field.

## Screenshots
Take a desktop and a mobile screenshot, save them as `screenshots/desktop.png` and `screenshots/mobile.png`, then commit and push.

## Repository description
> A responsive Student Task Manager built with HTML, CSS and JavaScript — add, complete, filter and delete tasks with priorities and due dates, saved in Local Storage.

Suggested topics: `javascript` `html` `css` `task-manager` `localstorage` `student-project`
