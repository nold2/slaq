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
        return this.store.getName();
    }

    getPort(){
        return this.store.getPort();
    }

    getChats(){
        return this.store.getChats();
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