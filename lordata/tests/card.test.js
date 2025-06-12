const { describe, it } = require("node:test");
const assert = require("node:assert");
const Card = require("../card");

describe("Card class", () => {
    it("should create an instance with correct properties", () => {
        const card = new Card(1, "DE", 45);

        assert.strictEqual(card.setNumber, 1);
        assert.strictEqual(card.factionIdentifier, "DE");
        assert.strictEqual(card.cardNumber, 45);
    });

    it("should generate correct card code", () => {
        const card = new Card(1, "DE", 10);
        assert.strictEqual(card.cardCode, "01DE010");
    });
});