const login = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get("name")
    const port = formData.get("port")

    const socket = new WebSocket(`ws://localhost:${port}`);

    socket.addEventListener("open", (event) => {
        console.log("open!")
        socket.send(JSON.stringify({name}))
    });
}

const form = document.getElementById("login")

form.addEventListener("submit", login)