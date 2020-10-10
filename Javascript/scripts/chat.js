const { ipcRenderer } = require( "electron" );

const greetings = document.getElementById( "greetings" );
const status = document.getElementById( "status" );

const chatWindow = document.getElementById( "chat-window" );
const chatBox = document.getElementById( "chat-box" );

const form = document.getElementById( "send-chat" );

status.innerText = "You are disconnected";
chatWindow.innerText = "It's quite here";
chatBox.disabled = true;

ipcRenderer.on( "init", ( event, { name, port } ) => {
    greetings.innerText = `Hi ${name}`;
    status.innerText = `You are connected to port ${port}`;
    chatBox.disabled = false;
} );

const chat = ( event ) => {
    event.preventDefault();
    const formData = new FormData( event.target );
    const chat = formData.get( "chat-box" );
    console.log( chat );
};

form.addEventListener( "submit", chat );


