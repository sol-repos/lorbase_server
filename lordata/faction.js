module.exports = class Faction {
    _number;
    static numberToIdentifier = {
        0: "DE",
        1: "FR",
        2: "IO",
        3: "NX",
        4: "PZ",
        5: "SI",
        6: "BW",
        9: "MT",
        7: "SH",
        10: "BC",
        12: "RU",
    }
    static identifierToNumber = {
        "DE": 0,
        "FR": 1,
        "IO": 2,
        "NX": 3,
        "PZ": 4,
        "SI": 5,
        "BW": 6,
        "MT": 9,
        "SH": 7,
        "BC": 10,
        "RU": 12,
    }

    constructor(number) {
        this._number = number;
    }

    static fromNumber(number) {
        if ([0,1,2,3,4,5,6,9,7,10,12].includes(number)) {
            return new Faction(number);
        }
        return null;
    }

    static fromIdentifier(identifier) {
        return this.fromNumber(Faction.identifierToNumber[identifier]);
    }

    get number() {
        return this._number;
    }

    get identifier() {
        return Faction.numberToIdentifier[this._number];
    }
}