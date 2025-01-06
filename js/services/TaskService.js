import Task from "../models/Task.js"
import createXMLHttpRequest from "../utils/createXMLHttpRequest.js"
import createPromise from "../utils/createPromise.js"
import { TASK_PATH } from "../config.js"

export default class TaskService {
    constructor() {
        this.tasks = []
    }

    getTasks(onSucess, onError) {
        const fn = (data) => {
            this.tasks = data.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })
            if (typeof onSucess === "function") {
                onSucess(this.tasks)
            }
        }
        createPromise("GET", `${TASK_PATH}`)
            .then(response => fn(response))
            .catch(error => {
                if (typeof onError === "function") {
                    onError(error.message)
                } else {
                    throw new Error("Internal Server Error")
                }
            })
    }

    insert(task, onSucess, onError) {
        createPromise("POST", `${TASK_PATH}`, JSON.stringify(task))
            .then(() => this.getTasks(onSucess, onError))
            .catch(error => {
                if (typeof onError === "function") {
                    onError(error.message)
                } else {
                    throw new Error("Internal Server Error")
                }
            })
    }

    delete(id, onSucess, onError) {
        createPromise("DELETE", `${TASK_PATH}/${id}`)
            .then(() => this.getTasks(onSucess, onError))
            .catch(error => {
                if (typeof onError === "function") {
                    onError(error.message)
                } else {
                    throw new Error("Internal Server Error")
                }
            })
    }

    update(id, obj, onSucess, onError) {
        obj.updatedAt = Date.now()
        createPromise("PATCH", `${TASK_PATH}/${id}`, JSON.stringify(obj))
            .then(() => this.getTasks(onSucess, onError))
            .catch(error => {
                if (typeof onError === "function") {
                    onError(error.message)
                } else {
                    throw new Error("Internal Server Error")
                }
            })
    }

    searchById(id) {
        return this.tasks.find(task => task.id === id)
    }
}