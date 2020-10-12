window.app.ports.connectToSocket.subscribe((port) => {
    window.socket = new WebSocket(`ws://localhost:${port}`)
})

window.app.ports.openConnection.subscribe((name, port) => {
    window.socket.on("open", () => {
        window.socket.send(`${name} is on port: ${port}`)
    })
})

window.app.ports.isConnected.subscribe(() => {
    return window.socket.readyState === Winodw.socket.OPEN
})

window.app.ports.window.app.ports.sendMessage.subscribe((message) => {
    window.socket.send(message)
})


window.socket.addEventListener("message", event => {
    window.app.ports.messageReceiver.send(event.data)
})