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

    if (card.id === "list2") {
        card.appendChild("active-tasks");
    } else if (card.id === "list3") {
        card.appendChild("completed-tasks");
    };
};

// rest of functionality
let todoList = [];
let activeList = [];
let completedList = [];

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
        renderTodos();
        taskInput.value = "";
};

function saveTodos() {
    localStorage.setItem("newTask", JSON.stringify(todoList));
    updateItemsleft();
    checkEmptyState();
};

function updateItemsLeft() {
    if (completedList.length < 1 || completedList.length === 0) {
        itemsLeft.textContent = `${completedList.length} items`;
    } else {
        itemsLeft.textContent = `${completedList.length} item`;
    }
};

function checkEmptyState() {
    if (completedList.length === 0) emptyState.classList.toggle("hidden");
    else emptyState.classList.toggle("hidden");
};


function renderTodos() {
    todoList.innerHTML = "";

    todoList.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("card");
        todoItem.textContent = todo.text;
        todoItem.appendChild("added-tasks");
    });
};

function clearCompletedTasks() {
    todoList = todoList.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
};

function toggleTodoId(id) {
    todoList = todoList.map(todo => {
        if (todo.id === id) {
            return {...todo, completed: !todo.completed};
        };

        return todo;
    });
    saveTodos();
    renderTodos();
};

function deleteTodo(id) {
    todoList = todoList.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
};

function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) todosList = JSON.parse(storedTodos);
    renderTodos();
};

/* filters.forEach(filter => {
    filter.addEventListener("drop", () => {
        currentFilter = filter.id;
        renderTodos();
    });
}); */

function setActiveFilter(filterId) {
    currentFilter = filterId;

    filters.forEach((item) => {
        if (item.getAttribute("data-filter") === filterId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    renderTodos();
};

window.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    updateItemsLeft();
});
