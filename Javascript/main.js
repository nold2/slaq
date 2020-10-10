const { app, ipcMain } = require( "electron" );

const Window = require( "./scripts/window" );
const Store = require("./scripts/store")

const store  = new Store({ name: "Slaq - JS"})

const main = () => {
    const main  = new Window( {
        file: "index.html"
    } );

    let chatRoom;

    ipcMain.on("login", (event, {name, port })=>{
        if(!chatRoom){
            store.setLogin({name, port})

            chatRoom = new Window({
                file: "chats.html",
                height: 400,
                width: 400,
                parent: main
            })

            chatRoom.on("closed", () => {
                chatRoom = null
            })
        }
    })
}

app.on( "ready", main );

app.on( "window-all-closed", () => app.quit() );