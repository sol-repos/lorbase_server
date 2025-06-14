const { describe, it } = require("node:test");
const assert = require("node:assert");
const VarInt = require('../VarInt');

const testingBytes = [
    0x00,                   // 0
    0x01,                   // 1
    0x7F,                   // 127
    0x80, 0x01,             // 128
    0xFF, 0x01,             // 255
    0x80, 0x80, 0x01,       // 16384
    0xFF, 0xFF, 0x7F,       // 2097151
    0x80, 0x80, 0x80, 0x01, // 2097152
    0xFF, 0xFF, 0xFF, 0x7F, // 268435455
];

const correspondingInts = [
    0,
    1,
    127,
    128,
    255,
    16384,
    2097151,
    2097152,
    268435455,
];

describe('VarInt class', () => {
    it('should correctly pop varints from byte arrays', () => {
        let bytes = [...testingBytes];
        for (let i = 0; i < correspondingInts.length; i++) {
            const poppedValue = VarInt.pop(bytes);
            assert.strictEqual(poppedValue, correspondingInts[i]);
        }
        assert.strictEqual(bytes.length, 0);
    });

    it('should correctly convert integers to varint byte arrays', () => {
        let previousLength = 0;
        for (let i = 0; i < correspondingInts.length; i++) {
            const byteArray = VarInt.get(correspondingInts[i]);
            assert.deepStrictEqual(byteArray, testingBytes.slice(previousLength, previousLength + byteArray.length));
            previousLength += byteArray.length;
        }
    });

    it('should throw an error when popping from an invalid byte array', () => {
        assert.throws(() => VarInt.pop([0x80]), TypeError);
    });

});
