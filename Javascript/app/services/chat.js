const message = superclass => class extends superclass {
    constructor(content) {
        super()
        this.content = content
    }
    reply(){}
    edit(){}
    react(){}
    display(){
        return `<p>${content}</p>`
    }
}


const metadata = superclass => class extends superclass{
    constructor({ userName, userId, port, date, content}) {
        super(content);
        this.userName = userName
        this.userId = userId
        this.port = port
        this.date = date
    }

    display(){
        return `<p><strong>${this.userName}</strong> <small>${this.date}</small></p>`
    }
}

class Base {}

class Chat extends metadata(message(Base)){
    constructor({}) {
        super({});
    }

}

module.exports = Chat