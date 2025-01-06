export default function createXMLHttpRequest(method, url, sucess, reject, data = null) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(data)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status < 400) {
                const json = JSON.parse(xhr.responseText)                
                if (typeof sucess === "function") {
                    sucess(json)
                }
            } else {
                if (typeof reject === "function") {
                    reject("Internal Server Error. HTTP Status: " + xhr.status)
                }
            }
        }
    }
}