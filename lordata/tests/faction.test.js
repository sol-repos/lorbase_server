const { describe, it } = require("node:test");
const assert = require("node:assert");
const Faction = require("../faction");

describe("Faction class", () => {
    it("should create an instance with correct properties", () => {
        const faction = new Faction(0);

        assert.strictEqual(faction.number, 0);
        assert.strictEqual(faction.identifier, "DE");
    });

    it("should create an instance from number", () => {
        const faction = Faction.fromNumber(1);
        assert.strictEqual(faction.number, 1);
        assert.strictEqual(faction.identifier, "FR");
    });

    it("should return null for invalid number", () => {
        const faction = Faction.fromNumber(99);
        assert.strictEqual(faction, null);
    });

    it("should create an instance from identifier", () => {
        const faction = Faction.fromIdentifier("IO");
        assert.strictEqual(faction.number, 2);
        assert.strictEqual(faction.identifier, "IO");
    });

    it("should return null for invalid identifier", () => {
        const faction = Faction.fromIdentifier("XX");
        assert.strictEqual(faction, null);
    });
});