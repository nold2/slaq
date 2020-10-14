window.app.ports.connectToSocket.subscribe((port) => {
    window.socket = new WebSocket(`ws://localhost:${port}`)

    window.socket.onopen = () => {
        window.app.ports.isConnected.send(true)
    }

    window.app.ports.sendMessage.subscribe((message) => {
        console.log(message)
        const buff = Buffer.from(message, "utf8")
        window.socket.send(buff)
    })

    window.socket.onmessage = (event) => {
        event.data.text().then(result => {
            window.app.ports.receiveMessage.send(JSON.parse(result))
        })
    }

    window.app.ports.closeConnection.subscribe(() => {
        window.socket.close()
    })

    window.socket.onclose = () => {
        window.app.ports.isConnected.send(false)
    }
})
