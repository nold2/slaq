const path = require("path");
const {app} = require("electron")
const {Buffer} = require("buffer/")

const Window = require("./window")

const main = () => {
    const mainWindow = new Window({
        file: path.join("app", "main.html"),
        preload: Buffer
    })
}

app.on("ready", main);

app.on("window-all-closed", () => {
    app.quit()
})