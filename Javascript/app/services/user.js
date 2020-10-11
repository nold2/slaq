class User {
    constructor( { socket, store, id } ) {
        this.socket = socket;
        this.store = store;
        this.id = id;
    }

    getID(){
        return this.id;
    }

    getName(){
        return this.store.get("name");
    }

    getPort(){
        return this.store.get("port")
    }

    isConnected(){
        return this.socket.isConnected();
    }

    getChats(){
        return this.store.get("chats");
    }

    sendChat( chat ){
        const json = JSON.stringify( chat );
        const buffer = Buffer.from( json, "utf8" );

        this.socket.send( buffer );
        this.store.setChats( chat );

        return this;
    }

    reset(){
        this.socket = null;
        this.store = null;
        this.id = "";
    }

}

module.exports = User;