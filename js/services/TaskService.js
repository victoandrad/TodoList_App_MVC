import Task from "../models/Task.js"
import createXMLHttpRequest from "../utils/createXMLHttpRequest.js"
import { TASK_PATH } from "../config.js"

export default class TaskService {
    constructor() {
        this.tasks = []
    }

    getTasks(sucess, reject) {
        const fn = (data) => {
            this.tasks = data.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })
            if (typeof sucess === "function") {
                sucess(this.tasks)
            }
        }
        createXMLHttpRequest("GET", `${TASK_PATH}`, fn, reject)
    }

    insert(task, sucess, reject) {
        const fn = () => {
            this.getTasks(sucess)
        }
        createXMLHttpRequest("POST", `${TASK_PATH}`, fn, reject, JSON.stringify(task))
    }

    delete(id, sucess, reject) {
        const fn = () => {
            this.getTasks(sucess)
        }
        createXMLHttpRequest("DELETE", `${TASK_PATH}/${id}`, fn, reject)
    }

    update(id, obj, sucess, reject) {
        obj.updatedAt = Date.now()
        const fn = () => {
            this.getTasks(sucess)
        }
        createXMLHttpRequest("PATCH", `${TASK_PATH}/${id}`, fn, reject, JSON.stringify(obj))
    }

    searchById(id) {
        return this.tasks.find(task => task.id === id)
    }
}