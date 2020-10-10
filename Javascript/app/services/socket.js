const WebSocket = require( "ws" );

class Socket extends WebSocket {
    constructor( { port, name } ) {
        super( `ws://localhost:${port}`, [], {} );
        this.name = name;
        this.port  = port;
    }

    connect(){
        this.on( "open", () => {
            this.send( `${this.name} is on port: ${this.port}`, {}, () => {} );
        } );
    }

    isConnected(){
        return this.readyState === WebSocket.OPEN;
    }

    listen( callback ){
        this.on( "message", data => {
            callback( data );
        } );
    }

}

module.exports = Socket;