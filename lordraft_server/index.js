const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { setupSocketEvents } = require('./socket-events');

const PORT = 3001;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust as needed for security
        methods: ["GET", "POST"]
    }
});

setupSocketEvents(io);

server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});