const path = require( "path" );
const { app, ipcMain } = require( "electron" );
const Uuid = require( "uuid/v4" );

const Window = require( "./window" );
const Store = require( "./services/store" );
const Socket = require( "./services/socket" );
const Auth = require( "./services/authentication" );
const User = require( "./services/user" );

const session = new Auth( { User, Uuid } );
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

            const { user } = session.setName( name )
            .setPort( port )
            .setSocket( Socket )
            .setStore( store )
            .login();

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
                session.logout();
            } );
        }
    } );

    ipcMain.on( "chat-sent", ( event, chats ) => {
        store.setChats( chats );

        // state.connection.send( buffer );
    } );

};

app.on( "ready", main );

app.on( "window-all-closed", () => {
    app.quit();
    session.logout();
} );