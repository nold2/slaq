class Room {
    constructor( { store, socket, user } ) {
        this.store = store;
        this.socket = socket;
        this.user = user;
        this.chats = [];
    }

    getDetail(){
        return {
            name: this.user.getName(),
            id: this.user.getID(),
            port: this.user.getPort(),
            isConnected: this.socket.isConnected(),
        };
    }

    getChats(){
        return this.store.get("chats")
    }

    reload(){
        this.chats = this.store.get( "chats" );
        return this;
    }

    send( chat ){
        this.socket.send( chat.toBuffer() );
        this.store.setChats( chat.toJSON() );
        return this;
    }

    flush(){
        this.chats = [];
        this.user = null;
    }

}

module.exports = Room;