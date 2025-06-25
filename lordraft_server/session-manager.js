const { v4: uuidv4 } = require('uuid');
const Errors = require('./errors');

module.exports = class SessionManager {
    constructor() {
        this.sessions = {};
    }

    createSession(hostId) {
        const sessionId = uuidv4();
        if (this.sessions[sessionId]) {
            return { success: false, error: Errors.SESSION_ID_TAKEN };
        }
        this.sessions[sessionId] = { host: hostId, joinedPlayer: null, createdAt: Date.now() };
        return { success: true, sessionId };
    }

    joinSession(sessionId, playerId) {
        if (!this.sessions[sessionId]) {
            return { success: false, error: Errors.SESSION_NOT_FOUND };
        }
        if (this.sessions[sessionId].joinedPlayer) {
            return { success: false, error: Errors.SESSION_FULL };
        }
        this.sessions[sessionId].joinedPlayer = playerId;
        return { success: true };
    }

    cleanupSessions() {
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        for (const sessionId in this.sessions) {
            if (this.sessions[sessionId].createdAt + oneHour < now) {
                delete this.sessions[sessionId];
            }
        }
    }
}