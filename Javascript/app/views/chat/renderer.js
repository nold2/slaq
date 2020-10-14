const {ipcRenderer} = require("electron");

const greetings = document.getElementById("greetings");

const chatWindow = document.getElementById("chat-window");
const chatBox = document.getElementById("chat-box");

const form = document.getElementById("send-chat");

const logout = document.getElementById("logout");

chatBox.disabled = true;

let socket;
let parser;

ipcRenderer.on("init", (event, {name, port}) => {
    greetings.innerText = `Hi ${name}`;
    chatBox.disabled = false;
    logout.innerText = `${port} Change port`

    parser = new window.Parser(name)

    socket = new WebSocket(`ws://localhost:${port}`)

    socket.onmessage = ((event) => {
        event.data.text().then(result => {
            renderChats({chat: JSON.parse(result), dom: chatWindow})
        })
    })

    socket.onclose = () => {
        ipcRenderer.send("logout")
    }
});

const renderChats = ({chat, dom}) => {
    const div = document.createElement("div");
    div.setAttribute("class", "bubble__container");
    div.innerHTML = `<p><strong class="bubble-name">${chat.user}</strong><small class="bubble-time">${chat.time}</small></strojng></p><p class="buble-message">${chat.content}</p>`;
    dom.appendChild(div);
};

ipcRenderer.on("load-chats", (event, {content}) => {
    if (socket.readyState === WebSocket.OPEN) {
        const buffer = parser.setMessage(content).toJSON().toJSONString().toBuffer()
        socket.send(buffer)
    }
});


const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const message = formData.get("chat-box")
    const {json: jsonMessage} = parser.setMessage(message).toJSON()
    renderChats({chat: jsonMessage, dom: chatWindow})
    ipcRenderer.send("chat-sent", message);
    form.reset();
};

form.addEventListener("submit", submit);

logout.addEventListener("click", () => {
    ipcRenderer.send("logout")
})

