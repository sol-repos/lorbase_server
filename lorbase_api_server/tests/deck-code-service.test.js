const { describe, it, mock, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert");
const { getDeckJsonFromDBByCode } = require("../deck-code-service");
const { Deck } = require('../../lordata/lordata');
const { testingDeckCode, testingDeckJson, dbCardResponse, testingDeckWithCardCodeJson } = require("./mocked-data");

const placeholders = Array(72).fill('?').join(',');
const mockDb = { all: (sql, params, callback) => { } };

describe("getDeckJsonFromDBByCode function", () => {
    beforeEach(() => {
        mock.method(Deck, 'fromCode', (code) => {
            if (code === testingDeckCode) {
                return testingDeckWithCardCodeJson;
            }
            return null;
        });
        mock.method(mockDb, 'all', (sql, params, callback) => {
            callback(null, dbCardResponse);
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return null for invalid deck code", () => {
        assert.strictEqual(Deck.fromCode.mock.calls.length, 0);

        const result = getDeckJsonFromDBByCode(mockDb, "invalidCode");

        assert.strictEqual(Deck.fromCode.mock.calls.length, 1);
        assert.deepStrictEqual(Deck.fromCode.mock.calls[0].arguments, ["invalidCode"]);
        assert.strictEqual(mockDb.all.mock.calls.length, 0);
        assert.strictEqual(result, null);

        mock.reset();
    });

    it("should return deck JSON for valid deck code", () => {
        assert.strictEqual(Deck.fromCode.mock.calls.length, 0);
        assert.strictEqual(mockDb.all.mock.calls.length, 0);

        const result = getDeckJsonFromDBByCode(mockDb, testingDeckCode);

        assert.strictEqual(Deck.fromCode.mock.calls.length, 1);
        assert.deepStrictEqual(Deck.fromCode.mock.calls[0].arguments, [testingDeckCode]);
        assert.strictEqual(mockDb.all.mock.calls.length, 1);
        assert.strictEqual(mockDb.all.mock.calls[0].arguments[0], `SELECT * FROM cards WHERE cardCode IN (${placeholders})`);
        assert.deepStrictEqual(mockDb.all.mock.calls[0].arguments[1], testingDeckWithCardCodeJson.cards.map(card => card.card.cardCode));

        assert.deepStrictEqual(result, testingDeckJson);

        mock.reset();
    });
});