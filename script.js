let tasks = [];

// Load saved tasks
window.onload = function () {
  const saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
  }

  renderTasks();
};

// Form submit
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

// Dark mode
document.getElementById("modeBtn").addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({
    text: text.toUpperCase(),
    completed: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

// Render tasks
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const btn = document.createElement("button");
    btn.innerText = "🗑️";

    btn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Save
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}