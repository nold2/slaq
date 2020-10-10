const { app, ipcMain } = require( "electron" );

const Window = require( "./scripts/window" );
const Store = require( "./scripts/store" );
const Socket = require( "./scripts/socket" );

const store  = new Store( { name: "Slaq - JS" } );

const main = () => {
    const main  = new Window( {
        file: "index.html"
    } );

    let chatRoom;

    ipcMain.on( "login", ( event, { name, port } ) => {
        if( !chatRoom ){
            chatRoom = new Window( {
                file: "chats.html",
                height: 400,
                width: 400,
                parent: main
            } );
            store.setLogin( { name, port } );
            const connection =  new Socket( { name, port } );

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