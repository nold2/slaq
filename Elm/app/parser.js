class Parser {
    constructor(data) {
        this.data = data
    }

    date() {
        return new Date()
    }

    time() {
        if (this.date().getMinutes() < 10) {
            `${this.date().getTime()} + ":0" +${this.date().getMinutes()}`
        }
        return `${this.date().getTime()} + ":" + ${this.date().getMinutes()}`
    }

    parseString() {
        return {
            "user": "anonymous",
            "date": this.time(),
            "content": this.data
        }
    }

    parseJSON() {
        return JSON.parse(this.data.toString())
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
            "date": this.time(),
            "content": this.data
        }
    }
}

window.Parser = Parser