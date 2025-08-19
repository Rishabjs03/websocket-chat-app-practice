import { WebSocketServer, WebSocket } from "ws"

const wss = new WebSocketServer({ port: 8080 })

interface User {
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];
wss.on('connection', (socket) => {
    socket.on('message', (message) => {
        // @ts-ignore
        const ParsedMessage = JSON.parse(message);
        if (ParsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: ParsedMessage.payload.roomId,
            })

        }
        if (ParsedMessage.type === "chat") {
            // 1. Find which room the current user (who sent the message) is in
            const currentUserRoom = allSockets.find((x) => x.socket === socket)?.room;

            // 2. Send the message only to sockets in the same room
            for (let i = 0; i < allSockets.length; i++) {
                const s = allSockets[i];
                if (s?.room === currentUserRoom) {
                    s?.socket.send(ParsedMessage.payload.message);
                }
            }
        }

    })

})