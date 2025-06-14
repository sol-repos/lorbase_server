const { describe, it } = require("node:test");
const assert = require("node:assert");
const Deck = require("../deck");
const { testingDeckCode, testingDeckJson } = require("../../shared/mocked-data");

describe("Deck class", () => {
    it("should create an instance with correct properties", () => {
        const dummyCards = [
            { card: { setNumber: 1, factionIdentifier: "DE", cardNumber: 45, }, copies: 3 },
            { card: { setNumber: 1, factionIdentifier: "IO", cardNumber: 32, }, copies: 2 }
        ];
        const deck = new Deck(1, 2, dummyCards);

        assert.strictEqual(deck.format, 1);
        assert.strictEqual(deck.version, 2);
        assert.strictEqual(deck.cards, dummyCards);
    });

    it("should parse from a deck code correctly", () => {
        const deck = Deck.fromCode(testingDeckCode);
        
        assert.strictEqual(deck.format, testingDeckJson.format);
        assert.strictEqual(deck.version, testingDeckJson.version);
        assert.strictEqual(deck.cards.length, testingDeckJson.cards.length);
        testingDeckJson.cards.forEach((card, index) => {
            assert.strictEqual(deck.cards[index].card.setNumber, card.card.setNumber);
            assert.strictEqual(deck.cards[index].card.factionIdentifier, card.card.factionIdentifier);
            assert.strictEqual(deck.cards[index].card.cardNumber, card.card.cardNumber);
            assert.strictEqual(deck.cards[index].copies, card.copies);
        });
    });
});