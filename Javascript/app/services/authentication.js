class Authentication {
    constructor( user ) {
        this.socket = null
        this.store = null
        this.name = ""
        this.port = ""
        this.user = user
    }
    setSocket(socket){
        this.socket = socket
    }

    setStore(store){
        this.store = store
    }

    setName( name ){
        this.name = name;
    }

    setPort( port ){
        this.port = port;
    }

    login(){
        this.socket = new this.socket( { name: this.name, port: this.port } );
        this.store = this.store.setLogin( { name: this.name, port: this.port } );
        this.user = new this.user({ socket: this.socket, store: this.store })
    }

    logout(){
        this.socket = this.socket.disconnect()
        this.store = this.store.destroy()
        this.user = this.user.logout()
    }
}


module.exports = Authentication;