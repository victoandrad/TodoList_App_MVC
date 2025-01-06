export default class TaskController {
    constructor(service, view) {
        this.service = service
        this.view = view
    }

    insert(title) {
        this.service.insert({title}, () => {
            this.view.render(this.service.tasks)
        }, (message) => {
            window.alert(message)
        })
    }

    delete(id) {
        this.service.delete(id, () => {
            this.view.render(this.service.tasks)
        }, (message) => {
            window.alert(message)
        })
    }

    update(id, obj) {
        this.service.update(id, obj, () => {
            this.view.render(this.service.tasks)
        }, (message) => {
            window.alert(message)
        })
    }

    toggleDone(id) {
        const task = this.service.searchById(id)
        task.toggleDone()
        const { completed, updatedAt } = task
        this.update(id, {completed, updatedAt})
    }

    getTasks() {
        this.service.getTasks(() => {
            this.view.render(this.service.tasks)
        }, (message) => {
            window.alert(message)
        })
    }
}