const path = require( "path" );
const { app } = require("electron")

const Window = require("./window")

const main = () => {
    const mainWindow = new Window({
        file: path.join("app", "login.html")
    })
}

app.on("ready", main);

app.on("window-all-closed", ()=>{
    app.quit()
})