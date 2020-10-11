class Authentication {
    constructor( { user, Uuid } ) {
        this.socket = null;
        this.store = null;
        this.name = "";
        this.port = "";
        this.user = user;
        this.id = Uuid();
    }
    setSocket( socket ){
        this.socket = socket;
        return this;
    }

    setStore( store ){
        this.store = store;
        return this;
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