// ===== Student Task Manager =====
// All tasks are stored in the browser's Local Storage.

const STORAGE_KEY = "studentTasks";

// --- DOM elements ---
const form = document.getElementById("taskForm");
const nameInput = document.getElementById("taskName");
const dateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const errorMsg = document.getElementById("errorMsg");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");

// --- App state ---
let tasks = loadTasks();
let currentFilter = "all";

// Load tasks from Local Storage (or an empty list)
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// Save tasks to Local Storage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Format "2026-10-15" as "Oct 15, 2026"
function formatDate(dateStr) {
  if (!dateStr) return "No due date";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

// Check if a pending task is past its due date
function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.dueDate + "T00:00:00") < today;
}

// Update the statistics cards
function updateStats() {
  const completed = tasks.filter((t) => t.completed).length;
  document.getElementById("totalCount").textContent = tasks.length;
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("pendingCount").textContent = tasks.length - completed;
}

// Draw the task list based on the current filter
function renderTasks() {
  taskList.innerHTML = "";

  const visible = tasks.filter((t) => {
    if (currentFilter === "pending") return !t.completed;
    if (currentFilter === "completed") return t.completed;
    return true;
  });

  visible.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task ${task.priority}${task.completed ? " completed" : ""}`;

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark as completed");
    checkbox.addEventListener("change", () => toggleTask(task.id));

    // Info (name + meta). textContent keeps user input safe.
    const info = document.createElement("div");
    info.className = "task-info";
    const name = document.createElement("div");
    name.className = "task-name";
    name.textContent = task.name;
    const meta = document.createElement("div");
    meta.className = "task-meta";
    const badge = document.createElement("span");
    badge.className = `badge ${task.priority}`;
    badge.textContent = task.priority;
    const due = document.createElement("span");
    due.textContent = "📅 " + formatDate(task.dueDate);
    if (isOverdue(task)) {
      due.classList.add("overdue");
      due.textContent += " (overdue)";
    }
    meta.append(badge, due);
    info.append(name, meta);

    // Action buttons
    const actions = document.createElement("div");
    actions.className = "actions";
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "icon-btn toggle";
    toggleBtn.textContent = task.completed ? "↺ Pending" : "✓ Done";
    toggleBtn.addEventListener("click", () => toggleTask(task.id));
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "icon-btn delete";
    deleteBtn.textContent = "🗑 Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    actions.append(toggleBtn, deleteBtn);

    li.append(checkbox, info, actions);
    taskList.appendChild(li);
  });

  // Friendly message when the list is empty
  emptyState.classList.toggle("show", visible.length === 0);
  updateStats();
}

// Add a new task
function addTask(name, dueDate, priority) {
  tasks.unshift({
    id: Date.now().toString(),
    name,
    dueDate,
    priority,
    completed: false,
  });
  saveTasks();
  renderTasks();
}

// Switch a task between completed and pending
function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  saveTasks();
  renderTasks();
}

// Remove a task after confirmation
function deleteTask(id) {
  if (!confirm("Delete this task?")) return;
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

// --- Event listeners ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();

  // Validation: task name must not be empty
  if (!name) {
    errorMsg.textContent = "Please enter a task name.";
    nameInput.classList.add("invalid");
    nameInput.focus();
    return;
  }

  errorMsg.textContent = "";
  nameInput.classList.remove("invalid");
  addTask(name, dateInput.value, priorityInput.value);
  form.reset();
  priorityInput.value = "Medium";
  nameInput.focus();
});

// Clear error as soon as the user types
nameInput.addEventListener("input", () => {
  errorMsg.textContent = "";
  nameInput.classList.remove("invalid");
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Initial render
renderTasks();
