const { describe, it } = require("node:test");
const assert = require("node:assert");
const Deck = require("../deck");

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
        const deckCode = "CUBACBQMAYAQODAPAMAQIBZ6AEDAYAQCAUFB3IIBEYAQGAIDAECAABIBAQAQKAIEBEHQCBQDCYAQMBIMAEDQMKQBA4GAYAIIBICQCCAGBAAQQAQVAEEASLIBBAGA4AIIAUCACCIKBUAQSARNAEEQSAQCAIDC4LYCAIAAEBQCAMAAWDICAQBAKCYCAYCAQFIDAEBSUKZMAMAQICA3FABQCBIECUVAGBAGAQDASAYEA4BRGUYDAUBAOFI2AMDAUGQ6FABQMBQLC4VQGBQABIPCUAYJAAQSEJYEAEAQSIZGFMCACAQJB4QCSBADBEBASUKXAUAQADANCULC2BQFBIJTUWDJQUA3AAIGAYGACBIIBEMRU";
        const deck = Deck.fromCode(deckCode);
        
        assert.strictEqual(deck.format, 1);
        //assert.strictEqual(deck.version, NaN); // deck code has undefined version
        // TODO: assert deck.cards contains expected cards
    });
});