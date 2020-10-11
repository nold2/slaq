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

    getLogin() {
        const name = lodashGet( this, "get(\"name\")", "" );
        const port = lodashGet( this, "get(\"port\")", "" );

        return { name, port };
    }

    setChats( chats ) {
        this.chats = [ ...this.chats, chats ];
        this.set( "chats", this.chats );
        return this
    }

    setLogin( { name, port } ){
        this.set( "name", name );
        this.set( "port", port );
        return this
    }

}

module.exports =  Store;