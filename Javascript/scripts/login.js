const { ipcRenderer } = require( "electron" );

const login = ( event ) => {
    event.preventDefault();
    const formData = new FormData( event.target );
    const name = formData.get( "name" );
    const port = formData.get( "port" );

    ipcRenderer.send( "login", { name, port } );
};

const form = document.getElementById( "login" );

form.addEventListener( "submit", login );