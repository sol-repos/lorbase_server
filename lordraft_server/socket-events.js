const SessionManager = require("./session-manager");

exports.setupSocketEvents = (wss) => {
    const sessionManager = new SessionManager();

    wss.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('host', () => {
            const result = sessionManager.createSession(socket.id);
            if (!result.success) {
                socket.emit('error', result.error);
                return;
            }
            socket.join(result.sessionId);
            socket.emit('hostSuccessful', result.sessionId);
            console.log(`User ${socket.id} created session with ID: ${sessionId}`);
        });

        socket.on('join', (sessionId) => {
            const result = sessionManager.joinSession(sessionId, socket.id);
            if (!result.success) {
                socket.emit('error', result.error);
                return;
            }
            socket.join(sessionId);
            socket.to(sessionId).emit('playerJoined');
            socket.emit('joinSuccessful', sessionId);
            console.log(`User ${socket.id} joined session ${sessionId}`);
        });
    });

    setInterval(() => {
        sessionManager.cleanupSessions();
    }, 10 * 60 * 1000); // Check every 10 minutes
}