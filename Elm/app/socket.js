class Parser {
    constructor(data) {
        this.data = data
    }

    date() {
        return new Date()
    }

    time() {
        if (this.date().getMinutes() < 10) {
            `${this.date().getHours()}:0${this.date().getMinutes()}`
        }
        return `${this.date().getHours()}:${this.date().getMinutes()}`
    }

    parseString() {
        return {
            "user": "anonymous",
            "time": this.time(),
            "content": this.data
        }
    }

    parseJSON() {
        return JSON.parse(this.data.toString('utf8'))
    }

    parse() {
        try {
            return this.parseJSON()
        } catch (e) {
            return this.parseString()
        }
    }

    format() {
        return {
            "user": "Machine",
            "time": this.time(),
            "content": this.data
        }
    }
}

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
            console.log(result)
            window.app.ports.receiveMessage.send(JSON.parse(result))
        })

    }
})
