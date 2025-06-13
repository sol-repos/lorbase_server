module.exports = class CardCopies {
    card;
    amount;

    constructor(card, amount) {
        this.card = card;
        this.amount = amount;
    }

    toJson() {
        return {
            card: this.card.toJson(),
            amount: this.amount
        };
    }
}