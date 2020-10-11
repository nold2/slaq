const ElectronStore = require( "electron-store" );

class Store extends ElectronStore {
    constructor( settings ) {
        super( settings );
    }

    flush(){
        return this.clear();
    }

    setChats( chats ) {
        this.chats = [ ...this.chats, chats ];
        this.set( "chats", this.chats );
        return this;
    }

    setLogin( { name, port } ){
        this.set( "name", name );
        this.set( "port", port );
        return this;
    }

}

module.exports =  Store;