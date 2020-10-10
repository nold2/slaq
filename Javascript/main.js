const { app } = require( "electron" );
const Window = require( "./scripts/window" );


const main = () => new Window( {
    file: "index.html"
} );

app.on( "ready", main );

app.on( "window-all-closed", () => app.quit() );