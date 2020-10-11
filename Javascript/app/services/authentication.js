class Authentication {
    constructor( { User, Uuid, Socket, Store  } ) {
        this.store = new Store( { name: "Slaq - JS" } );
        this.socket = Socket;
        this.user = User;
        this.name = "";
        this.port = "";
        this.id = Uuid;
    }

    setName( name ){
        this.name = name;
        return this;
    }

    setPort( port ){
        this.port = port;
        return this;
    }

    login(){
        this.socket = new this.socket( { name: this.name, port: this.port } );
        this.store = this.store.setLogin( { name: this.name, port: this.port } );
        this.user = new this.user( { socket: this.socket, store: this.store, id: this.id() } );
        return this;
    }

    logout(){
        this.socket = this.socket.disconnect();
        this.store = this.store.flush();
        this.user = this.user.reset();
        return this;
    }
}


module.exports = Authentication;