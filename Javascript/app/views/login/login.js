const { ipcRenderer } = require( "electron" );

const form = document.getElementById( "login" );
form.addEventListener( "submit", ( event ) => {
   event.preventDefault();
   const formData = new FormData( event.target );
   ipcRenderer.send( "login", { name: formData.get( "name" ), port: formData.get( "port" ) } );
} );