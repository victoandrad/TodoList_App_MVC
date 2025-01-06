export default function createPromise(method, url, data = null) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(data)
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status < 400) {
                    const json = JSON.parse(xhr.responseText)                
                    resolve(json)
                } else {
                    reject(new Error("Internal Server Error. HTTP Status: " + xhr.status))
                }
            }
        }
    })
}