const { describe, it } = require("node:test");
const assert = require("node:assert");
const CardCopies = require("../card-copies");

describe("CardCopies class", () => {
    it("should create an instance with correct properties", () => {
        const cardDummy = { set: 1, faction: "DE", number: 45 };
        const copies = 3;
        const cardCopies = new CardCopies(cardDummy, copies);

        assert.strictEqual(cardCopies.card.set, 1);
        assert.strictEqual(cardCopies.card.faction, "DE");
        assert.strictEqual(cardCopies.card.number, 45);
        assert.strictEqual(cardCopies.amount, 3);
    });
});