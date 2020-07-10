const socket = io()
const messages = document.getElementById("messages")
const messageInput = document.getElementById('message')
const form = document.getElementById('form')
const dateFormat = store.getItem('SChatDateFormat') || '24'
const chatKeys = store.getItem('SChatKeys') || 'On'
const currUsername = store.getItem('SChatUsername') || Math.random() * 100

function format12Hours(date) {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes
  let strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
}

function format24Hours(date) {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  minutes = minutes < 10 ? '0'+minutes : minutes
  let strTime = hours + ':' + minutes
  return strTime
}

function addMessageToList (message) {
  let li = document.createElement("li");
  let divAuthor = document.createElement("div");
  let divText = document.createElement("div");
  const isOwner = currUsername === message.username
  li.className = isOwner ? 'msg right' : 'msg left'
  divAuthor.className = 'msg-author'
  divText.className = 'msg-text'

  const time = dateFormat === 12 ? format12Hours(new Date(message.createdAt)) : format24Hours(new Date(message.createdAt))

  divAuthor.append(message.username + ", " + time)
  divText.append(message.text)
  const liMsg = messages.appendChild(li)
  liMsg.append(divAuthor)
  liMsg.append(divText)
}

form.addEventListener('submit', function(e) {
  e.preventDefault() // prevents page reloading

  const data = {
    createdAt: new Date(),
    username: 'Guest 1',
    text: messageInput.value,
    roomId: '1'
  }
  socket.emit("chat message", data)

  addMessageToList(data)

  messageInput.value = '';

  return false;
});

socket.on("received", data => {
  store.setItem('SChatUsername', currUsername)
  addMessageToList(data.message)
})


// fetching initial chat messages from the database
fetch("/chats")
  .then(data => {
    return data.json();
  })
  .then(json => {
    json.map(data => {
      addMessageToList(data)
    })
  })


//is typing...

let typing = document.getElementById("typing");

//isTyping event
messageInput.addEventListener("keypress", () => {
  socket.emit("typing", { username: "Guest 1", message: "is typing..." });
});

socket.on("notifyTyping", data => {
  typing.innerText = data.username + " " + data.message;
  console.log(data.username + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
  socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
  typing.innerText = "";
});
