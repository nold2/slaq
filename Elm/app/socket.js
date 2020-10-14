window.app.ports.connectToSocket.subscribe((port) => {
    window.socket = new WebSocket(`ws://localhost:${port}`)

    window.socket.onopen = () => {
        window.app.ports.isConnected.send(true)
    }

    window.app.ports.sendMessage.subscribe((message) => {
        const parser = new Parser(message)
        const json = JSON.stringify(parser.format());
        const buff = Buffer.from(json, "utf8")
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
