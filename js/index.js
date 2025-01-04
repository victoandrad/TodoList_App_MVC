import createXMLHttpRequest from "./utils/createXMLHttpRequest.js"
import Task from "./models/Task.js"
import TaskController from "./controllers/TaskController.js"
import TaskService from "./services/TaskService.js"
import TaskView from "./views/TaskView.js"

const urlUsers = "http://localhost:3000/users"
const urlTasks = "http://localhost:3000/tasks"
const userId = 2

const taskService = new TaskService()
const taskView = new TaskView("#todo-list")
const taskController = new TaskController(taskService, taskView)

taskService.getTasks(init)


function init(arrInstancesTasks) {
    if (arrInstancesTasks.error) return

    taskView.render(arrInstancesTasks)
    
    //ARMAZENAR O DOM EM VARIAVEIS
    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ul = document.getElementById("todo-list")
    const lis = ul.getElementsByTagName("li")
    
    function clickedUl(e) {
        const dataAction = e.target.getAttribute("data-action")
        console.log(e.target)
        if (!dataAction) return
    
        let currentLi = e.target
        while (currentLi.nodeName !== "LI") {
            currentLi = currentLi.parentElement
        }
        const currentLiIndex = [...lis].indexOf(currentLi)
    
        const actions = {
            editButton: function () {
                const editContainer = currentLi.querySelector(".editContainer");
    
                [...ul.querySelectorAll(".editContainer")].forEach(container => {
                    container.removeAttribute("style")
                });
    
                editContainer.style.display = "flex";
    
            },
            deleteButton: function () {
                arrInstancesTasks.splice(currentLiIndex, 1)
                renderTasks()
    
            },
            containerEditButton: function () {
                const val = currentLi.querySelector(".editInput").value
                arrInstancesTasks[currentLiIndex].setName(val)
                renderTasks()
            },
            containerCancelButton: function () {
                currentLi.querySelector(".editContainer").removeAttribute("style")
                currentLi.querySelector(".editInput").value = arrInstancesTasks[currentLiIndex].getName()
            },
            checkButton: function () {
    
                // DEVE USAR O MÉTODO toggleDone do objeto correto
                arrInstancesTasks[currentLiIndex].toggleDone()
                renderTasks()
            }
        }
    
        if (actions[dataAction]) {
            actions[dataAction]()
        }
    }
    
    todoAddForm.addEventListener("submit", function (e) {
        e.preventDefault()
        taskController.insert(itemInput.value)
        itemInput.value = ""
        itemInput.focus()
    });
    
    ul.addEventListener("click", clickedUl)
    
    renderTasks()

}

