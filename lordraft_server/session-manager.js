const { v4: uuidv4 } = require('uuid');
const Errors = require('./errors');
const GameState = require('./game-state');

class Session {
    constructor(hostId) {
        this.id = uuidv4();
        this.host = hostId;
        this.joinedPlayer = null;
        this.createdAt = Date.now();
        this.gameState = new GameState();
    }

    isFull() {
        return this.joinedPlayer !== null;
    }

    isExpired() {
        const oneHour = 60 * 60 * 1000;
        return (Date.now() - this.createdAt) > oneHour;
    }

    getSessionInfoJson() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            gameState: this.gameState.toJson(),
        };
    }
}
module.exports.Session = Session;

module.exports.SessionManager = class SessionManager {
    constructor() {
        this.sessions = {};
    }

    createSession(hostId) {
        let session = new Session(hostId);
        if (this.sessions[session.id]) {
            return { success: false, error: Errors.SESSION_ID_TAKEN };
        }
        this.sessions[session.id] = session;
        return { success: true, session: session };
    }

    joinSession(sessionId, playerId) {
        let session = this.sessions[sessionId];
        if (!session) {
            return { success: false, error: Errors.SESSION_NOT_FOUND };
        }
        if (session.joinedPlayer) {
            return { success: false, error: Errors.SESSION_FULL };
        }
        this.sessions[sessionId].joinedPlayer = playerId;
        return { success: true, session: session };
    }

    getSessionByPlayerId(playerId) {
        for (const sessionId in this.sessions) {
            let session = this.sessions[sessionId];
            if (session.host === playerId || session.joinedPlayer === playerId) {
                return { success: true, session: session };
            }
        }
        return { success: false, error: Errors.SESSION_NOT_FOUND };
    }

    cleanupSessions() {
        for (const sessionId in this.sessions) {
            if (this.sessions[sessionId].isExpired()) {
                delete this.sessions[sessionId];
            }
        }
    }
}