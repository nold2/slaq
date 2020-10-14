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