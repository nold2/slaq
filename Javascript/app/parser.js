class Parser {
    constructor(user) {
        this.user = user
    }

    setMessage(message) {
        this.message = message
        return this
    }

    toJSON() {
        this.json = {
            user: this.user,
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
