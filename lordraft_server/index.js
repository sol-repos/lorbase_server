const { WebSocketServer } = require('ws');
const { setupSocketEvents } = require('./socket-events');

const PORT = 3001;

const wss = new WebSocketServer({ port: PORT });

setupSocketEvents(wss);

console.log(`WebSocket server is running on ws://localhost:${PORT}`);