const { describe, it } = require("node:test");
const assert = require("node:assert");
const lordata = require('../lordata');

describe('lordata module exports', () => {
    it('should export Deck', () => {
        assert.ok(lordata.hasOwnProperty('Deck'));
        assert.ok(lordata.Deck !== undefined);
    });

    it('should export VarInt', () => {
        assert.ok(lordata.hasOwnProperty('VarInt'));
        assert.ok(lordata.VarInt !== undefined);
    });

    it('should export Faction', () => {
        assert.ok(lordata.hasOwnProperty('Faction'));
        assert.ok(lordata.Faction !== undefined);
    });

    it('should export Card', () => {
        assert.ok(lordata.hasOwnProperty('Card'));
        assert.ok(lordata.Card !== undefined);
    });

    it('should export CardCopies', () => {
        assert.ok(lordata.hasOwnProperty('CardCopies'));
        assert.ok(lordata.CardCopies !== undefined);
    });
});