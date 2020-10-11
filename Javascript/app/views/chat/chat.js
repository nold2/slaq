const { ipcRenderer } = require( "electron" );

const greetings = document.getElementById( "greetings" );
const status = document.getElementById( "status" );

const chatWindow = document.getElementById( "chat-window" );
const chatBox = document.getElementById( "chat-box" );

const form = document.getElementById( "send-chat" );

status.innerText = "You are disconnected";
chatWindow.innerText = "It's quite here";
chatBox.disabled = true;

const state = {
    name: "",
    port: "",
    chats: []
};

ipcRenderer.on( "init", ( event, { name, port, id, chat } ) => {
    greetings.innerText = `Hi ${name}`;
    status.innerText = `You are connected to port ${port}`;
    chatBox.disabled = false;

    state.name = name;
    state.port = port;
} );

const renderChats = ( { chats, dom } ) => {
    dom.textContent = "";
   chats.map( chat => {
        const div = document.createElement( "div" );
        div.setAttribute( "class", "bubble" );
        div.innerHTML = `<div class="body">${chat.name}</div><div class="time">${chat.chat}</div><div class="time">${new Date( chat.date )}</div>`;
        dom.appendChild( div );
    } );
};

ipcRenderer.on( "load-chats", ( event, { chats } ) => {
    renderChats( { chats, dom: chatWindow } );
} );


const chat = ( event ) => {
    event.preventDefault();
    const formData = new FormData( event.target );
    const chat = formData.get( "chat-box" );
    state.chats = state.chats.concat( {
        name: state.name,
        port: state.port,
        date: Date.now(),
        chat,
    } );

    form.reset();

    renderChats( { chats: state.chats, dom: chatWindow } );

    ipcRenderer.send( "chat-sent", state.chats );
};

form.addEventListener( "submit", chat );


