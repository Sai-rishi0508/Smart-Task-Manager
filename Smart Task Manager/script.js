alert("JS loaded!"); 

let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(taskText => {
      addTaskToUI(taskText);
    });
  }
}

function addTaskToUI(taskText) {
  let listItem = document.createElement("li");
  listItem.textContent = taskText;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(listItem);
    tasks = tasks.filter(task => task !== taskText);
    saveTasks();
  });

  listItem.appendChild(deleteBtn);
  taskList.appendChild(listItem);
}

addBtn.addEventListener("click", () => {
  let taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push(taskText);
    addTaskToUI(taskText);
    saveTasks();
    taskInput.value = "";
  } else {
    alert("Please enter a task.");
  }
});

loadTasks(); 
