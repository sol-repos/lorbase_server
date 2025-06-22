const { WebSocket } = require('ws');
const { setupSocketEvents } = require('./socket-events');

const PORT = 3001;

const ws = new WebSocket({ port: PORT });

setupSocketEvents(ws);

server.listen(PORT, () => {
    console.log(`ws server running on port ${PORT}`);
});