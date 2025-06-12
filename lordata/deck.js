const base32 = require('hi-base32');
const VarInt = require('./VarInt');
const Faction = require('./faction');
const Card = require('./card');
const CardCopies = require('./card-copies');

const MAX_KNOWN_VERSION = 5
const FORMAT = 1

module.exports = class Deck {
    format;
    version;
    cards;

    constructor(format, version, cards) {
        this.format = format;
        this.version = version;
        this.cards = cards;
    }

    static fromCode(code) {
        let bytes;
        try {
            bytes = base32.decode.asBytes(code);
        } catch (e) {
            return null;
        }

        const format = parseInt(bytes[0] >> 4, 2);
        const version = parseInt(bytes[0] & 0xF, 2);
        bytes.shift();
        if (format !== FORMAT || version > MAX_KNOWN_VERSION) {
            return null;
        }

        const cards = [];
        for (let copiesOfCard = 3; copiesOfCard > 0; copiesOfCard--) {
            const groupsWithCopyAmount = VarInt.pop(bytes);

            for (let i = 0; i < groupsWithCopyAmount; i++) {
                const cardsInGroup = VarInt.pop(bytes);
                const set = VarInt.pop(bytes);
                const factionNumber = VarInt.pop(bytes);

                for (let j = 0; j < cardsInGroup; j++) {
                    const cardNumber = VarInt.pop(bytes);
                    const faction = Faction.fromNumber(factionNumber);
                    cards.push(new CardCopies(new Card(set, faction.identifier, cardNumber), copiesOfCard));
                }
            }
        }
        return new Deck(format, version, cards);
    }
}