const ElectronStore = require( "electron-store" );
const get = require( "lodash.get" );

class Store extends ElectronStore {
    constructor( settings ) {
        super( settings );
        this.chats = get( this, "get(`chats`)", [] );
    }

    setChats( chat ) {
        this.chats = [ ...this.chats, chat ];
        this.set( "chats", this.chats );
        return this;
    }

    setLogin( { name, port } ) {
        this.set( "name", name );
        this.set( "port", port );
        return this;
    }

}

module.exports = Store;