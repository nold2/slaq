class Parser {
    constructor(name) {
        this.name = name
    }

    setMessage(message) {
        this.message = message
        return this
    }

    toJSON() {
        this.json = {
            user: this.name,
            time: "",
            content: this.message
        }
        return this
    }

    toJSONString() {
        this.jsonString = JSON.stringify(this.json)
        return this
    }

    toBuffer() {
        return Buffer.from(this.jsonString, "utf8")
    }
}

window.Parser = Parser