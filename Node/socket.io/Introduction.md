# Introduction

### What Socket.IO is

Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server. It consists of:

- Node.js server
- a js client library for the browser

![socketio](https://socket.io/images/bidirectional-communication.png)

The client will try to establish a WebSocket connection if possible, and will fall back on HTTP long polling if not.
you can consider the Socket.IO client as a “slight” wrapper around the WebSocket API.
아래와 같은 WebSocket API를 통해 코드를 적는 것 대신에

```javascript
const socket = new WebSocket("ws://localhost:3000");
socket.onopen(() => {
  socket.send("Hello!");
});
socket.onmessage((data) => {
  console.log(data);
});
```

아래와 같이 적을 수 있다.

```javascript
const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit(
    "salutations",
    "Hello!",
    { mr: "john" },
    Uint8Array.from([1, 2, 3, 4])
  );
});

// handle the event sent with socket.send()
socket.on("message", (data) => {
  console.log(data);
});

// handle the event sent with socket.emit()
socket.on("greetings", (elem1, elem2, elem3) => {
  console.log(elem1, elem2, elem3);
});
```

API on server-side

```javascript
const io = require("socket.io")(3000);

io.on("connection", (socket) => {
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { ms: "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});
```

Socket.IO는 기본 WebSocket 객체에 대하여 추가적인 특징들을 제공한다.

- reliability (fallback to HTTP long-polling in case the WebSocket connection cannot be established) 웹소켓이 연결되지 않으면 HTTP Long polling 으로 전환!
- automatic reconnection
- packet buffering
- acknowledgments
- broadcasting to all clients or to a subset of clients(what we call "Room")
- multiplexing(what we call "Namespace")

### What Socket.IO is not

Socket.IO is NOT a WebSocket implementation. Although Socket.IO indeed uses WebSocket as a transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.
웹소켓을 사용하긴 하지만 추가적인 메타 데이터를 넣기 때문에, WebSocket과는 연결 할 수 없다.
