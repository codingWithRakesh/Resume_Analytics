import { Server } from 'socket.io';
import http from "http";
import app from "../app.js";

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: true,
        credentials: true
    }
});

io.on('connection', (socket) => {
    socket.on("connect_error", (err) => {
        console.log("Connection error:", err);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected:", userId);
    });
})

export { io, server };