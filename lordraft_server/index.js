const { WebSocket } = require('ws');
const { setupSocketEvents } = require('./socket-events');

const PORT = 3001;

const ws = new WebSocket('ws://localhost:' + PORT);

setupSocketEvents(ws);