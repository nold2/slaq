const path = require( "path" );
const { app, ipcMain } = require( "electron" );

const Window = require( "./window" );
const Store = require( "./services/store" );
const Socket = require( "./services/socket" );

const store  = new Store( { name: "Slaq - JS" } );

const main = () => {
    const main  = new Window( {
        file: path.join( "app", "views", "login", "index.html" ),
    } );

    let chatRoom;

    ipcMain.on( "login", ( event, { name, port } ) => {
        if( !chatRoom ){
            chatRoom = new Window( {
                file: path.join( "app", "views", "chat", "index.html" ),
                height: 400,
                width: 400,
                parent: main
            } );
            store.setLogin( { name, port } );
            const connection =  new Socket( { name, port } );
            connection.listen( data => console.log( data ) );

            chatRoom.webContents.on( "did-finish-load", () => {
                connection.connect();
                if ( connection.isConnected() ){
                    chatRoom.webContents.send( "init", { name, port, connection: connection.isConnected() } );
                }
            } );

            chatRoom.on( "closed", () => {
                chatRoom = null;
            } );
        }
    } );

};

app.on( "ready", main );

app.on( "window-all-closed", () => app.quit() );