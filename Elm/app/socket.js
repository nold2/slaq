window.app.ports.connectToSocket.subscribe((port) => {
    window.socket = new WebSocket(`ws://localhost:${port}`)

    window.socket.onopen = () => {
        window.app.ports.isConnected.send(true)
    }
})

// window.app.ports.sendMessage.subscribe((message) => {
//     window.socket.send(message)
// })
//
//
// window.socket.addEventListener("message", event => {
//     window.app.ports.messageReceiver.send(event.data)
// })