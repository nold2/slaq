class Chat {
    constructor({userName, date, content, userID}) {
        this.userName = userName;
        this.userID = userID;
        this.date = date;
        this.content = content;
    }

    toJSON() {
        return {
            userName: this.userName,
            userID: this.userID,
            date: this.date,
            content: this.content,
            render: this.render()
        };
    }

    toBuffer() {
        const json = JSON.stringify(this.toJSON());
        return Buffer.from(json, "utf8");
    }

    render() {
        const date = new Date(this.date).toLocaleString()
        return `<p><strong class="chat-username">${this.userName}</strong><small class="chat-date">${date}</small></p><p class="class-content">${this.content}</p>`;
    }
}

module.exports = Chat;