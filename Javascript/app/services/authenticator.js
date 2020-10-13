class Authenticator {
    constructor({User, Uuid, Socket, Store, Room}) {
        this.store = new Store({name: "Slaq - JS"});
        this.socket = Socket;
        this.user = User;
        this.room = Room;
        this.name = "";
        this.port = "";
        this.id = Uuid;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setPort(port) {
        this.port = port;
        return this;
    }

    login() {
        this.socket = new this.socket({name: this.name, port: this.port});
        this.socket.connect()

        this.store = this.store.setLogin({name: this.name, port: this.port});

        this.user = new this.user({id: this.id(), name: this.name, port: this.port});
        this.room = new this.room({store: this.store, socket: this.socket, user: this.user});
        return this;
    }

    logout() {
        this.store.flush();
        this.user.flush();
        this.room.flush();
        return this;
    }
}


module.exports = Authenticator;