import Task from "../models/Task.js"
import createXMLHttpRequest from "../utils/createXMLHttpRequest.js"
import { TASK_PATH } from "../config.js"

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
        createXMLHttpRequest("GET", `${TASK_PATH}`, fn)
    }

    insert(task, callback) {
        const fn = () => {
            this.getTasks(callback)
        }
        createXMLHttpRequest("POST", `${TASK_PATH}`, fn, JSON.stringify(task))
    }

    delete(id, callback) {
        const fn = () => {
            this.getTasks(callback)
        }
        createXMLHttpRequest("DELETE", `${TASK_PATH}/${id}`, fn)
    }

    update(id, obj, callback) {
        obj.updatedAt = Date.now()
        const fn = () => {
            this.getTasks(callback)
        }
        createXMLHttpRequest("PATCH", `${TASK_PATH}/${id}`, fn, JSON.stringify(obj))
    }

    searchById(id) {
        return this.tasks.find(task => task.id === id)
    }
}