import Task from "../models/Task.js"

export default class TaskController {
    constructor(service, view) {
        this.service = service
        this.view = view
    }

    insert(title) {
        this.service.insert(new Task(title), () => {
            this.view.render(this.service.tasks)
        })
    }
}