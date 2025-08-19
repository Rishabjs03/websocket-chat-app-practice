import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let UserCount = 0;
let allSockets = [];
wss.on('connection', (socket) => {
    allSockets.push(socket);
    console.log("user connected");
    UserCount = UserCount + 1;
    socket.on('message', (message) => {
        console.log("message received" + message.toString());
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            s?.send(message.toString());
        }
    });
});
//# sourceMappingURL=index.js.map