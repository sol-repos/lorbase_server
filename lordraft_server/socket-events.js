const errors = require("./errors");
const LorbaseService = require("./lorbase-service");
const { SessionManager } = require("./session-manager");

exports.setupSocketEvents = (io) => {
    const sessionManager = new SessionManager();

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('host', () => {
            const result = sessionManager.createSession(socket.id);
            if (!result.success) {
                socket.emit('error', result.error);
                return;
            }
            socket.join(result.session.id);
            socket.emit('hostSuccessful', result.session.id);
            console.log(`User ${socket.id} created session with ID: ${result.session.id}`);
        });

        socket.on('join', (sessionIdInput) => {
            console.log(`User ${socket.id} called join with sessionId: ${sessionIdInput}`);
            let sessionId = sanitize(sessionIdInput);

            const result = sessionManager.joinSession(sessionId, socket.id);
            if (!result.success) {
                socket.emit('error', result.error);
                return;
            }
            socket.join(result.session.id);
            socket.to(result.session.id).emit('playerJoined');
            socket.emit('joinSuccessful', result.session.getSessionInfoJson());
            console.log(`User ${socket.id} joined session ${result.session.id}`);
        });

        socket.on('submitCubeDeckCode', async (deckCodeInput) =>  {
            let deckCode = sanitize(deckCodeInput);

            const result = sessionManager.getSessionByPlayerId(socket.id);
            if (!result.success) {
                socket.emit('error', result.error);
                return;
            }
            if (result.session.host !== socket.id) {
                socket.emit('error', errors.NOT_AUTHORIZED);
                return;
            }

            let deckJson = await LorbaseService.getDeckJsonFromCode(deckCode);
            if (!deckJson) {
                socket.emit('error', errors.INVALID_DECK_CODE);
                return;
            }

            result.session.gameState.updateCubeDeck(deckJson);
            io.to(result.session.id).emit('cubeDeckUpdated', deckJson);
            console.log(`User ${socket.id} submitted deck code for session ${result.session.id}: ${deckCode}`);
        });
    });

    setInterval(() => {
        sessionManager.cleanupSessions();
    }, 10 * 60 * 1000); // Check every 10 minutes
}

/* Ensures a string value and removes anything that is not a letter, number, or dash */
function sanitize(input) {
    let unallowedChars = /[^a-zA-Z0-9-]/g;
    return (input + '').replaceAll(unallowedChars, '');
}