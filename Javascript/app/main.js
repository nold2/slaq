const path = require("path");
const {app, ipcMain} = require("electron");

const Window = require("./window");

const main = () => {
    const mainWindow = new Window({
        file: path.join("app", "views", "login", "index.html"),
    });

    let chatWindow;

    ipcMain.on("login", (event, {name, port}) => {
        if (!chatWindow) {
            chatWindow = new Window({
                file: path.join("app", "views", "chat", "index.html"),
                height: 400,
                width: 400,
                parent: mainWindow
            });


            chatWindow.webContents.on("did-finish-load", () => {
                chatWindow.webContents.send("init", {name, port});
            });

            chatWindow.on("closed", () => {
                chatWindow = null;
            });
        }
    });

    ipcMain.on("chat-sent", (event, content) => {
        chatWindow.webContents.send("load-chats", {content});
    });

};

app.on("ready", main);

app.on("window-all-closed", () => {
    app.quit();
});