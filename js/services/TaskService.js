import Task from "../models/Task.js"
import createXMLHttpRequest from "../utils/createXMLHttpRequest.js"

export default class TaskService {
    constructor() {
        this.tasks = []
    }

    getTasks(callback) {
        const fn = (data) => {
            console.log(data)
            this.tasks = data.map(task => {
                const { title, completed, createdAt, updatedAt } = task
                return new Task(title, completed, createdAt, updatedAt)
            })
            callback(this.tasks)
        }
        createXMLHttpRequest("GET", "http://localhost:3000/tasks", fn)
    }

    insert(task, callback) {
        if (!task instanceof Task) {
            throw new Error("This is not an instance of Task")
        }
        const fn = (task) => {
            console.log(task)
            this.tasks.push(task)
            if (typeof callback === "function") callback()
        }
        createXMLHttpRequest("POST", "http://localhost:3000/tasks", fn, JSON.stringify(task))
    }
}