export default class TaskView {
    constructor(container) {
        this.container = document.querySelector(container)
    }

    render(data) {
        console.log(data)
        this.container.innerHTML = ""
        this.container.innerHTML = data.map(taskObject => {
            return `<li class="todo-item" data-id="${taskObject.id}">
                <button class="button-check" data-action="checkButton">
                    <i class="fas fa-check ${taskObject.completed ? "" : "displayNone"}" data-action="checkButton"></i>
                </button>
                <p class="task-name">${taskObject.title}</p>
                <i class="fas fa-edit" data-action="editButton"></i>
                <div class="editContainer">
                    <input class="editInput" type="text" value="${taskObject.title}">
                    <button class="editButton" data-action="containerEditButton">Edit</button>
                    <button class="cancelButton" data-action="containerCancelButton">Cancel</button>
                </div>
                <i class="fas fa-trash-alt" data-action="deleteButton"></i>
            </li>`
        }).join("")
    }
}