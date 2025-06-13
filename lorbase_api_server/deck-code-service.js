const { Deck } = require('../data-classes/deck');

const jsonEncodedColumns = [
    'associatedCards',
    'associatedCardRefs',
    'regions',
    'regionRefs',
    'keywords',
    'keywordRefs',
    'subtypes',
    'formats',
    'formatRefs'
]

exports.getDeckJsonFromDBByCode = function (db, deckCode) {
    const deck = Deck.fromCode(deckCode);
    if (!deck) {
        return null;
    }

    const cardAmounts = {};
    deck.cards.forEach(cardCopies => {
        cardAmounts[cardCopies.card.cardCode] = cardCopies.amount;
    });
    const cardCodes = Object.keys(cardAmounts);
    if (cardCodes.length === 0) {
        return res.json([]);
    }
    const placeholders = cardCodes.map(() => '?').join(',');
    const sql = `SELECT * FROM cards WHERE cardCode IN (${placeholders})`;
    db.all(sql, cardCodes, (err, rows) => {
        if (err) {
            return null;
        }
        const cards = rows.map(row => {
            const result = {};
            for (const [column, value] of Object.entries(row)) {
                if (jsonEncodedColumns.includes(column)) {
                    result[column] = JSON.parse(value);
                } else {
                    result[column] = value;
                }
            }
            return result;
        });

        const cardCopiesData = cards.map(card => ({
            card: card,
            amount: cardAmounts[card.cardCode],
        }));
        const result = {
            cards: cardCopiesData,
            format: deck.format,
            version: deck.version,
        }
        return result;
    });
}

exports.registerDeckCodeService = function (app, db) {
    app.get('/deckCode/:deckCode', (req, res) => {
        const deckCode = req.params.deckCode;
        const result = exports.getDeckJsonFromDBByCode(db, deckCode);
        if (!result) {
            return res.status(400).json({ error: 'Invalid deck code' });
        }
        res.json(result);
    });
}