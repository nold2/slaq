window.app.ports.connectToSocket.subscribe((port) => {
    window.socket = new WebSocket(`ws://localhost:${port}`)

    window.socket.onopen = () => {
        window.app.ports.isConnected.send(true)
    }

    window.app.ports.sendMessage.subscribe((message) => {
        window.socket.send(message)
    })

    window.socket.onmessage = (event) => {
        window.app.ports.receiveMessage.send(event.data)
    }
})
