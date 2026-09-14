let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    const taskInput = document.getElementById("taskInput");
    const modeBtn = document.getElementById("modeBtn");

    // Load saved tasks
    try {
        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            tasks = JSON.parse(savedTasks);

            // Make sure the saved data is actually an array
            if (!Array.isArray(tasks)) {
                tasks = [];
            }
        }
    } catch (error) {
        console.error("Could not load tasks:", error);
        tasks = [];
    }

    renderTasks();

    // Add task button
    addBtn.addEventListener("click", addTask);

    // Press Enter to add task
    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Toggle dark mode
    modeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        // Remember dark mode
        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark")
        );
    });

    // Restore dark mode
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
});


// Add a new task
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    // Don't add empty tasks
    if (!text) {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";

    saveTasks();
    renderTasks();

    input.focus();
}


// Display tasks
function renderTasks() {
    const list = document.getElementById("taskList");

    if (!list) {
        console.error("Element #taskList was not found.");
        return;
    }

    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Task text
        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        // Toggle completed
        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.type = "button";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);

            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}


// Save tasks
function saveTasks() {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("Could not save tasks:", error);
    }
}