class Chat {
    constructor( { userName, date, content, userID } ) {
        this.userName = userName;
        this.userID = userID;
        this.date = date;
        this.content = content;
    }

    toJSON(){
        return {
            userName: this.userName,
            userID: this.userID,
            date: this.date,
            content: this.content,
            render: this.render()
        };
    }

    toBuffer(){
        const json = JSON.stringify( this.toJSON() );
        return Buffer.from( json, "utf8" );
    }

    render() {
        return `<p><strong>${this.userName}</strong><small>${this.date}</small></p><p>${this.content}</p>`;
    }
}

module.exports = Chat;