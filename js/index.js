import TaskController from "./controllers/TaskController.js"
import TaskService from "./services/TaskService.js"
import TaskView from "./views/TaskView.js"

// Intantiating MVC components
const taskService = new TaskService()
const taskView = new TaskView("#todo-list")
const taskController = new TaskController(taskService, taskView)

// Recovering data from database
taskController.getTasks()

// DOM elements
const itemInput = document.getElementById("item-input")
const form = document.getElementById("todo-add")
const todoList = document.getElementById("todo-list")

// Adding submit event into form
form.addEventListener("submit", function (e) {
    e.preventDefault()
    taskController.insert(itemInput.value)
    itemInput.value = ""
    itemInput.focus()
});

// Adding interaction event
todoList.addEventListener("click", (event) => {
    const dataAction = event.target.getAttribute("data-action")
    if (!dataAction) return

    let clickedItem = event.target
    while (clickedItem.nodeName !== "LI") {
        clickedItem = clickedItem.parentElement
    }
    let clickedItemIndex = [...todoList.querySelectorAll("li")].indexOf(clickedItem)

    const actions = {
        editButton: function () {
            const editContainer = clickedItem.querySelector(".editContainer");
            [...todoList.querySelectorAll(".editContainer")].forEach(container => {
                container.removeAttribute("style")
            });
            editContainer.style.display = "flex";
        },
        deleteButton: function () {
            const id = clickedItem.getAttribute("data-id")
            taskController.delete(id)
        },
        containerEditButton: function () {
            const id = clickedItem.getAttribute("data-id")
            const value = clickedItem.querySelector(".editInput").value
            taskController.update(id, {title: value})
        },
        containerCancelButton: function () {
            clickedItem.querySelector(".editContainer").removeAttribute("style")
            clickedItem.querySelector(".editInput").value = arrInstancesTasks[clickedItemIndex].getName()
        },
        checkButton: function () {
            const id = clickedItem.getAttribute("data-id")
            taskController.toggleDone(id)
        }
    }

    if (actions[dataAction]) {
        actions[dataAction]()
    }
})
