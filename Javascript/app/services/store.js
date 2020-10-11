const ElectronStore = require( "electron-store" );
const lodashGet = require( "lodash.get" );

class Store extends ElectronStore {
    constructor( settings ) {
        super( settings );
        this.chats = this.getChats();
    }

    getChats(){
        return lodashGet( this, "get(\"chats\")", [] );
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