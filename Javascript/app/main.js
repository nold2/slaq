const path = require( "path" );
const { app, ipcMain } = require( "electron" );

const Window = require( "./window" );
const Store = require( "./services/store" );
const Socket = require( "./services/socket" );
const Auth = require( "./services/authentication" );

const auth = new Auth();
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
            auth.setName(name)
            auth.setPort(port)
            auth.setSocket(Socket)
            auth.setStore(store)
            auth.login()

            // chatRoom.webContents.on( "did-finish-load", () => {
            //     state.connection.connect();
            //     if ( state.connection.isConnected() ){
            //         chatRoom.webContents.send( "init", { name, port } );
            //     }
            //     const chats = store.getChats();
            //     chatRoom.webContents.send( "load-chats", { chats } );
            // } );

            chatRoom.on( "closed", () => {
                chatRoom = null;
            } );
        }
    } );

    ipcMain.on( "chat-sent", ( event, chats ) => {
        store.setChats( chats );
        const last = chats[chats.length - 1];
        const json = JSON.stringify( last );
        const buffer = Buffer.from( json, "utf8" );
        // state.connection.send( buffer );
    } );

};

app.on( "ready", main );

app.on( "window-all-closed", () => app.quit() );