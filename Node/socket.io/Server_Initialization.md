# Server

```
npm install socket.io
```

to install specific version:

```
npm i socket.io@<version>
```

### Additional packages

By default, Socket.IO use the WebSocket server provided by the ws package.
There are 2 optional packages that can be installed alongside this package. These packages are binary add-ons which improve certain operations. Prebuilt binaries are available for the most popular platforms so you don’t necessarily need to have a C++ compiler installed on your machine.

- bufferutil: Allows to efficiently perform operations such as masking and unmasking the data payload of the WebSocket frames.
- utf-8-validate: Allows to efficiently check if a message contains valid UTF-8 as required by the spec.

```
npm install --save-optional bufferutil utf-8-validate
```

Please note that these packages are optional, the WebSocket server will fallback to the Javascript implementation if they are not available.

## Server Initialization

Once you have installed the Socket.IO server library, you can now init the server. The complete list of options can be found below.

<b>CommonJS</b>

```javascript
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  // ...
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);
```

<b>ES modules</b>

```javascript
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // ...
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);
```

<b>TypeScript</b>

```typescript
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // ...
});

io.on("connection", (socket: Socket) => {
  // ...
});

httpServer.listen(3000);
```

<b>Initialization</b>
<b>Standalone</b>

```javascript
const options = {
  /* ... */
};
const io = require("socket.io")(options);

io.on("connection", (socket) => {
  /* ... */
});

io.listen(3000);
```

you can also pass the port as the first argument

```javascript
const options = {
  /* ... */
};
const io = require("socket.io")(3000, options);

io.on("connection", (socket) => {
  /* ... */
});
```

This implicitly starts a Node.js HTTP server, which can be accessed through io.httpServer.

<b>Attached to an existing HTTP SERVER</b>

<b>With an HTTP server</b>

```javascript
const httpServer = require("http").createServer();
const options = {
  /* ... */
};
const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  /* ... */
});

httpServer.listen(3000);
```

<b>With an HTTPS server</b>

```javascript
const fs = require("fs");
const httpServer = require("https").createServer({
  key: fs.readFileSync("/tmp/key.pem"),
  cert: fs.readFileSync("/tmp/cert.pem"),
});
const options = {
  /* ... */
};
const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  /* ... */
});

httpServer.listen(3000);
```

<b>With an HTTP/2 server</b>

```javascript
const fs = require("fs");
const httpServer = require("http2").createSecureServer({
  allowHTTP1: true,
  key: fs.readFileSync("/tmp/key.pem"),
  cert: fs.readFileSync("/tmp/cert.pem"),
});
const options = {
  /* ... */
};
const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  /* ... */
});

httpServer.listen(3000);
```

<b>With Express</b>

```javascript
const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {
  /* ... */
};
const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  /* ... */
});

httpServer.listen(3000);
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
```

## Options

### <b>path</b>

Default value: /socket.io/

It is the name of the path that is captured on the server side.

The server and the client values must match (unless you are using a path-rewriting proxy in between):

<i>Server</i>

```javascript
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  path: "/my-custom-path/",
});
```

<i>Client</i>

```javascript
import { io } from "socket.io-client";

const socket = io("https://example.com", {
  path: "/my-custom-path/",
});
```

### <b>serveClient</b>

Default value: true

Whether to serve the client files. If true, the different bundles will be served at the following location:

- <url>/socket.io/socket.io.js
- <url>/socket.io/socket.io.min.js
- <url>/socket.io/socket.io.msgpack.min.js

### <b>adapter</b>

Default value: socket.io-adapter

Example with the Redis adapter :

```javascript
const httpServer = require("http").createServer();
const redisClient = require("redis").createClient();
const io = require("socket.io")(httpServer, {
  adapter: require("socket.io-redis")({
    pubClient: redisClient,
    subClient: redisClient.duplicate(),
  }),
});
```
