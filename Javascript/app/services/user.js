class User {
    constructor( { id, name, port } ) {
        this.id = id;
        this.name = name;
        this.port = port;
    }

    getName(){
        return this.name;
    }

    getPort(){
        return this.port;
    }

    getID(){
        return this.id;
    }

    flush(){
        this.id = "";
        this.name = "";
        this.port = "";
    }

}

module.exports = User;