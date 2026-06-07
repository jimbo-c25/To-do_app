// First two consts are for drag and drop functionality
const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

// Rest of consts are for adding/completing tasks functionality
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const addedTasks = document.getElementById("added-tasks");
const itemsLeft = document.getElementById("items-left");
const clearCompleted = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");

for(const card of cards) {
    card.addEventListener("dragstart", dragStart)
    card.addEventListener("dragend", dragEnd)
}

for(const list of lists) {
    list.addEventListener("dragover", dragOver)
    list.addEventListener("dragenter", dragEnter)
    list.addEventListener("dragleave", dragLeave)
    list.addEventListener("drop", dragDrop)
}

function dragStart(e) {
    //this allows drop location to know which element is being dragged
    e.dataTransfer.setData("text/plain", this.id);
    console.log("drag initiated");
};

function dragEnd() {
    console.log("drag ended");
};

function dragOver(e) {
    e.preventDefault();
};

function dragEnter(e) {
    e.preventDefault();

    this.classList.add("over");
};

function dragLeave(e) {
    this.classList.remove("over");
};

function dragDrop(e) {
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);
    this.appendChild(card);
    this.classList.remove("over");
};

// rest of functionality
let todoList = [];
let currentFilter = "all";

addTaskBtn.addEventListener("click", () => {
    addTodo(taskInput.value);
});

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo(taskInput.value);
});

clearCompleted.addEventListener("click", clearCompletedTasks);

function addTodo(text) {
    if (text.trim() === "") return;

    const todo = {
        id: Date.now(),
        text,
        completed: false
    }

        todoList.push(todo);

        saveTodos();
        //renderTodos();
};

function saveTodos() {
    localStorage.setItem("newTask", JSON.stringify(todoList));
    updateItemsleft();
    checkEmptyState();
};

function updateItemsLeft() {
    const imcompleteTodos = todoList.filter(todoList => !todoList.completed);
    itemsLeft.textContent = `${incompleteTodos.length} item${
        incompleteTodos.length !== 1 ? "s" : ""
    } left`;
};

function checkEmptyState() {
    const filteredTodos = filterTodos(currentFilter);

    if (filteredTodos.length === 0) emptyState.classList.toggle("hidden", false);
    else emptyState.classList.toggle("hidden", true);
};

function filterTodos(filter) {
    switch (filter) {
        case "active" :
            return todoList.filter(todo => !todo.completed);
        case "completed" :
            return todoList.filter(todo => todo.completed);
        default: 
            return todoList;
    };
};

function renderTasks() {
    todoList.innerHTML = "";

    const filteredTodos = filterTodos(currentFilter);

    filteredTodos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("card");
        todoItem.textContent = todo.text;
        todoItem.appendChild("added-tasks");

        if (todo.completed) todoItem.classList.add("completed");
    });
};

function clearCompletedTasks() {};

function toggleTodoId(id) {};
