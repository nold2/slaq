const { app, ipcMain } = require( "electron" );

const Window = require( "./scripts/window" );
const Store = require( "./scripts/store" );
const Socket = require( "./scripts/socket" );

const store  = new Store( { name: "Slaq - JS" } );
const socket = ( { name, port } ) => new Socket( { name, port } );

const main = () => {
    const main  = new Window( {
        file: "index.html"
    } );

    let chatRoom;

    ipcMain.on( "login", ( event, { name, port } ) => {
        if( !chatRoom ){
            store.setLogin( { name, port } );
            socket( { name, port } );
            socket.connect();

            chatRoom = new Window( {
                file: "chats.html",
                height: 400,
                width: 400,
                parent: main
            } );

            chatRoom.on( "closed", () => {
                chatRoom = null;
            } );
        }
    } );
};

app.on( "ready", main );

app.on( "window-all-closed", () => app.quit() );