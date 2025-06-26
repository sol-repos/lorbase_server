module.exports = class GameState {
    constructor() {
        this.gameStarted = false;
        this.cubeDeck = null;
    }

    updateCubeDeck(deck) {
        this.cubeDeck = deck;
    }

    toJson() {
        return {
            gameStarted: this.gameStarted,
            cubeDeck: this.cubeDeck
        };
    }
}