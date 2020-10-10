const ElectronStore = require( "electron-store" );
const lodashGet = require( "lodash.get" );

class Store extends ElectronStore {
    constructor( settings ) {
        super( settings );
    }
    setChats(chats) {
        this.chats = [...this.chats, chats]
        this.set("chats", this.chats)
    }

    getChats(){
       return lodashGet(this, `get("chats")`, [])
    }

    setLogin( { name, port } ){
        this.set( "name", name );
        this.set( "port", port );
    }

    getLogin() {
        const name = lodashGet( this, "get(\"name\")", "" );
        const port = lodashGet( this, "get(\"port\")", "" );

        return { name, port };
    }
}

module.exports =  Store;