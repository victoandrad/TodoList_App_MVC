import Task from "../models/Task.js"
import createXMLHttpRequest from "../utils/createXMLHttpRequest.js"

export default class TaskService {
    constructor() {
        this.tasks = []
    }

    getTasks(callback) {
        const fn = (data) => {
            this.tasks = data.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })
            if (typeof callback === "function") {
                callback(this.tasks)
            }
        }
        createXMLHttpRequest("GET", "http://localhost:3000/tasks", fn)
    }

    insert(task, callback) {
        if (!task instanceof Task) {
            throw new Error("This is not an instance of Task")
        }
        const fn = (task) => {
            this.getTasks(callback)
        }
        createXMLHttpRequest("POST", "http://localhost:3000/tasks", fn, JSON.stringify(task))
    }

    delete(id, callback) {
        const fn = () => {
            this.getTasks(callback)
        }
        createXMLHttpRequest("DELETE", `http://localhost:3000/tasks/${id}`, fn)
    }

    update(id, obj, callback) {
        const fn = () => {
            this.getTasks(callback)
        }
        createXMLHttpRequest("PATCH", `http://localhost:3000/tasks/${id}`, fn, JSON.stringify(obj))
    }
}