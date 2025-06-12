module.exports = class Card {
    setNumber;
    factionIdentifier;
    cardNumber;

    constructor(setNumber, factionIdentifier, cardNumber) {
        this.setNumber = setNumber;
        this.factionIdentifier = factionIdentifier;
        this.cardNumber = cardNumber;
    }

    get cardCode() {
        return `${this.setNumber.toString().padStart(2, '0')}${this.factionIdentifier}${this.cardNumber.toString().padStart(3, '0')}`;
    }
}