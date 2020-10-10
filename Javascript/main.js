const { app, ipcMain } = require( "electron" );

const Window = require( "./scripts/window" );
const Store = require("./scripts/store")

const chatStore  = new Store({ name: "Slaq - JS"})

const main = () => {
    const main  = new Window( {
        file: "index.html"
    } );

    let chatRoom;

    ipcMain.on("login", ()=>{
        if(!chatRoom){
            chatRoom = new Window({
                file: "chat.html",
                height: 400,
                width: 400,
                parent: main
            })

            chatRoom.on("closed", () => {
                chatRoom = null
            })
        }
    })

    ipcMain.on("chat", (event, chat) =>{
        chatStore.setChats(chat)
    })
}

app.on( "ready", main );

app.on( "window-all-closed", () => app.quit() );