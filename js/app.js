// Element Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const card = document.querySelector(".card");
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    form.addEventListener("submit", addTodo);
    todoList.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

// TODO
function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") showAlert("danger", "Please enter a todo...");
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success", "Todo added..");
    }

    e.preventDefault();
}

function deleteTodo(e) {
    if (e.target.className === "fa-solid fa-trash text-danger") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success", "Todo deleted.");
    }
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach((listItem) => {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Bulamadı
            listItem.setAttribute("style", "display: none !important");
        } else {
            listItem.setAttribute("style", "display: block");
        }
    });
}

function clearAllTodos(e) {
    if (confirm("Are you sure?")) {
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

// UI
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

function addTodoToUI(newTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa-solid fa-trash text-danger'></i>";

    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";
}

// STORAGE
function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) todos = [];
    else todos = JSON.parse(localStorage.getItem("todos"));

    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

// HELPER
function showAlert(type, message) {
    const alertDiv = document.querySelector("#alert");
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    alertDiv.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 2000);
}
