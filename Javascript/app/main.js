const path = require( "path" );
const { app, ipcMain } = require( "electron" );
const { v4 } = require( "uuid" );

const Window = require( "./window" );
const Store = require( "./services/store" );
const Socket = require( "./services/socket" );
const Auth = require( "./services/authentication" );
const User = require( "./services/user" );
const Chat = require("./services/chat")

const session = new Auth( { User, Socket, Store, Uuid: v4 } );
const chat = new Chat({});

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

            const { user } = session
            .setName( name )
            .setPort( port )
            .login();

            chatRoom.webContents.on( "did-finish-load", () => {
                if ( user.isConnected() ){
                    chatRoom.webContents.send( "init", { name: user.getName(), port: user.getPort(), id: user.getID(), chat } );
                }

                const chats = user.getChats();
                if ( chats && chats.length > 0 ){
                    chatRoom.webContents.send( "load-chats", { chats } );
                }
            } );

            chatRoom.on( "closed", () => {
                chatRoom = null;
                session.logout();
            } );
        }
    } );

/*    ipcMain.on( "chat-sent", ( event, chats ) => {
        store.setChats( chats );

        state.connection.send( buffer );
    } );*/

};

app.on( "ready", main );

app.on( "window-all-closed", () => {
    app.quit();
    session.logout();
} );