export default class TaskView {
    constructor(container) {
        this.container = document.querySelector(container)
    }

    render(data) {
        console.log(data)
        this.container.innerHTML = ""
        this.container.innerHTML = data.map(taskObject => {
            return `<li class="todo-item">
                <button class="button-check" action="checkButton">
                    <i class="fas fa-check ${taskObject.completed ? "" : "displayNone"}" action="checkButton"></i>
                </button>
                <p class="task-name">${taskObject.title}</p>
                <i class="fas fa-edit" action="editButton"></i>
                <div class="editContainer">
                    <input class="editInput" type="text">
                    <button class="editButton" action="containerEditButton">Edit</button>
                    <button class="cancelButton" action="containerCancelButton">Cancel</button>
                </div>
                <i class="fas fa-trash-alt" action="deleteButton"></i>
            </li>`
        }).join("")
    }
}