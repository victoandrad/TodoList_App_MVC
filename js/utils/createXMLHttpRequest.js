export default function createXMLHttpRequest(method, url, callback, data = null) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(data)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status < 400) {
                const json = JSON.parse(xhr.responseText)                
                if (typeof callback === "function") callback(json)
            } else {
                if (typeof callback === "function") callback({
                    status: xhr.status,
                    message: "Internal Server Error",
                    request: xhr,
                    error: true
                })
            }
        }
    }
}