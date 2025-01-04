export default class Task {
    constructor(title, completed, createdAt, updatedAt, id) {
        if (!title) {
            throw new Error("Task need a required parameter: title")
        }
        this.id = id || null
        this.title = title
        this.completed = completed || false
        this.createdAt = createdAt || Date.now()
        this.updatedAt = updatedAt || null
    }

    toggleDone() {
        this.completed = !this.completed
        this.updatedAt = Date.now()
    }

    getTitle() {
        return this.title
    }

    setTitle(newTitle) {
        this.title = newTitle
        this.updatedAt = Date.now()
    }
}