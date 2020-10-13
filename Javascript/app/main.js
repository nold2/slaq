const path = require( "path" );
const { app, ipcMain } = require( "electron" );
const { v4 } = require( "uuid" );

const Window = require( "./window" );
const Store = require( "./services/store" );
const Socket = require( "./services/socket" );
const Auth = require( "./services/authenticator" );
const User = require( "./services/user" );
const Chat = require( "./services/chat" );
const Room = require( "./services/Room" );

const session = new Auth( { User, Socket, Store, Uuid: v4, Room } );

const main = () => {
    const mainWindow = new Window( {
        file: path.join( "app", "views", "login", "index.html" ),
    } );

    let chatWindow;

    ipcMain.on( "login", ( event, { name, port } ) => {
        if ( !chatWindow ) {
            chatWindow = new Window( {
                file: path.join( "app", "views", "chat", "index.html" ),
                height: 400,
                width: 400,
                parent: mainWindow
            } );

            const { room, socket } = session
                .setName( name )
                .setPort( port )
                .login();
            
            socket.addEventListener( "message", ( event ) => {
                const { userName, userID, date, content } = JSON.parse( event.data.toString() );
                const chat = new Chat( { userName, userID, date, content } );
                const chats = room.receive( chat ).reload().getChats();

                chatWindow.webContents.send( "load-chats", { chats } );
            } );

            chatWindow.webContents.on( "did-finish-load", () => {
                const { name, port, isConnected } = room.getDetail();
                if ( isConnected ) {
                    chatWindow.webContents.send( "init", { name, port } );
                }

                const chats = room.getChats();
                if ( chats && chats.length > 0 ) {
                    chatWindow.webContents.send( "load-chats", { chats } );
                }
            } );

            chatWindow.on( "closed", () => {
                chatWindow = null;
                session.logout();
            } );
        }
    } );

    ipcMain.on( "chat-sent", ( event, content ) => {
        const { user, room } = session;
        const chat = new Chat( { userName: user.getName(), userID: user.getID(), date: new Date(), content } );
        const chats = room.send( chat ).reload().getChats();

        chatWindow.webContents.send( "load-chats", { chats } );
    } );

};

app.on( "ready", main );

app.on( "window-all-closed", () => {
    app.quit();
    session.logout();
} );