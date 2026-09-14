// Array to store tasks
let tasks = [];

// Load saved tasks
window.onload = function () {
    const saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
};

// Event handling (submit form)
document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent reload
    addTask();
});

// Dark mode button
document.getElementById("modeBtn").addEventListener("click", function () {
    document.body.classList.toggle("dark");
});

// Function to add task
function addTask() {
    const input = document.getElementById("taskInput");
    let text = input.value.trim(); // string manipulation

    if (text === "") return; // condition

    tasks.push({
        text: text.toUpperCase(), // string manipulation
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

// Function to render tasks
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    // Loop
    tasks.forEach(function (task, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = task.text;

        if (task.completed) {
            span.classList.add("completed"); // condition
        }

        // Click event
        span.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Delete button
        const btn = document.createElement("button");
        btn.innerText = "X";

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

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}