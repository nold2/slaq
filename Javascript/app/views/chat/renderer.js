const {ipcRenderer} = require("electron");

const greetings = document.getElementById("greetings");

const chatWindow = document.getElementById("chat-window");
const chatBox = document.getElementById("chat-box");

const form = document.getElementById("send-chat");

chatWindow.innerText = "It's quite here";
chatBox.disabled = true;

ipcRenderer.on("init", (event, {name, port}) => {
    greetings.innerText = `Hi ${name}`;
    status.innerText = `You are connected to port ${port}`;
    chatBox.disabled = false;
});

const renderChats = ({chats, dom}) => {
    dom.textContent = "";
    chats.map(chat => {
        const div = document.createElement("div");
        div.setAttribute("class", "bubble");
        div.innerHTML = chat.render
        dom.appendChild(div);
    });
};

ipcRenderer.on("load-chats", (event, {chats}) => {
    renderChats({chats, dom: chatWindow});
});


const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    ipcRenderer.send("chat-sent", formData.get("chat-box"));
    form.reset();
};

form.addEventListener("submit", submit);


