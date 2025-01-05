export default class Task {
    constructor(title, completed, createdAt, updatedAt, id) {
        if (!title) {
            throw new Error("Task need a required parameter: title")
        }
        this.title = title
        this.completed = completed || false
        this.createdAt = createdAt || Date.now()
        this.updatedAt = updatedAt || null
        this.id = id || null
    }

    toggleDone() {
        this.completed = !this.completed
        this.updatedAt = Date.now()
    }
}