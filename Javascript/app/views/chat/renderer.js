const {ipcRenderer} = require("electron");

const greetings = document.getElementById("greetings");

const chatWindow = document.getElementById("chat-window");
const chatBox = document.getElementById("chat-box");

const form = document.getElementById("send-chat");

chatWindow.innerText = "It's quite here";
chatBox.disabled = true;

let socket;

ipcRenderer.on("init", (event, {name, port}) => {
    greetings.innerText = `Hi ${name}`;
    chatBox.disabled = false;

    socket = new WebSocket(`ws://localhost:${port}`)
    socket.onopen = (() => {
        socket.send(`${name}: is on port: ${port}`);
    });

    socket.onmessage = ((event) => {
        renderChats({chat: event.data, dom: chatWindow})
    })
});

const renderChats = ({chat, dom}) => {
    const div = document.createElement("div");
    div.setAttribute("class", "bubble");
    div.innerHTML = chat;
    dom.appendChild(div);
};

ipcRenderer.on("load-chats", (event, {content}) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(content)
    }
});


const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    ipcRenderer.send("chat-sent", formData.get("chat-box"));
    form.reset();
};

form.addEventListener("submit", submit);


